"""Expose Music Assistant players intentionally hidden from native HA entities."""

from __future__ import annotations

from collections.abc import Callable
import logging
from typing import Any

from homeassistant.components.sensor import SensorEntity
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.util import slugify
from music_assistant_models.enums import EventType

from .session import playback_state, session_attributes

_LOGGER = logging.getLogger(__name__)
_DOMAIN = "family_music_assistant_sessions"
_PLAYER_EVENTS = (
    EventType.PLAYER_UPDATED,
    EventType.PLAYER_REMOVED,
    EventType.PLAYER_CONFIG_UPDATED,
    EventType.QUEUE_UPDATED,
    EventType.QUEUE_ITEMS_UPDATED,
    EventType.QUEUE_TIME_UPDATED,
)


async def async_setup_platform(
    hass: HomeAssistant,
    config: dict[str, Any],
    async_add_entities: AddEntitiesCallback,
    discovery_info: dict[str, Any] | None = None,
) -> None:
    """Discover session sensors for players not exposed by Music Assistant."""
    del config, discovery_info
    entries = [
        entry
        for entry in hass.config_entries.async_entries("music_assistant")
        if entry.runtime_data is not None
    ]
    if not entries:
        _LOGGER.warning("No loaded Music Assistant entries are available")
        return

    known: set[tuple[str, str]] = set()
    unsubscribers: list[Callable[[], None]] = []

    for entry in entries:
        mass = entry.runtime_data.mass

        @callback
        def discover_hidden_players(event: Any = None, entry: Any = entry) -> None:
            del event
            entities: list[FamilyMusicAssistantSessionSensor] = []
            for player in entry.runtime_data.mass.players:
                key = (entry.entry_id, player.player_id)
                if player.expose_to_ha or key in known:
                    continue
                known.add(key)
                entities.append(
                    FamilyMusicAssistantSessionSensor(
                        entry.runtime_data.mass, entry.entry_id, player.player_id
                    )
                )
            if entities:
                async_add_entities(entities)

        discover_hidden_players()
        unsubscribers.append(
            mass.subscribe(
                discover_hidden_players,
                (EventType.PLAYER_ADDED, EventType.PLAYER_CONFIG_UPDATED),
            )
        )

    hass.data.setdefault(_DOMAIN, []).extend(unsubscribers)


class FamilyMusicAssistantSessionSensor(SensorEntity):
    """A hidden Music Assistant player exposed as dashboard activity."""

    _attr_has_entity_name = False
    _attr_icon = "mdi:music-circle"
    _attr_should_poll = False

    def __init__(self, mass: Any, entry_id: str, player_id: str) -> None:
        """Initialize an event-driven player session sensor."""
        self.mass = mass
        self.player_id = player_id
        self._attr_unique_id = (
            f"family-music-assistant-session-{entry_id}-{player_id}"
        )
        self.entity_id = f"sensor.music_assistant_session_{slugify(player_id)}"
        player = self.player
        self._attr_name = (
            f"Music Assistant on {player.name}" if player else "Music Assistant"
        )

    @property
    def player(self) -> Any | None:
        """Return the current client-side player model."""
        return self.mass.players.get(self.player_id)

    async def async_added_to_hass(self) -> None:
        """Update immediately from the shared Music Assistant event stream."""
        await super().async_added_to_hass()
        self.async_on_remove(
            self.mass.subscribe(
                self._handle_event,
                _PLAYER_EVENTS,
                id_filter=self.player_id,
            )
        )

    @callback
    def _handle_event(self, event: Any) -> None:
        """Publish the already-updated Music Assistant client state."""
        del event
        self.async_write_ha_state()

    @property
    def available(self) -> bool:
        """Hide disconnected or newly native-exposed players."""
        player = self.player
        return bool(player and player.available and not player.expose_to_ha)

    @property
    def native_value(self) -> str:
        """Return playing, paused, or idle for dashboard filtering."""
        player = self.player
        return playback_state(player) if player else "idle"

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Expose only fields needed by the family dashboard."""
        player = self.player
        return session_attributes(player) if player else {}

    @property
    def entity_picture(self) -> str | None:
        """Use Music Assistant's artwork proxy for the active item."""
        player = self.player
        if player is None:
            return None
        return session_attributes(player)["entity_picture"]
