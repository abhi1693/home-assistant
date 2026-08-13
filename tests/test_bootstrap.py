import hashlib
import json
import tarfile
import tempfile
import unittest
from pathlib import Path

import bootstrap


class BootstrapTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.root = Path(self.temporary.name)
        self.source = self.root / "source"
        self.config = self.root / "config"
        self.source.mkdir()
        self.config.mkdir()

    def tearDown(self):
        self.temporary.cleanup()

    def write(self, relative_path, content):
        path = self.source / relative_path
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(content)

    def test_sync_replaces_owned_files_and_removes_only_stale_owned_files(self):
        self.write("configuration.yaml", "default_config:\n")
        self.write("dashboards/home.yaml", "views: []\n")
        self.write("www/bubble/bubble-modules.yaml", "modules: {}\n")
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
                    "version": 1,
                    "cameras": {
                        "master-bedroom": "camera.master_bedroom",
                        "hallway": "camera.hallway",
                    },
                    "profiles": {
                        "owner": {
                            "user_id": owner_id,
                            "user_name": "Owner",
                            "person_entity_id": "person.owner",
                            "is_owner": True,
                            "cameras": ["master-bedroom", "hallway"],
                        },
                        "reviewer": {
                            "user_id": reviewer_id,
                            "user_name": "Reviewer",
                            "person_entity_id": None,
                            "is_owner": False,
                            "enforce_camera_policy": True,
                            "cameras": ["master-bedroom"],
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
            {"camera.master_bedroom": True},
        )
        self.assertEqual(group["policy"]["entities"]["domains"], {"camera": {}})
        self.assertEqual(group["policy"]["entities"]["all"], True)
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
        self.assertTrue(
            next((self.config / "backups").glob("auth.pre-family-access-*"))
        )

        bootstrap.reconcile_family_access(self.source, self.config)
        self.assertEqual(json.loads((storage / "auth").read_text()), reconciled)

    def test_family_access_rejects_owner_policy_enforcement(self):
        self.write(
            "access/family-dashboard.json",
            json.dumps(
                {
                    "version": 1,
                    "cameras": {"inside": "camera.inside"},
                    "profiles": {
                        "owner": {
                            "user_id": "owner-user-id",
                            "user_name": "Owner",
                            "person_entity_id": "person.owner",
                            "is_owner": True,
                            "enforce_camera_policy": True,
                            "cameras": ["inside"],
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
                            }
                        ]
                    }
                }
            )
        )

        with self.assertRaisesRegex(RuntimeError, "Cannot enforce camera policy"):
            bootstrap.reconcile_family_access(self.source, self.config)


if __name__ == "__main__":
    unittest.main()
