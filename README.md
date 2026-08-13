# Home Assistant

Git-owned Home Assistant configuration for the Saharan family home. The source
is intentionally separate from the Kubernetes deployment so the dashboards,
themes, packages and guarded storage migrations can evolve without embedding
application code in cluster manifests.

The desktop visual language closely follows the composition of
[jlnbln/My-HA-Dashboard](https://github.com/jlnbln/My-HA-Dashboard): a fixed left
navigation rail, narrative greeting, compact status strip, one dominant content
zone, a narrow household rail, soft rounded surfaces and useful information
visible without drilling through menus. Mobile-specific design is intentionally deferred.
The native Home Assistant sidebar is hidden on these kiosk views so it does not
compete with the family navigation rail.

Home's five-item status strip is one quiet visual sentence rather than a row of
competing cards. Weather and presence are stable anchors; the other positions
adapt to laundry, shopping, sunrise or sunset, active playback or fans, humidity
and genuine attention states. Internet appears only when
degraded, the owner's phone only when below 25 percent, and routine fan-off
states are omitted. Icon color is semantic: normal states stay muted, while
activity and conditions needing attention receive color.

## Dashboards

- **Home** is family-facing and desktop-first. Its three views cover the household
  overview, rooms and Atomberg fans, and a three-camera UniFi Protect wall.
  Music Assistant and Jellyfin activity remain embedded in the household overview.
- **Rack** is admin-only. It keeps Kubernetes, UniFi and rack temperatures away
  from the shared family experience.
- Every dashboard view consumes the same source-owned navigation rail. Everyone
  sees Home, Rooms and Cameras; admins additionally see Rack and Settings.
- `Family Dark` is the local visual system. Bubble Card, Button Card, Navbar Card,
  Card Mod, Auto Entities, Todo Swipe Card and Kiosk Mode are
  commit/version-pinned, checksum-verified assets.

The current dashboard binds fixed controls only to entities verified in the
live Home Assistant registry. Auto Entities discovers active Jellyfin and Music
Assistant sessions at render time, so playback cards appear only while a known
integration is playing or paused. A source-owned read-only Jellyfin session
bridge reuses the built-in integration's ten-second coordinator data to expose
the actual Jellyfin account, device/client, title, episode and artwork without
making additional server requests. Every concurrent viewer gets a separate card
in the responsive media grid. Every active card identifies its source and
playback destination, so concurrent sessions cannot be mistaken for launcher
columns. Jellyfin cards also identify the signed-in viewer and client. Music
Assistant does not expose the person who initiated playback, so those cards
truthfully identify the player/device rather than inferring a family member.
Music Assistant and Jellyfin launchers share a compact action bar beneath active
sessions, so playback never removes navigation. Samsung TV, Fire TV and
Jellyseerr request approval cards remain
extension points for later phases.

The shared overview favors household decisions over system telemetry. Its
single-screen desktop composition has a personalized greeting, compact weather
and household ribbon, account-filtered camera wall, adaptive Music
Assistant/Jellyfin activity, a narrow Coming up rail, and four relevant area
summaries. The Living Room summary combines both fans; the full Rooms view owns
individual controls for every area. The greeting ends with one prioritized
household message: laundry completion, a current or next-day family event,
significant heat or storms, shopping needs, or a time-appropriate all-clear.
Its context line includes the weekday, day part and current time, and its weather
advice changes between morning, afternoon, evening and night. A Git-owned family
bulletin in the household rail groups independent, account-attributed household
updates above Shopping. Its Add action opens a focused composer; each
message remains until its sender or an administrator removes it, or disappears
entirely at its optional end time. Publishing also sends the message to every
mapped family Companion App phone.
When the bulletin is empty it collapses to a compact Announcements/Add bar.
Routine fan-off state is omitted; running fans are called out because they are
useful household context. The compact Todo Swipe Shopping
card supports adding, editing, completing and removing list items directly from
Home without the native card's large empty state; list contents remain normal
mutable Home Assistant data while the card and its access policy stay Git-owned.
Rack health remains confined to the admin-only dashboard.

The Coming up rail shows at most four events across the next 14 days. The owner
profile combines Birthdays, the Google Family calendar, India holidays, the
personal Google calendar and both Topmate calendars. Non-owner family and review
profiles can read only Birthdays. This is enforced in Home Assistant's backend
entity policy as well as by account-specific Lovelace rendering, so private
calendar content is not merely hidden with frontend conditions. A source-owned
agenda card requests those authorized events through Home Assistant, groups shared
dates, and gives every event a readable date block, title, time and calendar
source. The washer is absent while it is off or unavailable and appears only
when a useful cycle status exists.

## Family access

`access/family-dashboard.json` is the desired-state access matrix for the family
dashboard. It binds immutable Home Assistant user IDs to their local login
username and person entity, lists the Protect cameras each account may see,
separates shared and owner-only Google calendars, and records each profile's
default dashboard and whether a non-owner private-entity policy must be
enforced. The same document sets `home-tablet` as the system fallback,
so opening the bare Home Assistant address lands on `/home-tablet/home` instead
of the removed built-in Home panel. Bootstrap validates
every account, person link and camera entity against the live registries before
Home Assistant starts. It then generates the Lovelace user include files and
reconciles non-owner permission groups and frontend defaults from the same
document without overwriting personal theme or locale preferences.

The managed family profiles are Abhimanyu, Manisha and Krishna. Krishna's person
is GitOps-linked to both the UniFi and Home Assistant Companion App trackers for
her Pixel 10 Pro; Manisha's person is linked to her iPhone Companion App tracker;
Abhimanyu's person retains only his own PC and Pixel 8 trackers. The Master
Bedroom camera is rendered for Krishna but omitted from Manisha, Abhimanyu and
the browser-review profile. Because Abhimanyu is the Home
Assistant owner, hiding a camera from that profile can only be a presentation
rule: owners always retain administrative entity access.
Non-owner family profiles receive both Lovelace filtering and backend camera and
calendar permissions. Their generated policy explicitly allows every registered
non-camera/non-calendar domain, only the camera entities granted in the access
matrix, and the shared Birthdays calendar; this avoids Home Assistant's
unconditional `all` permission fallback.
Restricted camera cards are omitted and the remaining cards reflow. Unknown
users receive no cameras by default.

Family credentials are never Git-owned. Create each account privately in Home
Assistant, then add its immutable user ID, login username, person entity, device
trackers and camera grants to the access matrix. Person records and tracker
ownership are created or repaired during bootstrap, while a user or entity
mismatch stops startup instead of silently widening access. The guarded
reconciler backs up `.storage/auth` and `.storage/person` before changes and is
idempotent on later Fleet rollouts.

The built-in Moon, Uptime, Shopping List and Local Calendar integrations are
configured without external accounts. Home presents an interactive Shopping
List beside its Google-backed agenda, while Rack shows the Home Assistant start
time. These config entries and
shopping-list contents are
UI-owned on the persistent volume; the dashboard presentation and access rules
remain Git-owned here.

Home also presents the LG ThinQ front-load washer as a compact read-only family
status while a meaningful cycle state exists. It shows the current stage,
remaining or total cycle time, and completion state. Because the cloud
integration reports an electrically-off washer as unavailable, that normal
condition is hidden; the dashboard exposes no power, operation, delayed-end, or
remote-start controls.

The source configuration fixes Home Assistant to the metric unit system. All
temperature cards render an explicit `°C`, and package-owned template sensors
convert the two UniFi readings that publish Fahrenheit into Celsius before they
reach the Rack dashboard.

Home's canonical location is G3-012, Indiabulls Centrum Park, Sector 103,
Gurugram, Haryana 122006 at `28.4978819, 76.9830822`, approximately 211 metres
above sea level. The Home zone uses a 100 metre radius and `Asia/Kolkata`.
Home Assistant's core location is fixed in `configuration.yaml`; bootstrap also
reconciles Google Weather's location subentry because that integration snapshots
the coordinates present when it is configured. API credentials remain untouched.

Protect camera cards explicitly request live rendering through Home Assistant's
LL-HLS stream proxy. The UniFi policy from the K8s network to the Protect console
must allow TCP `443` for the API and TCP `7441` for RTSPS. Cards automatically
recover as cameras reconnect in Protect. Outside is the primary, double-width
Home tile; disconnected cameras collapse to compact status rows with the last
Home Assistant check time and a route to the full camera wall instead of large
empty panels. The connected indoor camera is presented as `Master Bedroom`,
matching its current Protect entity.

`access/protect-streams.json` declares the active Protect RTSPS tiers. The
source-owned `family_camera_streams` integration reconciles those tiers through
the configured UniFi Protect public API, enables their native Home Assistant
entities, and retries when an electrically-off camera reconnects. This keeps
stream quality configuration reproducible without committing Protect secrets.

## Repository layout

- `access/`: Git-owned account mappings and camera access policy
- `location/`: canonical home address and integration location targets
- `configuration.yaml`: authoritative top-level Home Assistant YAML
- `dashboards/`: the family and admin Lovelace dashboards
- `dashboards/includes/family-navigation.yaml`: the shared account-aware rail
- `custom_components/family_dashboard_guard/`: removes the superseded built-in
  Home panel after the frontend integration starts
- `custom_components/family_camera_streams/`: reconciles Git-owned Protect
  stream tiers and their native Home Assistant entities
- `custom_components/family_jellyfin_sessions/`: exposes viewer-aware Jellyfin
  sessions for concurrent playback cards without another API poll
- `custom_components/family_music_assistant_sessions/`: mirrors dynamic Music
  Assistant players that deliberately opt out of native Home Assistant entities,
  reusing the integration's existing event stream without polling
- `custom_components/family_announcements/`: persists multiple account-attributed
  family bulletin messages, deletes them independently at expiry and sends each
  new message to the Companion App phones declared in the access policy
- `themes/`: source-owned themes
- `packages/`: source-owned helpers for normalized temperature presentation
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
matrix and default dashboard preferences on every rollout, and removes legacy
storage-mode dashboards after backing them up. A source-owned system integration
unregisters the built-in `/home/overview` panel on every startup, leaving the
custom `Home` and `Rack` dashboards as the intentional dashboard surfaces.

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
