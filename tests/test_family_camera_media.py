import asyncio
import importlib.util
from datetime import UTC, datetime, timedelta
from pathlib import Path
import tempfile
from types import SimpleNamespace
import unittest

MODULE_PATH = (
    Path(__file__).parents[1]
    / "custom_components/family_camera_events/media.py"
)
SPEC = importlib.util.spec_from_file_location("family_camera_event_media", MODULE_PATH)
MEDIA = importlib.util.module_from_spec(SPEC)
assert SPEC.loader is not None
SPEC.loader.exec_module(MEDIA)


class FakeCamera:
    def __init__(self, payload: bytes) -> None:
        self.payload = payload
        self.calls = 0

    async def get_video(self, _start, _end, **kwargs) -> None:
        self.calls += 1
        await asyncio.sleep(0)
        kwargs["output_file"].write_bytes(self.payload)


class VideoClipCacheTests(unittest.IsolatedAsyncioTestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.directory = Path(self.temp.name) / "clips"
        now = datetime(2026, 8, 25, 12, 0, tzinfo=UTC)
        self.event = SimpleNamespace(start=now, end=now + timedelta(seconds=7))

    def tearDown(self):
        self.temp.cleanup()

    async def test_exports_once_and_bounds_the_private_cache(self):
        cache = MEDIA.VideoClipCache(
            self.directory, max_clips=2, max_bytes=1024
        )
        camera = FakeCamera(b"0123456789")

        first = await cache.async_get("outside", "event-1", self.event, camera, 0)
        repeated = await cache.async_get(
            "outside", "event-1", self.event, camera, 0
        )
        second = await cache.async_get("outside", "event-2", self.event, camera, 0)
        third = await cache.async_get("outside", "event-3", self.event, camera, 0)

        self.assertEqual(first, repeated)
        self.assertEqual(camera.calls, 3)
        self.assertFalse(first.exists())
        self.assertTrue(second.exists())
        self.assertTrue(third.exists())
        self.assertEqual(third.stat().st_mode & 0o777, 0o600)
        self.assertEqual(cache._locks, {})

        await cache.async_close()
        self.assertFalse(self.directory.exists())

    async def test_concurrent_requests_share_one_export(self):
        cache = MEDIA.VideoClipCache(self.directory)
        camera = FakeCamera(b"clip")

        first, second = await asyncio.gather(
            cache.async_get("outside", "event-1", self.event, camera, 0),
            cache.async_get("outside", "event-1", self.event, camera, 0),
        )

        self.assertEqual(first, second)
        self.assertEqual(camera.calls, 1)
        self.assertEqual(cache._locks, {})
        await cache.async_close()

    def test_video_headers_keep_private_range_delivery_explicit(self):
        self.assertEqual(MEDIA.VIDEO_RESPONSE_HEADERS["Accept-Ranges"], "bytes")
        self.assertEqual(
            MEDIA.VIDEO_RESPONSE_HEADERS["Cache-Control"], "private, no-store"
        )
        self.assertEqual(MEDIA.VIDEO_RESPONSE_HEADERS["Content-Type"], "video/mp4")


if __name__ == "__main__":
    unittest.main()
