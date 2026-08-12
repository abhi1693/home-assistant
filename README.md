# Home Assistant

Git-owned Home Assistant configuration for the Saharan family home. The source
is intentionally separate from the Kubernetes deployment so the dashboards,
themes, packages and guarded storage migrations can evolve without embedding
application code in cluster manifests.

The desktop visual language closely follows the composition of
[jlnbln/My-HA-Dashboard](https://github.com/jlnbln/My-HA-Dashboard): a fixed left
navigation rail, narrative greeting, compact status strip, one dominant content
zone, a narrow room matrix, soft rounded surfaces and useful information visible
without drilling through menus. Mobile-specific design is intentionally deferred.

## Dashboards

- **Home** is family-facing and desktop-first. Its four views cover the household
  overview, rooms and Atomberg fans, a three-camera UniFi Protect wall, and an
  embedded Music Assistant experience with Jellyfin activity.
- **Rack** is admin-only. It keeps Kubernetes, UniFi and rack temperatures away
  from the shared family experience.
- `Family Dark` is the local visual system. Bubble Card, Button Card, Navbar Card,
  Card Mod and Kiosk Mode are commit/version-pinned, checksum-verified assets.

The current dashboard only references entities verified in the live Home
Assistant registry. Samsung TV, Fire TV, per-session Jellyfin playback and
Jellyseerr request approval cards are extension points for later phases; they
will be added after their integrations expose stable entities.

The built-in Moon, Uptime, Shopping List and Local Calendar integrations are
configured without external accounts. Moon joins the family status strip, the
Home view includes a shared shopping list and `Family` calendar, and the Rack
view shows the Home Assistant start time. These config entries are UI-owned on
the persistent volume; the dashboard references remain Git-owned here.

Protect camera cards use snapshot-first rendering. Live RTSPS can be restored
after the Protect console's port `7441` is reachable from Home Assistant; cards
will automatically recover as cameras reconnect in Protect.

## Repository layout

- `configuration.yaml`: authoritative top-level Home Assistant YAML
- `dashboards/`: the family and admin Lovelace dashboards
- `themes/`: source-owned themes
- `packages/`: future source-owned automations and helpers
- `migrations/`: guarded, one-time area/device migration inputs
- `bootstrap.py`: idempotent installer used by the Kubernetes init container
- `bootstrap/manifest.json`: pinned and SHA-verified external assets and custom
  integrations

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
missing, verifies every frontend asset before replacement, and installs the
forked Atomberg integration from a commit-pinned archive. It also applies the
prepared area and Atomberg assignments once and removes legacy storage-mode
dashboards after backing them up. The built-in Home Assistant dashboards remain
platform-owned; the two custom dashboards registered here are `Home` and `Rack`.

The Atomberg fork preserves cloud-reported availability and polls device state
every 30 seconds. Local UDP broadcasts remain an optional low-latency update
path, so the fan entities stay usable when Home Assistant runs in Kubernetes.

## Validation

Run the source tests with:

```sh
python3 -m unittest discover -s tests -v
```

The Kubernetes repository additionally validates the rendered Helm resource and
the live Fleet rollout that consumes this source.
