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
        (self.config / "dashboards").mkdir()
        (self.config / "dashboards/stale.yaml").write_text("stale\n")
        (self.config / "dashboards/user.yaml").write_text("keep\n")
        (self.config / bootstrap.MANAGED_STATE).write_text(
            json.dumps({"files": {"dashboards/stale.yaml": "old"}})
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


if __name__ == "__main__":
    unittest.main()
