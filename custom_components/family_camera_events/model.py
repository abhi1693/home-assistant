"""Pure record helpers for private Protect event timelines."""

from __future__ import annotations

import base64
import binascii
from datetime import UTC, datetime, timedelta
import json
import re
from typing import Any, Iterable

MAX_EVENTS_PER_CAMERA = 20
EVENT_RETENTION = timedelta(days=7)
HISTORY_MAX_RANGE = timedelta(days=31)
HISTORY_DEFAULT_PAGE_SIZE = 12
HISTORY_MAX_PAGE_SIZE = 24
HISTORY_MAX_CURSOR_OFFSET = 1_000_000
HISTORY_CURSOR_VERSION = 1

_TYPE_OVERRIDES = {
    "alrm_baby_cry": "baby_cry",
    "alrm_bark": "barking",
    "alrm_burglar": "security_alarm",
    "alrm_car_horn": "car_horn",
    "alrm_cmonx": "co",
    "alrm_glass_break": "glass_break",
    "alrm_smoke": "smoke",
    "alrm_siren": "siren",
    "alrm_speak": "speaking",
    "babycry": "baby_cry",
    "baby_cry": "baby_cry",
    "car": "vehicle",
    "cmonx": "co",
    "face": "person",
    "pet": "animal",
    "smartdetectzone": "smart_detection",
    "smartaudiodetect": "sound_detection",
    "smart_audio_detect": "sound_detection",
    "smart_detect": "smart_detection",
}


def normalize_event_type(value: Any) -> str:
    """Return one stable snake-case event type."""
    raw = getattr(value, "value", value)
    text = str(raw or "").strip()
    text = re.sub(r"(?<!^)(?=[A-Z])", "_", text).replace("-", "_").lower()
    return _TYPE_OVERRIDES.get(text, text)


def event_types(event: Any) -> list[str]:
    """Flatten Protect's lifecycle event into useful household categories."""
    detected = {
        normalize_event_type(item)
        for item in getattr(event, "smart_detect_types", ())
        if normalize_event_type(item)
    }
    base = normalize_event_type(getattr(event, "type", ""))
    if detected:
        return sorted(detected)
    if base in {"smart_detection", "sound_detection"}:
        return []
    return [base] if base else []


def merge_event(
    records: Iterable[dict[str, Any]],
    incoming: dict[str, Any],
    now: datetime,
) -> tuple[list[dict[str, Any]], set[str]]:
    """Merge one lifecycle update and return newly observed event types."""
    existing = next(
        (dict(item) for item in records if item.get("id") == incoming.get("id")),
        None,
    )
    previous_types = set(existing.get("types", [])) if existing else set()
    merged = existing or {}
    merged.update(incoming)
    merged["types"] = sorted(previous_types | set(incoming.get("types", [])))
    merged.setdefault("notified_types", [])

    cutoff = now.astimezone(UTC) - EVENT_RETENTION
    retained = [
        dict(item)
        for item in records
        if item.get("id") != merged.get("id")
        and _timestamp(item.get("start")) >= cutoff
    ]
    retained.append(merged)
    retained.sort(key=lambda item: item.get("start", ""), reverse=True)
    return retained[:MAX_EVENTS_PER_CAMERA], set(merged["types"]) - previous_types


def mark_notified(
    records: Iterable[dict[str, Any]], event_id: str, event_type: str
) -> list[dict[str, Any]]:
    """Persist notification deduplication per event and detected type."""
    result = []
    for record in records:
        item = dict(record)
        if item.get("id") == event_id:
            notified = set(item.get("notified_types", []))
            notified.add(event_type)
            item["notified_types"] = sorted(notified)
        result.append(item)
    return result


def public_records(records: Iterable[dict[str, Any]]) -> list[dict[str, Any]]:
    """Remove internal notification bookkeeping from entity attributes."""
    return [
        {key: value for key, value in item.items() if key != "notified_types"}
        for item in records
    ]


def validate_history_range(
    start: datetime, end: datetime
) -> tuple[datetime, datetime]:
    """Return one timezone-aware UTC history range capped at one month."""
    if start.tzinfo is None or end.tzinfo is None:
        raise ValueError("History dates must include a timezone")
    start_utc = start.astimezone(UTC)
    end_utc = end.astimezone(UTC)
    if end_utc <= start_utc:
        raise ValueError("History end must be after start")
    if end_utc - start_utc > HISTORY_MAX_RANGE:
        raise ValueError("History range cannot exceed 31 days")
    return start_utc, end_utc


def validate_history_page_size(value: Any) -> int:
    """Return a bounded server-side clip page size."""
    if value in (None, ""):
        return HISTORY_DEFAULT_PAGE_SIZE
    try:
        page_size = int(value)
    except (TypeError, ValueError) as err:
        raise ValueError("History page size must be an integer") from err
    if not 1 <= page_size <= HISTORY_MAX_PAGE_SIZE:
        raise ValueError(
            f"History page size must be between 1 and {HISTORY_MAX_PAGE_SIZE}"
        )
    return page_size


def encode_history_cursor(
    start: datetime, end: datetime, offsets: dict[str, int]
) -> str:
    """Encode recorder offsets into an opaque range-bound cursor."""
    payload = {
        "v": HISTORY_CURSOR_VERSION,
        "start": start.astimezone(UTC).isoformat(),
        "end": end.astimezone(UTC).isoformat(),
        "offsets": offsets,
    }
    encoded = base64.urlsafe_b64encode(
        json.dumps(payload, separators=(",", ":"), sort_keys=True).encode()
    )
    return encoded.decode().rstrip("=")


def decode_history_cursor(
    value: str | None,
    start: datetime,
    end: datetime,
    group_keys: set[str],
) -> dict[str, int]:
    """Decode and validate a cursor for the requested range and recorders."""
    if not value:
        return {key: 0 for key in group_keys}
    if len(value) > 2048:
        raise ValueError("History cursor is invalid")
    try:
        padding = "=" * (-len(value) % 4)
        payload = json.loads(base64.urlsafe_b64decode(value + padding))
    except (binascii.Error, TypeError, ValueError, UnicodeDecodeError) as err:
        raise ValueError("History cursor is invalid") from err
    if (
        not isinstance(payload, dict)
        or payload.get("v") != HISTORY_CURSOR_VERSION
        or payload.get("start") != start.astimezone(UTC).isoformat()
        or payload.get("end") != end.astimezone(UTC).isoformat()
        or not isinstance(payload.get("offsets"), dict)
        or set(payload["offsets"]) != group_keys
    ):
        raise ValueError("History cursor does not match this request")
    offsets: dict[str, int] = {}
    for key, offset in payload["offsets"].items():
        if (
            isinstance(offset, bool)
            or not isinstance(offset, int)
            or not 0 <= offset <= HISTORY_MAX_CURSOR_OFFSET
        ):
            raise ValueError("History cursor is invalid")
        offsets[key] = offset
    return offsets


def _timestamp(value: Any) -> datetime:
    """Parse an ISO timestamp, treating invalid values as expired."""
    try:
        parsed = datetime.fromisoformat(str(value).replace("Z", "+00:00"))
    except (TypeError, ValueError):
        return datetime.min.replace(tzinfo=UTC)
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=UTC)
    return parsed.astimezone(UTC)
