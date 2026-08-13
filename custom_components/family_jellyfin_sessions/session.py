"""Pure helpers for presenting Jellyfin session data."""

from __future__ import annotations

from typing import Any


def playback_state(session: dict[str, Any]) -> str:
    """Return the dashboard state for a Jellyfin session."""
    if not session.get("NowPlayingItem"):
        return "idle"
    if session.get("PlayState", {}).get("IsPaused"):
        return "paused"
    return "playing"


def session_attributes(session: dict[str, Any]) -> dict[str, Any]:
    """Extract viewer and media context without exposing raw session data."""
    media = session.get("NowPlayingItem") or {}
    return {
        "viewer": session.get("UserName") or "Unknown viewer",
        "device_name": session.get("DeviceName") or "Unknown device",
        "client_name": session.get("Client") or "Jellyfin",
        "media_title": media.get("Name"),
        "media_series_title": media.get("SeriesName"),
        "media_season": media.get("ParentIndexNumber"),
        "media_episode": media.get("IndexNumber"),
        "media_content_type": media.get("Type"),
    }
