import importlib.util
from pathlib import Path
import unittest


MODULE_PATH = (
    Path(__file__).parents[1]
    / "custom_components/family_jellyfin_sessions/session.py"
)
SPEC = importlib.util.spec_from_file_location("family_jellyfin_session", MODULE_PATH)
session = importlib.util.module_from_spec(SPEC)
assert SPEC.loader is not None
SPEC.loader.exec_module(session)


class JellyfinSessionTests(unittest.TestCase):
    def test_extracts_actual_viewer_and_episode_context(self):
        source = {
            "UserName": "Om",
            "DeviceName": "oms-asaharan",
            "Client": "Jellyfin Web",
            "NowPlayingItem": {
                "Name": "Redemption",
                "SeriesName": "The Mentalist",
                "ParentIndexNumber": 2,
                "IndexNumber": 1,
                "Type": "Episode",
            },
            "PlayState": {"IsPaused": False},
        }

        self.assertEqual(session.playback_state(source), "playing")
        self.assertEqual(
            session.session_attributes(source),
            {
                "viewer": "Om",
                "device_name": "oms-asaharan",
                "client_name": "Jellyfin Web",
                "media_title": "Redemption",
                "media_series_title": "The Mentalist",
                "media_season": 2,
                "media_episode": 1,
                "media_content_type": "Episode",
            },
        )

    def test_distinguishes_paused_and_idle_sessions(self):
        paused = {
            "NowPlayingItem": {"Name": "Redemption"},
            "PlayState": {"IsPaused": True},
        }
        self.assertEqual(session.playback_state(paused), "paused")
        self.assertEqual(session.playback_state({}), "idle")


if __name__ == "__main__":
    unittest.main()
