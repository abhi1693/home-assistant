"""Policy-aware UniFi Protect event history, media, alerts, and speaker actions."""

from __future__ import annotations

import asyncio
from collections.abc import Callable
from datetime import UTC, datetime, timedelta
import json
import logging
from pathlib import Path
from typing import Any
from urllib.parse import quote

from aiohttp import web
import voluptuous as vol

from homeassistant.components.http import KEY_HASS_USER, HomeAssistantView
from homeassistant.components.http.auth import async_sign_path
from homeassistant.components.sensor import PLATFORM_SCHEMA, SensorEntity
from homeassistant.const import CONF_ENTITY_ID, EVENT_HOMEASSISTANT_STARTED
from homeassistant.core import Event, HomeAssistant, ServiceCall, callback
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.event import async_call_later
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.storage import Store
from homeassistant.util import dt as dt_util
from uiprotect.events import EventChange, ProtectEvent

from . import DOMAIN
from .model import event_types, mark_notified, merge_event, public_records

_LOGGER = logging.getLogger(__name__)

CONF_ACCESS_FILE = "access_file"
CONF_STREAMS_FILE = "streams_file"
DEFAULT_ACCESS_FILE = "access/family-dashboard.json"
DEFAULT_STREAMS_FILE = "access/protect-streams.json"
SERVICE_ANNOUNCE = "announce"
STORE_KEY = "family_camera_events"
STORE_VERSION = 1
NOTIFICATION_MEDIA_EXPIRY = timedelta(minutes=30)

PLATFORM_SCHEMA = PLATFORM_SCHEMA.extend(
    {
        vol.Optional(CONF_ACCESS_FILE, default=DEFAULT_ACCESS_FILE): cv.string,
        vol.Optional(CONF_STREAMS_FILE, default=DEFAULT_STREAMS_FILE): cv.string,
    }
)

ANNOUNCE_SCHEMA = vol.Schema(
    {
        vol.Required("camera_key"): vol.All(cv.string, vol.Length(min=1, max=64)),
        vol.Required("message"): vol.All(cv.string, vol.Length(min=1, max=180)),
    }
)

_EVENT_LABELS = {
    "animal": "Animal detected",
    "baby_cry": "Baby crying heard",
    "barking": "Dog barking heard",
    "car_horn": "Car horn heard",
    "co": "Carbon monoxide alarm heard",
    "glass_break": "Glass breaking heard",
    "motion": "Motion detected",
    "package": "Package detected",
    "person": "Person detected",
    "security_alarm": "Security alarm heard",
    "siren": "Siren heard",
    "smoke": "Smoke alarm heard",
    "speaking": "Speaking detected",
    "vehicle": "Vehicle detected",
}


def _path(hass: HomeAssistant, configured: str) -> Path:
    path = Path(configured)
    return path if path.is_absolute() else Path(hass.config.path(path.as_posix()))


def _normal_mac(value: Any) -> str:
    return str(value or "").replace(":", "").replace("-", "").upper()


class FamilyCameraEventManager:
    """Own the bounded event feed and all account-sensitive camera actions."""

    def __init__(
        self,
        hass: HomeAssistant,
        cameras: dict[str, dict[str, Any]],
        profiles: dict[str, dict[str, Any]],
    ) -> None:
        self.hass = hass
        self.cameras = cameras
        self.profiles = profiles
        self._store: Store[dict[str, Any]] = Store(
            hass, STORE_VERSION, STORE_KEY, private=True, atomic_writes=True
        )
        self._records: dict[str, list[dict[str, Any]]] = {
            key: [] for key in cameras
        }
        self._entities: dict[str, FamilyCameraActivitySensor] = {}
        self._camera_by_device_id: dict[str, str] = {}
        self._api_by_camera: dict[str, Any] = {}
        self._subscriptions: list[Callable[[], None]] = []
        self._subscribed_entries: set[str] = set()
        self._attach_retry: Callable[[], None] | None = None
        self._attached = False
        self._speaker_lock = asyncio.Lock()

    async def async_initialize(self) -> None:
        """Restore history and attach after Protect finishes starting."""
        stored = await self._store.async_load() or {}
        for key in self.cameras:
            records = stored.get("cameras", {}).get(key, [])
            if isinstance(records, list):
                now = datetime.now(UTC)
                self._records[key], _ = merge_event(
                    records,
                    {
                        "id": f"__prune__-{key}",
                        "start": now.isoformat(),
                        "types": [],
                        "active": False,
                    },
                    now,
                )
                self._records[key] = [
                    item
                    for item in self._records[key]
                    if not str(item.get("id", "")).startswith("__prune__")
                ]

        if self.hass.is_running:
            await self._async_attach()
        else:
            self.hass.bus.async_listen_once(
                EVENT_HOMEASSISTANT_STARTED, self._async_started
            )

    @callback
    def bind_entity(self, key: str, entity: "FamilyCameraActivitySensor") -> None:
        self._entities[key] = entity

    @callback
    def records(self, key: str) -> list[dict[str, Any]]:
        return public_records(self._records.get(key, []))

    async def _async_started(self, _event: Event) -> None:
        await self._async_attach()

    async def _async_attach(self) -> None:
        if self._attached:
            return
        registry = er.async_get(self.hass)
        for entry in self.hass.config_entries.async_entries("unifiprotect"):
            data = getattr(entry, "runtime_data", None)
            api = getattr(data, "api", None)
            if api is None or not getattr(api, "has_public_bootstrap", False):
                continue

            matched = False
            matched_keys: list[str] = []
            for key, camera in self.cameras.items():
                high = registry.async_get(camera["high_entity_id"])
                if high is None or high.config_entry_id != entry.entry_id:
                    continue
                wanted_mac = _normal_mac(high.unique_id.removesuffix("_0"))
                public = next(
                    (
                        item
                        for item in api.public_bootstrap.cameras.values()
                        if _normal_mac(item.mac) == wanted_mac
                    ),
                    None,
                )
                if public is None:
                    _LOGGER.warning("Protect camera mapping is not ready for %s", key)
                    continue
                self._camera_by_device_id[public.id] = key
                self._api_by_camera[key] = api
                matched = True
                matched_keys.append(key)
            if matched and entry.entry_id not in self._subscribed_entries:
                try:
                    self._subscriptions.append(
                        api.subscribe_events(self._event_changed)
                    )
                    self._subscribed_entries.add(entry.entry_id)
                except Exception:
                    for key in matched_keys:
                        self._api_by_camera.pop(key, None)
                    _LOGGER.exception(
                        "Protect event stream is not ready for %s", entry.title
                    )

        missing = sorted(set(self.cameras) - set(self._api_by_camera))
        if missing:
            _LOGGER.warning("Protect event feeds are not attached for: %s", missing)
            if self._attach_retry is None:
                self._attach_retry = async_call_later(
                    self.hass, 30, self._async_retry_attach
                )
        else:
            self._attached = True
            _LOGGER.info("Attached private Protect event feeds for %d cameras", len(self.cameras))

    @callback
    def _async_retry_attach(self, _now: datetime) -> None:
        self._attach_retry = None
        self.hass.async_create_task(
            self._async_attach(), "retry private Protect event feeds"
        )

    @callback
    def _event_changed(self, event: ProtectEvent, change: EventChange) -> None:
        """Keep the Protect WebSocket callback non-raising by contract."""
        try:
            self._handle_event_changed(event, change)
        except Exception:  # Protect otherwise drops this lifecycle delivery.
            _LOGGER.exception(
                "Unable to process Protect event %s (%s)", event.id, change.value
            )

    @callback
    def _handle_event_changed(self, event: ProtectEvent, change: EventChange) -> None:
        """Process one typed Protect event lifecycle update."""
        key = self._camera_by_device_id.get(event.device_id)
        if key is None or change is EventChange.REMOVED:
            return
        types = event_types(event)
        if not types:
            return

        now = datetime.now(UTC)
        end = event.end.astimezone(UTC).isoformat() if event.end else None
        incoming = {
            "id": event.id,
            "camera_key": key,
            "camera_name": self.cameras[key]["name"],
            "types": types,
            "start": event.start.astimezone(UTC).isoformat(),
            "end": end,
            "active": change is not EventChange.ENDED and end is None,
            "thumbnail": f"/api/family_camera_events/{key}/{event.id}/thumbnail",
            "video": f"/api/family_camera_events/{key}/{event.id}/video",
        }
        self._records[key], newly_seen = merge_event(
            self._records[key], incoming, now
        )
        self._write_state(key)

        for event_type in sorted(newly_seen):
            severity = self._alert_severity(key, event_type)
            if severity is None:
                continue
            record = next(item for item in self._records[key] if item["id"] == event.id)
            if event_type in record.get("notified_types", []):
                continue
            self._records[key] = mark_notified(
                self._records[key], event.id, event_type
            )
            self.hass.async_create_task(
                self._async_notify(key, event.id, event_type, severity, False),
                f"camera alert {key} {event_type}",
            )

        if change is EventChange.ENDED:
            record = next(item for item in self._records[key] if item["id"] == event.id)
            for event_type in record.get("notified_types", []):
                severity = self._alert_severity(key, event_type)
                if severity:
                    self.hass.async_create_task(
                        self._async_notify(
                            key, event.id, event_type, severity, True
                        ),
                        f"camera clip {key} {event_type}",
                    )

        self._store.async_delay_save(
            lambda: {"cameras": self._records}, delay=5
        )

    def _alert_severity(self, key: str, event_type: str) -> str | None:
        alerts = self.cameras[key].get("alerts", {})
        if event_type in alerts.get("always", {}):
            return alerts["always"][event_type]
        if event_type not in alerts.get("when_empty", {}):
            return None
        if not (
            self.hass.states.is_state("input_boolean.empty_home_confirmed", "on")
            and self.hass.states.is_state("binary_sensor.house_occupied", "off")
            and self.hass.states.is_state("sensor.presence_confidence", "high")
        ):
            return None
        return alerts["when_empty"][event_type]

    async def _async_notify(
        self,
        key: str,
        event_id: str,
        event_type: str,
        severity: str,
        ended: bool,
    ) -> None:
        if not ended:
            await asyncio.sleep(2)
        if severity in {"informational", "advisory"} and self.hass.states.is_state(
            "schedule.quiet_hours", "on"
        ):
            return

        camera = self.cameras[key]
        targets = [
            self.profiles[profile_key]["notify_entity_id"]
            for profile_key in camera.get("notify_profiles", [])
            if profile_key in self.profiles
            and self.profiles[profile_key].get("notify_entity_id")
            and self.hass.states.get(
                self.profiles[profile_key]["notify_entity_id"]
            )
            is not None
        ]
        if not targets:
            _LOGGER.warning("No loaded phone target for %s camera alert", key)
            return

        label = _EVENT_LABELS.get(event_type, event_type.replace("_", " ").title())
        path = f"/api/family_camera_events/{key}/{event_id}"
        thumbnail = async_sign_path(
            self.hass,
            quote(f"{path}/thumbnail"),
            NOTIFICATION_MEDIA_EXPIRY,
            use_content_user=True,
        )
        data: dict[str, Any] = {
            "tag": f"camera-{key}-{event_id}-{event_type}",
            "image": thumbnail,
            "url": "/home-tablet/security",
            "clickAction": "/home-tablet/security",
            "actions": [
                {
                    "action": "URI",
                    "title": "Open Security",
                    "uri": "/home-tablet/security",
                }
            ],
        }
        if ended:
            data["video"] = async_sign_path(
                self.hass,
                quote(f"{path}/video"),
                NOTIFICATION_MEDIA_EXPIRY,
                use_content_user=True,
            )
        await self.hass.services.async_call(
            "notify",
            "send_message",
            {
                "title": f"{label} · {camera['name']}",
                "message": (
                    "A recorded clip is ready."
                    if ended
                    else f"{label} on the {camera['name']} camera."
                ),
                "data": data,
            },
            target={CONF_ENTITY_ID: sorted(set(targets))},
            blocking=False,
        )

    @callback
    def _write_state(self, key: str) -> None:
        if entity := self._entities.get(key):
            entity.async_write_ha_state()

    def can_access(self, user_id: str | None, key: str) -> bool:
        if key not in self.cameras or user_id is None:
            return False
        for profile in self.profiles.values():
            if profile.get("user_id") != user_id:
                continue
            return bool(
                profile.get("is_owner") and profile.get("all_cameras")
                or key in profile.get("cameras", [])
            )
        return False

    def known_event(self, key: str, event_id: str) -> bool:
        return any(item.get("id") == event_id for item in self._records.get(key, []))

    def api_for(self, key: str) -> Any | None:
        return self._api_by_camera.get(key)

    async def async_announce(self, call: ServiceCall) -> None:
        key = call.data["camera_key"]
        camera = self.cameras.get(key)
        user = (
            await self.hass.auth.async_get_user(call.context.user_id)
            if call.context.user_id
            else None
        )
        if (
            camera is None
            or user is None
            or not user.is_active
            or not self.can_access(user.id, key)
        ):
            raise HomeAssistantError("This account cannot use that camera speaker")
        speaker = camera.get("speaker_entity_id")
        if not speaker:
            raise HomeAssistantError("This camera has no speaker")
        if self.hass.states.get(speaker) is None:
            raise HomeAssistantError("The camera speaker is unavailable")

        registry = er.async_get(self.hass)
        tts_entity = next(
            (
                entry.entity_id
                for entry in registry.entities.values()
                if entry.platform == "google_translate"
                and entry.entity_id.startswith("tts.")
                and entry.disabled_by is None
            ),
            None,
        )
        if tts_entity is None:
            raise HomeAssistantError("Text-to-speech is still starting")

        async with self._speaker_lock:
            await self.hass.services.async_call(
                "tts",
                "speak",
                {
                    "media_player_entity_id": speaker,
                    "message": " ".join(call.data["message"].split()),
                    "cache": True,
                    "options": {"preferred_format": "mp3"},
                },
                target={CONF_ENTITY_ID: tts_entity},
                blocking=True,
                context=call.context,
            )


class FamilyCameraActivitySensor(SensorEntity):
    """Bounded recent activity for exactly one access-controlled camera."""

    _attr_icon = "mdi:cctv"
    _attr_should_poll = False

    def __init__(
        self, manager: FamilyCameraEventManager, key: str, camera: dict[str, Any]
    ) -> None:
        self._manager = manager
        self._key = key
        self._camera = camera
        self._attr_name = f"{camera['name']} camera activity"
        self._attr_unique_id = f"family_camera_events_{key}"
        self.entity_id = camera["activity_entity_id"]
        self._attr_suggested_object_id = camera["activity_entity_id"].removeprefix(
            "sensor."
        )

    @property
    def native_value(self) -> int:
        return len(self._manager.records(self._key))

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        records = self._manager.records(self._key)
        return {
            "camera_key": self._key,
            "camera_name": self._camera["name"],
            "events": records,
            "last_event": records[0]["start"] if records else None,
        }


class _FamilyCameraMediaView(HomeAssistantView):
    requires_auth = True

    def __init__(self, manager: FamilyCameraEventManager) -> None:
        self.manager = manager

    def _allowed(self, request: web.Request, key: str, event_id: str) -> bool:
        user = request[KEY_HASS_USER]
        content_capability = bool(
            getattr(user, "system_generated", False)
            and user.name == "Home Assistant Content"
        )
        return self.manager.known_event(key, event_id) and (
            content_capability or self.manager.can_access(user.id, key)
        )


class FamilyCameraThumbnailView(_FamilyCameraMediaView):
    url = "/api/family_camera_events/{camera_key}/{event_id}/thumbnail"
    name = "api:family_camera_events:thumbnail"

    async def get(
        self, request: web.Request, camera_key: str, event_id: str
    ) -> web.Response:
        if not self._allowed(request, camera_key, event_id):
            raise web.HTTPNotFound()
        api = self.manager.api_for(camera_key)
        if api is None:
            raise web.HTTPServiceUnavailable()
        try:
            thumbnail = await api.get_event_thumbnail(event_id, width=640, height=360)
        except Exception as err:  # Protect translates upstream failures inconsistently.
            _LOGGER.debug("Unable to fetch Protect thumbnail %s: %s", event_id, err)
            raise web.HTTPNotFound() from err
        if thumbnail is None:
            raise web.HTTPNotFound()
        return web.Response(body=thumbnail, content_type="image/jpeg")


class FamilyCameraVideoView(_FamilyCameraMediaView):
    url = "/api/family_camera_events/{camera_key}/{event_id}/video"
    name = "api:family_camera_events:video"

    async def get(
        self, request: web.Request, camera_key: str, event_id: str
    ) -> web.StreamResponse:
        if not self._allowed(request, camera_key, event_id):
            raise web.HTTPNotFound()
        api = self.manager.api_for(camera_key)
        if api is None:
            raise web.HTTPServiceUnavailable()
        try:
            event = await api.get_event(event_id)
        except Exception as err:
            raise web.HTTPNotFound() from err
        if event.start is None or event.end is None:
            raise web.HTTPConflict(text="Event is still active")
        camera = api.bootstrap.cameras.get(event.camera_id)
        if camera is None:
            raise web.HTTPNotFound()

        response = web.StreamResponse(headers={"Content-Type": "video/mp4"})

        async def write_chunk(total: int, chunk: bytes | None) -> None:
            if not response.prepared:
                response.content_length = total
                await response.prepare(request)
            if chunk is not None:
                await response.write(chunk)

        try:
            await camera.get_video(
                event.start, event.end, iterator_callback=write_chunk
            )
        except Exception as err:
            _LOGGER.debug("Unable to fetch Protect clip %s: %s", event_id, err)
            if not response.prepared:
                raise web.HTTPNotFound() from err
        if response.prepared:
            await response.write_eof()
        return response


async def async_setup_platform(
    hass: HomeAssistant,
    config: dict[str, Any],
    async_add_entities: AddEntitiesCallback,
    discovery_info: dict[str, Any] | None = None,
) -> None:
    """Set up private camera activity sensors and actions."""
    del discovery_info
    access_path = _path(hass, config[CONF_ACCESS_FILE])
    streams_path = _path(hass, config[CONF_STREAMS_FILE])

    def load_json(path: Path) -> dict[str, Any]:
        return json.loads(path.read_text())

    access, streams = await asyncio.gather(
        hass.async_add_executor_job(load_json, access_path),
        hass.async_add_executor_job(load_json, streams_path),
    )
    cameras = streams["cameras"]
    profiles = access["profiles"]
    manager = FamilyCameraEventManager(hass, cameras, profiles)
    entities = [
        FamilyCameraActivitySensor(manager, key, camera)
        for key, camera in cameras.items()
    ]
    for entity, key in zip(entities, cameras, strict=True):
        manager.bind_entity(key, entity)
    async_add_entities(entities)
    await manager.async_initialize()

    hass.data[DOMAIN] = manager
    hass.services.async_register(
        DOMAIN, SERVICE_ANNOUNCE, manager.async_announce, schema=ANNOUNCE_SCHEMA
    )
    hass.http.register_view(FamilyCameraThumbnailView(manager))
    hass.http.register_view(FamilyCameraVideoView(manager))
