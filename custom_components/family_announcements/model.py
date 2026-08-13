"""Pure announcement record helpers."""

from __future__ import annotations

from datetime import UTC, datetime
from typing import Any

MAX_MESSAGE_LENGTH = 180
MAX_ANNOUNCEMENTS = 20


def normalize_message(message: str) -> str:
    """Return a compact dashboard-safe message."""
    normalized = " ".join(message.split())
    if not normalized:
        raise ValueError("Announcement message cannot be empty")
    if len(normalized) > MAX_MESSAGE_LENGTH:
        raise ValueError(
            f"Announcement message cannot exceed {MAX_MESSAGE_LENGTH} characters"
        )
    return normalized


def parse_timestamp(value: str | None) -> datetime | None:
    """Parse one stored ISO timestamp as an aware UTC datetime."""
    if not value:
        return None
    parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=UTC)
    return parsed.astimezone(UTC)


def active_announcements(
    records: list[dict[str, Any]], now: datetime
) -> list[dict[str, Any]]:
    """Discard malformed and expired records, newest first."""
    now = now.astimezone(UTC)
    active: list[dict[str, Any]] = []
    for record in records:
        if not isinstance(record, dict) or not record.get("id") or not record.get(
            "message"
        ):
            continue
        try:
            expires_at = parse_timestamp(record.get("expires_at"))
            parse_timestamp(record.get("created_at"))
        except (TypeError, ValueError):
            continue
        if expires_at is not None and expires_at <= now:
            continue
        active.append(dict(record))
    active.sort(key=lambda item: item.get("created_at", ""), reverse=True)
    return active[:MAX_ANNOUNCEMENTS]


def can_dismiss(
    record: dict[str, Any], actor_user_id: str | None, actor_is_admin: bool
) -> bool:
    """Return whether one authenticated user may remove a household message."""
    return bool(
        actor_user_id
        and (actor_is_admin or record.get("sender_user_id") == actor_user_id)
    )
