import re
import unittest
from pathlib import Path


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
        self.assertIn("state_attr('calendar.birthdays', 'message')", header)
        self.assertNotIn("state_attr('calendar.family',", header)
        self.assertIn("sensor.home_apparent_temperature", header)
        self.assertIn("sensor.home_thunderstorm_probability", header)
        self.assertIn("todo.shopping_list", header)
        self.assertNotIn("input_text.family_household_notice", header)
        self.assertNotIn("input_boolean.family_household_notice_expires", header)
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
        self.assertIn("heading: Coming up", home_view)
        self.assertIn("type: custom:family-agenda-card", home_view)
        self.assertIn("days: 14", home_view)
        self.assertIn("max_events: 4", home_view)
        self.assertIn("calendar-owner-users.json", home_view)
        self.assertIn("calendar-household-users.json", home_view)
        self.assertEqual(
            home_view.count("type: custom:family-announcements-card"), 1
        )
        self.assertIn("entity: sensor.family_announcements", home_view)
        self.assertGreater(
            home_view.index("type: custom:family-announcements-card"),
            home_view.rindex("type: custom:family-agenda-card"),
        )
        self.assertLess(
            home_view.index("type: custom:family-announcements-card"),
            home_view.index("type: custom:todo-swipe-card"),
        )
        self.assertNotIn("mode: banner", home_view)
        self.assertNotIn("mode: composer", home_view)
        self.assertNotIn("name: Notice expiry", home_view)
        self.assertIn("template: family_media_launchers", home_view)
        self.assertIn("sensor.music_assistant_session_*", home_view)
        self.assertIn("type: custom:family-responsive-grid-card", home_view)
        self.assertIn("return 'Music Assistant';", home)
        self.assertIn("`${status} on ${player}", home)
        self.assertIn("Jellyfin · ${viewer}", home)
        self.assertIn("` on ${player}`", home)
        self.assertIn("name: Open Music Assistant", home)
        self.assertIn("name: Open Jellyfin", home)
        self.assertLess(
            home_view.index("sensor.music_assistant_session_*"),
            home_view.index("template: family_media_launchers"),
        )
        self.assertIn("heading: Favourite rooms", home_view)
        self.assertIn(
            "entities: [fan.living_room_fan_1, fan.living_room_fan_2]",
            home_view,
        )
        self.assertIn('aspect_ratio: "32:9"', home_view)
        self.assertIn("- height: 88px", home)
        self.assertIn("camera-outside-users.json", home_view)
        self.assertIn("camera.g5_turret_ultra_high_resolution_channel", home_view)
        self.assertIn("user?.id === '9302d11f48c64fe796a3c9e5cb563650'", home)
        self.assertIn("user?.id === '8117b77542614a06b4672a8ae1a979b5'", home)
        self.assertIn("user?.id === '734722ec932a41a68d47553b6c2f7f5d'", home)
        self.assertIn("sensor.iphone_battery_level", home)
        self.assertIn('state_not: "off"', home_view)
        self.assertIn("state_not: unavailable", home_view)
        self.assertNotIn("name: Living Fan 1", home_view)
        self.assertNotIn("name: Living Fan 2", home_view)

        ribbon = home.split("  family_ribbon_today:", 1)[1].split(
            "\n  family_ribbon_activity:", 1
        )[0]
        self.assertIn("entity: sun.sun", ribbon)
        self.assertIn("name: afterSunset ? 'Sunrise' : 'Sunset'", ribbon)
        self.assertNotIn("Next event", ribbon)
        self.assertNotIn("entity?.attributes.message", ribbon)

        navigation = (
            ROOT / "dashboards/includes/family-navigation.yaml"
        ).read_text()
        self.assertNotIn("  - title: Music", home)
        self.assertNotIn("path: music", home)
        self.assertNotIn("/home-tablet/music", navigation)
        self.assertNotIn("label: Music", navigation)

    def test_favourite_rooms_are_personalized_by_account(self):
        home = (ROOT / "dashboards/home-tablet.yaml").read_text()
        home_view = home.split("  - title: Home", 1)[1].split(
            "  - title: Rooms", 1
        )[0]
        favourites = home_view.split(
            "profile-abhimanyu-saharan-users.json", 1
        )[1].split("&family_navigation", 1)[0]
        profiles = [
            (
                "profile-abhimanyu-saharan-users.json",
                3,
                ["Office", "Bedroom", "Living Room"],
            ),
            (
                "profile-krishna-users.json",
                4,
                ["Master Bedroom", "Kitchen", "Living Room", "Dining Room"],
            ),
            (
                "profile-manisha-users.json",
                4,
                ["Bedroom", "Kitchen", "Living Room", "Guest Room"],
            ),
        ]

        for index, (profile, columns, expected_rooms) in enumerate(profiles):
            start = home_view.index(profile)
            end = (
                home_view.index(profiles[index + 1][0])
                if index + 1 < len(profiles)
                else home_view.index("&family_navigation")
            )
            block = home_view[start:end]
            names = re.findall(r"^\s+name: (.+)$", block, re.MULTILINE)

            self.assertIn(f"columns: {columns}", block)
            self.assertEqual(
                [name for name in names if name != "All rooms"],
                expected_rooms,
            )

        self.assertEqual(favourites.count("heading: Favourite rooms"), 3)
        self.assertNotIn(
            "profile-codex-dashboard-reviewer-users.json", favourites
        )

    def test_family_announcements_are_persistent_attributed_and_git_owned(self):
        configuration = (ROOT / "configuration.yaml").read_text()
        access = (ROOT / "access/family-dashboard.json").read_text()
        integration = (
            ROOT / "custom_components/family_announcements/sensor.py"
        ).read_text()
        card = (ROOT / "www/family-announcements-card.js").read_text()

        self.assertIn("platform: family_announcements", configuration)
        self.assertIn("notify.abhimanyu_pixel_8", access)
        self.assertIn("notify.pixel_10_pro", access)
        self.assertIn("notify.iphone", access)
        self.assertIn("Store(", integration)
        self.assertIn("call.context.user_id", integration)
        self.assertIn("actor.is_admin", integration)
        self.assertIn("Only the sender or an administrator", integration)
        self.assertIn("async_track_point_in_utc_time", integration)
        self.assertIn("await self._async_save()", integration)
        self.assertIn('"notify",\n            "send_message"', integration)
        self.assertIn('customElements.define("family-announcements-card"', card)
        self.assertIn("dialog.showModal()", card)
        self.assertIn("user?.is_admin", card)
        self.assertIn('.bulletin.empty .content { display: none; }', card)
        self.assertNotIn("Nothing shared right now.", card)
        self.assertIn('callService("family_announcements", "publish"', card)
        self.assertIn('callService("family_announcements", "dismiss"', card)
        self.assertFalse((ROOT / "packages/family_console.yaml").exists())

    def test_seerr_requests_are_admin_gated_and_server_managed(self):
        configuration = (ROOT / "configuration.yaml").read_text()
        home = (ROOT / "dashboards/home-tablet.yaml").read_text()
        integration = (
            ROOT / "custom_components/family_seerr_requests/sensor.py"
        ).read_text()
        card = (ROOT / "www/family-seerr-requests-card.js").read_text()
        home_view = home.split("  - title: Home", 1)[1].split(
            "  - title: Rooms", 1
        )[0]

        self.assertIn("platform: family_seerr_requests", configuration)
        self.assertIn("api_key: !env_var SEERR_API_KEY", configuration)
        self.assertIn("jellyseerr.media.svc.cluster.local:10241", configuration)
        self.assertIn("/local/family-seerr-requests-card.js?v=1.0.0", configuration)
        self.assertEqual(
            home_view.count("type: custom:family-seerr-requests-card"), 1
        )
        self.assertIn("profile-abhimanyu-saharan-users.json", home_view)
        self.assertGreater(
            home_view.index("type: custom:family-seerr-requests-card"),
            home_view.index("type: custom:family-announcements-card"),
        )
        self.assertLess(
            home_view.index("type: custom:family-seerr-requests-card"),
            home_view.index("type: custom:todo-swipe-card"),
        )
        self.assertIn("not user.is_admin", integration)
        self.assertIn('await self._async_request("POST"', integration)
        self.assertNotIn("X-Api-Key", card)
        self.assertIn(
            'callService("family_seerr_requests", action', card
        )
        self.assertIn("No requests waiting", card)

    def test_family_agenda_uses_permission_aware_calendar_responses(self):
        configuration = (ROOT / "configuration.yaml").read_text()
        manifest = (ROOT / "bootstrap/manifest.json").read_text()
        card = (ROOT / "www/family-agenda-card.js").read_text()

        self.assertIn("/local/family-agenda-card.js?v=1.0.0", configuration)
        self.assertNotIn("atomic-calendar-revive", configuration)
        self.assertNotIn("Atomic Calendar Revive", manifest)
        self.assertIn('service: "get_events"', card)
        self.assertIn('return_response: true', card)
        self.assertIn('start_date_time: start.toISOString()', card)
        self.assertIn('end_date_time: end.toISOString()', card)
        self.assertIn('customElements.define("family-agenda-card"', card)
        self.assertIn('window.history.pushState(null, "", "/calendar")', card)

    def test_camera_wall_applies_each_camera_user_gate(self):
        home = (ROOT / "dashboards/home-tablet.yaml").read_text()
        camera_view = home.split("  - title: Cameras", 1)[1]

        self.assertEqual(camera_view.count("type: custom:auto-entities"), 3)
        for camera_key in ("outside", "master-bedroom", "hallway"):
            self.assertEqual(
                camera_view.count(f"camera-{camera_key}-users.json"), 1
            )

    def test_rooms_use_quota_conscious_full_fan_controls(self):
        configuration = (ROOT / "configuration.yaml").read_text()
        home = (ROOT / "dashboards/home-tablet.yaml").read_text()
        rooms = home.split("  - title: Rooms", 1)[1].split(
            "  - title: Cameras", 1
        )[0]
        card = (ROOT / "www/family-fan-card.js").read_text()

        self.assertIn("/local/family-fan-card.js?v=1.1.1", configuration)
        self.assertEqual(rooms.count("type: custom:family-fan-card"), 7)
        self.assertEqual(rooms.count("type: custom:family-fan-summary-card"), 1)
        self.assertIn("max_columns: 3", rooms)
        self.assertIn("grid_options: { columns: 24, rows: auto }", rooms)
        self.assertIn("light.office_fan_led", rooms)
        self.assertIn("switch.office_fan_sleep_mode", rooms)
        self.assertIn("select.office_fan_set_timer", rooms)
        self.assertIn("sensor.office_fan_timer_elapsed_time", rooms)
        self.assertNotIn("button_type: slider", rooms)
        self.assertNotIn("type: custom:bubble-card", rooms)

        self.assertIn('customElements.define("family-fan-card"', card)
        self.assertIn('customElements.define("family-fan-summary-card"', card)
        self.assertIn('{ speed: 6, percentage: 100, label: "Boost" }', card)
        self.assertIn('"light", service', card)
        self.assertIn('"switch", service', card)
        self.assertIn('"select", "select_option"', card)
        self.assertIn('service = this._state(unit.fan)?.state === "on"', card)
        self.assertIn('"fan", service, { percentage }, unit.fan', card)
        self.assertIn("check wall power or Wi-Fi", card)
        self.assertIn("Sleep mode", card)
        self.assertIn("Auto-off", card)
        self.assertIn("one speed every 2 hours", card)
        self.assertIn("fingerprint !== this._lastFingerprint", card)
        self.assertIn("this._timerRenderPending", card)
        self.assertIn("min-height:46px", card)


if __name__ == "__main__":
    unittest.main()
