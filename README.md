# Home Assistant

Git-owned Home Assistant configuration for the Saharan family home. The source
is intentionally separate from the Kubernetes deployment so the dashboards,
themes, packages and guarded storage migrations can evolve without embedding
application code in cluster manifests.

The visual language is an original, deliberately smaller adaptation inspired by
[jlnbln/My-HA-Dashboard](https://github.com/jlnbln/My-HA-Dashboard): dark contrast,
soft rounded surfaces, compact status chips, room-first controls and useful
information visible without drilling through menus.

## Dashboards

- **Home** is family-facing and tablet-friendly. Its four responsive views cover
  the household overview, rooms and Atomberg fans, a three-camera UniFi Protect
  wall, and Music Assistant/Jellyfin activity.
- **Rack** is admin-only. It keeps Kubernetes, UniFi and rack temperatures away
  from the shared family experience.
- `Family Dark` is a local theme with no runtime dependency. Bubble Card is the
  only custom card used by the dashboards.

The current dashboard only references entities verified in the live Home
Assistant registry. Samsung TV, Fire TV, per-session Jellyfin playback and
Jellyseerr request approval cards are extension points for later phases; they
will be added after their integrations expose stable entities.

## Repository layout

- `configuration.yaml`: authoritative top-level Home Assistant YAML
- `dashboards/`: the family and admin Lovelace dashboards
- `themes/`: source-owned themes
- `packages/`: future source-owned automations and helpers
- `migrations/`: guarded, one-time area/device migration inputs
- `bootstrap.py`: idempotent installer used by the Kubernetes init container
- `bootstrap/manifest.json`: pinned and SHA-verified external assets

Automations, scripts and scenes remain mutable Home Assistant files. Bootstrap
empties automations only once, preserving the old file under `/config/backups`,
and does not erase automations created after that migration.

## Bootstrap behavior

The deployment downloads a commit-pinned source archive, verifies its SHA-256,
then runs:

```sh
python3 /source/bootstrap.py --source /source --config /config
```

Bootstrap atomically installs source-owned files, installs HACS only when
missing, verifies Bubble Card before replacement, applies the prepared area and
Atomberg assignments once, and removes legacy storage-mode dashboards after
backing them up. The built-in Home Assistant dashboards remain platform-owned;
the two custom dashboards registered here are `Home` and `Rack`.

## Validation

Run the source tests with:

```sh
python3 -m unittest discover -s tests -v
```

The Kubernetes repository additionally validates the rendered Helm resource and
the live Fleet rollout that consumes this source.
