import json
from pathlib import Path
import subprocess
import unittest

ROOT = Path(__file__).resolve().parents[1]


class WaqiDashboardTest(unittest.TestCase):
    def test_waqi_categories_at_boundaries_and_missing_states(self):
        source = (ROOT / "dashboards/home-tablet.yaml").read_text()
        card = source.split("  family_ribbon_air_quality:", 1)[1].split(
            "  family_ribbon_presence:", 1
        )[0]
        label = card.split("[[[", 1)[1].split("]]]", 1)[0]
        cases = [
            ("0", "Good"), ("50", "Good"), ("51", "Moderate"),
            ("100", "Moderate"), ("101", "Unhealthy for sensitive groups"),
            ("150", "Unhealthy for sensitive groups"), ("151", "Unhealthy"),
            ("200", "Unhealthy"), ("201", "Very unhealthy"),
            ("300", "Very unhealthy"), ("301", "Hazardous"),
            ("500", "Hazardous"), ("unknown", "Unavailable"),
            ("unavailable", "Unavailable"), ("", "Unavailable"),
            ("-1", "Unavailable"), (None, "Unavailable"),
        ]
        script = "const label = new Function('entity', " + json.dumps(label) + ");"
        script += "console.log(JSON.stringify(" + json.dumps(cases) + ".map(([state]) => label(state === null ? undefined : {state}))));"
        result = subprocess.run(["node", "-e", script], capture_output=True, text=True, check=True)
        labels = json.loads(result.stdout)
        for (state, category), actual in zip(cases, labels):
            with self.subTest(state=state):
                expected = category if category == "Unavailable" else f"{category} · {state}"
                self.assertEqual(actual, expected)

    def test_no_google_aqi_dashboard_dependencies(self):
        source = (ROOT / "dashboards/home-tablet.yaml").read_text()
        self.assertNotIn("sensor.home_naqi", source)
        self.assertNotIn("sensor.home_uaqi", source)
        self.assertIn("sensor.home_waqi_aqi", source)
