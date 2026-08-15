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
PRIVATE_COMMUTE_PACKAGE = "packages/private_commute.yaml"
HOUSEHOLD_POLICY = "access/household-policy.json"
LEGACY_HOUSEHOLD_ENTITIES = {
    "automation.household_end_good_night_period",
    "automation.household_check_vacation_readiness",
    "automation.household_prepare_good_night",
    "binary_sensor.vacation_ready",
    "input_boolean.good_night",
    "input_button.household_good_night",
    "input_button.request_vacation_mode",
    "input_datetime.last_vacation_preflight",
    "input_text.vacation_preflight_result",
}


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


def load_entity_migrations(source: Path) -> list[dict]:
    """Load and validate Git-owned Home Assistant entity rename contracts."""
    path = source / "access/entity-migrations.json"
    document = json.loads(path.read_text())
    migrations = document.get("entities")
    if document.get("version") != 1 or not isinstance(migrations, list):
        raise RuntimeError("Unsupported entity migration contract")

    old_ids = set()
    new_ids = set()
    for migration in migrations:
        if not isinstance(migration, dict):
            raise RuntimeError("Entity migration entry is invalid")
        old_entity_id = migration.get("old_entity_id")
        new_entity_id = migration.get("new_entity_id")
        platform = migration.get("platform")
        unique_id = migration.get("unique_id")
        if (
            not isinstance(old_entity_id, str)
            or not isinstance(new_entity_id, str)
            or old_entity_id == new_entity_id
            or old_entity_id.partition(".")[0]
            != new_entity_id.partition(".")[0]
            or not isinstance(platform, str)
            or not platform
            or not isinstance(unique_id, str)
            or not unique_id
            or old_entity_id in old_ids
            or new_entity_id in new_ids
        ):
            raise RuntimeError("Entity migration entry is invalid")
        old_ids.add(old_entity_id)
        new_ids.add(new_entity_id)
    if old_ids & new_ids:
        raise RuntimeError("Entity migrations cannot form rename chains")
    return migrations


def validate_entity_migrations(source: Path, config: Path) -> None:
    """Validate each migration against the current entity registry identity."""
    registry_path = config / ".storage/core.entity_registry"
    if not registry_path.exists():
        raise RuntimeError("Home Assistant entity registry is missing")
    registry = json.loads(registry_path.read_text())
    entities = {
        item["entity_id"]: item for item in registry["data"]["entities"]
    }
    for migration in load_entity_migrations(source):
        old_entity = entities.get(migration["old_entity_id"])
        new_entity = entities.get(migration["new_entity_id"])
        if old_entity is not None and new_entity is not None:
            raise RuntimeError(
                "Both sides of an entity migration already exist: "
                f"{migration['old_entity_id']}"
            )
        entity = old_entity or new_entity
        if (
            entity is None
            or entity.get("platform") != migration["platform"]
            or entity.get("unique_id") != migration["unique_id"]
        ):
            raise RuntimeError(
                "Entity migration identity changed: "
                f"{migration['old_entity_id']}"
            )


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
            if path.is_file() and path.suffix in {".js", ".json", ".yaml"}:
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


def validate_household_policy(source: Path) -> None:
    """Validate the public entity contract before installing household logic."""
    access = json.loads((source / "access/family-dashboard.json").read_text())
    policy = json.loads((source / HOUSEHOLD_POLICY).read_text())
    if policy.get("version") != 1 or policy.get("automation_stage") != "Shadow":
        raise RuntimeError("Household policy must start at version 1 in Shadow mode")

    profiles = policy.get("profiles")
    if not isinstance(profiles, dict) or set(profiles) != {
        "abhimanyu",
        "krishna",
        "manisha",
    }:
        raise RuntimeError("Household policy profiles are incomplete")

    for profile_key, policy_profile in profiles.items():
        access_profile = access.get("profiles", {}).get(profile_key)
        if not access_profile or not isinstance(policy_profile, dict):
            raise RuntimeError(f"Household profile {profile_key!r} is invalid")
        gps = policy_profile.get("gps")
        wifi = policy_profile.get("wifi")
        notify = policy_profile.get("notify")
        trusted_trackers = [gps, *([wifi] if wifi else [])]
        if (
            not isinstance(gps, str)
            or not gps.startswith("device_tracker.")
            or wifi is not None
            and (not isinstance(wifi, str) or not wifi.startswith("device_tracker."))
            or not isinstance(notify, str)
            or not notify.startswith("notify.")
            or sorted(access_profile.get("device_trackers", []))
            != sorted(trusted_trackers)
            or access_profile.get("notify_entity_id") != notify
        ):
            raise RuntimeError(f"Household profile {profile_key!r} has policy drift")

    security = policy.get("security", {})
    required = security.get("required_cameras", [])
    if (
        len(required) != 2
        or not all(
            isinstance(entity_id, str) and entity_id.startswith("camera.")
            for entity_id in required
        )
    ):
        raise RuntimeError("Household security contract is invalid")

    contracts = policy.get("hardware_contracts")
    if not isinstance(contracts, dict) or set(contracts) != {
        "entry_contacts",
        "leak_sensors",
        "certified_smoke_co",
        "indoor_air_quality",
        "bed_occupancy",
    }:
        raise RuntimeError("Household hardware contracts are incomplete")


def validate_room_model(source: Path) -> dict:
    """Validate the declarative room graph before it reaches Home Assistant."""
    room_model = json.loads((source / "access/rooms.json").read_text())
    if (
        room_model.get("version") != 1
        or room_model.get("base_path") != "/home-tablet/rooms"
        or room_model.get("access_mode") != "shared"
    ):
        raise RuntimeError("Family rooms must use the shared version 1 contract")

    rooms = room_model.get("rooms")
    if not isinstance(rooms, list) or len(rooms) != 7:
        raise RuntimeError("Family room model must define the seven household rooms")
    slugs = [room.get("slug") for room in rooms]
    area_ids = [room.get("area_id") for room in rooms]
    if len(set(slugs)) != len(slugs) or len(set(area_ids)) != len(area_ids):
        raise RuntimeError("Family room slugs and area IDs must be unique")
    if set(slugs) != {
        "master-bedroom",
        "bedroom",
        "guest-room",
        "office",
        "kitchen",
        "dining-room",
        "living-room",
    }:
        raise RuntimeError("Family room model has an unexpected room set")

    known_profiles = set(room_model.get("profiles", {}))
    for room in rooms:
        occupants = room.get("occupants")
        modules = room.get("modules")
        if (
            not room.get("name")
            or not room.get("icon", "").startswith("mdi:")
            or not isinstance(occupants, list)
            or not occupants
            or not isinstance(modules, list)
            or not modules
        ):
            raise RuntimeError(f"Family room {room.get('slug')!r} is incomplete")
        unknown_occupants = set(occupants) - known_profiles - {"shared"}
        if unknown_occupants:
            raise RuntimeError(
                f"Family room {room['slug']} has unknown occupants: "
                f"{sorted(unknown_occupants)}"
            )
        for module in modules:
            if module.get("type") not in {"fans", "media", "appliance", "camera"}:
                raise RuntimeError(
                    f"Family room {room['slug']} has an unsupported module"
                )
            unknown_labels = set(module.get("labels", [])) - set(
                room_model.get("labels", {})
            )
            if unknown_labels:
                raise RuntimeError(
                    f"Family room {room['slug']} has unknown labels: "
                    f"{sorted(unknown_labels)}"
                )

    for username, profile in room_model.get("profiles", {}).items():
        favourites = profile.get("favourites", [])
        if not favourites or set(favourites) - set(slugs):
            raise RuntimeError(f"Room favourites for {username} are invalid")
    return room_model


def generate_family_rooms_manifest(source: Path, config: Path) -> None:
    """Render a browser-safe room manifest with stable Home Assistant user IDs."""
    room_model = validate_room_model(source)
    access = json.loads((source / "access/family-dashboard.json").read_text())
    access_profiles = {
        profile["username"]: profile
        for profile in access.get("profiles", {}).values()
        if profile.get("is_family_member")
    }
    missing = set(room_model["profiles"]) - set(access_profiles)
    if missing:
        raise RuntimeError(f"Room profiles have no family account: {sorted(missing)}")

    profiles = {
        access_profiles[username]["user_id"]: {
            "username": username,
            "name": access_profiles[username].get("person_name", username),
            "favourites": room_profile["favourites"],
        }
        for username, room_profile in room_model["profiles"].items()
    }
    manifest = {
        "version": room_model["version"],
        "base_path": room_model["base_path"],
        "access_mode": room_model["access_mode"],
        "profiles": profiles,
        "occupant_names": {
            username: profile.get("person_name", username)
            for username, profile in access_profiles.items()
        },
        "rooms": room_model["rooms"],
    }
    atomic_json(
        config / "www/generated/family-rooms.json", manifest, mode=0o644
    )
    print("Generated shared family room dashboard manifest")


def remove_legacy_household_entities(config: Path) -> None:
    """Remove exact source-retired entities without touching user-owned entries."""
    registry_path = config / ".storage/core.entity_registry"
    if not registry_path.exists():
        raise RuntimeError("Home Assistant entity registry is missing")
    document = json.loads(registry_path.read_text())
    entities = document.get("data", {}).get("entities", [])
    retained = [
        entity
        for entity in entities
        if entity.get("entity_id") not in LEGACY_HOUSEHOLD_ENTITIES
    ]
    removed = len(entities) - len(retained)
    if not removed:
        print("Retired household entities are already absent")
        return
    document["data"]["entities"] = retained
    atomic_json(registry_path, document)
    print(f"Removed {removed} retired household entity registration(s)")


def reconcile_nut(source: Path, config: Path) -> None:
    """Install the read-only NUT config entry without storing UPS credentials."""
    desired_path = source / "access/nut.json"
    desired = json.loads(desired_path.read_text())
    if (
        desired.get("version") != 1
        or not isinstance(desired.get("entry_id"), str)
        or len(desired["entry_id"]) != 26
        or not isinstance(desired.get("title"), str)
        or not isinstance(desired.get("host"), str)
        or not isinstance(desired.get("port"), int)
        or desired["port"] != 3493
        or not isinstance(desired.get("alias"), str)
    ):
        raise RuntimeError("NUT configuration is invalid")

    entries_path = config / ".storage/core.config_entries"
    if not entries_path.exists():
        raise RuntimeError("Home Assistant config entry storage is missing")
    document = json.loads(entries_path.read_text())
    entries = document.get("data", {}).get("entries", [])
    matches = [entry for entry in entries if entry.get("domain") == "nut"]
    expected_data = {
        "host": desired["host"],
        "port": desired["port"],
        "alias": desired["alias"],
    }
    changed = False
    if len(matches) > 1:
        raise RuntimeError("Expected at most one NUT config entry")
    if matches:
        entry = matches[0]
        if entry.get("entry_id") != desired["entry_id"]:
            raise RuntimeError("A different NUT config entry already exists")
        if entry.get("title") != desired["title"]:
            entry["title"] = desired["title"]
            changed = True
        if entry.get("data") != expected_data:
            entry["data"] = expected_data
            changed = True
    else:
        entries.append(
            {
                "created_at": "2026-08-14T00:00:00+00:00",
                "data": expected_data,
                "disabled_by": None,
                "discovery_keys": {},
                "domain": "nut",
                "entry_id": desired["entry_id"],
                "minor_version": 1,
                "modified_at": "2026-08-14T00:00:00+00:00",
                "options": {},
                "pref_disable_new_entities": False,
                "pref_disable_polling": False,
                "source": "user",
                "subentries": [],
                "title": desired["title"],
                "unique_id": None,
                "version": 1,
            }
        )
        changed = True

    if changed:
        backup = config / (
            f"backups/core.config_entries.pre-nut-{sha256(desired_path)[:12]}"
        )
        backup.parent.mkdir(parents=True, exist_ok=True)
        if not backup.exists():
            shutil.copy2(entries_path, backup)
        atomic_json(entries_path, document)
        print("Reconciled read-only Rack UPS integration")
    else:
        print("Read-only Rack UPS integration is already current")


def reconcile_google_translate_tts(source: Path, config: Path) -> None:
    """Install the credential-free camera speaker TTS config entry."""
    desired_path = source / "access/google-translate-tts.json"
    desired = json.loads(desired_path.read_text())
    if (
        desired.get("version") != 1
        or not isinstance(desired.get("entry_id"), str)
        or len(desired["entry_id"]) != 26
        or desired.get("title") != "Google Translate text-to-speech"
        or desired.get("language") != "en-in"
        or desired.get("tld") != "co.in"
    ):
        raise RuntimeError("Google Translate TTS configuration is invalid")

    entries_path = config / ".storage/core.config_entries"
    if not entries_path.exists():
        raise RuntimeError("Home Assistant config entry storage is missing")
    document = json.loads(entries_path.read_text())
    entries = document.get("data", {}).get("entries", [])
    matches = [
        entry for entry in entries if entry.get("domain") == "google_translate"
    ]
    if len(matches) > 1:
        raise RuntimeError("Expected at most one Google Translate TTS config entry")

    expected_data = {
        "language": desired["language"],
        "tld": desired["tld"],
    }
    changed = False
    if matches:
        entry = matches[0]
        if entry.get("title") != desired["title"]:
            entry["title"] = desired["title"]
            changed = True
        if entry.get("data") != expected_data:
            entry["data"] = expected_data
            changed = True
    else:
        entries.append(
            {
                "created_at": "2026-08-14T00:00:00+00:00",
                "data": expected_data,
                "disabled_by": None,
                "discovery_keys": {},
                "domain": "google_translate",
                "entry_id": desired["entry_id"],
                "minor_version": 1,
                "modified_at": "2026-08-14T00:00:00+00:00",
                "options": {},
                "pref_disable_new_entities": False,
                "pref_disable_polling": False,
                "source": "user",
                "subentries": [],
                "title": desired["title"],
                "unique_id": None,
                "version": 1,
            }
        )
        changed = True

    if changed:
        backup = config / (
            "backups/core.config_entries.pre-google-translate-tts-"
            f"{sha256(desired_path)[:12]}"
        )
        backup.parent.mkdir(parents=True, exist_ok=True)
        if not backup.exists():
            shutil.copy2(entries_path, backup)
        atomic_json(entries_path, document)
        print("Reconciled credential-free camera speaker TTS")
    else:
        print("Camera speaker TTS is already current")


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


def _family_entity_policy(
    allowed_entities: list[str],
    unrestricted_domains: set[str],
) -> dict:
    """Allow unrestricted domains and individually granted private domains."""
    entity_ids = {entity_id: True for entity_id in allowed_entities}
    return {
        "entities": {
            "entity_ids": entity_ids,
            "domains": {domain: True for domain in sorted(unrestricted_domains)},
        }
    }


def _camera_keys_for_profile(
    profile_key: str,
    profile: dict,
    cameras: dict,
    is_owner: bool,
) -> list[str]:
    """Resolve declarative camera visibility without weakening account policy."""
    all_cameras = profile.get("all_cameras", False)
    if not isinstance(all_cameras, bool):
        raise RuntimeError(
            f"Family profile {profile_key} all_cameras must be a boolean"
        )
    if all_cameras and not is_owner:
        raise RuntimeError(
            f"Family profile {profile_key} cannot grant all cameras to a non-owner"
        )

    allowed_keys = list(cameras) if all_cameras else profile.get("cameras", [])
    if (
        not isinstance(allowed_keys, list)
        or not all(isinstance(item, str) for item in allowed_keys)
        or len(allowed_keys) != len(set(allowed_keys))
    ):
        raise RuntimeError(
            f"Family profile {profile_key} cameras must be a unique list"
        )
    unknown_keys = set(allowed_keys) - set(cameras)
    if unknown_keys:
        raise RuntimeError(
            f"Family profile {profile_key} has unknown cameras: "
            f"{sorted(unknown_keys)}"
        )
    return allowed_keys


def _protect_camera_entity_sets(
    entities: dict[str, dict],
    cameras: dict[str, str],
    streams: dict,
    camera_security: dict[str, list[str]],
    source_owned: set[str],
) -> tuple[dict[str, set[str]], set[str]]:
    """Bind every enabled Protect entity to its camera device and keep NVR data private."""
    protect_entities = {
        entity_id
        for entity_id, entity in entities.items()
        if entity.get("platform") == "unifiprotect"
    }
    by_camera: dict[str, set[str]] = {}
    claimed_devices: dict[str, str] = {}

    for camera_key, high_entity_id in cameras.items():
        device_id = entities[high_entity_id].get("device_id")
        if not device_id:
            raise RuntimeError(f"Camera {camera_key} has no Protect device binding")
        if device_id in claimed_devices:
            raise RuntimeError(
                f"Cameras {claimed_devices[device_id]} and {camera_key} share a device"
            )
        claimed_devices[device_id] = camera_key

        native_entities = {
            entity_id
            for entity_id in protect_entities
            if entities[entity_id].get("device_id") == device_id
        }
        declared_native = {
            streams["cameras"][camera_key]["high_entity_id"],
            streams["cameras"][camera_key]["medium_entity_id"],
            *(
                [streams["cameras"][camera_key]["low_entity_id"]]
                if streams["cameras"][camera_key].get("low_entity_id")
                else []
            ),
            *(
                set(camera_security.get(camera_key, []))
                - source_owned
            ),
        }
        mismatched = {
            entity_id
            for entity_id in declared_native
            if entity_id in entities and entity_id not in native_entities
        }
        if mismatched:
            raise RuntimeError(
                f"Camera {camera_key} entities do not share its Protect device: "
                f"{sorted(mismatched)}"
            )
        by_camera[camera_key] = (
            native_entities
            | declared_native
            | (set(camera_security.get(camera_key, [])) & source_owned)
        )

    return by_camera, protect_entities | source_owned


def reconcile_camera_activity_entity_ids(
    streams: dict, entity_path: Path, entity_registry: dict
) -> None:
    """Keep source-owned Protect activity entities on policy-stable IDs."""
    entries = entity_registry.get("data", {}).get("entities", [])
    by_entity_id = {entry.get("entity_id"): entry for entry in entries}
    changed = False
    for camera_key, stream in streams.get("cameras", {}).items():
        expected = stream.get("activity_entity_id")
        if not expected:
            continue
        matches = [
            entry
            for entry in entries
            if entry.get("platform") == "family_camera_events"
            and entry.get("unique_id") == f"family_camera_events_{camera_key}"
        ]
        if len(matches) > 1:
            raise RuntimeError(
                f"Camera {camera_key} has duplicate source-owned activity entities"
            )
        if not matches or matches[0].get("entity_id") == expected:
            continue
        collision = by_entity_id.get(expected)
        if collision is not None and collision is not matches[0]:
            raise RuntimeError(
                f"Camera {camera_key} activity entity ID is already in use"
            )
        old_entity_id = matches[0].get("entity_id")
        matches[0]["entity_id"] = expected
        by_entity_id.pop(old_entity_id, None)
        by_entity_id[expected] = matches[0]
        changed = True

    if not changed:
        return
    backup = entity_path.parent.parent / (
        "backups/core.entity_registry.pre-family-camera-activity-ids"
    )
    backup.parent.mkdir(parents=True, exist_ok=True)
    if not backup.exists():
        shutil.copy2(entity_path, backup)
    atomic_json(entity_path, entity_registry)
    print("Reconciled source-owned camera activity entity IDs")


def reconcile_family_access(source: Path, config: Path) -> None:
    """Validate and reconcile Git-owned dashboard users and private access."""
    access_path = source / "access/family-dashboard.json"
    access = json.loads(access_path.read_text())
    streams = json.loads((source / "access/protect-streams.json").read_text())
    if access.get("version") != 3:
        raise RuntimeError("Unsupported family dashboard access schema")
    if streams.get("version") not in {1, 2, 3}:
        raise RuntimeError("Unsupported Protect stream policy schema")
    enhanced_camera_policy = streams.get("version") in {2, 3}
    adaptive_stream_policy = streams.get("version") == 3

    auth_path = config / ".storage/auth"
    person_path = config / ".storage/person"
    entity_path = config / ".storage/core.entity_registry"
    if not all(path.exists() for path in (auth_path, person_path, entity_path)):
        raise RuntimeError("Home Assistant auth, person, or entity registry is missing")

    auth = json.loads(auth_path.read_text())
    person = json.loads(person_path.read_text())
    entity_registry = json.loads(entity_path.read_text())
    if enhanced_camera_policy:
        reconcile_camera_activity_entity_ids(
            streams, entity_path, entity_registry
        )
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
    retired_profiles = access.get("retired_profiles", [])
    if not isinstance(retired_profiles, list):
        raise RuntimeError("Retired family profiles must be a list")
    for retired in retired_profiles:
        user_id = retired.get("user_id") if isinstance(retired, dict) else None
        username = retired.get("username") if isinstance(retired, dict) else None
        if not isinstance(user_id, str) or not isinstance(username, str):
            raise RuntimeError("Retired family profile identity is invalid")
        user = users.get(user_id)
        recorded_username = usernames.get(user_id)
        if (user and user.get("is_owner")) or recorded_username not in {
            None,
            username,
        }:
            raise RuntimeError(
                f"Refusing to retire changed or owner profile {username}"
            )
        changed = user is not None
        auth["data"]["users"] = [
            item for item in auth["data"]["users"] if item["id"] != user_id
        ]
        credential_count = len(auth["data"].get("credentials", []))
        auth["data"]["credentials"] = [
            item
            for item in auth["data"].get("credentials", [])
            if item.get("user_id") != user_id
        ]
        changed |= credential_count != len(auth["data"]["credentials"])
        refresh_token_count = len(auth["data"].get("refresh_tokens", []))
        auth["data"]["refresh_tokens"] = [
            item
            for item in auth["data"].get("refresh_tokens", [])
            if item.get("user_id") != user_id
        ]
        changed |= refresh_token_count != len(auth["data"]["refresh_tokens"])
        users.pop(user_id, None)
        usernames.pop(user_id, None)
        preference = config / ".storage" / f"frontend.user_data_{user_id}"
        if preference.exists():
            backup = config / "backups" / f"{preference.name}.pre-retirement"
            backup.parent.mkdir(parents=True, exist_ok=True)
            if not backup.exists():
                shutil.copy2(preference, backup)
            preference.unlink()
            changed = True
        if changed:
            print(f"Retired Home Assistant profile {username}")
    people_items = person["data"]["items"]
    retired_user_ids = {
        item["user_id"] for item in retired_profiles if isinstance(item, dict)
    }
    for item in people_items:
        if item.get("user_id") in retired_user_ids:
            item["user_id"] = None
    people = {item["id"]: item for item in people_items}
    entities = {
        item["entity_id"]: item for item in entity_registry["data"]["entities"]
    }
    unrestricted_domains = {
        entity_id.partition(".")[0]
        for entity_id in entities
        if entity_id.partition(".")[0] not in {"calendar", "camera"}
    }

    profiles = access.get("profiles", {})
    health_profiles = access.get("health_profiles", {})
    family_profile_keys = {
        profile_key
        for profile_key, profile in profiles.items()
        if profile.get("is_family_member")
    }
    if (
        not isinstance(health_profiles, dict)
        or set(health_profiles) != family_profile_keys
    ):
        raise RuntimeError(
            "Every family member must have exactly one private health profile"
        )
    private_health_entities_by_profile = {}
    private_health_entities = set()
    for profile_key, health_profile in health_profiles.items():
        profile = profiles.get(profile_key)
        health_entities = health_profile.get("entities", [])
        if (
            profile is None
            or not profile.get("is_family_member")
            or not isinstance(health_profile.get("source"), str)
            or not health_profile["source"].strip()
            or not health_entities
            or len(health_entities) != len(set(health_entities))
        ):
            raise RuntimeError(
                f"Private health profile {profile_key} is invalid"
            )
        private_health_entities_by_profile[profile_key] = set(health_entities)
        for entity_id in health_entities:
            entity = entities.get(entity_id)
            if (
                not isinstance(entity_id, str)
                or not entity_id.startswith("sensor.")
                or entity is None
                or entity.get("platform") != "mobile_app"
            ):
                raise RuntimeError(
                    f"Private health entity is not a Companion App sensor: {entity_id}"
                )
            if entity_id in private_health_entities:
                raise RuntimeError(
                    f"Private health entity belongs to multiple profiles: {entity_id}"
                )
            private_health_entities.add(entity_id)
    private_health_domains = {
        entity_id.partition(".")[0] for entity_id in private_health_entities
    }

    calendars = access.get("calendars", {})
    shared_calendars = calendars.get("shared", [])
    owner_only_calendars = calendars.get("owner_only", [])
    all_calendars = [*shared_calendars, *owner_only_calendars]
    if (
        not shared_calendars
        or not all(isinstance(item, str) for item in all_calendars)
        or len(all_calendars) != len(set(all_calendars))
    ):
        raise RuntimeError("Family dashboard calendars must be unique and shared")
    for entity_id in all_calendars:
        entity = entities.get(entity_id)
        if (
            not entity_id.startswith("calendar.")
            or entity is None
            or entity.get("platform") != "google"
            or entity.get("disabled_by") is not None
        ):
            raise RuntimeError(
                f"Family dashboard calendar is not an enabled Google entity: {entity_id}"
            )

    cameras = access.get("cameras", {})
    if not cameras:
        raise RuntimeError("Family dashboard access defines no cameras")
    camera_entities = set(cameras.values())
    if len(camera_entities) != len(cameras):
        raise RuntimeError("Family dashboard camera entities must be unique")
    source_owned_camera_entities = set()
    for camera_key, entity_id in cameras.items():
        stream = streams.get("cameras", {}).get(camera_key)
        if stream is None or stream.get("high_entity_id") != entity_id:
            raise RuntimeError(
                f"Camera {camera_key} does not match its Protect stream mapping"
            )
        required_stream_fields = {
            "name",
            "high_entity_id",
            "medium_entity_id",
            "activity_entity_id",
            "motion_entity_id",
            "person_entity_id",
            "vehicle_entity_id",
            "animal_entity_id",
            "recording_mode_entity_id",
            "is_dark_entity_id",
            "microphone_level_entity_id",
            "qualities",
            "notify_profiles",
            "alerts",
        }
        if adaptive_stream_policy:
            required_stream_fields.add("low_entity_id")
        if enhanced_camera_policy and required_stream_fields - set(stream):
            raise RuntimeError(f"Camera {camera_key} stream policy is incomplete")
        if enhanced_camera_policy:
            activity_entity_id = stream["activity_entity_id"]
            if (
                not isinstance(activity_entity_id, str)
                or not activity_entity_id.startswith("sensor.family_camera_")
                or activity_entity_id in source_owned_camera_entities
            ):
                raise RuntimeError(
                    f"Camera {camera_key} has an invalid activity entity"
                )
            source_owned_camera_entities.add(activity_entity_id)
        expected_qualities = (
            ["high", "medium", "low"]
            if adaptive_stream_policy
            else ["high", "medium"]
        )
        if stream.get("qualities") != expected_qualities:
            raise RuntimeError(
                f"Camera {camera_key} must declare {', '.join(expected_qualities)} streams"
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

    camera_security = access.get("camera_security_entities", {})
    unknown_security_cameras = set(camera_security) - set(cameras)
    if unknown_security_cameras:
        raise RuntimeError(
            "Camera security entities reference unknown cameras: "
            f"{sorted(unknown_security_cameras)}"
        )
    protected_camera_entities = set()
    for camera_key, camera_entities in camera_security.items():
        if (
            not isinstance(camera_entities, list)
            or not camera_entities
            or len(camera_entities) != len(set(camera_entities))
        ):
            raise RuntimeError(
                f"Camera {camera_key} security entities must be a unique list"
            )
        for entity_id in camera_entities:
            entity = entities.get(entity_id)
            source_owned = entity_id in source_owned_camera_entities
            if (
                not isinstance(entity_id, str)
                or entity_id.partition(".")[0]
                not in {"binary_sensor", "event", "media_player", "sensor"}
                or (entity is None and not source_owned)
                or (
                    entity is not None
                    and entity.get("platform")
                    != ("family_camera_events" if source_owned else "unifiprotect")
                )
                or (entity is not None and entity.get("disabled_by") is not None)
                or entity_id in protected_camera_entities
            ):
                raise RuntimeError(
                    f"Camera {camera_key} has an invalid Protect security entity: "
                    f"{entity_id}"
                )
            protected_camera_entities.add(entity_id)

    if enhanced_camera_policy:
        camera_policy_entities, private_protect_entities = (
            _protect_camera_entity_sets(
                entities,
                cameras,
                streams,
                camera_security,
                source_owned_camera_entities,
            )
        )
        protected_camera_entities = private_protect_entities
    else:
        camera_policy_entities = {
            key: {
                streams["cameras"][key]["medium_entity_id"],
                streams["cameras"][key]["high_entity_id"],
                *(
                    [streams["cameras"][key]["low_entity_id"]]
                    if streams["cameras"][key].get("low_entity_id")
                    else []
                ),
                *camera_security.get(key, []),
            }
            for key in cameras
        }

    profile_policies = access.get("profiles", {})
    valid_severities = {"informational", "advisory", "warning", "critical"}
    enhanced_streams = (
        streams["cameras"].items() if enhanced_camera_policy else ()
    )
    for camera_key, stream in enhanced_streams:
        if stream["activity_entity_id"] not in camera_security.get(camera_key, []):
            raise RuntimeError(
                f"Camera {camera_key} activity is not protected by account policy"
            )
        for profile_key in stream["notify_profiles"]:
            profile = profile_policies.get(profile_key)
            if (
                profile is None
                or not profile.get("is_family_member")
                or not profile.get("notify_entity_id")
                or camera_key
                not in _camera_keys_for_profile(
                    profile_key,
                    profile,
                    cameras,
                    bool(profile.get("is_owner")),
                )
            ):
                raise RuntimeError(
                    f"Camera {camera_key} alert recipient {profile_key} lacks access"
                )
        alerts = stream["alerts"]
        if set(alerts) != {"always", "when_empty"}:
            raise RuntimeError(f"Camera {camera_key} alert policy is invalid")
        for routing in alerts.values():
            if (
                not isinstance(routing, dict)
                or not set(routing.values()).issubset(valid_severities)
            ):
                raise RuntimeError(f"Camera {camera_key} alert severity is invalid")

    private_domains = private_health_domains | {
        entity_id.partition(".")[0]
        for entity_id in protected_camera_entities
    }
    family_unrestricted_domains = unrestricted_domains - private_domains
    family_public_entities = sorted(
        entity_id
        for entity_id in entities
        if entity_id.partition(".")[0] in private_domains
        and entity_id not in private_health_entities
        and entity_id not in protected_camera_entities
    )

    desired_groups = {}
    generated = config / "access/generated"
    generated.mkdir(parents=True, exist_ok=True)
    desired_generated = set()
    users_by_camera = {key: [] for key in cameras}
    owner_users = []
    household_users = []
    family_users = []
    desired_people = {}
    desired_tracker_owners = {}
    desired_notify_owners = {}

    for profile_key, profile in access.get("profiles", {}).items():
        user_id = profile["user_id"]
        user = users.get(user_id)
        if user is None:
            raise RuntimeError(f"Family profile {profile_key} user is missing")
        if usernames.get(user_id) != profile["username"]:
            raise RuntimeError(f"Family profile {profile_key} username changed")
        if bool(user.get("is_owner")) != bool(profile.get("is_owner", False)):
            raise RuntimeError(f"Family profile {profile_key} owner status changed")
        if user.get("is_owner"):
            owner_users.append(user_id)
        else:
            household_users.append(user_id)
        if profile.get("is_family_member"):
            family_users.append(user_id)

        notify_entity_id = profile.get("notify_entity_id")
        if notify_entity_id:
            notify_entity = entities.get(notify_entity_id)
            if (
                not isinstance(notify_entity_id, str)
                or not notify_entity_id.startswith("notify.")
                or notify_entity is None
                or notify_entity.get("platform") != "mobile_app"
                or notify_entity.get("disabled_by") is not None
            ):
                raise RuntimeError(
                    f"Family profile {profile_key} has an unavailable Companion App "
                    f"notification entity: {notify_entity_id}"
                )
            previous_owner = desired_notify_owners.setdefault(
                notify_entity_id, user_id
            )
            if previous_owner != user_id:
                raise RuntimeError(
                    f"Notification entity {notify_entity_id} is assigned to multiple "
                    "family accounts"
                )

        person_entity_id = profile.get("person_entity_id")
        if person_entity_id:
            if not person_entity_id.startswith("person."):
                raise RuntimeError(
                    f"Family profile {profile_key} has an invalid person entity"
                )
            person_id = profile.get(
                "person_id", person_entity_id.removeprefix("person.")
            )
            if not isinstance(person_id, str) or not person_id:
                raise RuntimeError(
                    f"Family profile {profile_key} has an invalid person ID"
                )
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

        allowed_keys = _camera_keys_for_profile(
            profile_key,
            profile,
            cameras,
            bool(user.get("is_owner")),
        )
        allowed_entities = [
            entity_id
            for key in allowed_keys
            for entity_id in sorted(camera_policy_entities[key])
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
                "policy": _family_entity_policy(
                    [
                        *allowed_entities,
                        *shared_calendars,
                        *sorted(
                            private_health_entities_by_profile.get(profile_key, set())
                        ),
                        *family_public_entities,
                    ],
                    family_unrestricted_domains,
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
    for name, user_ids in (
        ("calendar-owner-users.json", sorted(owner_users)),
        ("calendar-household-users.json", sorted(household_users)),
        ("family-members-users.json", sorted(family_users)),
    ):
        include = generated / name
        atomic_json(include, user_ids, mode=0o644)
        desired_generated.add(include.name)

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
        {"version": 3, "sha256": desired_hash},
        mode=0o644,
    )


def reconcile_dashboard_defaults(source: Path, config: Path) -> None:
    """Reconcile the system and family profile default dashboard panels."""
    access_path = source / "access/family-dashboard.json"
    access = json.loads(access_path.read_text())
    if access.get("version") != 3:
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
    if desired.get("version") not in {1, 2, 3} or not desired.get("cameras"):
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
        low_entity_id = camera.get("low_entity_id")
        if desired["version"] == 3 and (
            not low_entity_id or not low_entity_id.startswith("camera.")
        ):
            raise RuntimeError(f"Protect stream {camera_name} has no low entity")
        low = entities.get(low_entity_id)
        if low is not None and (
            low.get("platform") != "unifiprotect"
            or not low.get("unique_id", "").endswith("_2")
            or low.get("unique_id", "").removesuffix("_2")
            != entity["unique_id"].removesuffix("_0")
        ):
            raise RuntimeError(
                f"Protect stream {camera_name} has an invalid low entity"
            )
        qualities = set(camera.get("qualities", []))
        if "high" not in qualities or not qualities <= PROTECT_STREAM_QUALITIES:
            raise RuntimeError(f"Protect stream {camera_name} has invalid qualities")
        if desired["version"] == 3 and camera.get("qualities") != [
            "high",
            "medium",
            "low",
        ]:
            raise RuntimeError(
                f"Protect stream {camera_name} must declare adaptive qualities"
            )


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


def _coordinates(value: object) -> tuple[float, float]:
    """Parse a private latitude/longitude pair stored by a config entry."""
    if not isinstance(value, str):
        raise RuntimeError("Commute destination is not a static coordinate pair")
    parts = [part.strip() for part in value.split(",")]
    if len(parts) != 2:
        raise RuntimeError("Commute destination is not a static coordinate pair")
    try:
        latitude, longitude = (float(part) for part in parts)
    except ValueError as error:
        raise RuntimeError(
            "Commute destination is not a static coordinate pair"
        ) from error
    if not -90 <= latitude <= 90 or not -180 <= longitude <= 180:
        raise RuntimeError("Commute destination has invalid coordinates")
    return latitude, longitude


def reconcile_commute(source: Path, config: Path) -> None:
    """Make the private commute entry follow the owner's GPS tracker."""
    desired_path = source / "location/commute.json"
    desired = json.loads(desired_path.read_text())
    if desired.get("version") not in {2, 3}:
        raise RuntimeError("Unsupported commute configuration")

    config_entry_id = desired.get("config_entry_id")
    tracker_entity_id = desired.get("tracker_entity_id")
    to_work_entity_id = desired.get("to_work_entity_id")
    home_routes = desired.get("home_routes")
    proximities = desired.get("proximities", [])
    zone = desired.get("work_zone", {})
    private_work_zones = desired.get("private_work_zones", [])
    if (
        not isinstance(config_entry_id, str)
        or not isinstance(tracker_entity_id, str)
        or not tracker_entity_id.startswith("device_tracker.")
        or not isinstance(to_work_entity_id, str)
        or not to_work_entity_id.startswith("sensor.")
        or not isinstance(home_routes, list)
        or len(home_routes) != 3
        or not isinstance(proximities, list)
        or len(proximities) != 2
        or zone.get("id") != "work"
        or zone.get("name") != "Work"
        or not isinstance(zone.get("radius"), (int, float))
        or zone["radius"] <= 0
        or not isinstance(zone.get("icon"), str)
        or not isinstance(private_work_zones, list)
        or len(private_work_zones) != 2
    ):
        raise RuntimeError("Commute configuration is invalid")

    expected_proximities = {
        "zone.home": "Family arrivals",
        "zone.manzil_apartment": "Manzil Apartment arrivals",
    }
    proximity_ids = set()
    proximity_zones = set()
    for proximity in proximities:
        if (
            not isinstance(proximity, dict)
            or not isinstance(proximity.get("entry_id"), str)
            or not isinstance(proximity.get("title"), str)
            or not isinstance(proximity.get("zone_entity_id"), str)
            or not isinstance(proximity.get("tolerance"), int)
            or not 1 <= proximity["tolerance"] <= 100
        ):
            raise RuntimeError("Family proximity configuration is invalid")
        proximity_ids.add(proximity["entry_id"])
        proximity_zones.add(proximity["zone_entity_id"])
        if (
            expected_proximities.get(proximity["zone_entity_id"])
            != proximity["title"]
        ):
            raise RuntimeError("Family proximity destination is invalid")
    if (
        len(proximity_ids) != len(proximities)
        or proximity_zones != set(expected_proximities)
    ):
        raise RuntimeError("Family proximity destinations must be unique")

    resolved_private_zones = []
    private_profiles = set()
    private_names = set()
    for private_zone in private_work_zones:
        if not isinstance(private_zone, dict):
            raise RuntimeError("Private work zone is invalid")
        profile_key = private_zone.get("profile_key")
        name = private_zone.get("name")
        coordinates_env = private_zone.get("coordinates_env")
        radius = private_zone.get("radius")
        icon = private_zone.get("icon")
        if (
            not isinstance(profile_key, str)
            or not isinstance(name, str)
            or not isinstance(coordinates_env, str)
            or not coordinates_env.endswith("_WORK_COORDINATES")
            or not isinstance(radius, (int, float))
            or radius <= 0
            or not isinstance(icon, str)
        ):
            raise RuntimeError(f"Private work zone {profile_key!r} is invalid")
        private_latitude, private_longitude = _coordinates(
            os.environ.get(coordinates_env)
        )
        private_profiles.add(profile_key)
        private_names.add(name)
        resolved_private_zones.append(
            {
                "name": name,
                "latitude": private_latitude,
                "longitude": private_longitude,
                "radius": float(radius),
                "passive": False,
                "icon": icon,
            }
        )
    if (
        private_profiles != {"krishna", "manisha"}
        or len(private_names) != len(private_work_zones)
    ):
        raise RuntimeError("Private family work zones must be unique")

    storage = config / ".storage"
    entries_path = storage / "core.config_entries"
    entities_path = storage / "core.entity_registry"
    if not entries_path.exists() or not entities_path.exists():
        raise RuntimeError("Home Assistant commute registry storage is missing")

    entries_document = json.loads(entries_path.read_text())
    matches = [
        entry
        for entry in entries_document.get("data", {}).get("entries", [])
        if entry.get("entry_id") == config_entry_id
        and entry.get("domain") == "google_travel_time"
    ]
    if len(matches) != 1:
        raise RuntimeError(
            "Expected exactly one Google Travel Time commute entry; "
            f"found {len(matches)}"
        )
    entry = matches[0]
    data = entry.get("data", {})
    if not data.get("api_key"):
        raise RuntimeError("Google Travel Time commute entry has no API key")
    latitude, longitude = _coordinates(data.get("destination"))

    entities = {
        item["entity_id"]: item
        for item in json.loads(entities_path.read_text())
        .get("data", {})
        .get("entities", [])
    }
    migration_sources = {
        migration["new_entity_id"]: migration["old_entity_id"]
        for migration in load_entity_migrations(source)
    }
    tracker = entities.get(tracker_entity_id)
    to_work = entities.get(to_work_entity_id)
    if (
        tracker is None
        or tracker.get("platform") != "mobile_app"
        or tracker.get("disabled_by") is not None
    ):
        raise RuntimeError("Commute tracker is not an enabled mobile-app entity")
    if (
        to_work is None
        or to_work.get("platform") != "google_travel_time"
        or to_work.get("config_entry_id") != config_entry_id
        or to_work.get("disabled_by") is not None
    ):
        raise RuntimeError("Commute-to-work sensor does not match its config entry")

    route_profiles = set()
    route_people = set()
    route_trackers = set()
    route_sensors = set()
    for route in home_routes:
        if not isinstance(route, dict):
            raise RuntimeError("Home commute route is invalid")
        profile_key = route.get("profile_key")
        person_entity_id = route.get("person_entity_id")
        route_tracker_id = route.get("tracker_entity_id")
        to_home_entity_id = route.get("to_home_entity_id")
        direction_entity_id = route.get("direction_entity_id")
        to_manzil_entity_id = route.get("to_manzil_entity_id")
        manzil_direction_entity_id = route.get("manzil_direction_entity_id")
        route_tracker = entities.get(route_tracker_id)
        person_entity = entities.get(person_entity_id) or entities.get(
            migration_sources.get(person_entity_id)
        )
        if (
            not isinstance(profile_key, str)
            or not isinstance(person_entity_id, str)
            or not person_entity_id.startswith("person.")
            or person_entity is None
            or person_entity.get("platform") != "person"
            or not isinstance(route_tracker_id, str)
            or route_tracker is None
            or route_tracker.get("platform") != "mobile_app"
            or route_tracker.get("disabled_by") is not None
            or not isinstance(to_home_entity_id, str)
            or not to_home_entity_id.startswith("sensor.")
            or not isinstance(direction_entity_id, str)
            or not direction_entity_id.startswith("sensor.family_arrivals_")
            or not isinstance(to_manzil_entity_id, str)
            or not to_manzil_entity_id.startswith("sensor.")
            or not isinstance(manzil_direction_entity_id, str)
            or not manzil_direction_entity_id.startswith(
                "sensor.manzil_apartment_arrivals_"
            )
        ):
            raise RuntimeError(f"Home commute route {profile_key!r} is invalid")
        route_profiles.add(profile_key)
        route_people.add(person_entity_id)
        route_trackers.add(route_tracker_id)
        route_sensors.update(
            (
                to_home_entity_id,
                direction_entity_id,
                to_manzil_entity_id,
                manzil_direction_entity_id,
            )
        )
    if (
        len(route_profiles) != len(home_routes)
        or len(route_people) != len(home_routes)
        or len(route_trackers) != len(home_routes)
        or len(route_sensors) != len(home_routes) * 4
        or tracker_entity_id not in route_trackers
    ):
        raise RuntimeError("Home commute routes must be unique")

    changed = False
    if data.get("origin") != tracker_entity_id:
        data["origin"] = tracker_entity_id
        changed = True
    if entry.get("pref_disable_polling") is not True:
        entry["pref_disable_polling"] = True
        changed = True

    for proximity in proximities:
        proximity_entries = [
            item
            for item in entries_document.get("data", {}).get("entries", [])
            if item.get("domain") == "proximity"
            and (
                item.get("entry_id") == proximity["entry_id"]
                or item.get("data", {}).get("zone")
                == proximity["zone_entity_id"]
            )
        ]
        if len(proximity_entries) > 1 or (
            proximity_entries
            and proximity_entries[0].get("entry_id") != proximity["entry_id"]
        ):
            raise RuntimeError(
                f"A different {proximity['title']} proximity entry already exists"
            )
        proximity_data = {
            "zone": proximity["zone_entity_id"],
            "tracked_entities": [
                route["person_entity_id"] for route in home_routes
            ],
            "ignored_zones": [],
            "tolerance": proximity["tolerance"],
        }
        if proximity_entries:
            proximity_entry = proximity_entries[0]
            if proximity_entry.get("title") != proximity["title"]:
                proximity_entry["title"] = proximity["title"]
                changed = True
            if proximity_entry.get("data") != proximity_data:
                proximity_entry["data"] = proximity_data
                changed = True
        else:
            entries_document["data"]["entries"].append(
                {
                    "created_at": "2026-08-14T00:00:00+00:00",
                    "data": proximity_data,
                    "disabled_by": None,
                    "discovery_keys": {},
                    "domain": "proximity",
                    "entry_id": proximity["entry_id"],
                    "minor_version": 1,
                    "modified_at": "2026-08-14T00:00:00+00:00",
                    "options": {},
                    "pref_disable_new_entities": False,
                    "pref_disable_polling": False,
                    "source": "user",
                    "subentries": [],
                    "title": proximity["title"],
                    "unique_id": None,
                    "version": 1,
                }
            )
            changed = True

    desired_hash = sha256(desired_path)[:12]
    if changed:
        backup = config / (
            f"backups/core.config_entries.pre-commute-{desired_hash}"
        )
        backup.parent.mkdir(parents=True, exist_ok=True)
        if not backup.exists():
            shutil.copy2(entries_path, backup)
        atomic_json(entries_path, entries_document)

    private_package = config / PRIVATE_COMMUTE_PACKAGE
    private_document = {
        "zone": [
            {
                "name": zone["name"],
                "latitude": latitude,
                "longitude": longitude,
                "radius": float(zone["radius"]),
                "passive": False,
                "icon": zone["icon"],
            },
            *resolved_private_zones,
        ]
    }
    package_changed = (
        not private_package.exists()
        or json.loads(private_package.read_text()) != private_document
    )
    if package_changed:
        atomic_json(private_package, private_document, mode=0o600)

    if changed or package_changed:
        print("Reconciled private Work zones and dual-home commute routing")
    else:
        print("Private Work zones and dual-home commute routing are already current")


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
    validate_household_policy(source)
    validate_room_model(source)
    validate_entity_migrations(source, config)
    sync_source_files(source, config)
    initialize_mutable_yaml(source, config)
    install_hacs(manifest, config)
    install_assets(manifest, config)
    install_custom_integrations(manifest, config)
    migrate_areas(source, config)
    remove_legacy_household_entities(config)
    reconcile_home_location(source, config)
    reconcile_commute(source, config)
    reconcile_nut(source, config)
    reconcile_google_translate_tts(source, config)
    validate_protect_streams(source, config)
    reconcile_family_access(source, config)
    generate_family_rooms_manifest(source, config)
    reconcile_dashboard_defaults(source, config)
    remove_storage_dashboards(config)


if __name__ == "__main__":
    main()
