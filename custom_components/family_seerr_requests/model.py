"""Pure request normalization helpers for Seerr dashboard data."""

from __future__ import annotations

from typing import Any


def request_summary(
    request: dict[str, Any], detail: dict[str, Any] | None = None
) -> dict[str, Any]:
    """Return the small, non-sensitive request shape exposed to Lovelace."""
    detail = detail or {}
    media = request.get("media") or {}
    requester = request.get("requestedBy") or {}
    media_type = request.get("type") or media.get("mediaType") or "movie"
    media_id = media.get("tmdbId")
    title = detail.get("title") or detail.get("name")
    if not title:
        noun = "Series" if media_type == "tv" else "Movie"
        title = f"{noun} #{media_id}" if media_id is not None else noun

    release_date = detail.get("releaseDate") or detail.get("firstAirDate") or ""
    year = str(release_date)[:4] if release_date else None
    seasons = sorted(
        {
            int(item["seasonNumber"])
            for item in request.get("seasons") or []
            if isinstance(item, dict)
            and isinstance(item.get("seasonNumber"), int)
            and item["seasonNumber"] > 0
        }
    )
    requested_by = next(
        (
            value.strip()
            for value in (
                requester.get("displayName"),
                requester.get("username"),
                requester.get("jellyfinUsername"),
                requester.get("plexUsername"),
            )
            if isinstance(value, str) and value.strip()
        ),
        "Unknown requester",
    )

    return {
        "id": request.get("id"),
        "title": title,
        "year": year,
        "media_type": media_type,
        "requested_by": requested_by,
        "created_at": request.get("createdAt"),
        "seasons": seasons,
        "is_4k": bool(request.get("is4k")),
        "poster_path": detail.get("posterPath"),
    }
