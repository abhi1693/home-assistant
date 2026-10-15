"""Exercise history with the deployed Protect SDK; never contact a recorder."""

import importlib.util
from datetime import UTC, datetime, timedelta
from types import SimpleNamespace
import unittest
from unittest.mock import AsyncMock, Mock, patch

HAS_HA = importlib.util.find_spec("homeassistant") is not None
if HAS_HA:
    from uiprotect import ProtectApiClient

    from custom_components.family_camera_events.sensor import (
        FamilyCameraEventManager,
        PROTECT_CLIP_EVENT_TYPES,
    )


@unittest.skipUnless(HAS_HA, "Requires the deployed Home Assistant and Protect SDK")
class CameraHistoryRuntimeTests(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self):
        self.now = datetime.now(UTC)
        self.api = ProtectApiClient(
            "protect.invalid", 443, username="test", password="test"
        )
        self.api.get_events_raw = AsyncMock(return_value=[])
        self.store = SimpleNamespace(async_save=AsyncMock())
        self.hass = SimpleNamespace(services=SimpleNamespace(async_call=AsyncMock()))
        with patch("custom_components.family_camera_events.sensor.Store", return_value=self.store):
            self.manager = FamilyCameraEventManager(
                self.hass,
                {"outside": {"name": "Outside"}, "private": {"name": "Private"}},
                {"family": {"user_id": "family", "cameras": ["outside"]}},
            )
        self.manager._camera_by_device_id = {"camera-1": "outside", "camera-2": "private"}
        self.manager._api_by_camera = {"outside": self.api, "private": self.api}

    def event(self, identifier, camera="camera-1", *, seconds=0, active=False, smart=False):
        start = self.now - timedelta(minutes=1, seconds=seconds)
        return {
            "id": identifier, "modelKey": "event", "camera": camera,
            "type": "smartDetectZone" if smart else "motion",
            "smartDetectTypes": ["person"] if smart else [],
            "start": int(start.timestamp() * 1000),
            "end": None if active else int((start + timedelta(seconds=5)).timestamp() * 1000),
        }

    async def history(self, page_size=12, cursor=None):
        return await self.manager.async_history(
            "family", self.now - timedelta(days=31), self.now, page_size, cursor
        )

    async def test_raw_history_decodes_dates_and_types_and_keeps_camera_grants(self):
        self.api.get_events_raw.return_value = [
            self.event("private", "camera-2"),
            self.event("active", active=True),
            self.event("unknown", "unknown"),
            self.event("person", smart=True),
            self.event("motion", seconds=10),
        ]
        records, cursor = await self.history()
        self.assertEqual([r["id"] for r in records], ["person", "motion"])
        self.assertEqual(records[0]["types"], ["person"])
        self.assertEqual(datetime.fromisoformat(records[0]["start"]).tzinfo, UTC)
        self.assertIsNone(cursor)
        self.assertTrue(self.manager.known_event("outside", "person"))
        self.assertFalse(self.manager.known_event("private", "private"))
        self.assertEqual(self.api.get_events_raw.call_args.kwargs, {
            "start": self.now - timedelta(days=31), "end": self.now,
            "limit": 24, "offset": 0, "types": PROTECT_CLIP_EVENT_TYPES,
            "sorting": "desc", "descriptions": False,
        })

    async def test_cursor_counts_raw_rows_including_filtered_events(self):
        events = [self.event("private", "camera-2"), self.event("first", seconds=1),
                  self.event("second", seconds=2), self.event("third", seconds=3)]
        self.api.get_events_raw.side_effect = [events, events[3:]]
        records, cursor = await self.history(page_size=2)
        self.assertEqual([r["id"] for r in records], ["first", "second"])
        self.assertIsNotNone(cursor)
        records, cursor = await self.history(page_size=2, cursor=cursor)
        self.assertEqual(self.api.get_events_raw.call_args.kwargs["offset"], 3)
        self.assertEqual([r["id"] for r in records], ["third"])
        self.assertIsNone(cursor)

    async def test_unknown_account_does_not_query_recorders(self):
        records, cursor = await self.manager.async_history(
            "unknown", self.now - timedelta(days=1), self.now, 12, None
        )
        self.assertEqual(records, [])
        self.assertIsNone(cursor)
        self.api.get_events_raw.assert_not_awaited()

    async def test_backfill_decodes_raw_events_without_sending_alerts(self):
        self.api.get_events_raw.return_value = [self.event("person", smart=True)]
        self.manager._write_state = Mock()
        await self.manager._async_backfill(self.api)
        self.assertEqual(self.manager.records("outside")[0]["types"], ["person"])
        self.store.async_save.assert_awaited_once()
        self.manager._write_state.assert_called_once_with("outside")
        self.hass.services.async_call.assert_not_awaited()
        self.assertEqual(self.api.get_events_raw.call_args.kwargs["limit"], 200)
        self.assertEqual(self.api.get_events_raw.call_args.kwargs["types"], PROTECT_CLIP_EVENT_TYPES)


if __name__ == "__main__":
    unittest.main()
