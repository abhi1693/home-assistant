#!/usr/bin/env python3
"""Install the Git-owned Home Assistant configuration onto a config volume."""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import shutil
import stat
import tempfile
import urllib.request
import zipfile
from pathlib import Path


MANAGED_STATE = ".home-assistant-source-files.json"


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def destination_identity(destination: Path) -> tuple[int, int]:
    reference = destination if destination.exists() else destination.parent
    info = reference.stat()
    return info.st_uid, info.st_gid


def atomic_copy(source: Path, destination: Path, mode: int = 0o664) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    uid, gid = destination_identity(destination)
    with tempfile.NamedTemporaryFile(dir=destination.parent, delete=False) as stream:
        temporary = Path(stream.name)
        with source.open("rb") as source_stream:
            shutil.copyfileobj(source_stream, stream)
    os.chmod(temporary, mode)
    os.chown(temporary, uid, gid)
    os.replace(temporary, destination)


def atomic_json(destination: Path, document: dict, mode: int | None = None) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    uid, gid = destination_identity(destination)
    if mode is None:
        mode = stat.S_IMODE(destination.stat().st_mode) if destination.exists() else 0o600
    with tempfile.NamedTemporaryFile(
        mode="w", encoding="utf-8", dir=destination.parent, delete=False
    ) as stream:
        temporary = Path(stream.name)
        json.dump(document, stream, indent=2)
        stream.write("\n")
    os.chmod(temporary, mode)
    os.chown(temporary, uid, gid)
    os.replace(temporary, destination)


def sync_source_files(source: Path, config: Path) -> None:
    managed: dict[str, str] = {"configuration.yaml": sha256(source / "configuration.yaml")}
    for directory in ("dashboards", "packages", "themes"):
        source_directory = source / directory
        if not source_directory.exists():
            continue
        for path in sorted(source_directory.glob("*.yaml")):
            managed[str(path.relative_to(source))] = sha256(path)

    state_path = config / MANAGED_STATE
    previous = json.loads(state_path.read_text()) if state_path.exists() else {"files": {}}
    for relative_path in set(previous.get("files", {})) - set(managed):
        stale = config / relative_path
        if stale.is_file():
            stale.unlink()
            print(f"Removed stale source-managed file {relative_path}")

    for relative_path, expected_hash in managed.items():
        source_path = source / relative_path
        destination = config / relative_path
        if destination.exists() and sha256(destination) == expected_hash:
            continue
        atomic_copy(source_path, destination)
        print(f"Installed {relative_path}")

    atomic_json(state_path, {"version": 1, "files": managed}, mode=0o644)


def initialize_mutable_yaml(source: Path, config: Path) -> None:
    reset_marker = config / ".automation-reset-2026-08-13"
    automation_path = config / "automations.yaml"
    if not reset_marker.exists():
        backup = config / "backups/automations.pre-2026-08-13-reset.yaml"
        backup.parent.mkdir(parents=True, exist_ok=True)
        if automation_path.exists() and not backup.exists():
            shutil.copy2(automation_path, backup)
        atomic_copy(source / "automations.yaml", automation_path)
        reset_marker.touch()
        print("Removed all existing automations and retained a backup")

    for filename in ("scripts.yaml", "scenes.yaml"):
        destination = config / filename
        if not destination.exists():
            atomic_copy(source / filename, destination)
            print(f"Initialized {filename}")


def download_verified(url: str, expected_hash: str, destination: Path) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    uid, gid = destination_identity(destination)
    with tempfile.NamedTemporaryFile(dir=destination.parent, delete=False) as stream:
        temporary = Path(stream.name)
        with urllib.request.urlopen(url, timeout=90) as response:
            shutil.copyfileobj(response, stream)
    actual_hash = sha256(temporary)
    if actual_hash != expected_hash:
        temporary.unlink(missing_ok=True)
        raise RuntimeError(
            f"Checksum mismatch for {url}: expected {expected_hash}, found {actual_hash}"
        )
    os.chmod(temporary, 0o644)
    os.chown(temporary, uid, gid)
    os.replace(temporary, destination)


def install_hacs(manifest: dict, config: Path) -> None:
    hacs = manifest["hacs"]
    destination = config / "custom_components/hacs"
    if (destination / "manifest.json").exists():
        print("HACS is already installed")
        return

    with tempfile.TemporaryDirectory() as temporary_directory:
        archive = Path(temporary_directory) / "hacs.zip"
        download_verified(hacs["url"], hacs["sha256"], archive)
        destination.mkdir(parents=True, exist_ok=True)
        with zipfile.ZipFile(archive) as bundle:
            bundle.extractall(destination)
    print(f"Installed HACS {hacs['version']}")


def install_assets(manifest: dict, config: Path) -> None:
    for asset in manifest.get("assets", []):
        destination = config / asset["destination"]
        if destination.exists() and sha256(destination) == asset["sha256"]:
            print(f"{asset['name']} is already current")
            continue
        download_verified(asset["url"], asset["sha256"], destination)
        print(f"Installed {asset['name']}")


def migrate_areas(source: Path, config: Path) -> None:
    migration = json.loads((source / "migrations/2026-08-13-areas.json").read_text())
    marker = config / migration["marker"]
    if marker.exists():
        print("Area and Atomberg assignment migration is already complete")
        return

    area_registry = config / ".storage/core.area_registry"
    device_registry = config / ".storage/core.device_registry"
    if not area_registry.exists() or not device_registry.exists():
        raise RuntimeError("Home Assistant area or device registry is missing")

    area_document = json.loads(area_registry.read_text())
    device_document = json.loads(device_registry.read_text())
    areas = area_document["data"]["areas"]
    devices = device_document["data"]["devices"]
    expected_areas = migration["areas"]
    actual_ids = {area["id"] for area in areas}
    if actual_ids != set(expected_areas):
        raise RuntimeError(
            "Area registry changed since migration preparation: "
            f"expected {sorted(expected_areas)}, found {sorted(actual_ids)}"
        )

    devices_by_id = {device["id"]: device for device in devices}
    missing = set(migration["devices"]) - set(devices_by_id)
    if missing:
        raise RuntimeError(f"Expected Atomberg devices are missing: {sorted(missing)}")

    for device_id, expected in migration["devices"].items():
        device = devices_by_id[device_id]
        actual_name = device.get("name_by_user") or device.get("name")
        if any(
            (
                actual_name != expected["name"],
                device.get("manufacturer") != expected["manufacturer"],
                device.get("model") != expected["model"],
            )
        ):
            raise RuntimeError(f"Atomberg device {device_id} no longer matches migration data")
        device["area_id"] = expected["area_id"]

    for registry, backup_name in (
        (area_registry, migration["area_backup"]),
        (device_registry, migration["device_backup"]),
    ):
        backup = config / backup_name
        backup.parent.mkdir(parents=True, exist_ok=True)
        if not backup.exists():
            shutil.copy2(registry, backup)

    for area in areas:
        area["name"] = expected_areas[area["id"]]
    atomic_json(area_registry, area_document)
    atomic_json(device_registry, device_document)
    marker.touch()
    print("Renamed areas and assigned all Atomberg fans")


def remove_storage_dashboards(config: Path) -> None:
    marker = config / ".dashboard-cleanup-2026-08-13"
    if marker.exists():
        print("Storage dashboard cleanup is already complete")
        return

    storage = config / ".storage"
    registry = storage / "lovelace_dashboards"
    if registry.exists():
        document = json.loads(registry.read_text())
        items = document.get("data", {}).get("items", [])
        backup = config / "backups/lovelace_dashboards.pre-2026-08-13-cleanup"
        backup.parent.mkdir(parents=True, exist_ok=True)
        if not backup.exists():
            shutil.copy2(registry, backup)
        document["data"]["items"] = []
        atomic_json(registry, document)
        for item in items:
            dashboard = storage / f"lovelace.{item['id']}"
            if dashboard.exists():
                dashboard_backup = config / f"backups/{dashboard.name}.pre-2026-08-13-cleanup"
                if not dashboard_backup.exists():
                    shutil.copy2(dashboard, dashboard_backup)
                dashboard.unlink()
        print(f"Removed {len(items)} storage dashboard registration(s)")
    marker.touch()


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", type=Path, required=True)
    parser.add_argument("--config", type=Path, required=True)
    arguments = parser.parse_args()
    source = arguments.source.resolve()
    config = arguments.config.resolve()

    manifest = json.loads((source / "bootstrap/manifest.json").read_text())
    sync_source_files(source, config)
    initialize_mutable_yaml(source, config)
    install_hacs(manifest, config)
    install_assets(manifest, config)
    migrate_areas(source, config)
    remove_storage_dashboards(config)


if __name__ == "__main__":
    main()
