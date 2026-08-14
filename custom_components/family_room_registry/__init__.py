"""Reconcile Git-owned family room metadata with Home Assistant registries."""

from __future__ import annotations

import json
import logging
from pathlib import Path
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers import area_registry as ar
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers import label_registry as lr

DOMAIN = "family_room_registry"
ROOMS_FILE = Path("access/rooms.json")
_LOGGER = logging.getLogger(__name__)


def _entity_ids(module: dict[str, Any]) -> set[str]:
    entity_ids: set[str] = set()
    for fan in module.get("fans", []):
        entity_ids.update(
            value
            for key, value in fan.items()
            if key != "name" and isinstance(value, str) and "." in value
        )
    entity_ids.update(
        value
        for value in module.get("players", [])
        if isinstance(value, str) and "." in value
    )
    entity_ids.update(
        value
        for value in module.get("entities", {}).values()
        if isinstance(value, str) and "." in value
    )
    if isinstance(module.get("entity"), str):
        entity_ids.add(module["entity"])
    return entity_ids


async def async_setup(hass: HomeAssistant, config: dict[str, Any]) -> bool:
    """Apply room areas and labels once registries are available."""
    source = Path(hass.config.path(ROOMS_FILE))
    try:
        room_config = await hass.async_add_executor_job(
            lambda: json.loads(source.read_text(encoding="utf-8"))
        )
    except (OSError, ValueError) as error:
        _LOGGER.error("Unable to read family room registry from %s: %s", source, error)
        return False

    area_registry = ar.async_get(hass)
    device_registry = dr.async_get(hass)
    entity_registry = er.async_get(hass)
    label_registry = lr.async_get(hass)

    labels_by_key: dict[str, str] = {}
    managed_label_ids: set[str] = set()
    for key, desired in room_config.get("labels", {}).items():
        existing = label_registry.async_get_label(key) or next(
            (
                item
                for item in label_registry.async_list_labels()
                if item.name.casefold() == desired["name"].casefold()
            ),
            None,
        )
        if existing is None:
            existing = label_registry.async_create(
                name=desired["name"],
                icon=desired.get("icon"),
                color=desired.get("color"),
            )
        else:
            existing = label_registry.async_update(
                existing.label_id,
                name=desired["name"],
                icon=desired.get("icon"),
                color=desired.get("color"),
            )
        labels_by_key[key] = existing.label_id
        managed_label_ids.add(existing.label_id)

    desired_devices: dict[str, dict[str, Any]] = {}
    for room in room_config.get("rooms", []):
        area_id = room["area_id"]
        area = area_registry.async_get_area(area_id)
        if area is None:
            area = area_registry.async_create(name=room["name"])
            if area.id != area_id:
                _LOGGER.warning(
                    "Created area %s as %s; update access/rooms.json to the generated ID",
                    room["name"],
                    area.id,
                )
                area_id = area.id
        elif area.name != room["name"]:
            area_registry.async_update(area_id, name=room["name"])

        for module in room.get("modules", []):
            desired_labels = {
                labels_by_key[key]
                for key in module.get("labels", [])
                if key in labels_by_key
            }
            for entity_id in _entity_ids(module):
                entry = entity_registry.async_get(entity_id)
                if entry is None:
                    if not module.get("optional"):
                        _LOGGER.warning("Room entity %s is not registered", entity_id)
                    continue
                if entry.device_id:
                    device = desired_devices.setdefault(
                        entry.device_id, {"area_id": area_id, "labels": set()}
                    )
                    if device["area_id"] != area_id:
                        _LOGGER.error(
                            "Device %s is declared in both %s and %s",
                            entry.device_id,
                            device["area_id"],
                            area_id,
                        )
                        continue
                    device["labels"].update(desired_labels)
                else:
                    retained = set(entry.labels) - managed_label_ids
                    entity_registry.async_update_entity(
                        entity_id,
                        area_id=area_id,
                        labels=retained | desired_labels,
                    )

    for binding in room_config.get("device_bindings", []):
        entry = entity_registry.async_get(binding["entity"])
        if entry is None or not entry.device_id:
            _LOGGER.warning("Room device binding %s is not registered", binding["entity"])
            continue
        desired_devices[entry.device_id] = {
            "area_id": binding["area_id"],
            "labels": {
                labels_by_key[key]
                for key in binding.get("labels", [])
                if key in labels_by_key
            },
        }

    for device_id, desired in desired_devices.items():
        device = device_registry.async_get(device_id)
        if device is None:
            continue
        retained = set(device.labels) - managed_label_ids
        device_registry.async_update_device(
            device_id,
            area_id=desired["area_id"],
            labels=retained | desired["labels"],
        )

    _LOGGER.info(
        "Reconciled %s family rooms across %s devices",
        len(room_config.get("rooms", [])),
        len(desired_devices),
    )
    return True
