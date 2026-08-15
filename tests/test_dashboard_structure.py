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
        self.assertEqual(home.count("- *family_navigation"), 5)
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
                "Security",
                "People",
                "More",
                "Health",
                "Maintenance",
                "Rack",
                "Settings",
            ],
        )
        self.assertNotIn("return Boolean(user?.is_admin);", navigation)
        self.assertEqual(
            navigation.count("return !navbar.isDesktop || !user?.is_admin;"), 3
        )
        self.assertIn("action: open-popup", navigation)
        self.assertIn("return navbar.isDesktop ||", navigation)

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
        self.assertEqual(home_view.count("template: family_ribbon_humidity"), 1)
        activity = home.split("  family_ribbon_activity:", 1)[1].split(
            "\n  family_ribbon_attention:", 1
        )[0]
        self.assertNotIn("sensor.home_humidity", activity)
        self.assertIn("name: 'Activity', label: 'All quiet'", activity)
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

    def test_household_notifications_use_companion_app_actions(self):
        household = (ROOT / "packages/household.yaml").read_text()

        for action in (
            "notify.mobile_app_pixel_8",
            "notify.mobile_app_pixel_10_pro",
            "notify.mobile_app_iphone",
        ):
            self.assertIn(f"action: {action}", household)
        for entity_id in (
            "notify.abhimanyu_pixel_8",
            "notify.pixel_10_pro",
            "notify.iphone",
        ):
            self.assertNotIn(f"action: {entity_id}", household)

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
        self.assertEqual(home_view.count("battery_charging_entity:"), 2)
        family_template = home.split("  family_presence_likelihood:", 1)[1].split(
            "\n  family_ribbon_activity:", 1
        )[0]
        self.assertIn("action: more-info", family_template)
        self.assertIn('custom_fields:\n      indicator:', family_template)
        self.assertIn("      battery: |", family_template)
        self.assertIn("['on', 'true', 'charging'].includes(chargingState)", home)
        self.assertIn("['charging', 'full', 'charged'].includes(batteryState)", home)
        self.assertIn("batteryIcon.includes('battery-charging')", home)
        self.assertIn("binary_sensor.pixel_8_is_charging", access)
        self.assertIn("binary_sensor.pixel_10_pro_is_charging", access)
        self.assertIn("`mdi:battery-charging-${bucket}`", home)
        self.assertIn("Math.min(100, Math.ceil(level / 10) * 10)", home)
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
        commute_work = home_view.split(
            "entity: sensor.abhimanyu_home_to_work", 1
        )[1].split("          - type:", 1)[0]

        self.assertIn(
            '"owner_to_work_entity_id": "sensor.abhimanyu_home_to_work"', access
        )
        self.assertIn("family_commute:", home)
        self.assertIn("heading: Travel times", home_view)
        self.assertIn("arrival_eta: true", home_view)
        self.assertIn("Date.now() + minutes * 60000", home)
        arrivals = {
            "abhimanyu-saharan": (
                "Abhimanyu",
                "sensor.abhimanyu_to_home",
                "sensor.family_arrivals_abhimanyu_direction_of_travel",
                "sensor.abhimanyu_to_manzil_apartment",
                "sensor.manzil_apartment_arrivals_abhimanyu_direction_of_travel",
            ),
            "krishna": (
                "Krishna",
                "sensor.krishna_to_home",
                "sensor.family_arrivals_krishna_direction_of_travel",
                "sensor.krishna_to_manzil_apartment",
                "sensor.manzil_apartment_arrivals_krishna_direction_of_travel",
            ),
            "manisha": (
                "Manisha",
                "sensor.manisha_to_home",
                "sensor.family_arrivals_manisha_direction_of_travel",
                "sensor.manisha_to_manzil_apartment",
                "sensor.manzil_apartment_arrivals_manisha_direction_of_travel",
            ),
        }
        for profile_key, (
            name,
            route_entity,
            direction_entity,
            manzil_entity,
            manzil_direction,
        ) in arrivals.items():
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
            self.assertIn(f'"to_manzil_entity_id": "{manzil_entity}"', access)
            self.assertIn(
                f'"manzil_direction_entity_id": "{manzil_direction}"', access
            )
            manzil_card = home_view.split(f"entity: {manzil_entity}", 1)[1].split(
                "          - type:", 1
            )[0]
            self.assertIn(f"traveler: {name}", manzil_card)
            self.assertIn("destination: Manzil Apartment", manzil_card)
            self.assertIn(f"entity: {manzil_direction}", manzil_card)
            self.assertIn("state: towards", manzil_card)

        self.assertIn("entity: sensor.abhimanyu_home_to_work", home_view)
        self.assertIn("profile-abhimanyu-saharan-users.json", commute_work)
        self.assertIn("state_not: Work", commute_work)
        self.assertIn("destination: Work", commute_work)
        self.assertIn("mdi:briefcase-clock", home)
        self.assertNotIn("28.4114532", home)
        self.assertIn("heading: Travel times", home_view)
        self.assertNotIn("heading: Coming home", home_view)

    def test_work_routes_are_personalized_and_daylight_scheduled(self):
        commute = (ROOT / "packages/commute.yaml").read_text()
        home = (ROOT / "dashboards/home-tablet.yaml").read_text()
        home_view = home.split("  - title: Home", 1)[1].split(
            "  - title: Rooms", 1
        )[0]

        self.assertEqual(
            commute.count(
                "now().weekday() in [0, 1, 2, 3, 4]"
            ),
            2,
        )
        self.assertEqual(
            commute.count(
                "now().weekday() in [0, 1, 2, 3, 4, 5]"
            ),
            1,
        )
        self.assertEqual(commute.count("is_state('sun.sun', 'above_horizon')"), 3)
        work_routes = {
            "abhimanyu-saharan": (
                "sensor.abhimanyu_home_to_work",
                "binary_sensor.abhimanyu_work_commute_window",
            ),
            "krishna": (
                "sensor.krishna_to_work",
                "binary_sensor.krishna_work_commute_window",
            ),
            "manisha": (
                "sensor.manisha_to_work",
                "binary_sensor.manisha_work_commute_window",
            ),
        }
        for profile, (route, window) in work_routes.items():
            card = home_view.split(f"entity: {route}", 1)[1].split(
                "          - type:", 1
            )[0]
            self.assertIn(f"profile-{profile}-users.json", card)
            self.assertIn(f"entity: {window}", card)
            self.assertIn('state: "on"', card)

    def test_abhimanyu_journey_announcements_are_fresh_and_idempotent(self):
        commute = (ROOT / "packages/commute.yaml").read_text()
        automation = commute.split(
            "  - id: household_announce_abhimanyu_homeward_journey", 1
        )[1].split("  - id: household_share_family_journeys", 1)[0]

        self.assertIn("abhimanyu_homeward_journey_active:", commute)
        helper = commute.split(
            "  abhimanyu_homeward_journey_active:", 1
        )[1].split("\nautomation:", 1)[0]
        self.assertNotIn("initial:", helper)
        self.assertIn("mode: queued", automation)
        self.assertIn("to: towards", automation)
        self.assertIn(
            "sensor.manzil_apartment_arrivals_abhimanyu_direction_of_travel",
            automation,
        )
        self.assertIn("from: towards", automation)
        self.assertIn("condition: zone.not_in_zone", automation)
        departure_gate = automation.split("          - conditions:", 1)[1].split(
            "            sequence:", 1
        )[0]
        self.assertNotIn("person.krishna", departure_gate)
        self.assertNotIn("person.manisha", departure_gate)
        self.assertNotIn("notify.abhimanyu_s_echo_dot_announce", departure_gate)
        self.assertIn("trigger: zone.entered", automation)
        self.assertIn('for: "00:00:30"', automation)
        self.assertEqual(
            automation.count("action: google_travel_time.get_travel_times"), 1
        )
        self.assertIn("response_variable: departure_travel_home", automation)
        self.assertIn("origin: device_tracker.abhimanyu_pixel_8_2", automation)
        self.assertIn("destination: zone.home", automation)
        self.assertIn("notify.abhimanyu_s_echo_dot_announce", automation)
        self.assertEqual(automation.count("action: notify.mobile_app_pixel_10_pro"), 3)
        self.assertEqual(automation.count("action: notify.mobile_app_iphone"), 3)
        self.assertNotIn("entity_id: notify.pixel_10_pro", automation)
        self.assertNotIn("entity_id: notify.iphone", automation)
        self.assertIn("Abhimanyu has left for home.", automation)
        self.assertIn("Abhimanyu is home.", automation)
        self.assertIn("Abhimanyu is coming home", automation)
        self.assertIn("Abhimanyu arrived home", automation)
        self.assertEqual(automation.count("tag: abhimanyu-homeward-journey"), 6)
        self.assertNotIn("url: /home-tablet/home", automation)
        self.assertNotIn("clickAction:", automation)
        self.assertEqual(automation.count("condition: zone.not_in_zone"), 7)
        self.assertEqual(automation.count("              - parallel:"), 3)
        self.assertIn("person.krishna", automation)
        self.assertIn("person.manisha", automation)
        self.assertGreaterEqual(
            automation.count("input_boolean.abhimanyu_homeward_journey_active"),
            5,
        )

    def test_dual_home_journeys_are_destination_aware_for_everyone(self):
        commute = (ROOT / "packages/commute.yaml").read_text()
        automation = commute.split(
            "  - id: household_share_family_journeys", 1
        )[1].split("\ntemplate:", 1)[0]

        self.assertIn("name: Manzil Apartment", commute)
        self.assertIn("latitude: 28.5815757", commute)
        self.assertIn("longitude: 77.0663691", commute)
        self.assertEqual(commute.count("destination: zone.manzil_apartment"), 3)
        self.assertIn("script.household_share_family_journey", automation)
        self.assertIn("home_towards and not manzil_towards", automation)
        self.assertIn("manzil_towards and not home_towards", automation)
        self.assertIn('for: "00:00:30"', automation)
        for helper in (
            "krishna_homeward_journey_active",
            "manisha_homeward_journey_active",
            "abhimanyu_manzil_journey_active",
            "krishna_manzil_journey_active",
            "manisha_manzil_journey_active",
        ):
            self.assertIn(f"{helper}:", commute)
        for notification_action in (
            "notify.mobile_app_pixel_8",
            "notify.mobile_app_pixel_10_pro",
            "notify.mobile_app_iphone",
        ):
            self.assertIn(f"action: {notification_action}", commute)
        for entity_notification in (
            "notify.abhimanyu_pixel_8",
            "notify.pixel_10_pro",
            "notify.iphone",
        ):
            self.assertNotIn(f"entity_id: {entity_notification}", commute)
        self.assertNotIn("url: /home-tablet/home", commute)
        self.assertNotIn("clickAction:", commute)

    def test_camera_wall_applies_each_camera_user_gate(self):
        home = (ROOT / "dashboards/home-tablet.yaml").read_text()
        configuration = (ROOT / "configuration.yaml").read_text()
        camera_view = home.split("  - title: Security", 1)[1].split(
            "  - title: People", 1
        )[0]

        self.assertEqual(camera_view.count("type: custom:auto-entities"), 0)
        self.assertEqual(
            camera_view.count("type: custom:family-camera-wall-card"), 1
        )
        self.assertEqual(
            camera_view.count("type: custom:family-camera-events-card"), 1
        )
        self.assertNotIn("type: custom:family-camera-speaker-card", camera_view)
        self.assertEqual(camera_view.count("camera-outside-users.json"), 2)
        self.assertEqual(camera_view.count("camera-hallway-users.json"), 2)
        self.assertEqual(camera_view.count("camera-kitchen-users.json"), 2)
        self.assertEqual(camera_view.count("camera-living-room-users.json"), 2)
        self.assertEqual(camera_view.count("camera-master-bedroom-users.json"), 2)
        self.assertEqual(home.count("  - title: Security\n    path: security"), 1)
        self.assertNotIn("  - title: Cameras\n    path: cameras", home)
        self.assertNotIn("/home-tablet/cameras", home)
        self.assertIn("heading: Live cameras", camera_view)
        self.assertIn("heading: Camera health and recent activity", camera_view)
        self.assertNotIn("heading: Master Bedroom speaker", camera_view)
        for camera_key in (
            "kitchen",
            "kitchen_balcony",
            "living_room",
            "master_bedroom",
            "outside",
        ):
            self.assertEqual(
                camera_view.count(f"sensor.family_camera_{camera_key}_activity"), 2
            )
        for resource in (
            "/local/family-camera-wall-card.js?v=2.0.1",
            "/local/family-camera-events-card.js?v=1.1.0",
        ):
            self.assertIn(resource, configuration)
        self.assertNotIn("family-camera-speaker-card.js", configuration)
        self.assertIn("platform: family_camera_events", configuration)

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
        self.assertIn(
            "visible: !include ../access/generated/profile-abhimanyu-saharan-users.json",
            maintenance,
        )
        self.assertIn("entity: sensor.house_attention_level", home)
        self.assertNotIn("home_protect_storage", home)
        self.assertNotIn("household_nvr_storage_incident", package)
        self.assertNotIn("protect-recording-risk", package)
        self.assertNotIn("nvr_utilization", policy["security"])
        self.assertNotIn("nvr_disk_problem", policy["security"])
        self.assertNotIn("vacation", home.lower())
        self.assertNotIn("vacation", package.lower())
        self.assertNotIn("household_good_night", home)
        self.assertNotIn("household_good_night", package)
        self.assertIn("household_automation_stage:", package)
        self.assertLess(package.index("- Shadow"), package.index("- Active"))
        self.assertIn("schedule:\n  quiet_hours:", package)
        self.assertIn("timer.household_startup_settle", package)
        self.assertIn("timer.high_confidence_empty_home", package)
        self.assertGreater(package.count("input_boolean.empty_home_confirmed"), 1)
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
            "  - title: Security", 1
        )[0]
        card = (ROOT / "www/family-fan-card.js").read_text()
        room_card = (ROOT / "www/family-room-card.js").read_text()
        rooms_card = (ROOT / "www/family-rooms-card.js").read_text()
        summary_card = (ROOT / "www/family-room-summary-card.js").read_text()
        appliance_card = (ROOT / "www/family-appliance-card.js").read_text()
        media_card = (ROOT / "www/family-media-card.js").read_text()
        room_model = json.loads((ROOT / "access/rooms.json").read_text())

        self.assertIn("/local/family-fan-card.js?v=3.3.1", configuration)
        self.assertIn("/local/family-room-card.js?v=1.2.0", configuration)
        self.assertIn("/local/family-room-summary-card.js?v=1.0.0", configuration)
        self.assertIn("/local/family-appliance-card.js?v=1.0.0", configuration)
        self.assertIn("/local/family-media-card.js?v=1.0.0", configuration)
        self.assertIn("/local/family-rooms-card.js?v=1.0.0", configuration)
        self.assertLess(
            configuration.index("/local/family-fan-card.js?v=3.3.1"),
            configuration.index("/local/family-room-card.js?v=1.2.0"),
        )
        self.assertEqual(rooms.count("type: custom:family-rooms-card"), 1)
        self.assertEqual(rooms.count("type: custom:family-room-card"), 0)
        self.assertIn("/local/generated/family-rooms.json", rooms)
        self.assertNotIn("type: custom:family-fan-summary-card", rooms)
        self.assertIn("max_columns: 3", rooms)
        self.assertEqual(rooms.count("grid_options: { columns: 36, rows: auto }"), 1)
        serialized_room_model = json.dumps(room_model)
        self.assertIn("light.office_fan_led", serialized_room_model)
        self.assertIn("switch.office_fan_sleep_mode", serialized_room_model)
        self.assertIn("select.office_fan_set_timer", serialized_room_model)
        self.assertIn("sensor.office_fan_timer_elapsed_time", serialized_room_model)
        self.assertNotIn("button_type: slider", rooms)
        self.assertNotIn("type: custom:bubble-card", rooms)

        self.assertIn('customElements.define("family-room-card"', room_card)
        self.assertIn("window.loadCardHelpers()", room_card)
        self.assertIn("helpers.createCardElement(config)", room_card)
        self.assertIn("content.append(...cards)", room_card)
        self.assertIn('className = "room-content"', room_card)
        self.assertIn("--room-accent", room_card)
        self.assertIn('customElements.define("family-rooms-card"', rooms_card)
        self.assertIn("window.history.replaceState", rooms_card)
        self.assertIn("window.history.pushState", summary_card)
        self.assertIn("location-changed", rooms_card)
        self.assertIn('customElements.define("family-room-summary-card"', summary_card)
        self.assertIn('customElements.define("family-appliance-card"', appliance_card)
        self.assertIn("home_connect", appliance_card)
        self.assertIn("start_selected_program", appliance_card)
        self.assertIn("b_s_h_common_option_start_in_relative", appliance_card)
        self.assertIn('customElements.define("family-media-card"', media_card)

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
        self.assertIn('action === "led" && this._entityAvailable(unit.led)', card)
        self.assertNotIn('action === "led" && this._running(unit)', card)
        self.assertIn('const ledDisabled = busy || !ledAvailable;', card)
        self.assertIn('const sleepDisabled = busy || !running;', card)
        self.assertIn('${ledAvailable ? (ledOn ? "On" : "Off") : "Unavailable"}', card)
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
            "/local/family-fan-card.js?v=3.3.1",
            "/local/family-agenda-card.js?v=1.1.0",
            "/local/family-seerr-requests-card.js?v=1.1.0",
            "/local/family-room-card.js?v=1.2.0",
            "/local/family-room-summary-card.js?v=1.0.0",
            "/local/family-appliance-card.js?v=1.0.0",
            "/local/family-media-card.js?v=1.0.0",
            "/local/family-rooms-card.js?v=1.0.0",
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
        self.assertIn("window.location.pathname.startsWith('/home-tablet/rooms/')", navigation)

        for source in (room, fan, announcements, agenda, seerr, responsive_grid):
            self.assertIn("@media (max-width:", source)

        self.assertIn(".fan-list { grid-template-columns:1fr", fan)
        self.assertIn(".feature-copy small,.chevron { display:none", fan)
        self.assertIn("width:100vw", fan)
        self.assertIn("min-height: 44px", announcements)
        self.assertIn("grid-template-columns: repeat(2, 1fr)", announcements)
        self.assertIn(".open { width: 44px; height: 44px", seerr)
        self.assertIn(".action { width: 48px; height: 44px", seerr)

    def test_camera_cards_select_available_adaptive_streams(self):
        home = (ROOT / "dashboards/home-tablet.yaml").read_text()
        camera_wall = (ROOT / "www/family-camera-wall-card.js").read_text()

        self.assertNotIn("state: idle", home)
        self.assertNotIn(
            "type: picture-entity\n"
            "                entity: camera.g5_turret_ultra_high_resolution_channel\n"
            "                camera_image: camera.g5_turret_ultra_medium_resolution_channel",
            home,
        )
        self.assertNotIn(
            "type: picture-entity\n"
            "                entity: camera.hallway_high_resolution_channel\n"
            "                camera_image: camera.hallway_medium_resolution_channel",
            home,
        )
        self.assertIn('["unknown", "unavailable"].includes(state.state)', camera_wall)
        self.assertIn("this._mobileQuery.matches", camera_wall)
        self.assertIn("return camera.high_entity", camera_wall)
        self.assertIn("entry.signature !== signature", camera_wall)
        self.assertIn("window.loadCardHelpers()", camera_wall)
        self.assertIn("helpers.createCardElement(entry.desiredConfig)", camera_wall)
        self.assertNotIn('document.createElement("hui-picture-entity-card")', camera_wall)
        self.assertEqual(camera_wall.count("this.shadowRoot.innerHTML ="), 1)
        self.assertEqual(home.count("template: family_camera_offline"), 3)

    def test_camera_backend_is_bounded_private_and_presence_aware(self):
        access = json.loads((ROOT / "access/family-dashboard.json").read_text())
        streams = json.loads((ROOT / "access/protect-streams.json").read_text())
        sensor = (ROOT / "custom_components/family_camera_events/sensor.py").read_text()
        model = (ROOT / "custom_components/family_camera_events/model.py").read_text()
        package = (ROOT / "packages/household.yaml").read_text()

        self.assertEqual(streams["version"], 3)
        self.assertEqual(len(streams["cameras"]), 5)
        for camera in streams["cameras"].values():
            self.assertEqual(camera["qualities"], ["high", "medium", "low"])
            self.assertTrue(camera["low_entity_id"].startswith("camera."))
        self.assertIn("api.subscribe_events", sensor)
        self.assertIn("await api.get_events(", sensor)
        self.assertIn("start=now - timedelta(hours=24)", sensor)
        self.assertIn("use_content_user=True", sensor)
        self.assertIn("self.manager.can_access(user.id, key)", sensor)
        self.assertIn('"input_boolean.empty_home_confirmed", "on"', sensor)
        self.assertIn('"sensor.presence_confidence", "high"', sensor)
        self.assertIn("MAX_EVENTS_PER_CAMERA = 20", model)
        self.assertIn("EVENT_RETENTION = timedelta(days=7)", model)
        events_card = (ROOT / "www/family-camera-events-card.js").read_text()
        self.assertIn('type: "auth/sign_path"', events_card)
        self.assertIn("dialog class=\"clip-dialog\"", events_card)
        self.assertNotIn("household_perimeter_person_event", package)
        self.assertIn("household_camera_recording_timers", package)
        self.assertIn("household_camera_recording_incident", package)

        master = streams["cameras"]["master-bedroom"]
        self.assertEqual(master["notify_profiles"], ["krishna"])
        self.assertEqual(
            master["speaker_entity_id"], "media_player.living_room_speaker"
        )
        self.assertIn(
            "media_player.living_room_speaker",
            access["camera_security_entities"]["master-bedroom"],
        )
        self.assertNotIn(
            "master-bedroom", access["profiles"]["manisha"]["cameras"]
        )

    def test_dashboard_avoids_ambiguous_flow_style_css_values(self):
        home = (ROOT / "dashboards/home-tablet.yaml").read_text()

        self.assertNotIn("color: rgba(0, 0, 0, 0.65) },", home)


if __name__ == "__main__":
    unittest.main()
