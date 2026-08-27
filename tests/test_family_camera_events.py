import importlib.util
import unittest
from datetime import UTC, datetime, timedelta
from enum import Enum
from pathlib import Path
from types import SimpleNamespace


MODULE_PATH = (
    Path(__file__).parents[1]
    / "custom_components/family_camera_events/model.py"
)
SPEC = importlib.util.spec_from_file_location("family_camera_event_model", MODULE_PATH)
MODEL = importlib.util.module_from_spec(SPEC)
assert SPEC.loader is not None
SPEC.loader.exec_module(MODEL)


class EventType(Enum):
    SMART_DETECT = "smartDetectZone"
    CARBON_MONOXIDE = "cmonx"


class FamilyCameraEventModelTests(unittest.TestCase):
    def test_normalizes_protect_event_names(self):
        self.assertEqual(MODEL.normalize_event_type("babyCry"), "baby_cry")
        self.assertEqual(MODEL.normalize_event_type(EventType.CARBON_MONOXIDE), "co")
        self.assertEqual(MODEL.normalize_event_type("smartAudioDetect"), "sound_detection")
        self.assertEqual(MODEL.normalize_event_type("alrmSmoke"), "smoke")
        self.assertEqual(MODEL.normalize_event_type("alrmCmonx"), "co")
        self.assertEqual(MODEL.normalize_event_type("alrmBabyCry"), "baby_cry")
        self.assertEqual(MODEL.normalize_event_type("alrmSpeak"), "speaking")

    def test_smart_detection_uses_detected_objects(self):
        event = SimpleNamespace(
            type=EventType.SMART_DETECT,
            smart_detect_types=("person", "vehicle", "person"),
        )

        self.assertEqual(MODEL.event_types(event), ["person", "vehicle"])

    def test_lifecycle_merge_preserves_types_and_detects_only_new_types(self):
        now = datetime(2026, 8, 14, 12, 0, tzinfo=UTC)
        initial = {
            "id": "event-1",
            "start": now.isoformat(),
            "types": ["motion"],
            "active": True,
        }
        records, new_types = MODEL.merge_event([], initial, now)
        self.assertEqual(new_types, {"motion"})

        ended = {
            "id": "event-1",
            "start": now.isoformat(),
            "end": (now + timedelta(seconds=12)).isoformat(),
            "types": ["person"],
            "active": False,
        }
        records, new_types = MODEL.merge_event(records, ended, now)

        self.assertEqual(new_types, {"person"})
        self.assertEqual(records[0]["types"], ["motion", "person"])
        self.assertFalse(records[0]["active"])

    def test_feed_is_bounded_and_prunes_expired_records(self):
        now = datetime(2026, 8, 14, 12, 0, tzinfo=UTC)
        records = [
            {
                "id": f"recent-{index}",
                "start": (now - timedelta(minutes=index)).isoformat(),
                "types": ["motion"],
                "active": False,
            }
            for index in range(MODEL.MAX_EVENTS_PER_CAMERA + 5)
        ]
        records.append(
            {
                "id": "expired",
                "start": (now - MODEL.EVENT_RETENTION - timedelta(seconds=1)).isoformat(),
                "types": ["motion"],
                "active": False,
            }
        )

        merged, _ = MODEL.merge_event(
            records,
            {
                "id": "newest",
                "start": (now + timedelta(seconds=1)).isoformat(),
                "types": ["person"],
                "active": True,
            },
            now,
        )

        self.assertEqual(len(merged), MODEL.MAX_EVENTS_PER_CAMERA)
        self.assertEqual(merged[0]["id"], "newest")
        self.assertNotIn("expired", {item["id"] for item in merged})

    def test_notification_bookkeeping_is_deduplicated_and_private(self):
        records = [
            {
                "id": "event-1",
                "start": "2026-08-14T12:00:00+00:00",
                "types": ["person"],
                "notified_types": ["motion"],
            }
        ]

        marked = MODEL.mark_notified(records, "event-1", "person")
        marked = MODEL.mark_notified(marked, "event-1", "person")

        self.assertEqual(marked[0]["notified_types"], ["motion", "person"])
        self.assertNotIn("notified_types", MODEL.public_records(marked)[0])

    def test_history_range_is_timezone_aware_and_capped_at_one_month(self):
        start = datetime(2026, 7, 1, tzinfo=UTC)
        end = start + timedelta(days=31)

        self.assertEqual(MODEL.validate_history_range(start, end), (start, end))
        with self.assertRaisesRegex(ValueError, "cannot exceed 31 days"):
            MODEL.validate_history_range(start, end + timedelta(seconds=1))
        with self.assertRaisesRegex(ValueError, "must be after start"):
            MODEL.validate_history_range(end, start)
        with self.assertRaisesRegex(ValueError, "must include a timezone"):
            MODEL.validate_history_range(start.replace(tzinfo=None), end)

    def test_history_page_size_is_small_and_bounded(self):
        self.assertEqual(
            MODEL.validate_history_page_size(None),
            MODEL.HISTORY_DEFAULT_PAGE_SIZE,
        )
        self.assertEqual(MODEL.validate_history_page_size("6"), 6)
        for value in ("invalid", "0", str(MODEL.HISTORY_MAX_PAGE_SIZE + 1)):
            with self.assertRaisesRegex(ValueError, "History page size"):
                MODEL.validate_history_page_size(value)

    def test_history_cursor_is_range_bound_and_validates_offsets(self):
        start = datetime(2026, 8, 1, tzinfo=UTC)
        end = start + timedelta(days=2)
        cursor = MODEL.encode_history_cursor(start, end, {"0": 12, "1": 4})

        self.assertEqual(
            MODEL.decode_history_cursor(cursor, start, end, {"0", "1"}),
            {"0": 12, "1": 4},
        )
        with self.assertRaisesRegex(ValueError, "does not match"):
            MODEL.decode_history_cursor(
                cursor, start, end + timedelta(days=1), {"0", "1"}
            )
        with self.assertRaisesRegex(ValueError, "invalid"):
            MODEL.decode_history_cursor("not-a-cursor", start, end, {"0", "1"})


if __name__ == "__main__":
    unittest.main()
