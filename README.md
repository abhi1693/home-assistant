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
The native Home Assistant sidebar is hidden on these kiosk views so it does not
compete with the family navigation rail.

## Dashboards

- **Home** is family-facing and desktop-first. Its four views cover the household
  overview, rooms and Atomberg fans, a three-camera UniFi Protect wall, and an
  embedded Music Assistant experience with Jellyfin activity.
- **Rack** is admin-only. It keeps Kubernetes, UniFi and rack temperatures away
  from the shared family experience.
- `Family Dark` is the local visual system. Bubble Card, Button Card, Navbar Card,
  Card Mod and Kiosk Mode are commit/version-pinned, checksum-verified assets.

The current dashboard binds fixed controls only to entities verified in the
live Home Assistant registry. Auto Entities discovers active Jellyfin and Music
Assistant sessions at render time, so playback cards appear only while a known
integration is playing or paused. Samsung TV, Fire TV and Jellyseerr request
approval cards remain extension points for later phases.

The shared overview favors household decisions over system telemetry. Its
single-screen desktop composition has a personalized greeting, compact weather
and household ribbon, account-filtered camera wall, adaptive Music
Assistant/Jellyfin activity, an interactive family board, and a persistent
room/fan matrix. The Shopping card supports adding, editing, completing and
removing list items directly from Home; list contents remain normal mutable
Home Assistant data while the card and its access policy stay Git-owned. Rack
health remains confined to the admin-only dashboard.

## Family access

`access/family-dashboard.json` is the desired-state access matrix for the family
dashboard. It binds immutable Home Assistant user IDs to their expected account
name and person entity, lists the Protect cameras each account may see, and
records whether a non-owner camera policy must be enforced. Bootstrap validates
every account, person link and camera entity against the live registries before
Home Assistant starts. It then generates the Lovelace user include files and
reconciles non-owner permission groups from the same document.

The initial profile is Abhimanyu. The connected Master Bedroom camera remains a
temporary dashboard-testing grant until the mother's account is added. Because
Abhimanyu is the Home Assistant owner, hiding a camera from that profile can
only be a presentation rule: owners always retain administrative entity access.
Non-owner family profiles receive both Lovelace filtering and backend camera
permissions. Their generated policy explicitly allows every registered
non-camera domain and only the camera entities granted in the access matrix;
this avoids Home Assistant's unconditional `all` permission fallback.
Restricted camera cards are omitted and the remaining cards reflow. Unknown
users receive no cameras by default.

Family credentials are never Git-owned. Create each account privately in Home
Assistant, then add its immutable user ID, expected name, person entity and
camera grants to the access matrix. A profile mismatch stops bootstrap instead
of silently widening access. The guarded reconciler backs up `.storage/auth`
before a policy change and is idempotent on later Fleet rollouts.

The built-in Moon, Uptime, Shopping List and Local Calendar integrations are
configured without external accounts. Home presents a full-width interactive
Shopping List beside the `Family` calendar summary, while Rack shows the Home
Assistant start time. These config entries and shopping-list contents are
UI-owned on the persistent volume; the dashboard presentation and access rules
remain Git-owned here.

The source configuration fixes Home Assistant to the metric unit system. All
temperature cards render an explicit `°C`, and package-owned template sensors
convert the two UniFi readings that publish Fahrenheit into Celsius before they
reach the Rack dashboard.

Protect camera cards explicitly request live rendering through Home Assistant's
LL-HLS stream proxy. The UniFi policy from the K8s network to the Protect console
must allow TCP `443` for the API and TCP `7441` for RTSPS. Cards automatically
recover as cameras reconnect in Protect. The connected camera is presented as
`Master Bedroom`, matching its current Protect entity.

`access/protect-streams.json` declares the active Protect RTSPS tiers. The
source-owned `family_camera_streams` integration reconciles those tiers through
the configured UniFi Protect public API, enables their native Home Assistant
entities, and retries when an electrically-off camera reconnects. This keeps
stream quality configuration reproducible without committing Protect secrets.

## Repository layout

- `access/`: Git-owned account mappings and camera access policy
- `configuration.yaml`: authoritative top-level Home Assistant YAML
- `dashboards/`: the family and admin Lovelace dashboards
- `custom_components/family_dashboard_guard/`: removes the superseded built-in
  Home panel after the frontend integration starts
- `custom_components/family_camera_streams/`: reconciles Git-owned Protect
  stream tiers and their native Home Assistant entities
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
prepared area and Atomberg assignments once, reconciles the family access
matrix on every rollout, and removes legacy storage-mode dashboards after
backing them up. A source-owned system integration unregisters the built-in
`/home/overview` panel on every startup, leaving the custom `Home` and `Rack`
dashboards as the intentional dashboard surfaces.

The Atomberg fork publishes successful command state immediately, polls all fan
states once per hour, and persists hard limits of 100 total cloud calls and 24
poll calls per rolling 24 hours. Calls are spaced below five per second. Local
UDP broadcasts remain the preferred zero-quota low-latency update path when
they can reach Home Assistant. Atomberg's HTTP 403 explicit-deny quota response
opens a persisted 24-hour circuit breaker instead of triggering repeated
authentication retries. During that circuit break, HA starts the integration
from its device cache and uses matching network trackers for zero-quota local
UDP command fallback instead of leaving the fans unavailable.

## Validation

Run the source tests with:

```sh
python3 -m unittest discover -s tests -v
```

The Kubernetes repository additionally validates the rendered Helm resource and
the live Fleet rollout that consumes this source.
