"""Pure record helpers for private Protect event timelines."""

from __future__ import annotations

from datetime import UTC, datetime, timedelta
import re
from typing import Any, Iterable

MAX_EVENTS_PER_CAMERA = 20
EVENT_RETENTION = timedelta(days=7)

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


def _timestamp(value: Any) -> datetime:
    """Parse an ISO timestamp, treating invalid values as expired."""
    try:
        parsed = datetime.fromisoformat(str(value).replace("Z", "+00:00"))
    except (TypeError, ValueError):
        return datetime.min.replace(tzinfo=UTC)
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=UTC)
    return parsed.astimezone(UTC)
