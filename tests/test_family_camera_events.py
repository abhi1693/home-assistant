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


if __name__ == "__main__":
    unittest.main()
