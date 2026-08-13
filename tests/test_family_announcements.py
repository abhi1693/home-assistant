import importlib.util
import unittest
from datetime import UTC, datetime, timedelta
from pathlib import Path


MODULE_PATH = (
    Path(__file__).parents[1]
    / "custom_components/family_announcements/model.py"
)
SPEC = importlib.util.spec_from_file_location("family_announcement_model", MODULE_PATH)
MODEL = importlib.util.module_from_spec(SPEC)
assert SPEC.loader is not None
SPEC.loader.exec_module(MODEL)


class FamilyAnnouncementModelTests(unittest.TestCase):
    def test_normalize_message_compacts_whitespace_and_rejects_empty(self):
        self.assertEqual(
            MODEL.normalize_message("  Dinner is\n ready at 8.  "),
            "Dinner is ready at 8.",
        )
        with self.assertRaises(ValueError):
            MODEL.normalize_message("  \n ")

    def test_active_announcements_removes_expired_and_sorts_newest_first(self):
        now = datetime(2026, 8, 13, 15, 0, tzinfo=UTC)
        records = [
            {
                "id": "older",
                "message": "Older",
                "created_at": (now - timedelta(hours=2)).isoformat(),
                "expires_at": None,
            },
            {
                "id": "expired",
                "message": "Expired",
                "created_at": (now - timedelta(hours=1)).isoformat(),
                "expires_at": (now - timedelta(seconds=1)).isoformat(),
            },
            {
                "id": "newer",
                "message": "Newer",
                "created_at": (now - timedelta(minutes=1)).isoformat(),
                "expires_at": (now + timedelta(hours=1)).isoformat(),
            },
        ]

        self.assertEqual(
            [item["id"] for item in MODEL.active_announcements(records, now)],
            ["newer", "older"],
        )

    def test_expiry_boundary_removes_the_record_and_all_content(self):
        now = datetime(2026, 8, 13, 15, 0, tzinfo=UTC)
        record = {
            "id": "expires-now",
            "message": "This content must disappear",
            "created_at": (now - timedelta(minutes=2)).isoformat(),
            "expires_at": now.isoformat(),
        }

        self.assertEqual(MODEL.active_announcements([record], now), [])

    def test_only_sender_or_admin_can_dismiss(self):
        record = {"sender_user_id": "sender"}

        self.assertTrue(MODEL.can_dismiss(record, "sender", False))
        self.assertTrue(MODEL.can_dismiss(record, "admin", True))
        self.assertFalse(MODEL.can_dismiss(record, "family-member", False))
        self.assertFalse(MODEL.can_dismiss(record, None, True))


if __name__ == "__main__":
    unittest.main()
