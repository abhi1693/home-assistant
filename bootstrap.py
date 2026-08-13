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
PROTECT_STREAM_QUALITIES = {"high", "medium", "low"}


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
    for directory in (
        "access",
        "dashboards",
        "location",
        "packages",
        "themes",
        "www",
    ):
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
    streams = json.loads((source / "access/protect-streams.json").read_text())
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
    usernames = {}
    for credential in auth["data"].get("credentials", []):
        if credential.get("auth_provider_type") != "homeassistant":
            continue
        username = credential.get("data", {}).get("username")
        user_id = credential.get("user_id")
        if username and user_id:
            if user_id in usernames:
                raise RuntimeError(
                    f"Home Assistant user {user_id} has multiple local usernames"
                )
            usernames[user_id] = username
    people_items = person["data"]["items"]
    people = {item["id"]: item for item in people_items}
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
        stream = streams.get("cameras", {}).get(camera_key)
        if stream is None or stream.get("high_entity_id") != entity_id:
            raise RuntimeError(
                f"Camera {camera_key} does not match its Protect stream mapping"
            )
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
    desired_people = {}
    desired_tracker_owners = {}

    for profile_key, profile in access.get("profiles", {}).items():
        user_id = profile["user_id"]
        user = users.get(user_id)
        if user is None:
            raise RuntimeError(f"Family profile {profile_key} user is missing")
        if usernames.get(user_id) != profile["username"]:
            raise RuntimeError(f"Family profile {profile_key} username changed")
        if bool(user.get("is_owner")) != bool(profile.get("is_owner", False)):
            raise RuntimeError(f"Family profile {profile_key} owner status changed")

        person_entity_id = profile.get("person_entity_id")
        if person_entity_id:
            if not person_entity_id.startswith("person."):
                raise RuntimeError(
                    f"Family profile {profile_key} has an invalid person entity"
                )
            person_id = person_entity_id.removeprefix("person.")
            person_entry = people.get(person_id)
            if person_entry is not None and person_entry.get("user_id") not in (
                None,
                user_id,
            ):
                raise RuntimeError(
                    f"Family profile {profile_key} person belongs to another user"
                )
            duplicate_person = next(
                (
                    item["id"]
                    for item in people_items
                    if item.get("user_id") == user_id and item["id"] != person_id
                ),
                None,
            )
            if duplicate_person:
                raise RuntimeError(
                    f"Family profile {profile_key} is already linked to "
                    f"person.{duplicate_person}"
                )

            device_trackers = profile.get(
                "device_trackers",
                person_entry.get("device_trackers", []) if person_entry else [],
            )
            if not isinstance(device_trackers, list) or len(device_trackers) != len(
                set(device_trackers)
            ):
                raise RuntimeError(
                    f"Family profile {profile_key} has invalid device trackers"
                )
            for entity_id in device_trackers:
                entity = entities.get(entity_id)
                if (
                    not isinstance(entity_id, str)
                    or not entity_id.startswith("device_tracker.")
                    or entity is None
                    or entity.get("disabled_by") is not None
                ):
                    raise RuntimeError(
                        f"Family profile {profile_key} has an unavailable device "
                        f"tracker: {entity_id}"
                    )
                previous_owner = desired_tracker_owners.setdefault(
                    entity_id, person_id
                )
                if previous_owner != person_id:
                    raise RuntimeError(
                        f"Device tracker {entity_id} is assigned to multiple people"
                    )
            desired_people[person_id] = {
                "id": person_id,
                "name": profile.get("person_name", profile["username"]),
                "user_id": user_id,
                "device_trackers": device_trackers,
                "picture": person_entry.get("picture") if person_entry else None,
            }

        allowed_keys = profile.get("cameras", [])
        unknown_keys = set(allowed_keys) - set(cameras)
        if unknown_keys:
            raise RuntimeError(
                f"Family profile {profile_key} has unknown cameras: "
                f"{sorted(unknown_keys)}"
            )
        allowed_entities = [
            entity_id
            for key in allowed_keys
            for entity_id in (
                streams["cameras"][key]["medium_entity_id"],
                streams["cameras"][key]["high_entity_id"],
            )
        ]
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
                "name": f"Family access: {profile.get('person_name', profile['username'])}",
                "policy": _family_camera_policy(
                    allowed_entities, non_camera_domains
                ),
            }
            user["group_ids"] = [group_id]

    for item in people_items:
        if item["id"] in desired_people:
            continue
        item["device_trackers"] = [
            tracker
            for tracker in item.get("device_trackers", [])
            if desired_tracker_owners.get(tracker) in (None, item["id"])
        ]
    for person_id, desired in desired_people.items():
        if person_id in people:
            people[person_id].update(desired)
        else:
            people_items.append(desired)
            people[person_id] = desired

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

    desired_hash = hashlib.sha256(
        f"{sha256(access_path)}:{sha256(source / 'access/protect-streams.json')}".encode()
    ).hexdigest()
    current_state = (
        json.loads((config / FAMILY_ACCESS_STATE).read_text())
        if (config / FAMILY_ACCESS_STATE).exists()
        else {}
    )
    auth_changed = json.loads(auth_path.read_text()) != auth
    person_changed = json.loads(person_path.read_text()) != person
    if auth_changed:
        backup = config / f"backups/auth.pre-family-access-{desired_hash[:12]}"
        backup.parent.mkdir(parents=True, exist_ok=True)
        if not backup.exists():
            shutil.copy2(auth_path, backup)
        atomic_json(auth_path, auth)
        print("Reconciled Git-owned family account permissions")
    if person_changed:
        backup = config / f"backups/person.pre-family-access-{desired_hash[:12]}"
        backup.parent.mkdir(parents=True, exist_ok=True)
        if not backup.exists():
            shutil.copy2(person_path, backup)
        atomic_json(person_path, person)
        print("Reconciled Git-owned family people and device trackers")
    if not auth_changed and not person_changed and current_state.get(
        "sha256"
    ) == desired_hash:
        print("Family account mappings and permissions are already current")
    elif not auth_changed and not person_changed:
        print("Validated Git-owned family account mappings")

    atomic_json(
        config / FAMILY_ACCESS_STATE,
        {"version": 1, "sha256": desired_hash},
        mode=0o644,
    )


def reconcile_dashboard_defaults(source: Path, config: Path) -> None:
    """Reconcile the system and family profile default dashboard panels."""
    access_path = source / "access/family-dashboard.json"
    access = json.loads(access_path.read_text())
    if access.get("version") != 1:
        raise RuntimeError("Unsupported family dashboard access schema")

    system_default = access.get("default_dashboard")
    profile_defaults = {
        profile["user_id"]: profile.get("default_dashboard", system_default)
        for profile in access.get("profiles", {}).values()
    }
    desired_panels = {system_default, *profile_defaults.values()}
    if None in desired_panels or not all(
        isinstance(panel, str) and panel for panel in desired_panels
    ):
        raise RuntimeError("Every family profile must define a default dashboard")

    dashboards_path = source / "dashboards/lovelace-dashboards.yaml"
    registered_panels = {
        line[:-1]
        for line in dashboards_path.read_text().splitlines()
        if line and not line[0].isspace() and line.endswith(":")
    }
    unknown_panels = desired_panels - registered_panels
    if unknown_panels:
        raise RuntimeError(
            f"Default dashboards are not registered: {sorted(unknown_panels)}"
        )

    storage = config / ".storage"
    auth_path = storage / "auth"
    if not auth_path.exists():
        raise RuntimeError("Home Assistant auth storage is missing")
    auth = json.loads(auth_path.read_text())
    users = {item["id"] for item in auth.get("data", {}).get("users", [])}
    missing_users = set(profile_defaults) - users
    if missing_users:
        raise RuntimeError(
            f"Default dashboard profiles reference missing users: {sorted(missing_users)}"
        )

    desired_hash = sha256(access_path)[:12]

    def reconcile(path: Path, panel: str) -> bool:
        if path.exists():
            document = json.loads(path.read_text())
        else:
            document = {
                "version": 1,
                "minor_version": 1,
                "key": path.name,
                "data": {},
            }
        data = document.setdefault("data", {})
        core = data.setdefault("core", {})
        if not isinstance(core, dict):
            raise RuntimeError(f"Invalid frontend core preferences in {path.name}")
        if core.get("default_panel") == panel:
            return False

        core["default_panel"] = panel
        if path.exists():
            backup = config / (
                f"backups/{path.name}.pre-default-dashboard-{desired_hash}"
            )
            backup.parent.mkdir(parents=True, exist_ok=True)
            if not backup.exists():
                shutil.copy2(path, backup)
        atomic_json(path, document)
        return True

    changed = reconcile(storage / "frontend.system_data", system_default)
    for user_id, panel in profile_defaults.items():
        changed = reconcile(storage / f"frontend.user_data_{user_id}", panel) or changed

    if changed:
        print("Reconciled Git-owned default dashboards for system and family profiles")
    else:
        print("System and family profile default dashboards are already current")


def validate_protect_streams(source: Path, config: Path) -> None:
    """Validate Git-owned Protect stream tiers against enabled high entities."""
    desired = json.loads((source / "access/protect-streams.json").read_text())
    if desired.get("version") != 1 or not desired.get("cameras"):
        raise RuntimeError("Unsupported or empty Protect stream configuration")

    registry_path = config / ".storage/core.entity_registry"
    if not registry_path.exists():
        raise RuntimeError("Home Assistant entity registry is missing")
    entities = {
        item["entity_id"]: item
        for item in json.loads(registry_path.read_text())["data"]["entities"]
    }
    seen_entities: set[str] = set()
    for camera_name, camera in desired["cameras"].items():
        entity_id = camera["high_entity_id"]
        if entity_id in seen_entities:
            raise RuntimeError(f"Protect stream entity is duplicated: {entity_id}")
        seen_entities.add(entity_id)
        entity = entities.get(entity_id)
        if (
            entity is None
            or entity.get("platform") != "unifiprotect"
            or entity.get("disabled_by") is not None
            or not entity.get("unique_id", "").endswith("_0")
        ):
            raise RuntimeError(
                f"Protect stream {camera_name} does not match an enabled high entity"
            )
        medium_entity_id = camera.get("medium_entity_id")
        if not medium_entity_id or not medium_entity_id.startswith("camera."):
            raise RuntimeError(f"Protect stream {camera_name} has no medium entity")
        medium = entities.get(medium_entity_id)
        if medium is not None and (
            medium.get("platform") != "unifiprotect"
            or not medium.get("unique_id", "").endswith("_1")
            or medium.get("unique_id", "").removesuffix("_1")
            != entity["unique_id"].removesuffix("_0")
        ):
            raise RuntimeError(
                f"Protect stream {camera_name} has an invalid medium entity"
            )
        qualities = set(camera.get("qualities", []))
        if "high" not in qualities or not qualities <= PROTECT_STREAM_QUALITIES:
            raise RuntimeError(f"Protect stream {camera_name} has invalid qualities")


def reconcile_home_location(source: Path, config: Path) -> None:
    """Keep integrations that snapshot the home pin aligned with Git."""
    location_path = source / "location/home.json"
    desired = json.loads(location_path.read_text())
    if desired.get("version") != 1:
        raise RuntimeError("Unsupported home location configuration")

    latitude = desired.get("latitude")
    longitude = desired.get("longitude")
    if (
        isinstance(latitude, bool)
        or not isinstance(latitude, (int, float))
        or not -90 <= latitude <= 90
        or isinstance(longitude, bool)
        or not isinstance(longitude, (int, float))
        or not -180 <= longitude <= 180
    ):
        raise RuntimeError("Home location has invalid coordinates")
    if not desired.get("address") or not desired.get("name"):
        raise RuntimeError("Home location requires a name and address")

    integrations = desired.get("integration_locations")
    if not isinstance(integrations, list) or not integrations:
        raise RuntimeError("Home location has no integration targets")

    entries_path = config / ".storage/core.config_entries"
    if not entries_path.exists():
        raise RuntimeError("Home Assistant config entry storage is missing")
    document = json.loads(entries_path.read_text())
    entries = document.get("data", {}).get("entries", [])

    changed = False
    for target in integrations:
        matches = [
            subentry
            for entry in entries
            if entry.get("domain") == target.get("domain")
            for subentry in entry.get("subentries", [])
            if subentry.get("subentry_type") == target.get("subentry_type")
            and subentry.get("title") == target.get("title")
        ]
        if len(matches) != 1:
            raise RuntimeError(
                "Expected exactly one "
                f"{target.get('domain')} location named {target.get('title')}; "
                f"found {len(matches)}"
            )
        data = matches[0].setdefault("data", {})
        if data.get("latitude") != latitude or data.get("longitude") != longitude:
            data["latitude"] = latitude
            data["longitude"] = longitude
            changed = True

    if not changed:
        print("Home location and integration coordinates are already current")
        return

    desired_hash = sha256(location_path)
    backup = (
        config
        / f"backups/core.config_entries.pre-home-location-{desired_hash[:12]}"
    )
    backup.parent.mkdir(parents=True, exist_ok=True)
    if not backup.exists():
        shutil.copy2(entries_path, backup)
    atomic_json(entries_path, document)
    print("Reconciled Git-owned Home and integration coordinates")


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
    reconcile_home_location(source, config)
    validate_protect_streams(source, config)
    reconcile_family_access(source, config)
    reconcile_dashboard_defaults(source, config)
    remove_storage_dashboards(config)


if __name__ == "__main__":
    main()
