"""Guard Git-owned dashboard and family identity state."""

from __future__ import annotations

import json
import logging
from pathlib import Path
import shutil

from homeassistant.components import frontend
from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_registry as er

_LOGGER = logging.getLogger(__name__)
_MIGRATIONS = "access/entity-migrations.json"
_REGISTRY_BACKUP = "backups/core.entity_registry.pre-entity-migration-v1"


def _load_migrations(config: Path) -> list[dict]:
    """Read the bootstrap-validated entity migration contract."""
    return json.loads((config / _MIGRATIONS).read_text())["entities"]


def _backup_registry(config: Path) -> None:
    """Retain the pre-migration entity registry exactly once."""
    source = config / ".storage/core.entity_registry"
    destination = config / _REGISTRY_BACKUP
    destination.parent.mkdir(parents=True, exist_ok=True)
    if not destination.exists():
        shutil.copy2(source, destination)


async def _async_migrate_entities(hass: HomeAssistant) -> None:
    """Rename entities through the registry so Recorder migrates their history."""
    config = Path(hass.config.config_dir)
    migrations = await hass.async_add_executor_job(_load_migrations, config)
    registry = er.async_get(hass)
    backed_up = False

    for migration in migrations:
        old_entity_id = migration["old_entity_id"]
        new_entity_id = migration["new_entity_id"]
        old_entity = registry.async_get(old_entity_id)
        new_entity = registry.async_get(new_entity_id)
        if old_entity is not None and new_entity is not None:
            raise RuntimeError(
                f"Both entity migration IDs exist: {old_entity_id}, {new_entity_id}"
            )
        entity = old_entity or new_entity
        if (
            entity is None
            or entity.platform != migration["platform"]
            or entity.unique_id != migration["unique_id"]
        ):
            raise RuntimeError(f"Entity migration identity changed: {old_entity_id}")
        if new_entity is not None:
            continue
        if not backed_up:
            await hass.async_add_executor_job(_backup_registry, config)
            backed_up = True
        registry.async_update_entity(old_entity_id, new_entity_id=new_entity_id)
        _LOGGER.info("Renamed family entity %s to %s", old_entity_id, new_entity_id)


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    """Apply family identity migrations and remove the superseded Home panel."""
    await _async_migrate_entities(hass)
    frontend.async_remove_panel(hass, "home", warn_if_unknown=False)
    return True
