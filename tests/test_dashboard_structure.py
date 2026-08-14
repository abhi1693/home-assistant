import json
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
        self.assertEqual(home.count("- *family_navigation"), 6)
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
            labels,
            [
                "Home",
                "Rooms",
                "Cameras",
                "Security",
                "People",
                "Health",
                "Maintenance",
                "Rack",
                "Settings",
            ],
        )
        self.assertNotIn("return Boolean(user?.is_admin);", navigation)
        self.assertEqual(navigation.count("return !user?.is_admin;"), 3)

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
        self.assertIn("sensor.home_naqi_in_aqi", header)
        self.assertIn("sensor.home_naqi_in_category", header)
        self.assertIn("Air is {{ air_category }}", header)
        self.assertIn("anyone sensitive should take it easy outdoors", header)
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
            '"weather presence today activity humidity air_quality attention alarm"',
            home_view,
        )
        self.assertIn(
            '"weather presence today activity humidity air_quality attention"',
            home_view,
        )
        self.assertIn("heading: Coming up", home_view)
        self.assertIn("type: custom:family-agenda-card", home_view)
        self.assertIn("days: 14", home_view)
        self.assertIn("max_events: 4", home_view)
        self.assertIn("calendar-owner-users.json", home_view)
        self.assertIn("calendar-household-users.json", home_view)
        self.assertEqual(home_view.count("template: family_ribbon_air_quality"), 1)
        self.assertIn("template: family_ribbon_humidity", home_view)
        self.assertIn("entity: sensor.home_naqi_in_aqi", home)
        air_quality = home.split("  family_ribbon_air_quality:", 1)[1].split(
            "\n  family_ribbon_presence:", 1
        )[0]
        self.assertIn("sensor.home_naqi_in_category", air_quality)
        self.assertIn("`${category} · ${Math.round(value)}`", air_quality)
        self.assertIn("poor_air_quality: 'Poor'", air_quality)
        self.assertIn("value <= 100", air_quality)
        self.assertIn("var(--red)", air_quality)
        self.assertLess(
            home_view.index("template: family_ribbon_humidity"),
            home_view.index("template: family_ribbon_air_quality"),
        )
        self.assertEqual(
            home_view.count("type: custom:family-announcements-card"), 2
        )
        self.assertIn("entity: sensor.family_announcements", home_view)
        self.assertIn('media_query: "(max-width: 639px)"', home_view)
        self.assertIn('media_query: "(min-width: 640px)"', home_view)
        self.assertLess(
            home_view.index("type: custom:family-announcements-card"),
            home_view.index("heading: Cameras"),
        )
        self.assertGreater(
            home_view.rindex("type: custom:family-announcements-card"),
            home_view.rindex("type: custom:family-agenda-card"),
        )
        self.assertLess(
            home_view.rindex("type: custom:family-announcements-card"),
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
        self.assertIn("name: Music Assistant", home)
        self.assertIn("name: Jellyfin", home)
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
                ["Office", "Bedroom", "Living Room"],
            ),
            (
                "profile-krishna-users.json",
                ["Master Bedroom", "Kitchen", "Living Room", "Dining Room"],
            ),
            (
                "profile-manisha-users.json",
                ["Bedroom", "Kitchen", "Living Room", "Guest Room"],
            ),
        ]

        for index, (profile, expected_rooms) in enumerate(profiles):
            start = home_view.index(profile)
            end = (
                home_view.index(profiles[index + 1][0])
                if index + 1 < len(profiles)
                else home_view.index("&family_navigation")
            )
            block = home_view[start:end]
            names = re.findall(r"^\s+name: (.+)$", block, re.MULTILINE)

            self.assertIn("type: custom:family-responsive-grid-card", block)
            self.assertIn("min_width: 150", block)
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
        self.assertIn("/local/family-seerr-requests-card.js?v=1.1.0", configuration)
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

    def test_recorder_uses_gitops_injected_postgresql_url(self):
        configuration = (ROOT / "configuration.yaml").read_text()

        self.assertIn("recorder:\n", configuration)
        self.assertIn(
            "db_url: !env_var HOME_ASSISTANT_RECORDER_DB_URL", configuration
        )
        self.assertNotIn("postgresql://", configuration)

    def test_family_agenda_uses_permission_aware_calendar_responses(self):
        configuration = (ROOT / "configuration.yaml").read_text()
        manifest = (ROOT / "bootstrap/manifest.json").read_text()
        card = (ROOT / "www/family-agenda-card.js").read_text()

        self.assertIn("/local/family-agenda-card.js?v=1.1.0", configuration)
        self.assertNotIn("atomic-calendar-revive", configuration)
        self.assertNotIn("Atomic Calendar Revive", manifest)
        self.assertIn('service: "get_events"', card)
        self.assertIn('return_response: true', card)
        self.assertIn('start_date_time: start.toISOString()', card)
        self.assertIn('end_date_time: end.toISOString()', card)
        self.assertIn('customElements.define("family-agenda-card"', card)
        self.assertIn('window.history.pushState(null, "", "/calendar")', card)

    def test_android_next_alarms_are_personalized_and_read_only(self):
        access = (ROOT / "access/family-dashboard.json").read_text()
        home = (ROOT / "dashboards/home-tablet.yaml").read_text()

        self.assertIn('"next_alarm_entity_id": "sensor.pixel_8_next_alarm"', access)
        self.assertIn('"next_alarm_entity_id": "sensor.pixel_10_pro_next_alarm"', access)
        self.assertIn("family_ribbon_alarm:", home)
        self.assertIn("? 'sensor.pixel_8_next_alarm'", home)
        self.assertIn("? 'sensor.pixel_10_pro_next_alarm'", home)
        self.assertIn("8117b77542614a06b4672a8ae1a979b5", home)
        self.assertIn("return 'No alarm';", home)
        self.assertIn(
            '"weather presence today activity humidity air_quality attention alarm"',
            home,
        )
        self.assertIn("template: family_ribbon_alarm", home)

    def test_family_cards_merge_presence_location_and_phone_battery(self):
        access = (ROOT / "access/family-dashboard.json").read_text()
        home = (ROOT / "dashboards/home-tablet.yaml").read_text()
        home_view = home.split("  - title: Home", 1)[1].split(
            "  - title: Rooms", 1
        )[0]

        for entity_id in (
            "sensor.pixel_8_battery_level",
            "sensor.pixel_8_battery_state",
            "sensor.pixel_10_pro_battery_level",
            "sensor.pixel_10_pro_battery_state",
            "sensor.iphone_battery_level",
            "sensor.iphone_battery_state",
        ):
            self.assertIn(entity_id, access)
            self.assertIn(entity_id, home_view)
        self.assertNotIn("family_phone_battery:", home)
        self.assertNotIn("heading: Phones", home_view)
        self.assertEqual(home_view.count("battery_entity:"), 3)
        self.assertEqual(home_view.count("battery_state_entity:"), 3)
        family_template = home.split("  family_presence_likelihood:", 1)[1].split(
            "\n  family_ribbon_activity:", 1
        )[0]
        self.assertIn("action: more-info", family_template)
        self.assertIn('custom_fields:\n      indicator:', family_template)
        self.assertIn("      battery: |", family_template)
        self.assertIn("mdi:battery-charging", home)
        self.assertIn("var(--red)", home)
        self.assertIn("var(--yellow)", home)
        self.assertIn("var(--green)", home)
        self.assertNotIn("On battery", home_view)

    def test_commute_shows_shared_homeward_arrivals_and_owner_work_route(self):
        access = (ROOT / "access/family-dashboard.json").read_text()
        home = (ROOT / "dashboards/home-tablet.yaml").read_text()
        home_view = home.split("  - title: Home", 1)[1].split(
            "  - title: Rooms", 1
        )[0]
        commute_work = home_view.rsplit("template: family_commute", 1)[1].split(
            "          - type: heading", 1
        )[0]

        self.assertIn(
            '"owner_to_work_entity_id": "sensor.abhimanyu_home_to_work"', access
        )
        self.assertIn("family_commute:", home)
        self.assertIn("heading: Coming home", home_view)
        self.assertIn("arrival_eta: true", home_view)
        self.assertIn("Date.now() + minutes * 60000", home)
        arrivals = {
            "abhimanyu-saharan": (
                "Abhimanyu",
                "sensor.abhimanyu_to_home",
                "sensor.family_arrivals_abhimanyu_direction_of_travel",
            ),
            "krishna": (
                "Krishna",
                "sensor.krishna_to_home",
                "sensor.family_arrivals_krishna_direction_of_travel",
            ),
            "manisha": (
                "Manisha",
                "sensor.manisha_to_home",
                "sensor.family_arrivals_manisha_direction_of_travel",
            ),
        }
        for profile_key, (name, route_entity, direction_entity) in arrivals.items():
            self.assertIn(f'"{profile_key}": {{', access)
            self.assertIn(f'"to_home_entity_id": "{route_entity}"', access)
            self.assertIn(f'"direction_entity_id": "{direction_entity}"', access)
            route_card = home_view.split(f"entity: {route_entity}", 1)[1].split(
                "          - type:", 1
            )[0]
            self.assertIn(f"traveler: {name}", route_card)
            self.assertIn(f"entity: {direction_entity}", route_card)
            self.assertIn("state: towards", route_card)
            self.assertIn("condition: user", route_card)
            self.assertIn("family-members-users.json", route_card)

        self.assertIn("entity: sensor.abhimanyu_home_to_work", commute_work)
        self.assertIn("profile-abhimanyu-saharan-users.json", commute_work)
        self.assertIn("state_not: Work", commute_work)
        self.assertIn("destination: Work", commute_work)
        self.assertIn("mdi:briefcase-clock", home)
        self.assertNotIn("28.4114532", home)

    def test_camera_wall_applies_each_camera_user_gate(self):
        home = (ROOT / "dashboards/home-tablet.yaml").read_text()
        camera_view = home.split("  - title: Cameras", 1)[1].split(
            "  - title: Security", 1
        )[0]

        self.assertEqual(camera_view.count("type: custom:auto-entities"), 3)
        for camera_key in ("outside", "master-bedroom", "hallway"):
            self.assertEqual(
                camera_view.count(f"camera-{camera_key}-users.json"), 1
            )

    def test_household_surfaces_are_bounded_and_access_aware(self):
        home = (ROOT / "dashboards/home-tablet.yaml").read_text()
        rack = (ROOT / "dashboards/rack-admin.yaml").read_text()
        package = (ROOT / "packages/household.yaml").read_text()
        policy = json.loads((ROOT / "access/household-policy.json").read_text())

        for title, path in (
            ("Security", "security"),
            ("People", "people"),
            ("Maintenance", "maintenance"),
        ):
            self.assertIn(f"  - title: {title}\n    path: {path}", home)
        maintenance = home.split("  - title: Maintenance", 1)[1]
        shared = home.split("  - title: Maintenance", 1)[0]
        self.assertIn(
            "visible: !include ../access/generated/profile-abhimanyu-saharan-users.json",
            maintenance,
        )
        self.assertIn("entity: sensor.house_attention_level", home)
        self.assertNotIn("sensor.home_protect_storage_storage_utilization", shared)
        self.assertIn("sensor.home_protect_storage_storage_utilization", maintenance)
        self.assertIn("entity: binary_sensor.vacation_ready", home)
        self.assertIn("entity: input_text.vacation_preflight_result", home)
        self.assertIn("name: Check and start Vacation", home)
        self.assertIn("name: Check Vacation readiness", home)
        self.assertEqual(
            home.count("perform_action: input_button.press"),
            2,
        )
        self.assertIn(
            "text: Check the house and start Vacation if everything is ready?",
            home,
        )
        vacation_controls = home.split(
            "entity: binary_sensor.vacation_ready", 1
        )[1].split("Future entrance contacts", 1)[0]
        self.assertNotIn("tap_action: { action: toggle }", vacation_controls)
        self.assertIn("Preview only · checks will not change house mode", home)
        self.assertIn("vacation_preflight_result:", package)
        self.assertIn("Vacation setup is still in preview", package)
        self.assertIn('value: "Vacation mode started"', package)
        self.assertIn('value: "Not ready · {{ blocker_message }}"', package)
        self.assertNotIn("household_good_night", home)
        self.assertNotIn("household_good_night", package)
        self.assertIn("household_automation_stage:", package)
        self.assertLess(package.index("- Shadow"), package.index("- Active"))
        self.assertIn("schedule:\n  quiet_hours:", package)
        self.assertIn("timer.household_startup_settle", package)
        self.assertIn("timer.high_confidence_empty_home", package)
        self.assertIn("input_boolean.empty_home_confirmed", package)
        self.assertIn("is_state('input_boolean.empty_home_confirmed', 'on')", package)
        self.assertIn("binary_sensor.rack_ups_on_battery", package)
        self.assertIn("entity: binary_sensor.rack_ups_on_battery", home)
        self.assertIn("entity: sensor.ups_status", rack)
        self.assertIn("mode: queued", package)
        self.assertEqual(policy["automation_stage"], "Shadow")
        self.assertEqual(policy["profiles"]["manisha"]["wifi"], None)

    def test_health_view_is_owner_only_and_uses_available_sensors(self):
        home = (ROOT / "dashboards/home-tablet.yaml").read_text()
        access = json.loads((ROOT / "access/family-dashboard.json").read_text())
        configuration = (ROOT / "configuration.yaml").read_text()
        health = home.split("  - title: Health", 1)[1].split(
            "  - title: Maintenance", 1
        )[0]

        self.assertEqual(access["owner_health"]["profile"], "abhimanyu-saharan")
        self.assertIn(
            "sensor.pixel_8_heart_rate", access["owner_health"]["entities"]
        )
        self.assertIn(
            "visible: !include ../access/generated/profile-abhimanyu-saharan-users.json",
            health,
        )
        self.assertGreaterEqual(
            health.count(
                "users: !include ../access/generated/profile-abhimanyu-saharan-users.json"
            ),
            2,
        )
        for entity_id in (
            "sensor.pixel_8_daily_steps",
            "sensor.pixel_8_daily_distance",
            "sensor.pixel_8_total_calories_burned",
            "sensor.pixel_8_heart_rate",
            "sensor.pixel_8_oxygen_saturation",
            "sensor.pixel_8_sleep_duration",
            "sensor.pixel_8_sleep_confidence",
        ):
            self.assertIn(f"entity: {entity_id}", health)
        for unavailable_metric in (
            "blood_glucose",
            "body_fat",
            "weight",
            "systolic_blood_pressure",
            "sleep_segment",
        ):
            self.assertNotIn(unavailable_metric, health)
        self.assertIn("template: health_metric", health)
        self.assertEqual(health.count("hours_to_show: 24"), 3)
        self.assertNotIn("condition: numeric_state", health)
        self.assertIn("- sensor.*heart_rate*", configuration)
        self.assertIn("- sensor.*oxygen_saturation*", configuration)
        self.assertIn("- sensor.*respiratory_rate*", configuration)
        self.assertIn("- sensor.*sleep*", configuration)

    def test_presence_uses_only_travelling_phone_trackers(self):
        access = json.loads((ROOT / "access/family-dashboard.json").read_text())
        policy = json.loads((ROOT / "access/household-policy.json").read_text())
        owner = access["profiles"]["abhimanyu-saharan"]

        self.assertNotIn("device_tracker.abhi_pc", owner["device_trackers"])
        self.assertEqual(
            set(owner["device_trackers"]),
            {
                policy["profiles"]["abhimanyu-saharan"]["gps"],
                policy["profiles"]["abhimanyu-saharan"]["wifi"],
            },
        )

        package = (ROOT / "packages/household.yaml").read_text()
        home = (ROOT / "dashboards/home-tablet.yaml").read_text()
        for name in ("abhimanyu", "krishna", "manisha"):
            self.assertIn(f"unique_id: {name}_home_likelihood", package)
            self.assertIn(f"sensor.{name}_home_likelihood", home)
        self.assertIn("template: family_presence_likelihood", home)
        self.assertIn("show_entity_picture: true", home)
        self.assertIn("icon: mdi:account-circle", home)
        self.assertEqual(home.count("avatar_color:"), 3)
        self.assertIn("action: more-info", home.split(
            "  family_presence_likelihood:", 1
        )[1].split("\n  family_ribbon_activity:", 1)[0])

    def test_recorder_excludes_raw_location_and_health_history(self):
        configuration = (ROOT / "configuration.yaml").read_text()

        self.assertIn("- device_tracker.*", configuration)
        self.assertIn("- sensor.*health_connect*", configuration)
        self.assertIn("- sensor.*sleep*", configuration)
        for person in (
            "person.abhimanyu_saharan",
            "person.krishna",
            "person.manisha",
        ):
            self.assertIn(f"- {person}", configuration)

    def test_rooms_use_quota_conscious_full_fan_controls(self):
        configuration = (ROOT / "configuration.yaml").read_text()
        home = (ROOT / "dashboards/home-tablet.yaml").read_text()
        rooms = home.split("  - title: Rooms", 1)[1].split(
            "  - title: Cameras", 1
        )[0]
        card = (ROOT / "www/family-fan-card.js").read_text()
        room_card = (ROOT / "www/family-room-card.js").read_text()

        self.assertIn("/local/family-fan-card.js?v=3.3.0", configuration)
        self.assertIn("/local/family-room-card.js?v=1.1.0", configuration)
        self.assertLess(
            configuration.index("/local/family-fan-card.js?v=3.3.0"),
            configuration.index("/local/family-room-card.js?v=1.1.0"),
        )
        self.assertEqual(rooms.count("type: custom:family-room-card"), 7)
        self.assertEqual(rooms.count("type: custom:family-fan-card"), 7)
        self.assertEqual(rooms.count("embedded: true"), 7)
        self.assertNotIn("type: custom:family-fan-summary-card", rooms)
        self.assertIn("max_columns: 3", rooms)
        self.assertEqual(
            rooms.count("grid_options: { columns: 36, rows: auto }"), 1
        )
        self.assertEqual(
            rooms.count("grid_options: { columns: 18, rows: auto }"), 6
        )
        self.assertIn("light.office_fan_led", rooms)
        self.assertIn("switch.office_fan_sleep_mode", rooms)
        self.assertIn("select.office_fan_set_timer", rooms)
        self.assertIn("sensor.office_fan_timer_elapsed_time", rooms)
        self.assertNotIn("button_type: slider", rooms)
        self.assertNotIn("type: custom:bubble-card", rooms)

        self.assertIn('customElements.define("family-room-card"', room_card)
        self.assertIn("window.loadCardHelpers()", room_card)
        self.assertIn("helpers.createCardElement(config)", room_card)
        self.assertIn("content.append(...cards)", room_card)
        self.assertIn('className = "room-content"', room_card)
        self.assertIn("--room-accent", room_card)

        self.assertIn('customElements.define("family-fan-card"', card)
        self.assertNotIn('customElements.define("family-fan-summary-card"', card)
        self.assertIn('{ speed: 6, percentage: 100, label: "Boost" }', card)
        self.assertIn('class="power-core"', card)
        self.assertIn('data-action="speed"', card)
        self.assertIn('class="speed speed-${item.speed}', card)
        self.assertIn('icon="mdi:fan-plus"', card)
        self.assertIn('running ? "On" : "Off"', card)
        self.assertIn('running ? "Tap to turn off" : "Tap to turn on"', card)
        self.assertNotIn("Tap to start at", card)
        self.assertIn("Last speed", card)
        self.assertNotIn('data-action="speed-down"', card)
        self.assertNotIn('data-action="speed-up"', card)
        self.assertNotIn('data-action="all-off"', card)
        self.assertNotIn('data-action="more-info"', card)
        self.assertIn('this._callService("light", service', card)
        self.assertIn('this._callService("switch", service', card)
        self.assertIn('this._callService("select", "select_option"', card)
        self.assertIn('running ? "set_percentage" : "turn_on"', card)
        self.assertIn("Turn on the wall switch", card)
        self.assertIn("Controls will appear automatically.", card)
        self.assertIn("Fan is off", card)
        self.assertIn("_exclusiveModes(unit)", card)
        self.assertIn("sleepUpdated > timerUpdated", card)
        self.assertIn("Replaces timer", card)
        self.assertIn("Replaces sleep mode", card)
        self.assertIn("Sleep mode will turn off automatically", card)
        self.assertIn('running ? "Turn off later" : "Turn on later"', card)
        self.assertIn('dialog class="timer-dialog"', card)
        self.assertIn("dialog.showModal()", card)
        self.assertNotIn("<select", card)
        self.assertIn("await this._cancelTimer(unit);", card)
        self.assertIn("await this._afterTimerCancellation(", card)
        self.assertIn("The timer was cancelled, but the fan did not accept", card)
        self.assertIn("this._busy.has(index)", card)
        self.assertIn("fingerprint !== this._lastFingerprint", card)
        self.assertIn("width:166px", card)
        self.assertIn("width:56px", card)
        self.assertIn(".speed-2 { left:24px", card)
        self.assertIn(".speed-4 { right:24px", card)
        self.assertIn("min-height:64px", card)
        self.assertIn("prefers-reduced-motion:reduce", card)
        self.assertIn('class="fan-graphic" viewBox="0 0 48 48"', card)
        self.assertEqual(card.count('transform="rotate(120 24 24)"'), 1)
        self.assertEqual(card.count('transform="rotate(240 24 24)"'), 1)
        self.assertIn('class="fan-hub" cx="24" cy="24"', card)
        self.assertIn(".running .fan-blades", card)
        self.assertIn("transform-origin:24px 24px", card)
        self.assertIn('if (this._config.embedded) return "Fan"', card)
        self.assertIn("const framed = multiple && !this._config.embedded", card)
        self.assertIn('this._config.embedded ? "var(--room-accent,var(--pink))"', card)
        self.assertIn(
            'grid-template-columns:${multiple ? "repeat(2,minmax(0,1fr))"',
            card,
        )

    def test_home_and_rooms_have_phone_specific_layouts(self):
        configuration = (ROOT / "configuration.yaml").read_text()
        home = (ROOT / "dashboards/home-tablet.yaml").read_text()
        navigation = (
            ROOT / "dashboards/includes/family-navigation.yaml"
        ).read_text()
        room = (ROOT / "www/family-room-card.js").read_text()
        fan = (ROOT / "www/family-fan-card.js").read_text()
        announcements = (
            ROOT / "www/family-announcements-card.js"
        ).read_text()
        agenda = (ROOT / "www/family-agenda-card.js").read_text()
        seerr = (ROOT / "www/family-seerr-requests-card.js").read_text()
        responsive_grid = (
            ROOT / "www/family-responsive-grid-card.js"
        ).read_text()

        for resource in (
            "/local/family-announcements-card.js?v=2.3.0",
            "/local/family-responsive-grid-card.js?v=1.1.0",
            "/local/family-fan-card.js?v=3.3.0",
            "/local/family-agenda-card.js?v=1.1.0",
            "/local/family-seerr-requests-card.js?v=1.1.0",
            "/local/family-room-card.js?v=1.1.0",
        ):
            self.assertIn(resource, configuration)

        self.assertIn("window.matchMedia('(max-width: 639px)')", home)
        self.assertIn('\"weather presence\" \"today activity\"', home)
        self.assertIn("repeat(2, minmax(0, 1fr))", home)
        self.assertIn("min_width: 280", home)
        self.assertEqual(home.count("min_width: 150"), 3)
        self.assertEqual(home.count("min_width: 240"), 1)
        self.assertIn("--todo-swipe-card-item-height: 48px", home)
        self.assertIn("@media (max-width: 899px)", navigation)
        self.assertIn("env(safe-area-inset-bottom)", navigation)

        for source in (room, fan, announcements, agenda, seerr, responsive_grid):
            self.assertIn("@media (max-width:", source)

        self.assertIn(".fan-list { grid-template-columns:1fr", fan)
        self.assertIn(".feature-copy small,.chevron { display:none", fan)
        self.assertIn("width:100vw", fan)
        self.assertIn("min-height: 44px", announcements)
        self.assertIn("grid-template-columns: repeat(2, 1fr)", announcements)
        self.assertIn(".open { width: 44px; height: 44px", seerr)
        self.assertIn(".action { width: 48px; height: 44px", seerr)


if __name__ == "__main__":
    unittest.main()
