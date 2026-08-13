"""Persistent multi-announcement sensor and actions."""

from __future__ import annotations

import asyncio
from collections.abc import Callable
from datetime import UTC, datetime
import json
import logging
from pathlib import Path
from typing import Any
from uuid import uuid4

import voluptuous as vol

from homeassistant.components.sensor import PLATFORM_SCHEMA, SensorEntity
from homeassistant.const import CONF_ENTITY_ID
from homeassistant.core import HomeAssistant, ServiceCall, callback
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.event import async_track_point_in_utc_time
from homeassistant.helpers.storage import Store
from homeassistant.util import dt as dt_util

from . import DOMAIN
from .model import (
    MAX_ANNOUNCEMENTS,
    MAX_MESSAGE_LENGTH,
    active_announcements,
    can_dismiss,
    normalize_message,
    parse_timestamp,
)

_LOGGER = logging.getLogger(__name__)

CONF_ACCESS_FILE = "access_file"
DEFAULT_ACCESS_FILE = "access/family-dashboard.json"
SERVICE_PUBLISH = "publish"
SERVICE_DISMISS = "dismiss"
ATTR_ANNOUNCEMENT_ID = "announcement_id"
ATTR_EXPIRES_AT = "expires_at"
ATTR_MESSAGE = "message"
STORE_KEY = "family_announcements"
STORE_VERSION = 1

PLATFORM_SCHEMA = PLATFORM_SCHEMA.extend(
    {vol.Optional(CONF_ACCESS_FILE, default=DEFAULT_ACCESS_FILE): cv.string}
)

PUBLISH_SCHEMA = vol.Schema(
    {
        vol.Required(ATTR_MESSAGE): vol.All(
            cv.string, vol.Length(min=1, max=MAX_MESSAGE_LENGTH)
        ),
        vol.Optional(ATTR_EXPIRES_AT): vol.Any(None, cv.datetime),
    }
)
DISMISS_SCHEMA = vol.Schema(
    {vol.Required(ATTR_ANNOUNCEMENT_ID): vol.All(cv.string, vol.Length(min=1, max=64))}
)


class FamilyAnnouncementManager:
    """Own persistent records, service actions, expiry, and notifications."""

    def __init__(
        self, hass: HomeAssistant, profiles: dict[str, dict[str, Any]]
    ) -> None:
        self.hass = hass
        self._profiles = profiles
        self._profiles_by_user_id = {
            profile["user_id"]: profile
            for profile in profiles.values()
            if profile.get("user_id") and profile.get("username")
        }
        self._notify_entities = sorted(
            {
                profile["notify_entity_id"]
                for profile in profiles.values()
                if profile.get("notify_entity_id")
            }
        )
        self._store: Store[dict[str, Any]] = Store(
            hass, STORE_VERSION, STORE_KEY, private=True, atomic_writes=True
        )
        self._records: list[dict[str, Any]] = []
        self._entity: FamilyAnnouncementsSensor | None = None
        self._expiry_unsubscribe: Callable[[], None] | None = None
        self._lock = asyncio.Lock()

    async def async_initialize(self) -> None:
        """Load, prune, and schedule persisted records."""
        stored = await self._store.async_load() or {}
        original = stored.get("announcements", [])
        self._records = active_announcements(original, datetime.now(UTC))
        if self._records != original:
            await self._async_save()
        self._schedule_next_expiry()

    @callback
    def bind_entity(self, entity: FamilyAnnouncementsSensor) -> None:
        """Attach the state entity after platform setup."""
        self._entity = entity

    @property
    def records(self) -> list[dict[str, Any]]:
        """Return serializable copies of active announcements."""
        return [dict(record) for record in self._records]

    async def async_publish(self, call: ServiceCall) -> None:
        """Create one announcement attributed to the authenticated caller."""
        profile = await self._async_sender(call)
        now = datetime.now(UTC)
        expires_at = call.data.get(ATTR_EXPIRES_AT)
        if expires_at is not None:
            expires_at = dt_util.as_utc(expires_at)
            if expires_at <= now:
                raise HomeAssistantError("Announcement end time must be in the future")

        record = {
            "id": uuid4().hex,
            "message": normalize_message(call.data[ATTR_MESSAGE]),
            "sender_user_id": profile["user_id"],
            "sender_username": profile["username"],
            "sender_name": profile.get("person_name") or profile["username"],
            "created_at": now.isoformat(),
            "expires_at": expires_at.isoformat() if expires_at else None,
        }

        async with self._lock:
            self._records = active_announcements(
                [record, *self._records], now
            )[:MAX_ANNOUNCEMENTS]
            await self._async_save()
            self._state_changed()
            self._schedule_next_expiry()

        await self._async_notify(record, call)

    async def async_dismiss(self, call: ServiceCall) -> None:
        """Dismiss one announcement when requested by its sender or an admin."""
        actor_user_id = call.context.user_id
        actor = (
            await self.hass.auth.async_get_user(actor_user_id)
            if actor_user_id is not None
            else None
        )
        if actor is None or not actor.is_active:
            raise HomeAssistantError(
                "An authenticated account is required to remove an announcement"
            )
        announcement_id = call.data[ATTR_ANNOUNCEMENT_ID]
        async with self._lock:
            record = next(
                (
                    item
                    for item in self._records
                    if item["id"] == announcement_id
                ),
                None,
            )
            if record is None:
                raise HomeAssistantError("Announcement no longer exists")
            if not can_dismiss(record, actor_user_id, actor.is_admin):
                raise HomeAssistantError(
                    "Only the sender or an administrator can remove this announcement"
                )
            self._records = [
                item for item in self._records if item["id"] != announcement_id
            ]
            await self._async_save()
            self._state_changed()
            self._schedule_next_expiry()

    async def _async_sender(self, call: ServiceCall) -> dict[str, Any]:
        user_id = call.context.user_id
        if user_id is None:
            return {
                "user_id": "home-assistant",
                "username": "home-assistant",
                "person_name": "Home Assistant",
            }
        profile = self._profiles_by_user_id.get(user_id)
        user = await self.hass.auth.async_get_user(user_id)
        if profile is None or user is None or not user.is_active:
            raise HomeAssistantError(
                "This account is not mapped in the family dashboard access policy"
            )
        return profile

    async def _async_notify(
        self, record: dict[str, Any], call: ServiceCall
    ) -> None:
        targets = [
            entity_id
            for entity_id in self._notify_entities
            if self.hass.states.get(entity_id) is not None
        ]
        if not targets:
            _LOGGER.warning("No connected family phone notification entities are loaded")
            return
        await self.hass.services.async_call(
            "notify",
            "send_message",
            {
                ATTR_MESSAGE: record["message"],
                "title": f"Announcement from {record['sender_name']}",
            },
            blocking=False,
            context=call.context,
            target={CONF_ENTITY_ID: targets},
        )

    async def _async_save(self) -> None:
        await self._store.async_save({"announcements": self._records})

    @callback
    def _state_changed(self) -> None:
        if self._entity is not None:
            self._entity.async_write_ha_state()

    @callback
    def _schedule_next_expiry(self) -> None:
        if self._expiry_unsubscribe is not None:
            self._expiry_unsubscribe()
            self._expiry_unsubscribe = None
        expiries = [
            parsed
            for record in self._records
            if (parsed := parse_timestamp(record.get("expires_at"))) is not None
        ]
        if expiries:
            self._expiry_unsubscribe = async_track_point_in_utc_time(
                self.hass, self._async_expire, min(expiries)
            )

    async def _async_expire(self, _now: datetime) -> None:
        async with self._lock:
            current = active_announcements(self._records, datetime.now(UTC))
            if current != self._records:
                self._records = current
                await self._async_save()
                self._state_changed()
            self._schedule_next_expiry()


class FamilyAnnouncementsSensor(SensorEntity):
    """One state entity carrying the active announcement collection."""

    _attr_icon = "mdi:bullhorn-outline"
    _attr_name = "Family announcements"
    _attr_should_poll = False
    _attr_unique_id = "family_announcements"

    def __init__(self, manager: FamilyAnnouncementManager) -> None:
        self._manager = manager

    @property
    def native_value(self) -> int:
        """Return the number of active announcements."""
        return len(self._manager.records)

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Expose ordered banner records to Lovelace."""
        return {
            "announcements": self._manager.records,
            "max_announcements": MAX_ANNOUNCEMENTS,
            "max_message_length": MAX_MESSAGE_LENGTH,
        }


def _load_profiles(path: Path) -> dict[str, dict[str, Any]]:
    document = json.loads(path.read_text(encoding="utf-8"))
    profiles = document.get("profiles")
    if not isinstance(profiles, dict):
        raise ValueError(f"Family access policy has no profiles object: {path}")
    return profiles


async def async_setup_platform(
    hass: HomeAssistant,
    config: dict[str, Any],
    async_add_entities: AddEntitiesCallback,
    discovery_info: dict[str, Any] | None = None,
) -> None:
    """Set up the persistent family announcement collection."""
    del discovery_info
    configured_path = Path(config[CONF_ACCESS_FILE])
    path = (
        configured_path
        if configured_path.is_absolute()
        else Path(hass.config.path(configured_path.as_posix()))
    )
    profiles = await hass.async_add_executor_job(_load_profiles, path)
    manager = FamilyAnnouncementManager(hass, profiles)
    await manager.async_initialize()
    entity = FamilyAnnouncementsSensor(manager)
    manager.bind_entity(entity)
    async_add_entities([entity])

    previous = hass.data.get(DOMAIN)
    if previous is not None and previous is not manager:
        _LOGGER.warning("Replacing an existing family announcements manager")
    hass.data[DOMAIN] = manager
    hass.services.async_register(
        DOMAIN, SERVICE_PUBLISH, manager.async_publish, schema=PUBLISH_SCHEMA
    )
    hass.services.async_register(
        DOMAIN, SERVICE_DISMISS, manager.async_dismiss, schema=DISMISS_SCHEMA
    )
