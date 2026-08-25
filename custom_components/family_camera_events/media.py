"""Bounded private clip caching and seekable HTTP delivery."""

from __future__ import annotations

import asyncio
from collections import OrderedDict
import hashlib
from pathlib import Path
import shutil
import tempfile
from typing import Any

VIDEO_CACHE_MAX_BYTES = 256 * 1024 * 1024
VIDEO_CACHE_MAX_CLIPS = 12
VIDEO_RESPONSE_HEADERS = {
    "Accept-Ranges": "bytes",
    "Cache-Control": "private, no-store",
    "Content-Type": "video/mp4",
    "X-Content-Type-Options": "nosniff",
}


class VideoClipCache:
    """Keep a small process-local cache of exported Protect clips."""

    def __init__(
        self,
        directory: Path | None = None,
        *,
        max_clips: int = VIDEO_CACHE_MAX_CLIPS,
        max_bytes: int = VIDEO_CACHE_MAX_BYTES,
    ) -> None:
        self.directory = directory or Path(
            tempfile.mkdtemp(prefix="family-camera-events-")
        )
        self.directory.mkdir(mode=0o700, parents=True, exist_ok=True)
        self.directory.chmod(0o700)
        self.max_clips = max_clips
        self.max_bytes = max_bytes
        self._entries: OrderedDict[str, tuple[Path, int]] = OrderedDict()
        self._locks: dict[str, tuple[asyncio.Lock, int]] = {}
        self._locks_guard = asyncio.Lock()

    @staticmethod
    def _key(camera_key: str, event_id: str) -> str:
        return hashlib.sha256(f"{camera_key}:{event_id}".encode()).hexdigest()

    async def async_cached_path(
        self, camera_key: str, event_id: str
    ) -> Path | None:
        """Return and refresh a completed cache entry without network work."""
        key = self._key(camera_key, event_id)
        entry = self._entries.get(key)
        if entry is None:
            return None
        path, _size = entry
        if not await asyncio.to_thread(path.is_file):
            self._entries.pop(key, None)
            return None
        if self._entries.get(key) != entry:
            return None
        self._entries.move_to_end(key)
        return path

    async def async_get(
        self,
        camera_key: str,
        event_id: str,
        event: Any,
        camera: Any,
        channel_index: int,
    ) -> Path:
        """Export a clip once and return a private file suitable for Range reads."""
        if cached := await self.async_cached_path(camera_key, event_id):
            return cached

        key = self._key(camera_key, event_id)
        async with self._locks_guard:
            lock, users = self._locks.get(key, (asyncio.Lock(), 0))
            self._locks[key] = (lock, users + 1)
        try:
            async with lock:
                if cached := await self.async_cached_path(camera_key, event_id):
                    return cached

                path = self.directory / f"{key}.mp4"
                partial = self.directory / f"{key}.partial"
                try:
                    await camera.get_video(
                        event.start,
                        event.end,
                        channel_index=channel_index,
                        output_file=partial,
                    )
                    size = await asyncio.to_thread(lambda: partial.stat().st_size)
                    if size <= 0:
                        raise ValueError("Protect returned an empty clip")
                    await asyncio.to_thread(partial.chmod, 0o600)
                    await asyncio.to_thread(partial.replace, path)
                finally:
                    await asyncio.to_thread(partial.unlink, missing_ok=True)

                self._entries[key] = (path, size)
                self._entries.move_to_end(key)
                await self._async_prune(key)
                return path
        finally:
            async with self._locks_guard:
                _lock, users = self._locks[key]
                if users == 1:
                    self._locks.pop(key)
                else:
                    self._locks[key] = (lock, users - 1)

    async def _async_prune(self, current_key: str) -> None:
        """Bound private media while retaining the clip being returned."""
        while (
            len(self._entries) > self.max_clips
            or sum(size for _path, size in self._entries.values()) > self.max_bytes
        ):
            oldest_key = next(iter(self._entries))
            if oldest_key == current_key and len(self._entries) == 1:
                break
            path, _size = self._entries.pop(oldest_key)
            await asyncio.to_thread(path.unlink, missing_ok=True)

    async def async_close(self) -> None:
        """Remove cached private media when Home Assistant stops."""
        self._entries.clear()
        await asyncio.to_thread(shutil.rmtree, self.directory, True)
