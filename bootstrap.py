#!/usr/bin/env python3
"""Install the Git-owned Home Assistant configuration onto a config volume."""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import shutil
import stat
import tarfile
import tempfile
import urllib.request
import zipfile
from pathlib import Path, PurePosixPath

MANAGED_STATE = ".home-assistant-source-files.json"
CUSTOM_INTEGRATION_STATE = ".home-assistant-custom-integrations.json"
FAMILY_ACCESS_STATE = ".home-assistant-family-access.json"


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
        mode = (
            stat.S_IMODE(destination.stat().st_mode) if destination.exists() else 0o600
        )
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
    managed: dict[str, str] = {
        "configuration.yaml": sha256(source / "configuration.yaml")
    }
    for directory in ("access", "dashboards", "packages", "themes", "www"):
        source_directory = source / directory
        if not source_directory.exists():
            continue
        for path in sorted(source_directory.rglob("*")):
            if path.is_file() and path.suffix in {".json", ".yaml"}:
                managed[str(path.relative_to(source))] = sha256(path)

    source_components = source / "custom_components"
    if source_components.exists():
        for path in sorted(source_components.rglob("*")):
            if (
                path.is_file()
                and "__pycache__" not in path.parts
                and path.suffix != ".pyc"
            ):
                managed[str(path.relative_to(source))] = sha256(path)

    state_path = config / MANAGED_STATE
    previous = (
        json.loads(state_path.read_text()) if state_path.exists() else {"files": {}}
    )
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


def extract_archive_subdirectory(
    archive: Path, source_subdirectory: str, destination: Path
) -> None:
    """Extract one regular-file subtree from a GitHub source archive."""
    source_parts = PurePosixPath(source_subdirectory).parts
    matched = 0
    with tarfile.open(archive, mode="r:gz") as bundle:
        for member in bundle.getmembers():
            member_path = PurePosixPath(member.name)
            if member_path.is_absolute() or ".." in member_path.parts:
                raise RuntimeError(f"Unsafe archive member: {member.name}")
            parts = member_path.parts
            if len(parts) <= len(source_parts) + 1:
                continue
            if tuple(parts[1 : len(source_parts) + 1]) != source_parts:
                continue
            relative = Path(*parts[len(source_parts) + 1 :])
            if member.issym() or member.islnk():
                raise RuntimeError(f"Archive subtree contains a link: {member.name}")
            if not member.isfile():
                continue
            source_stream = bundle.extractfile(member)
            if source_stream is None:
                raise RuntimeError(f"Unable to read archive member: {member.name}")
            target = destination / relative
            target.parent.mkdir(parents=True, exist_ok=True)
            with target.open("wb") as target_stream:
                shutil.copyfileobj(source_stream, target_stream)
            matched += 1
    if matched == 0:
        raise RuntimeError(
            f"Archive does not contain source directory {source_subdirectory}"
        )


def install_custom_integrations(manifest: dict, config: Path) -> None:
    """Install commit-pinned custom integrations from verified archives."""
    state_path = config / CUSTOM_INTEGRATION_STATE
    previous = json.loads(state_path.read_text()) if state_path.exists() else {}
    current = {}
    config_root = config.resolve()

    for integration in manifest.get("custom_integrations", []):
        name = integration["name"]
        destination = (config / integration["destination"]).resolve()
        if config_root not in destination.parents:
            raise RuntimeError(
                f"Custom integration destination escapes config: {destination}"
            )

        previous_entry = previous.get(name, {})
        previous_files = previous_entry.get("files", {})
        if (
            previous_entry.get("sha256") == integration["sha256"]
            and previous_files
            and all(
                (destination / relative).is_file()
                and sha256(destination / relative) == expected_hash
                for relative, expected_hash in previous_files.items()
            )
        ):
            current[name] = previous_entry
            print(f"{name} {integration['version']} is already current")
            continue

        with tempfile.TemporaryDirectory() as temporary_directory:
            temporary_root = Path(temporary_directory)
            archive = temporary_root / "source.tar.gz"
            extracted = temporary_root / "source"
            download_verified(integration["url"], integration["sha256"], archive)
            extract_archive_subdirectory(
                archive, integration["source_subdirectory"], extracted
            )

            files = {
                str(path.relative_to(extracted)): sha256(path)
                for path in sorted(extracted.rglob("*"))
                if path.is_file()
            }
            if destination.exists():
                for stale in destination.rglob("*"):
                    relative = stale.relative_to(destination)
                    if "__pycache__" in relative.parts:
                        continue
                    if (stale.is_file() or stale.is_symlink()) and str(
                        relative
                    ) not in files:
                        stale.unlink()
            for relative, expected_hash in files.items():
                source_file = extracted / relative
                target = destination / relative
                if target.is_file() and sha256(target) == expected_hash:
                    continue
                atomic_copy(source_file, target)

        current[name] = {
            "version": integration["version"],
            "sha256": integration["sha256"],
            "files": files,
        }
        print(f"Installed {name} {integration['version']}")

    atomic_json(state_path, current, mode=0o644)


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
            raise RuntimeError(
                f"Atomberg device {device_id} no longer matches migration data"
            )
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


def _family_camera_policy(
    allowed_cameras: list[str], non_camera_domains: set[str]
) -> dict:
    """Allow registered non-camera domains and explicitly granted cameras."""
    return {
        "entities": {
            "entity_ids": {entity_id: True for entity_id in allowed_cameras},
            "domains": {domain: True for domain in sorted(non_camera_domains)},
        }
    }


def reconcile_family_access(source: Path, config: Path) -> None:
    """Validate and reconcile Git-owned dashboard users and camera access."""
    access_path = source / "access/family-dashboard.json"
    access = json.loads(access_path.read_text())
    if access.get("version") != 1:
        raise RuntimeError("Unsupported family dashboard access schema")

    auth_path = config / ".storage/auth"
    person_path = config / ".storage/person"
    entity_path = config / ".storage/core.entity_registry"
    if not all(path.exists() for path in (auth_path, person_path, entity_path)):
        raise RuntimeError("Home Assistant auth, person, or entity registry is missing")

    auth = json.loads(auth_path.read_text())
    person = json.loads(person_path.read_text())
    entity_registry = json.loads(entity_path.read_text())
    users = {item["id"]: item for item in auth["data"]["users"]}
    people = {item["id"]: item for item in person["data"]["items"]}
    entities = {
        item["entity_id"]: item for item in entity_registry["data"]["entities"]
    }
    non_camera_domains = {
        entity_id.partition(".")[0]
        for entity_id in entities
        if entity_id.partition(".")[0] != "camera"
    }

    cameras = access.get("cameras", {})
    if not cameras:
        raise RuntimeError("Family dashboard access defines no cameras")
    camera_entities = set(cameras.values())
    if len(camera_entities) != len(cameras):
        raise RuntimeError("Family dashboard camera entities must be unique")
    for camera_key, entity_id in cameras.items():
        entity = entities.get(entity_id)
        if (
            entity is None
            or entity.get("platform") != "unifiprotect"
            or entity.get("disabled_by") is not None
        ):
            raise RuntimeError(
                f"Camera {camera_key} does not match an enabled UniFi Protect entity"
            )

    desired_groups = {}
    generated = config / "access/generated"
    generated.mkdir(parents=True, exist_ok=True)
    desired_generated = set()
    users_by_camera = {key: [] for key in cameras}

    for profile_key, profile in access.get("profiles", {}).items():
        user_id = profile["user_id"]
        user = users.get(user_id)
        if user is None:
            raise RuntimeError(f"Family profile {profile_key} user is missing")
        if user.get("name") != profile["user_name"]:
            raise RuntimeError(f"Family profile {profile_key} user name changed")
        if bool(user.get("is_owner")) != bool(profile.get("is_owner", False)):
            raise RuntimeError(f"Family profile {profile_key} owner status changed")

        person_entity_id = profile.get("person_entity_id")
        if person_entity_id:
            person_id = person_entity_id.removeprefix("person.")
            person_entry = people.get(person_id)
            if person_entry is None or person_entry.get("user_id") != user_id:
                raise RuntimeError(
                    f"Family profile {profile_key} is not linked to {person_entity_id}"
                )

        allowed_keys = profile.get("cameras", [])
        unknown_keys = set(allowed_keys) - set(cameras)
        if unknown_keys:
            raise RuntimeError(
                f"Family profile {profile_key} has unknown cameras: "
                f"{sorted(unknown_keys)}"
            )
        allowed_entities = [cameras[key] for key in allowed_keys]
        for camera_key in allowed_keys:
            users_by_camera[camera_key].append(user_id)

        profile_include = generated / f"profile-{profile_key}-users.json"
        atomic_json(profile_include, [user_id], mode=0o644)
        desired_generated.add(profile_include.name)

        if profile.get("enforce_camera_policy"):
            if user.get("is_owner"):
                raise RuntimeError(
                    f"Cannot enforce camera policy for owner profile {profile_key}"
                )
            group_id = f"family-access-{profile_key}"
            desired_groups[group_id] = {
                "id": group_id,
                "name": f"Family access: {profile['user_name']}",
                "policy": _family_camera_policy(
                    allowed_entities, non_camera_domains
                ),
            }
            user["group_ids"] = [group_id]

    for camera_key, user_ids in users_by_camera.items():
        include = generated / f"camera-{camera_key}-users.json"
        atomic_json(include, user_ids, mode=0o644)
        desired_generated.add(include.name)
    any_camera_users = sorted(
        {user_id for user_ids in users_by_camera.values() for user_id in user_ids}
    )
    any_camera_include = generated / "camera-any-users.json"
    atomic_json(any_camera_include, any_camera_users, mode=0o644)
    desired_generated.add(any_camera_include.name)

    for stale in generated.glob("*.json"):
        if stale.name not in desired_generated:
            stale.unlink()

    groups = auth["data"]["groups"]
    groups[:] = [
        group
        for group in groups
        if not group["id"].startswith("family-access-")
        or group["id"] in desired_groups
    ]
    groups_by_id = {group["id"]: group for group in groups}
    for group_id, desired in desired_groups.items():
        if group_id in groups_by_id:
            groups_by_id[group_id].clear()
            groups_by_id[group_id].update(desired)
        else:
            groups.append(desired)

    desired_hash = sha256(access_path)
    current_state = (
        json.loads((config / FAMILY_ACCESS_STATE).read_text())
        if (config / FAMILY_ACCESS_STATE).exists()
        else {}
    )
    auth_changed = json.loads(auth_path.read_text()) != auth
    if auth_changed:
        backup = config / f"backups/auth.pre-family-access-{desired_hash[:12]}"
        backup.parent.mkdir(parents=True, exist_ok=True)
        if not backup.exists():
            shutil.copy2(auth_path, backup)
        atomic_json(auth_path, auth)
        print("Reconciled Git-owned family account permissions")
    elif current_state.get("sha256") == desired_hash:
        print("Family account mappings and permissions are already current")
    else:
        print("Validated Git-owned family account mappings")

    atomic_json(
        config / FAMILY_ACCESS_STATE,
        {"version": 1, "sha256": desired_hash},
        mode=0o644,
    )


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
                dashboard_backup = (
                    config / f"backups/{dashboard.name}.pre-2026-08-13-cleanup"
                )
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
    install_custom_integrations(manifest, config)
    migrate_areas(source, config)
    reconcile_family_access(source, config)
    remove_storage_dashboards(config)


if __name__ == "__main__":
    main()
