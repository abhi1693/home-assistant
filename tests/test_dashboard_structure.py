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
        self.assertEqual(home.count("- *family_navigation"), 2)
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

        self.assertEqual(labels, ["Home", "Rooms", "Cameras", "Rack", "Settings"])
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
        header = home.split("  - title: Home", 1)[1].split(
            "  - title: Rooms", 1
        )[0]

        self.assertNotIn("Family note:", header)
        self.assertIn("sensor.front_load_washer_current_status", header)
        self.assertIn("calendar.family", header)
        self.assertIn("sensor.home_apparent_temperature", header)
        self.assertIn("sensor.home_thunderstorm_probability", header)
        self.assertIn("todo.shopping_list", header)
        self.assertIn("input_text.family_household_notice", header)
        self.assertIn("input_boolean.family_household_notice_expires", header)
        self.assertIn("notice_state in ['unknown', 'unavailable']", header)
        self.assertIn("now().strftime('%-I:%M %p')", header)
        self.assertIn("event_days == 0", header)
        self.assertIn("event_days == 1", header)
        self.assertIn("Home is empty", header)
        self.assertIn("Nothing at home needs attention this evening", header)
        self.assertNotIn("Nobody home", header)
        self.assertNotIn("avoid the afternoon heat", header)
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
        self.assertIn("type: custom:family-announcement-card", home_view)
        self.assertIn("title: Announcements", home_view)
        self.assertNotIn("name: Notice expiry", home_view)
        self.assertIn("template: family_media_hub", home_view)
        self.assertIn("sensor.music_assistant_session_*", home_view)
        self.assertIn("heading: Favourite rooms", home_view)
        self.assertIn(
            "entities: [fan.living_room_fan_1, fan.living_room_fan_2]",
            home_view,
        )
        self.assertIn('aspect_ratio: "32:9"', home_view)
        self.assertIn("aspect_ratio: 32 / 9", home_view)
        self.assertIn("camera-outside-users.json", home_view)
        self.assertIn("camera.g5_turret_ultra_high_resolution_channel", home_view)
        self.assertIn("user?.id === '9302d11f48c64fe796a3c9e5cb563650'", home)
        self.assertIn("user?.id === '8117b77542614a06b4672a8ae1a979b5'", home)
        self.assertIn("user?.id === '734722ec932a41a68d47553b6c2f7f5d'", home)
        self.assertIn("sensor.iphone_battery_level", home)
        self.assertNotIn("name: Living Fan 1", home_view)
        self.assertNotIn("name: Living Fan 2", home_view)

        navigation = (
            ROOT / "dashboards/includes/family-navigation.yaml"
        ).read_text()
        self.assertNotIn("  - title: Music", home)
        self.assertNotIn("path: music", home)
        self.assertNotIn("/home-tablet/music", navigation)
        self.assertNotIn("label: Music", navigation)

    def test_family_announcement_helpers_and_composer_are_git_owned(self):
        package = (ROOT / "packages/family_console.yaml").read_text()
        composer = (ROOT / "www/family-announcement-card.js").read_text()

        self.assertIn("family_household_notice:", package)
        self.assertIn("family_household_notice_expires:", package)
        self.assertIn("family_household_notice_until:", package)
        self.assertIn("name: Announcements", package)
        self.assertIn('customElements.define("family-announcement-card"', composer)
        self.assertIn('callService("input_text", "set_value"', composer)
        self.assertIn('callService("input_datetime", "set_datetime"', composer)
        self.assertIn('callService("input_boolean", "turn_on"', composer)

    def test_camera_wall_applies_each_camera_user_gate(self):
        home = (ROOT / "dashboards/home-tablet.yaml").read_text()
        camera_view = home.split("  - title: Cameras", 1)[1]

        self.assertEqual(camera_view.count("type: custom:auto-entities"), 3)
        for camera_key in ("outside", "master-bedroom", "hallway"):
            self.assertEqual(
                camera_view.count(f"camera-{camera_key}-users.json"), 1
            )


if __name__ == "__main__":
    unittest.main()
