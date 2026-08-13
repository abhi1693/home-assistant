import importlib.util
from pathlib import Path
from types import SimpleNamespace
import unittest


SESSION_PATH = (
    Path(__file__).parents[1]
    / "custom_components/family_music_assistant_sessions/session.py"
)
SPEC = importlib.util.spec_from_file_location("music_assistant_session", SESSION_PATH)
session = importlib.util.module_from_spec(SPEC)
assert SPEC.loader is not None
SPEC.loader.exec_module(session)


class MusicAssistantSessionTests(unittest.TestCase):
    def test_extracts_hidden_web_player_playback(self):
        player = SimpleNamespace(
            player_id="ma_browser",
            name="Web (Chrome on Linux)",
            provider="sendspin",
            playback_state=SimpleNamespace(value="playing"),
            current_media=SimpleNamespace(
                title="Han Main Ruka Hoon Tu Ja Chuka Hai",
                artist="VDJ Mahe",
                album=None,
                media_type=SimpleNamespace(value="track"),
                duration=254,
                elapsed_time=42,
                image_url="https://music.media.home/imageproxy/example",
            ),
        )

        self.assertEqual(session.playback_state(player), "playing")
        self.assertEqual(
            session.session_attributes(player),
            {
                "player_id": "ma_browser",
                "player_name": "Web (Chrome on Linux)",
                "provider": "sendspin",
                "media_title": "Han Main Ruka Hoon Tu Ja Chuka Hai",
                "media_artist": "VDJ Mahe",
                "media_album_name": None,
                "media_content_type": "track",
                "media_duration": 254,
                "media_position": 42,
                "entity_picture": "https://music.media.home/imageproxy/example",
            },
        )

    def test_normalizes_non_active_states_to_idle(self):
        for state in ("idle", "off", None):
            with self.subTest(state=state):
                player = SimpleNamespace(playback_state=state)
                self.assertEqual(session.playback_state(player), "idle")
