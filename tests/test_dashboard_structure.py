from pathlib import Path
import unittest


ROOT = Path(__file__).parents[1]


class DashboardStructureTests(unittest.TestCase):
    def test_every_dashboard_view_uses_shared_navigation(self):
        home = (ROOT / "dashboards/home-tablet.yaml").read_text()
        rack = (ROOT / "dashboards/rack-admin.yaml").read_text()

        self.assertEqual(
            home.count(
                "&family_navigation !include includes/family-navigation.yaml"
            ),
            1,
        )
        self.assertEqual(home.count("- *family_navigation"), 3)
        self.assertEqual(
            rack.count("- !include includes/family-navigation.yaml"), 1
        )

    def test_shared_navigation_contains_admin_and_family_routes(self):
        navigation = (
            ROOT / "dashboards/includes/family-navigation.yaml"
        ).read_text()
        labels = [
            line.removeprefix("    label: ")
            for line in navigation.splitlines()
            if line.startswith("    label: ")
        ]

        self.assertEqual(
            labels, ["Home", "Rooms", "Cameras", "Music", "Rack", "Settings"]
        )
        self.assertNotIn("return Boolean(user?.is_admin);", navigation)
        self.assertEqual(navigation.count("return !user?.is_admin;"), 2)

    def test_washer_card_is_read_only_and_uses_verified_entities(self):
        home = (ROOT / "dashboards/home-tablet.yaml").read_text()

        self.assertIn("template: family_washer_status", home)
        self.assertIn("entity: sensor.front_load_washer_current_status", home)
        self.assertIn("sensor.front_load_washer_remaining_time", home)
        self.assertIn("sensor.front_load_washer_total_time", home)
        washer_template = home.split("  family_washer_status:", 1)[1].split(
            "\nviews:", 1
        )[0]
        self.assertEqual(washer_template.count("action: none"), 3)

    def test_header_prioritizes_a_useful_family_note(self):
        home = (ROOT / "dashboards/home-tablet.yaml").read_text()
        header = home.split("    header:", 1)[1].split("    badges:", 1)[0]

        self.assertNotIn("Family note:", header)
        self.assertIn("sensor.front_load_washer_current_status", header)
        self.assertIn("calendar.family", header)
        self.assertIn("sensor.home_apparent_temperature", header)
        self.assertIn("sensor.home_thunderstorm_probability", header)
        self.assertIn("todo.shopping_list", header)
        self.assertIn("input_text.family_household_notice", header)
        self.assertIn("input_boolean.family_household_notice_expires", header)
        self.assertIn("notice_state in ['unknown', 'unavailable']", header)
        self.assertNotIn("All available fans are off", header)

    def test_home_is_composed_as_a_family_console(self):
        home = (ROOT / "dashboards/home-tablet.yaml").read_text()
        home_view = home.split("  - title: Home", 1)[1].split(
            "  - title: Rooms", 1
        )[0]

        self.assertIn(
            'grid-template-areas: \'"weather presence today activity attention"\'',
            home_view,
        )
        self.assertIn("heading: Today", home_view)
        self.assertIn("template: family_household_notice", home_view)
        self.assertIn("template: family_media_hub", home_view)
        self.assertIn("heading: Favourite rooms", home_view)
        self.assertIn(
            "entities: [fan.living_room_fan_1, fan.living_room_fan_2]",
            home_view,
        )
        self.assertIn(":host { grid-column: span 2; }", home_view)
        self.assertIn("camera.g5_turret_ultra_high_resolution_channel", home_view)
        self.assertNotIn("name: Living Fan 1", home_view)
        self.assertNotIn("name: Living Fan 2", home_view)

    def test_family_notice_helpers_are_git_owned(self):
        package = (ROOT / "packages/family_console.yaml").read_text()

        self.assertIn("family_household_notice:", package)
        self.assertIn("family_household_notice_expires:", package)
        self.assertIn("family_household_notice_until:", package)


if __name__ == "__main__":
    unittest.main()
