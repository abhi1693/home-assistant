import importlib.util
import unittest
from pathlib import Path


MODULE_PATH = (
    Path(__file__).parents[1]
    / "custom_components/family_seerr_requests/model.py"
)
SPEC = importlib.util.spec_from_file_location("family_seerr_request_model", MODULE_PATH)
MODEL = importlib.util.module_from_spec(SPEC)
assert SPEC.loader is not None
SPEC.loader.exec_module(MODEL)


class FamilySeerrRequestModelTests(unittest.TestCase):
    def test_normalizes_tv_request_without_exposing_account_secrets(self):
        source = {
            "id": 42,
            "type": "tv",
            "status": 1,
            "createdAt": "2026-08-13T05:44:59.000Z",
            "is4k": False,
            "media": {"tmdbId": 259688, "mediaType": "tv"},
            "seasons": [{"seasonNumber": 2}, {"seasonNumber": 1}],
            "requestedBy": {
                "displayName": "Krishna",
                "email": "private@example.com",
                "jellyfinAuthToken": "secret",
            },
        }
        detail = {
            "name": "Gyaarah Gyaarah",
            "firstAirDate": "2024-08-09",
            "posterPath": "/poster.jpg",
        }

        summary = MODEL.request_summary(source, detail)

        self.assertEqual(
            summary,
            {
                "id": 42,
                "title": "Gyaarah Gyaarah",
                "year": "2024",
                "media_type": "tv",
                "requested_by": "Krishna",
                "created_at": "2026-08-13T05:44:59.000Z",
                "seasons": [1, 2],
                "is_4k": False,
                "poster_path": "/poster.jpg",
            },
        )
        self.assertNotIn("email", summary)
        self.assertNotIn("jellyfinAuthToken", summary)

    def test_falls_back_to_a_useful_title_and_requester(self):
        summary = MODEL.request_summary(
            {
                "id": 43,
                "type": "movie",
                "media": {"tmdbId": 1234},
                "requestedBy": {},
            }
        )

        self.assertEqual(summary["title"], "Movie #1234")
        self.assertEqual(summary["requested_by"], "Unknown requester")


if __name__ == "__main__":
    unittest.main()
