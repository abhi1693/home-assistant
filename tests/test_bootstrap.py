import hashlib
import json
import tarfile
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import bootstrap


class BootstrapTests(unittest.TestCase):
    def setUp(self):
        self.environment = patch.dict(
            "os.environ",
            {
                "KRISHNA_WORK_COORDINATES": "28.57,77.06",
                "MANISHA_WORK_COORDINATES": "28.46,77.04",
            },
        )
        self.environment.start()
        self.temporary = tempfile.TemporaryDirectory()
        self.root = Path(self.temporary.name)
        self.source = self.root / "source"
        self.config = self.root / "config"
        self.source.mkdir()
        self.config.mkdir()

    def tearDown(self):
        self.temporary.cleanup()
        self.environment.stop()

    def write(self, relative_path, content):
        path = self.source / relative_path
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(content)

    def commute_desired(self):
        return {
            "version": 1,
            "config_entry_id": "travel-entry",
            "tracker_entity_id": "device_tracker.owner_phone",
            "to_work_entity_id": "sensor.owner_to_work",
            "home_routes": [
                {
                    "profile_key": "owner",
                    "person_entity_id": "person.owner",
                    "tracker_entity_id": "device_tracker.owner_phone",
                    "to_home_entity_id": "sensor.owner_to_home",
                    "direction_entity_id": (
                        "sensor.family_arrivals_owner_direction_of_travel"
                    ),
                },
                {
                    "profile_key": "krishna",
                    "person_entity_id": "person.krishna",
                    "tracker_entity_id": "device_tracker.krishna_phone",
                    "to_home_entity_id": "sensor.krishna_to_home",
                    "direction_entity_id": (
                        "sensor.family_arrivals_krishna_direction_of_travel"
                    ),
                },
                {
                    "profile_key": "manisha",
                    "person_entity_id": "person.manisha",
                    "tracker_entity_id": "device_tracker.manisha_phone",
                    "to_home_entity_id": "sensor.manisha_to_home",
                    "direction_entity_id": (
                        "sensor.family_arrivals_manisha_direction_of_travel"
                    ),
                },
            ],
            "proximity": {
                "entry_id": "proximity-entry",
                "title": "Family arrivals",
                "zone_entity_id": "zone.home",
                "tolerance": 100,
            },
            "work_zone": {
                "id": "work",
                "name": "Work",
                "radius": 150,
                "icon": "mdi:briefcase",
            },
            "private_work_zones": [
                {
                    "profile_key": "krishna",
                    "name": "Krishna Work",
                    "coordinates_env": "KRISHNA_WORK_COORDINATES",
                    "radius": 150,
                    "icon": "mdi:briefcase",
                },
                {
                    "profile_key": "manisha",
                    "name": "Manisha Work",
                    "coordinates_env": "MANISHA_WORK_COORDINATES",
                    "radius": 150,
                    "icon": "mdi:briefcase",
                },
            ],
        }

    def commute_entities(self):
        entities = [
            {
                "entity_id": "sensor.owner_to_work",
                "platform": "google_travel_time",
                "config_entry_id": "travel-entry",
                "disabled_by": None,
            }
        ]
        for person, tracker in (
            ("owner", "owner_phone"),
            ("krishna", "krishna_phone"),
            ("manisha", "manisha_phone"),
        ):
            entities.extend(
                [
                    {
                        "entity_id": f"person.{person}",
                        "platform": "person",
                        "disabled_by": None,
                    },
                    {
                        "entity_id": f"device_tracker.{tracker}",
                        "platform": "mobile_app",
                        "disabled_by": None,
                    },
                ]
            )
        return entities

    def test_sync_replaces_owned_files_and_removes_only_stale_owned_files(self):
        self.write("configuration.yaml", "default_config:\n")
        self.write("dashboards/home.yaml", "views: []\n")
        self.write("location/home.json", '{"version": 1}\n')
        self.write("www/bubble/bubble-modules.yaml", "modules: {}\n")
        self.write("www/family-announcements-card.js", "export default {};\n")
        self.write("www/family-responsive-grid-card.js", "export default {};\n")
        self.write("www/family-room-card.js", "export default {};\n")
        self.write("www/family-agenda-card.js", "export default {};\n")
        self.write(
            "custom_components/family_dashboard_guard/__init__.py",
            "VALUE = 1\n",
        )
        (self.config / "dashboards").mkdir()
        (self.config / "dashboards/stale.yaml").write_text("stale\n")
        (self.config / "dashboards/user.yaml").write_text("keep\n")
        stale_component = self.config / "custom_components/stale"
        stale_component.mkdir(parents=True)
        (stale_component / "__init__.py").write_text("stale\n")
        (self.config / bootstrap.MANAGED_STATE).write_text(
            json.dumps(
                {
                    "files": {
                        "dashboards/stale.yaml": "old",
                        "custom_components/stale/__init__.py": "old",
                    }
                }
            )
        )

        bootstrap.sync_source_files(self.source, self.config)

        self.assertEqual(
            (self.config / "configuration.yaml").read_text(), "default_config:\n"
        )
        self.assertEqual(
            (self.config / "dashboards/home.yaml").read_text(), "views: []\n"
        )
        self.assertEqual(
            (self.config / "location/home.json").read_text(), '{"version": 1}\n'
        )
        self.assertFalse((self.config / "dashboards/stale.yaml").exists())
        self.assertTrue((self.config / "dashboards/user.yaml").exists())
        self.assertEqual(
            (
                self.config / "custom_components/family_dashboard_guard/__init__.py"
            ).read_text(),
            "VALUE = 1\n",
        )
        self.assertFalse((stale_component / "__init__.py").exists())
        self.assertEqual(
            (self.config / "www/bubble/bubble-modules.yaml").read_text(),
            "modules: {}\n",
        )
        self.assertEqual(
            (self.config / "www/family-announcements-card.js").read_text(),
            "export default {};\n",
        )
        self.assertEqual(
            (self.config / "www/family-responsive-grid-card.js").read_text(),
            "export default {};\n",
        )
        self.assertEqual(
            (self.config / "www/family-room-card.js").read_text(),
            "export default {};\n",
        )
        self.assertEqual(
            (self.config / "www/family-agenda-card.js").read_text(),
            "export default {};\n",
        )

    def test_automation_reset_is_one_time_and_backed_up(self):
        self.write("automations.yaml", "[]\n")
        self.write("scripts.yaml", "{}\n")
        self.write("scenes.yaml", "{}\n")
        (self.config / "automations.yaml").write_text("- id: old\n")

        bootstrap.initialize_mutable_yaml(self.source, self.config)
        self.assertEqual((self.config / "automations.yaml").read_text(), "[]\n")
        self.assertEqual(
            (self.config / "backups/automations.pre-2026-08-13-reset.yaml").read_text(),
            "- id: old\n",
        )

        (self.config / "automations.yaml").write_text("- id: new\n")
        bootstrap.initialize_mutable_yaml(self.source, self.config)
        self.assertEqual((self.config / "automations.yaml").read_text(), "- id: new\n")

    def test_storage_dashboards_are_backed_up_and_removed_once(self):
        storage = self.config / ".storage"
        storage.mkdir()
        registry = {
            "version": 1,
            "minor_version": 1,
            "key": "lovelace_dashboards",
            "data": {"items": [{"id": "map", "title": "Map"}]},
        }
        (storage / "lovelace_dashboards").write_text(json.dumps(registry))
        (storage / "lovelace.map").write_text("{}\n")

        bootstrap.remove_storage_dashboards(self.config)

        cleaned = json.loads((storage / "lovelace_dashboards").read_text())
        self.assertEqual(cleaned["data"]["items"], [])
        self.assertFalse((storage / "lovelace.map").exists())
        self.assertTrue(
            (
                self.config / "backups/lovelace_dashboards.pre-2026-08-13-cleanup"
            ).exists()
        )
        self.assertTrue(
            (self.config / "backups/lovelace.map.pre-2026-08-13-cleanup").exists()
        )

    def test_custom_integration_is_verified_installed_and_repaired(self):
        component = self.root / "archive-root/repository/custom_components/example"
        component.mkdir(parents=True)
        (component / "manifest.json").write_text('{"version": "1.0.0"}\n')
        (component / "sensor.py").write_text("VALUE = 1\n")
        archive = self.root / "integration.tar.gz"
        with tarfile.open(archive, "w:gz") as bundle:
            bundle.add(self.root / "archive-root/repository", arcname="repository")
        archive_hash = hashlib.sha256(archive.read_bytes()).hexdigest()
        manifest = {
            "custom_integrations": [
                {
                    "name": "Example",
                    "version": "1.0.0",
                    "url": archive.as_uri(),
                    "sha256": archive_hash,
                    "source_subdirectory": "custom_components/example",
                    "destination": "custom_components/example",
                }
            ]
        }

        existing = self.config / "custom_components/example"
        existing.mkdir(parents=True)
        (existing / "stale.py").write_text("STALE = True\n")

        bootstrap.install_custom_integrations(manifest, self.config)
        installed = self.config / "custom_components/example/sensor.py"
        self.assertEqual(installed.read_text(), "VALUE = 1\n")
        self.assertFalse((existing / "stale.py").exists())

        installed.write_text("VALUE = 2\n")
        bootstrap.install_custom_integrations(manifest, self.config)
        self.assertEqual(installed.read_text(), "VALUE = 1\n")

    def test_family_access_is_validated_generated_and_enforced(self):
        owner_id = "owner-user-id"
        reviewer_id = "reviewer-user-id"
        self.write(
            "access/family-dashboard.json",
            json.dumps(
                {
                    "version": 2,
                    "cameras": {
                        "master-bedroom": "camera.master_bedroom",
                        "hallway": "camera.hallway",
                    },
                    "calendars": {
                        "shared": ["calendar.birthdays"],
                        "owner_only": ["calendar.private"],
                    },
                    "profiles": {
                        "owner": {
                            "user_id": owner_id,
                            "username": "owner",
                            "person_entity_id": "person.owner",
                            "is_family_member": True,
                            "is_owner": True,
                            "cameras": ["master-bedroom", "hallway"],
                        },
                        "reviewer": {
                            "user_id": reviewer_id,
                            "username": "reviewer",
                            "person_entity_id": None,
                            "is_family_member": False,
                            "is_owner": False,
                            "enforce_camera_policy": True,
                            "cameras": ["master-bedroom"],
                        },
                    },
                }
            ),
        )
        self.write(
            "access/protect-streams.json",
            json.dumps(
                {
                    "version": 1,
                    "cameras": {
                        "master-bedroom": {
                            "high_entity_id": "camera.master_bedroom",
                            "medium_entity_id": "camera.master_bedroom_medium",
                            "qualities": ["high", "medium"],
                        },
                        "hallway": {
                            "high_entity_id": "camera.hallway",
                            "medium_entity_id": "camera.hallway_medium",
                            "qualities": ["high", "medium"],
                        },
                    },
                }
            ),
        )
        storage = self.config / ".storage"
        storage.mkdir()
        auth = {
            "version": 1,
            "minor_version": 1,
            "key": "auth",
            "data": {
                "groups": [
                    {"id": "system-admin", "name": "Administrators"},
                    {"id": "system-users", "name": "Users"},
                ],
                "users": [
                    {
                        "id": owner_id,
                        "name": "Owner",
                        "is_owner": True,
                        "group_ids": ["system-admin"],
                    },
                    {
                        "id": reviewer_id,
                        "name": "Reviewer",
                        "is_owner": False,
                        "group_ids": ["system-users"],
                    },
                ],
                "credentials": [
                    {
                        "user_id": owner_id,
                        "auth_provider_type": "homeassistant",
                        "data": {"username": "owner"},
                    },
                    {
                        "user_id": reviewer_id,
                        "auth_provider_type": "homeassistant",
                        "data": {"username": "reviewer"},
                    },
                ],
            },
        }
        person = {
            "version": 2,
            "minor_version": 1,
            "key": "person",
            "data": {
                "items": [
                    {
                        "id": "owner",
                        "name": "Owner",
                        "user_id": owner_id,
                        "device_trackers": [],
                    }
                ]
            },
        }
        entities = {
            "version": 1,
            "minor_version": 23,
            "key": "core.entity_registry",
            "data": {
                "entities": [
                    {
                        "entity_id": "camera.master_bedroom",
                        "platform": "unifiprotect",
                        "disabled_by": None,
                    },
                    {
                        "entity_id": "camera.hallway",
                        "platform": "unifiprotect",
                        "disabled_by": None,
                    },
                    {
                        "entity_id": "fan.office",
                        "platform": "atomberg",
                        "disabled_by": None,
                    },
                    {
                        "entity_id": "sensor.office_temperature",
                        "platform": "example",
                        "disabled_by": None,
                    },
                    {
                        "entity_id": "calendar.birthdays",
                        "platform": "google",
                        "disabled_by": None,
                    },
                    {
                        "entity_id": "calendar.private",
                        "platform": "google",
                        "disabled_by": None,
                    },
                ]
            },
        }
        (storage / "auth").write_text(json.dumps(auth))
        (storage / "person").write_text(json.dumps(person))
        (storage / "core.entity_registry").write_text(json.dumps(entities))

        bootstrap.reconcile_family_access(self.source, self.config)

        reconciled = json.loads((storage / "auth").read_text())
        reviewer = next(
            user for user in reconciled["data"]["users"] if user["id"] == reviewer_id
        )
        self.assertEqual(reviewer["group_ids"], ["family-access-reviewer"])
        group = next(
            group
            for group in reconciled["data"]["groups"]
            if group["id"] == "family-access-reviewer"
        )
        self.assertEqual(
            group["policy"]["entities"]["entity_ids"],
            {
                "camera.master_bedroom": True,
                "camera.master_bedroom_medium": True,
                "calendar.birthdays": True,
            },
        )
        self.assertEqual(
            group["policy"]["entities"]["domains"],
            {"fan": True, "sensor": True},
        )
        self.assertNotIn("calendar.private", group["policy"]["entities"]["entity_ids"])
        self.assertNotIn("calendar", group["policy"]["entities"]["domains"])
        self.assertNotIn("all", group["policy"]["entities"])
        self.assertEqual(
            json.loads(
                (self.config / "access/generated/camera-hallway-users.json").read_text()
            ),
            [owner_id],
        )
        self.assertEqual(
            json.loads(
                (
                    self.config
                    / "access/generated/camera-master-bedroom-users.json"
                ).read_text()
            ),
            [owner_id, reviewer_id],
        )
        self.assertEqual(
            json.loads(
                (self.config / "access/generated/camera-any-users.json").read_text()
            ),
            sorted([owner_id, reviewer_id]),
        )
        self.assertEqual(
            json.loads(
                (self.config / "access/generated/calendar-owner-users.json").read_text()
            ),
            [owner_id],
        )
        self.assertEqual(
            json.loads(
                (
                    self.config
                    / "access/generated/calendar-household-users.json"
                ).read_text()
            ),
            [reviewer_id],
        )
        self.assertEqual(
            json.loads(
                (self.config / "access/generated/family-members-users.json").read_text()
            ),
            [owner_id],
        )
        self.assertTrue(
            next((self.config / "backups").glob("auth.pre-family-access-*"))
        )

        bootstrap.reconcile_family_access(self.source, self.config)
        self.assertEqual(json.loads((storage / "auth").read_text()), reconciled)

    def test_family_access_creates_person_and_reassigns_device_trackers(self):
        owner_id = "owner-user-id"
        krishna_id = "krishna-user-id"
        self.write(
            "access/family-dashboard.json",
            json.dumps(
                {
                    "version": 2,
                    "cameras": {"master-bedroom": "camera.master_bedroom"},
                    "calendars": {
                        "shared": ["calendar.birthdays"],
                        "owner_only": ["calendar.private"],
                    },
                    "profiles": {
                        "owner": {
                            "user_id": owner_id,
                            "username": "owner",
                            "person_entity_id": "person.owner",
                            "person_name": "Owner",
                            "device_trackers": ["device_tracker.owner_phone"],
                            "is_owner": True,
                            "cameras": [],
                        },
                        "krishna": {
                            "user_id": krishna_id,
                            "username": "krishna",
                            "person_entity_id": "person.krishna",
                            "person_name": "Krishna",
                            "device_trackers": [
                                "device_tracker.pixel_10_pro",
                                "device_tracker.pixel_10_pro_2",
                            ],
                            "is_owner": False,
                            "enforce_camera_policy": True,
                            "cameras": ["master-bedroom"],
                        },
                    },
                }
            ),
        )
        self.write(
            "access/protect-streams.json",
            json.dumps(
                {
                    "version": 1,
                    "cameras": {
                        "master-bedroom": {
                            "high_entity_id": "camera.master_bedroom",
                            "medium_entity_id": "camera.master_bedroom_medium",
                            "qualities": ["high", "medium"],
                        }
                    },
                }
            ),
        )
        storage = self.config / ".storage"
        storage.mkdir()
        (storage / "auth").write_text(
            json.dumps(
                {
                    "data": {
                        "groups": [
                            {"id": "system-admin", "name": "Administrators"},
                            {"id": "system-users", "name": "Users"},
                        ],
                        "users": [
                            {
                                "id": owner_id,
                                "name": "Owner",
                                "is_owner": True,
                                "group_ids": ["system-admin"],
                            },
                            {
                                "id": krishna_id,
                                "name": "Krishna",
                                "is_owner": False,
                                "group_ids": ["system-users"],
                            },
                        ],
                        "credentials": [
                            {
                                "user_id": owner_id,
                                "auth_provider_type": "homeassistant",
                                "data": {"username": "owner"},
                            },
                            {
                                "user_id": krishna_id,
                                "auth_provider_type": "homeassistant",
                                "data": {"username": "krishna"},
                            },
                        ],
                    }
                }
            )
        )
        (storage / "person").write_text(
            json.dumps(
                {
                    "data": {
                        "items": [
                            {
                                "id": "owner",
                                "name": "Owner",
                                "user_id": owner_id,
                                "device_trackers": [
                                    "device_tracker.owner_phone",
                                    "device_tracker.pixel_10_pro",
                                    "device_tracker.pixel_10_pro_2",
                                ],
                            }
                        ]
                    }
                }
            )
        )
        (storage / "core.entity_registry").write_text(
            json.dumps(
                {
                    "data": {
                        "entities": [
                            {
                                "entity_id": "camera.master_bedroom",
                                "platform": "unifiprotect",
                                "disabled_by": None,
                            },
                            {
                                "entity_id": "calendar.birthdays",
                                "platform": "google",
                                "disabled_by": None,
                            },
                            {
                                "entity_id": "calendar.private",
                                "platform": "google",
                                "disabled_by": None,
                            },
                            *[
                                {
                                    "entity_id": entity_id,
                                    "platform": "mobile_app",
                                    "disabled_by": None,
                                }
                                for entity_id in (
                                    "device_tracker.owner_phone",
                                    "device_tracker.pixel_10_pro",
                                    "device_tracker.pixel_10_pro_2",
                                )
                            ],
                        ]
                    }
                }
            )
        )

        bootstrap.reconcile_family_access(self.source, self.config)

        people = {
            item["id"]: item
            for item in json.loads((storage / "person").read_text())["data"][
                "items"
            ]
        }
        self.assertEqual(
            people["owner"]["device_trackers"], ["device_tracker.owner_phone"]
        )
        self.assertEqual(
            people["krishna"],
            {
                "id": "krishna",
                "name": "Krishna",
                "user_id": krishna_id,
                "device_trackers": [
                    "device_tracker.pixel_10_pro",
                    "device_tracker.pixel_10_pro_2",
                ],
                "picture": None,
            },
        )
        self.assertEqual(
            json.loads(
                (
                    self.config
                    / "access/generated/camera-master-bedroom-users.json"
                ).read_text()
            ),
            [krishna_id],
        )
        self.assertTrue(
            next((self.config / "backups").glob("person.pre-family-access-*"))
        )

        bootstrap.reconcile_family_access(self.source, self.config)
        self.assertEqual(
            json.loads((storage / "person").read_text())["data"]["items"],
            list(people.values()),
        )

    def test_repository_family_access_keeps_master_bedroom_for_krishna(self):
        access = json.loads(
            (Path(bootstrap.__file__).parent / "access/family-dashboard.json").read_text()
        )
        profiles = access["profiles"]
        self.assertEqual(
            profiles["krishna"]["device_trackers"],
            ["device_tracker.pixel_10_pro", "device_tracker.pixel_10_pro_2"],
        )
        self.assertEqual(profiles["manisha"]["username"], "manisha")
        self.assertEqual(profiles["manisha"]["person_entity_id"], "person.manisha")
        self.assertEqual(
            profiles["manisha"]["device_trackers"], ["device_tracker.iphone"]
        )
        self.assertEqual(
            profiles["abhimanyu-saharan"]["notify_entity_id"],
            "notify.abhimanyu_pixel_8",
        )
        self.assertEqual(
            profiles["krishna"]["notify_entity_id"], "notify.pixel_10_pro"
        )
        self.assertEqual(profiles["manisha"]["notify_entity_id"], "notify.iphone")
        self.assertEqual(profiles["manisha"]["cameras"], ["hallway", "outside"])
        self.assertTrue(profiles["manisha"]["enforce_camera_policy"])
        self.assertEqual(
            [
                profile_key
                for profile_key, profile in profiles.items()
                if "master-bedroom" in profile["cameras"]
            ],
            ["krishna"],
        )

    def test_family_access_rejects_owner_policy_enforcement(self):
        self.write(
            "access/family-dashboard.json",
            json.dumps(
                {
                    "version": 2,
                    "cameras": {"inside": "camera.inside"},
                    "calendars": {
                        "shared": ["calendar.birthdays"],
                        "owner_only": ["calendar.private"],
                    },
                    "profiles": {
                        "owner": {
                            "user_id": "owner-user-id",
                            "username": "owner",
                            "person_entity_id": "person.owner",
                            "is_owner": True,
                            "enforce_camera_policy": True,
                            "cameras": ["inside"],
                        }
                    },
                }
            ),
        )
        self.write(
            "access/protect-streams.json",
            json.dumps(
                {
                    "version": 1,
                    "cameras": {
                        "inside": {
                            "high_entity_id": "camera.inside",
                            "medium_entity_id": "camera.inside_medium",
                            "qualities": ["high", "medium"],
                        }
                    },
                }
            ),
        )
        storage = self.config / ".storage"
        storage.mkdir()
        (storage / "auth").write_text(
            json.dumps(
                {
                    "data": {
                        "groups": [],
                        "users": [
                            {
                                "id": "owner-user-id",
                                "name": "Owner",
                                "is_owner": True,
                                "group_ids": ["system-admin"],
                            }
                        ],
                        "credentials": [
                            {
                                "user_id": "owner-user-id",
                                "auth_provider_type": "homeassistant",
                                "data": {"username": "owner"},
                            }
                        ],
                    }
                }
            )
        )
        (storage / "person").write_text(
            json.dumps(
                {
                    "data": {
                        "items": [
                            {
                                "id": "owner",
                                "user_id": "owner-user-id",
                            }
                        ]
                    }
                }
            )
        )
        (storage / "core.entity_registry").write_text(
            json.dumps(
                {
                    "data": {
                        "entities": [
                            {
                                "entity_id": "camera.inside",
                                "platform": "unifiprotect",
                                "disabled_by": None,
                            },
                            {
                                "entity_id": "calendar.birthdays",
                                "platform": "google",
                                "disabled_by": None,
                            },
                            {
                                "entity_id": "calendar.private",
                                "platform": "google",
                                "disabled_by": None,
                            },
                        ]
                    }
                }
            )
        )

        with self.assertRaisesRegex(RuntimeError, "Cannot enforce camera policy"):
            bootstrap.reconcile_family_access(self.source, self.config)

    def test_dashboard_defaults_preserve_existing_frontend_preferences(self):
        owner_id = "owner-user-id"
        reviewer_id = "reviewer-user-id"
        self.write(
            "access/family-dashboard.json",
            json.dumps(
                {
                    "version": 2,
                    "default_dashboard": "home-tablet",
                    "profiles": {
                        "owner": {
                            "user_id": owner_id,
                            "default_dashboard": "home-tablet",
                        },
                        "reviewer": {
                            "user_id": reviewer_id,
                            "default_dashboard": "rack-admin",
                        },
                    },
                }
            ),
        )
        self.write(
            "dashboards/lovelace-dashboards.yaml",
            "home-tablet:\n  mode: yaml\nrack-admin:\n  mode: yaml\n",
        )
        storage = self.config / ".storage"
        storage.mkdir()
        (storage / "auth").write_text(
            json.dumps(
                {
                    "data": {
                        "users": [
                            {"id": owner_id},
                            {"id": reviewer_id},
                        ]
                    }
                }
            )
        )
        (storage / "frontend.system_data").write_text(
            json.dumps(
                {
                    "version": 1,
                    "minor_version": 1,
                    "key": "frontend.system_data",
                    "data": {"core": {"onboarded_version": "2026.4.4"}},
                }
            )
        )
        owner_preferences = storage / f"frontend.user_data_{owner_id}"
        owner_preferences.write_text(
            json.dumps(
                {
                    "version": 1,
                    "minor_version": 1,
                    "key": owner_preferences.name,
                    "data": {"theme": {"theme": "Family Dark"}},
                }
            )
        )

        bootstrap.reconcile_dashboard_defaults(self.source, self.config)

        system = json.loads((storage / "frontend.system_data").read_text())
        owner = json.loads(owner_preferences.read_text())
        reviewer = json.loads(
            (storage / f"frontend.user_data_{reviewer_id}").read_text()
        )
        self.assertEqual(system["data"]["core"]["default_panel"], "home-tablet")
        self.assertEqual(system["data"]["core"]["onboarded_version"], "2026.4.4")
        self.assertEqual(owner["data"]["core"]["default_panel"], "home-tablet")
        self.assertEqual(owner["data"]["theme"], {"theme": "Family Dark"})
        self.assertEqual(reviewer["data"]["core"]["default_panel"], "rack-admin")
        self.assertTrue(
            next(
                (self.config / "backups").glob(
                    "frontend.system_data.pre-default-dashboard-*"
                )
            )
        )

        bootstrap.reconcile_dashboard_defaults(self.source, self.config)
        self.assertEqual(json.loads(owner_preferences.read_text()), owner)

    def test_protect_streams_validate_high_entities_and_qualities(self):
        self.write(
            "access/protect-streams.json",
            json.dumps(
                {
                    "version": 1,
                    "cameras": {
                        "inside": {
                            "high_entity_id": "camera.inside_high_resolution_channel",
                            "medium_entity_id": "camera.inside_medium_resolution_channel",
                            "qualities": ["high", "medium"],
                        }
                    },
                }
            ),
        )
        storage = self.config / ".storage"
        storage.mkdir()
        (storage / "core.entity_registry").write_text(
            json.dumps(
                {
                    "data": {
                        "entities": [
                            {
                                "entity_id": "camera.inside_high_resolution_channel",
                                "platform": "unifiprotect",
                                "disabled_by": None,
                                "unique_id": "AABBCCDDEEFF_0",
                            }
                        ]
                    }
                }
            )
        )

        bootstrap.validate_protect_streams(self.source, self.config)

        desired = json.loads(
            (self.source / "access/protect-streams.json").read_text()
        )
        desired["cameras"]["inside"]["qualities"].append("ultra")
        (self.source / "access/protect-streams.json").write_text(
            json.dumps(desired)
        )
        with self.assertRaisesRegex(RuntimeError, "invalid qualities"):
            bootstrap.validate_protect_streams(self.source, self.config)

    def test_home_location_reconciles_weather_and_preserves_credentials(self):
        self.write(
            "location/home.json",
            json.dumps(
                {
                    "version": 1,
                    "name": "Home",
                    "address": "G3-012, Indiabulls Centrum Park",
                    "latitude": 28.4978819,
                    "longitude": 76.9830822,
                    "integration_locations": [
                        {
                            "domain": "google_weather",
                            "subentry_type": "location",
                            "title": "Home",
                        }
                    ],
                }
            ),
        )
        storage = self.config / ".storage"
        storage.mkdir()
        entries = {
            "version": 1,
            "minor_version": 1,
            "key": "core.config_entries",
            "data": {
                "entries": [
                    {
                        "entry_id": "weather-entry",
                        "domain": "google_weather",
                        "data": {"api_key": "keep-secret", "referrer": "keep"},
                        "subentries": [
                            {
                                "subentry_id": "home-location",
                                "subentry_type": "location",
                                "title": "Home",
                                "data": {
                                    "latitude": 28.5788649,
                                    "longitude": 77.0656272,
                                },
                            }
                        ],
                    }
                ]
            },
        }
        entries_path = storage / "core.config_entries"
        entries_path.write_text(json.dumps(entries))

        bootstrap.reconcile_home_location(self.source, self.config)

        reconciled = json.loads(entries_path.read_text())
        entry = reconciled["data"]["entries"][0]
        self.assertEqual(
            entry["data"], {"api_key": "keep-secret", "referrer": "keep"}
        )
        self.assertEqual(
            entry["subentries"][0]["data"],
            {"latitude": 28.4978819, "longitude": 76.9830822},
        )
        backup = next(
            (self.config / "backups").glob(
                "core.config_entries.pre-home-location-*"
            )
        )
        self.assertEqual(json.loads(backup.read_text()), entries)

        bootstrap.reconcile_home_location(self.source, self.config)
        self.assertEqual(json.loads(entries_path.read_text()), reconciled)

    def test_home_location_rejects_ambiguous_weather_locations(self):
        self.write(
            "location/home.json",
            json.dumps(
                {
                    "version": 1,
                    "name": "Home",
                    "address": "G3-012, Indiabulls Centrum Park",
                    "latitude": 28.4978819,
                    "longitude": 76.9830822,
                    "integration_locations": [
                        {
                            "domain": "google_weather",
                            "subentry_type": "location",
                            "title": "Home",
                        }
                    ],
                }
            ),
        )
        storage = self.config / ".storage"
        storage.mkdir()
        (storage / "core.config_entries").write_text(
            json.dumps(
                {
                    "data": {
                        "entries": [
                            {
                                "domain": "google_weather",
                                "subentries": [],
                            }
                        ]
                    }
                }
            )
        )

        with self.assertRaisesRegex(RuntimeError, "found 0"):
            bootstrap.reconcile_home_location(self.source, self.config)

    def test_commute_uses_mobile_gps_and_generates_private_work_zone(self):
        self.write(
            "location/commute.json",
            json.dumps(self.commute_desired()),
        )
        storage = self.config / ".storage"
        storage.mkdir()
        entries = {
            "data": {
                "entries": [
                    {
                        "entry_id": "travel-entry",
                        "domain": "google_travel_time",
                        "data": {
                            "api_key": "keep-secret",
                            "origin": "28.5, 77.0",
                            "destination": "28.4, 77.1",
                        },
                        "pref_disable_polling": False,
                    }
                ]
            }
        }
        entries_path = storage / "core.config_entries"
        entries_path.write_text(json.dumps(entries))
        (storage / "core.entity_registry").write_text(
            json.dumps({"data": {"entities": self.commute_entities()}})
        )

        bootstrap.reconcile_commute(self.source, self.config)

        reconciled = json.loads(entries_path.read_text())
        entry = reconciled["data"]["entries"][0]
        self.assertEqual(entry["data"]["api_key"], "keep-secret")
        self.assertEqual(entry["data"]["origin"], "device_tracker.owner_phone")
        self.assertEqual(entry["data"]["destination"], "28.4, 77.1")
        self.assertTrue(entry["pref_disable_polling"])
        proximity_entry = reconciled["data"]["entries"][1]
        self.assertEqual(proximity_entry["entry_id"], "proximity-entry")
        self.assertEqual(proximity_entry["domain"], "proximity")
        self.assertEqual(
            proximity_entry["data"],
            {
                "zone": "zone.home",
                "tracked_entities": [
                    "person.owner",
                    "person.krishna",
                    "person.manisha",
                ],
                "ignored_zones": [],
                "tolerance": 100,
            },
        )
        private_package = json.loads(
            (self.config / bootstrap.PRIVATE_COMMUTE_PACKAGE).read_text()
        )
        self.assertEqual(
            private_package,
            {
                "zone": [
                    {
                        "name": "Work",
                        "latitude": 28.4,
                        "longitude": 77.1,
                        "radius": 150.0,
                        "passive": False,
                        "icon": "mdi:briefcase",
                    },
                    {
                        "name": "Krishna Work",
                        "latitude": 28.57,
                        "longitude": 77.06,
                        "radius": 150.0,
                        "passive": False,
                        "icon": "mdi:briefcase",
                    },
                    {
                        "name": "Manisha Work",
                        "latitude": 28.46,
                        "longitude": 77.04,
                        "radius": 150.0,
                        "passive": False,
                        "icon": "mdi:briefcase",
                    },
                ]
            },
        )
        backup = next(
            (self.config / "backups").glob("core.config_entries.pre-commute-*")
        )
        self.assertEqual(json.loads(backup.read_text()), entries)

        bootstrap.reconcile_commute(self.source, self.config)
        self.assertEqual(json.loads(entries_path.read_text()), reconciled)

    def test_commute_rejects_an_entity_destination_for_private_zone(self):
        self.write(
            "location/commute.json",
            json.dumps(self.commute_desired()),
        )
        storage = self.config / ".storage"
        storage.mkdir()
        (storage / "core.config_entries").write_text(
            json.dumps(
                {
                    "data": {
                        "entries": [
                            {
                                "entry_id": "travel-entry",
                                "domain": "google_travel_time",
                                "data": {
                                    "api_key": "keep-secret",
                                    "origin": "device_tracker.owner_phone",
                                    "destination": "zone.work",
                                },
                            }
                        ]
                    }
                }
            )
        )
        (storage / "core.entity_registry").write_text(
            json.dumps({"data": {"entities": self.commute_entities()}})
        )

        with self.assertRaisesRegex(RuntimeError, "static coordinate pair"):
            bootstrap.reconcile_commute(self.source, self.config)


if __name__ == "__main__":
    unittest.main()
