"""Pure helpers for presenting Music Assistant player sessions."""

from __future__ import annotations

from typing import Any


def _value(value: Any) -> Any:
    """Return the serializable value of an enum-like object."""
    return getattr(value, "value", value)


def playback_state(player: Any) -> str:
    """Return the dashboard state for a Music Assistant player."""
    state = _value(getattr(player, "playback_state", None))
    return state if state in {"playing", "paused"} else "idle"


def session_attributes(player: Any) -> dict[str, Any]:
    """Extract player and media context without exposing raw server data."""
    media = getattr(player, "current_media", None)
    return {
        "player_id": player.player_id,
        "player_name": player.name,
        "provider": player.provider,
        "media_title": getattr(media, "title", None),
        "media_artist": getattr(media, "artist", None),
        "media_album_name": getattr(media, "album", None),
        "media_content_type": _value(getattr(media, "media_type", None)),
        "media_duration": getattr(media, "duration", None),
        "media_position": getattr(media, "elapsed_time", None),
        "entity_picture": getattr(media, "image_url", None),
    }
