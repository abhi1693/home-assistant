"""Reconcile Git-owned UniFi Protect stream qualities for family dashboards."""

from __future__ import annotations

import asyncio
from datetime import timedelta
import json
import logging
from pathlib import Path
from typing import Any

from homeassistant.const import EVENT_HOMEASSISTANT_STARTED
from homeassistant.core import Event, HomeAssistant
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.event import async_call_later, async_track_time_interval
from uiprotect.data import ChannelQuality, DeviceState

_LOGGER = logging.getLogger(__name__)
_RECONCILE_INTERVAL = timedelta(minutes=1)
_STARTUP_DELAY_SECONDS = 30


def _normal_mac(value: Any) -> str:
    """Return a separator-free uppercase MAC address."""
    return str(value).replace(":", "").replace("-", "").upper()


def _load_desired(hass: HomeAssistant) -> dict[str, dict[str, Any]]:
    path = Path(hass.config.config_dir) / "access/protect-streams.json"
    document = json.loads(path.read_text())
    return document["cameras"]


async def _async_reconcile(
    hass: HomeAssistant,
    lock: asyncio.Lock,
    desired: dict[str, dict[str, Any]],
) -> None:
    """Create medium streams, enable their entities, and reload as required."""
    if lock.locked():
        return

    async with lock:
        registry = er.async_get(hass)
        create_by_entry: dict[str, list[tuple[Any, str]]] = {}
        expected_medium: dict[str, tuple[str, str]] = {}
        discovery_reloads: set[str] = set()

        for camera_name, camera_config in desired.items():
            high_entity_id = camera_config["high_entity_id"]
            high_entry = registry.async_get(high_entity_id)
            if high_entry is None or high_entry.config_entry_id is None:
                _LOGGER.error("Desired high camera entity is missing: %s", high_entity_id)
                continue

            mac = high_entry.unique_id.removesuffix("_0")
            medium_entity_id = camera_config["medium_entity_id"]
            medium_unique_id = f"{mac}_1"
            expected_medium[medium_unique_id] = (
                high_entry.config_entry_id,
                medium_entity_id,
            )
            config_entry = hass.config_entries.async_get_entry(
                high_entry.config_entry_id
            )
            if config_entry is None or config_entry.domain != "unifiprotect":
                _LOGGER.error("Camera %s is not owned by UniFi Protect", camera_name)
                continue

            data = config_entry.runtime_data
            api = data.api
            if not api.has_public_bootstrap:
                continue
            public = next(
                (
                    camera
                    for camera in api.public_bootstrap.cameras.values()
                    if _normal_mac(camera.mac) == _normal_mac(mac)
                ),
                None,
            )
            if public is None or public.state is not DeviceState.CONNECTED:
                continue

            active = (
                set(public.rtsps_streams.get_active_stream_qualities())
                if public.rtsps_streams is not None
                else set()
            )
            wanted = {
                ChannelQuality(quality) for quality in camera_config["qualities"]
            }
            missing = sorted(wanted - active, key=str)
            for quality in missing:
                create_by_entry.setdefault(config_entry.entry_id, []).append(
                    (public, str(quality))
                )
            if (
                ChannelQuality.MEDIUM in active
                and not any(
                    entry.unique_id == medium_unique_id
                    for entry in registry.entities.values()
                )
            ):
                discovery_reloads.add(config_entry.entry_id)

        for entry_id, requests in create_by_entry.items():
            config_entry = hass.config_entries.async_get_entry(entry_id)
            if config_entry is None:
                continue
            for public, quality in requests:
                streams = await config_entry.runtime_data.api.create_camera_rtsps_streams(
                    public.id, quality
                )
                if streams is None:
                    _LOGGER.error(
                        "Unable to create %s stream for %s", quality, public.display_name
                    )
                else:
                    _LOGGER.info(
                        "Created Git-owned %s stream for %s",
                        quality,
                        public.display_name,
                    )
        for entry_id in set(create_by_entry) | discovery_reloads:
            if not await hass.config_entries.async_reload(entry_id):
                _LOGGER.error("Unable to reload UniFi Protect entry %s", entry_id)

        registry = er.async_get(hass)
        reload_entries: set[str] = set()
        entries_by_unique_id = {
            entry.unique_id: entry
            for entry in registry.entities.values()
            if entry.platform == "unifiprotect"
        }
        for unique_id, (entry_id, desired_entity_id) in expected_medium.items():
            medium_entry = entries_by_unique_id.get(unique_id)
            if medium_entry is None:
                continue
            if (
                medium_entry.disabled_by is None
                and medium_entry.entity_id == desired_entity_id
            ):
                continue
            registry.async_update_entity(
                medium_entry.entity_id,
                disabled_by=None,
                new_entity_id=desired_entity_id,
            )
            reload_entries.add(entry_id)
            _LOGGER.info("Enabled Git-owned medium camera entity %s", desired_entity_id)

        for entry_id in reload_entries:
            if not await hass.config_entries.async_reload(entry_id):
                _LOGGER.error("Unable to reload enabled medium cameras for %s", entry_id)


async def async_setup(hass: HomeAssistant, config: dict[str, Any]) -> bool:
    """Schedule stream reconciliation after Home Assistant starts."""
    lock = asyncio.Lock()
    desired = await hass.async_add_executor_job(_load_desired, hass)

    async def _reconcile(_: Any = None) -> None:
        await _async_reconcile(hass, lock, desired)

    async def _schedule_reconcile(_: Event) -> None:
        async_call_later(hass, _STARTUP_DELAY_SECONDS, _reconcile)

    hass.bus.async_listen_once(EVENT_HOMEASSISTANT_STARTED, _schedule_reconcile)
    async_track_time_interval(hass, _reconcile, _RECONCILE_INTERVAL)
    return True
