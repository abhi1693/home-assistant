"""Expose viewer-aware Jellyfin sessions to the family dashboard."""

from __future__ import annotations

from collections.abc import Callable
import logging
from typing import Any

from homeassistant.components.sensor import SensorEntity
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.update_coordinator import CoordinatorEntity
from homeassistant.util import slugify

from .session import playback_state, session_attributes

_LOGGER = logging.getLogger(__name__)
_DOMAIN = "family_jellyfin_sessions"


async def async_setup_platform(
    hass: HomeAssistant,
    config: dict[str, Any],
    async_add_entities: AddEntitiesCallback,
    discovery_info: dict[str, Any] | None = None,
) -> None:
    """Discover one viewer-aware sensor for each Jellyfin session."""
    del config, discovery_info
    coordinators = [
        entry.runtime_data
        for entry in hass.config_entries.async_entries("jellyfin")
        if entry.runtime_data is not None
    ]
    if not coordinators:
        _LOGGER.warning("No loaded Jellyfin entries are available")
        return

    known: set[tuple[str, str]] = set()
    unsubscribers: list[Callable[[], None]] = []

    for coordinator in coordinators:

        @callback
        def discover_sessions(coordinator: Any = coordinator) -> None:
            entities: list[FamilyJellyfinSessionSensor] = []
            for session_id in coordinator.data:
                key = (coordinator.server_id, session_id)
                if key in known:
                    continue
                known.add(key)
                entities.append(
                    FamilyJellyfinSessionSensor(hass, coordinator, session_id)
                )
            if entities:
                async_add_entities(entities)

        discover_sessions()
        unsubscribers.append(coordinator.async_add_listener(discover_sessions))

    hass.data.setdefault(_DOMAIN, []).extend(unsubscribers)


class FamilyJellyfinSessionSensor(CoordinatorEntity, SensorEntity):
    """A Jellyfin session enriched with the actual account name."""

    _attr_has_entity_name = False
    _attr_icon = "mdi:account-play-outline"

    def __init__(self, hass: HomeAssistant, coordinator: Any, session_id: str) -> None:
        """Initialize a session sensor without making an additional API call."""
        super().__init__(coordinator)
        self.hass = hass
        self.session_id = session_id
        self._attr_unique_id = (
            f"family-jellyfin-session-{coordinator.server_id}-{session_id}"
        )
        self.entity_id = (
            "sensor.jellyfin_session_"
            f"{slugify(coordinator.server_id)}_{slugify(session_id)}"
        )
        details = session_attributes(self.session_data)
        self._attr_name = (
            f"{details['viewer']} on {details['device_name']} Jellyfin session"
        )

    @property
    def session_data(self) -> dict[str, Any]:
        """Return current coordinator data for this session."""
        return self.coordinator.data.get(self.session_id, {})

    @property
    def available(self) -> bool:
        """Report whether Jellyfin still publishes the session."""
        return super().available and self.session_id in self.coordinator.data

    @property
    def native_value(self) -> str:
        """Return playing, paused, or idle for dashboard filtering."""
        return playback_state(self.session_data)

    def _source_entity_id(self) -> str | None:
        """Find the native Jellyfin media player for artwork and controls."""
        unique_id = f"{self.coordinator.server_id}-{self.session_id}"
        registry = er.async_get(self.hass)
        return next(
            (
                entry.entity_id
                for entry in registry.entities.values()
                if entry.platform == "jellyfin" and entry.unique_id == unique_id
            ),
            None,
        )

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Expose only the fields useful to the family dashboard."""
        attributes = session_attributes(self.session_data)
        attributes["media_player_entity_id"] = self._source_entity_id()
        return attributes

    @property
    def entity_picture(self) -> str | None:
        """Reuse Home Assistant's authenticated Jellyfin artwork proxy."""
        source_entity_id = self._source_entity_id()
        if source_entity_id is None:
            return None
        source = self.hass.states.get(source_entity_id)
        return source.attributes.get("entity_picture") if source else None
