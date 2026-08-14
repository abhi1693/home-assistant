# Home Assistant

Git-owned Home Assistant configuration for the Saharan family home. The source
is intentionally separate from the Kubernetes deployment so the dashboards,
themes, packages and guarded storage migrations can evolve without embedding
application code in cluster manifests.

The desktop visual language closely follows the composition of
[jlnbln/My-HA-Dashboard](https://github.com/jlnbln/My-HA-Dashboard): a fixed left
navigation rail, narrative greeting, compact status strip, one dominant content
zone, a narrow household rail, soft rounded surfaces and useful information
visible without drilling through menus. Phone layouts preserve the same information
hierarchy while reflowing dense controls into readable, touch-safe rows and grids.
The native Home Assistant sidebar is hidden on these kiosk views so it does not
compete with the family navigation rail.

Home's status strip is one quiet visual sentence rather than a row of
competing cards. Weather and presence are stable anchors; the other positions
adapt to laundry, shopping, sunrise or sunset, active playback or fans, humidity
and genuine attention states. When playback and fans are inactive, the activity
position reports the home as quiet instead of repeating another environmental
reading. Internet appears only when
degraded, the signed-in person's phone only when below 25 percent, and routine fan-off
states are omitted. Abhimanyu and Krishna each see their own Android phone's
next alarm beside the attention card, formatted as a local day and time or
`No alarm`; each phone must have Companion App **Next alarm** enabled under
Manage sensors. Manisha's iPhone view retains the five-item strip because iOS
does not expose the corresponding sensor. Android exposes
the next scheduled alarm but does not reliably identify and replace the first
Clock alarm, so this household surface intentionally remains read-only rather
than risking duplicate alarms. Icon color is semantic: normal states stay muted, while
activity and conditions needing attention receive color.

The household sidebar presents all three family phones as a single compact
three-column group. Each person gets only a battery icon and percentage: the
icon shape distinguishes charging from battery use, while green, blue, amber
and red communicate full/charging, normal, low and critical levels. The Pixel 8,
Pixel 10 Pro and iPhone level/state entity pairs are recorded in the Git-owned
family access matrix.

The sidebar has a shared **Coming home** surface for Abhimanyu, Krishna and
Manisha. Home Assistant's native Proximity integration watches each person's
GPS direction and only reveals an arrival card while that person is actually
moving toward Home. Each card shows both remaining traffic-aware drive time and
the calculated arrival clock; stationary, away-bound and already-home people
do not produce misleading arrival claims. Abhimanyu additionally sees
`sensor.abhimanyu_home_to_work`, hidden while his phone is inside the private
Work zone. Krishna and Manisha also receive private named Work zones so their
presence state is useful without exposing either workplace location in source.

The Git-owned bootstrap converts the existing Google Travel Time origin to the
Pixel 8 Companion App tracker, disables duplicate automatic polling, creates
the family Proximity entry, and derives Abhimanyu's runtime-only Work zone from
the integration's existing destination. Krishna and Manisha's coordinates are
supplied to bootstrap by encrypted deployment secrets. The same private Google
configuration is reused for all three home routes. Its API key and all Work
coordinates remain in private storage and are never copied into this public
repository. Home routes call Google only while Proximity reports `towards` and
valid GPS coordinates are available; they refresh every 20 minutes during that
journey and immediately when homeward travel is first detected.

## Dashboards

- **Home** is family-facing and responsive. Its seven views cover the household
  overview, rooms and Atomberg fans, an account-filtered UniFi Protect wall,
  Security, People, and owner-only Health and Maintenance. Health uses current
  Companion App measurements plus recorded activity trends; private vitals and
  sleep history remain excluded from Recorder. Music Assistant and Jellyfin
  activity remain embedded in the household overview.
- **Rack** is admin-only. It keeps Kubernetes, UniFi and rack temperatures away
  from the shared family experience.
- Every dashboard view consumes the same source-owned navigation rail. Everyone
  sees Home, Rooms, Cameras, Security and People. Only Abhimanyu sees Health and
  Maintenance; admins additionally see Rack and Settings. Owner health entities
  are explicitly denied to every non-owner account, independently of Lovelace.
- `Family Dark` is the local visual system. Bubble Card, Button Card, Navbar Card,
  Card Mod, Auto Entities, Todo Swipe Card and Kiosk Mode are
  commit/version-pinned, checksum-verified assets.

At widths below 640 pixels, Home's status ribbon becomes a two-column summary,
camera and favourite-room grids reflow instead of clipping labels, and the fixed
navigation gains safe-area spacing. Announcements move directly below the phone
status summary while retaining their desktop household-rail position. Rooms stacks the two Living Room fans, reduces
decorative padding, preserves 44-pixel or larger primary touch targets, and turns
Light, Sleep and Timer into compact icon-led actions. Fan timers and announcement
composition open as bottom sheets with large duration choices and controls that
remain reachable above the phone safe area. Agenda, Seerr and announcement actions
also use phone-specific spacing without changing account gates or service behavior.
The same component suite is exercised at phone, landscape, tablet and desktop
widths.

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
sessions, so playback never removes navigation. Samsung TV, Fire TV and other
playback controls remain extension points for later phases.

The shared overview favors household decisions over system telemetry. Its
single-screen desktop composition has a personalized greeting, compact weather
and household ribbon with adjacent humidity and color-coded India NAQI status,
account-filtered camera wall, adaptive Music
Assistant/Jellyfin activity, a narrow Coming up rail, and account-specific area
summaries ordered for each person's routine. Abhimanyu sees Office, Bedroom and
Living Room; Krishna sees Master
Bedroom, Kitchen, Living Room and Dining Room; Manisha sees Bedroom, Kitchen,
Living Room and Guest Room. The browser-review profile sees no favourites.
The Living Room summary combines both fans. Rooms is now a source-owned nested
surface: `/home-tablet/rooms` presents compact, priority-based room summaries,
while `/home-tablet/rooms/<room-slug>` opens that room's controls. All seven rooms
are visible and manageable by every authenticated family account in this rollout.
Primary occupants are metadata used only for context and personalised ordering:
Krishna for Master Bedroom, Abhimanyu and Manisha for Bedroom, and Abhimanyu for
Office; the remaining rooms are shared. The full room view uses a
source-owned, quota-conscious circular control inspired by Atomberg's appliance
interface. Tapping the large centre starts at the retained speed or turns the
fan off; the centre shows only On or Off, while six direct speed targets sit
around it and Boost uses a fan icon. Light, Sleep
and the 1/2/3/6-hour timer remain subordinate below the dial. Light and Sleep
stay visible but require the fan to be running, while the timer changes between
Turn on later and Turn off later. Sleep and Timer are mutually exclusive; choosing
one lets the fan replace the other with its native command instead of spending an
extra API call. A fixed centre rotor rotates only while running,
unavailable fans collapse to a disabled wall-switch message, and one per-fan
command lock prevents conflicting taps. Living Room presents both fans as equal
tiles within its Living Room module; every other fan is similarly contained in
its room module so media, appliances, cameras and future controls can be added
without changing the room index.
Selecting a speed while off sends separate power and speed commands matching
Atomberg's published API. An immediate action first cancels an active
conflicting timer so it cannot unexpectedly reverse the fan later.
The family row combines each person's avatar, approximate home/away likelihood,
and color-coded phone battery state. Tapping a person opens Home Assistant's
location panel without publishing coordinates on the shared card. The greeting ends with one prioritized
household message: laundry completion, a current or next-day family event,
unsafe air, significant heat or storms, shopping needs, or a time-appropriate
all-clear. The context line always gives the current translated air-quality
category when available; the compact summary shows its plain-language severity
and AQI value in the corresponding color.
Its context line includes the weekday, day part and current time, and its weather
advice changes between morning, afternoon, evening and night. The former
Good Night action was removed because it only recorded an abstract intent and
did not perform a useful, predictable household action. Bootstrap removes its
four retired entity-registry entries together with the five retired Vacation
entities, without touching user-owned helpers.
A Git-owned family
bulletin in the household rail groups independent, account-attributed household
updates above Shopping. Its Add action opens a focused composer; each
message remains until its sender or an administrator removes it, or disappears
entirely at its optional end time. Publishing also sends the message to every
mapped family Companion App phone.
When the bulletin is empty it collapses to a compact Announcements/Add bar.
For the owner account, a compact Seerr queue sits between Announcements and
Shopping. It polls the in-cluster Seerr API once per minute, shows up to four
pending movie or series requests with the requester, and offers immediate
approval plus a confirm-before-decline action. The administrator API key stays
inside the Home Assistant backend; Lovelace receives only sanitized request
summaries, and both services reject inactive or non-admin Home Assistant users.
Routine fan-off state is omitted; running fans are called out because they are
useful household context. The compact Todo Swipe Shopping
card supports adding, editing, completing and removing list items directly from
Home without the native card's large empty state; list contents remain normal
mutable Home Assistant data while the card and its access policy stay Git-owned.
Rack health remains confined to the admin-only dashboard.

The household package supplies restart-safe Normal, Guest and Maintenance
intent, quiet hours, a default `Shadow` safety stage,
confidence-aware phone presence, five-minute empty-home dwell, camera outage
timers, one notification router, washer, dishwasher, fan,
travel-battery and perimeter workflows. Shadow mode records
decisions but does not send mobile alerts or control devices. Hardware-dependent
contact, leak, certified smoke/CO, indoor-air and wellbeing capabilities remain
explicitly dormant instead of appearing healthy without sensors or consent.
Bootstrap also reconciles the existing cluster NUT endpoint as a credential-free,
read-only `Rack UPS` config entry. Home Assistant can explain battery, load and
runtime, while Rack Ops remains the only system allowed to stage Kubernetes
shutdown or recovery.
Rack's former per-node REST placeholders are replaced by one internal summary
bridge. It exposes only ready-node, unhealthy-workload, Fleet, Longhorn,
Prometheus-target, alert and database-backup counts from Prometheus, with no
Kubernetes credentials or control path; Grafana and Rancher remain the deep
diagnostic surfaces.

The Coming up rail shows at most four events across the next 14 days. The owner
profile combines Birthdays, the Google Family calendar, India holidays, the
personal Google calendar and both Topmate calendars. Non-owner family and review
profiles can read only Birthdays. This is enforced in Home Assistant's backend
entity policy as well as by account-specific Lovelace rendering, so private
calendar content is not merely hidden with frontend conditions. A source-owned
agenda card requests those authorized events through Home Assistant, groups shared
dates, and gives every event a readable date block, title, time and calendar
source. The Guest Room presents the washer as read-only cycle status. Kitchen
presents the Bosch dishwasher with progress, finish time and refill warnings;
program selection, delayed start, stop and power remain behind an advanced
section. Starting is enabled only when connectivity, remote control, remote
start, a closed door and a selected program are all confirmed, and it always
requires confirmation. Office and Kitchen each merge their Music Assistant and
Alexa representations into one logical Echo card. The future Bedroom and Guest
Room televisions are declared as optional placeholders and stay hidden until
their actual Home Assistant entities are known.

## Family access

`access/family-dashboard.json` is the desired-state access matrix for the family
dashboard. It binds immutable Home Assistant user IDs to their local login
username and person entity, lists the Protect cameras each account may see,
records each supported Android phone's next-alarm entity,
separates shared and owner-only Google calendars, and records each profile's
default dashboard and whether a non-owner private-entity policy must be
enforced. The current family profiles all receive the three camera streams;
room occupant metadata does not restrict access. The same document sets
`home-tablet` as the system fallback,
so opening the bare Home Assistant address lands on `/home-tablet/home` instead
of the removed built-in Home panel. Bootstrap validates
every account, person link and camera entity against the live registries before
Home Assistant starts. It then generates the Lovelace user include files and
reconciles non-owner permission groups and frontend defaults from the same
document without overwriting personal theme or locale preferences.

The managed family profiles are Abhimanyu, Manisha and Krishna. Krishna's person
is GitOps-linked to both the UniFi and Home Assistant Companion App trackers for
her Pixel 10 Pro; Manisha's person is linked to her iPhone Companion App tracker;
Abhimanyu's person retains only the Pixel 8 GPS and matching UniFi phone
trackers; desktop computers are never presence evidence. All three family
profiles receive Master Bedroom, Kitchen Balcony and Outside during this shared
rollout. The non-family browser-review profile receives no camera.
Non-owner family profiles receive both Lovelace filtering and backend camera and
calendar permissions. Their generated policy explicitly allows every registered
non-camera/non-calendar domain, only the camera entities granted in the access
matrix, and the shared Birthdays calendar; this avoids Home Assistant's
unconditional `all` permission fallback.
Camera cards granted by the matrix reflow automatically; unknown and non-family
review users receive no cameras by default.

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

Recorder history, events and long-term statistics use the dedicated
`home_assistant` database on the home-lab CloudNativePG cluster. Kubernetes
injects the encrypted connection URL through `HOME_ASSISTANT_RECORDER_DB_URL`;
the source repository contains no database credentials. The previous SQLite
files remain on the persistent config volume as an offline rollback archive and
are not imported because Home Assistant does not support Recorder database
migration.
Raw person, device-tracker, sleep, Health Connect, heart-rate, oxygen and
respiratory entities are excluded from Recorder by default. Shared pages expose
only named location state, confidence, freshness, arrival context and battery;
optional wellbeing remains consent-gated and absent until enabled per person.

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

- `access/`: Git-owned account mappings, camera access, UPS config and household
  entity/policy contracts
- `location/`: canonical home address and integration location targets
- `configuration.yaml`: authoritative top-level Home Assistant YAML
- `dashboards/`: the family and admin Lovelace dashboards
- `dashboards/includes/family-navigation.yaml`: the shared account-aware rail
- `custom_components/family_dashboard_guard/`: removes the superseded built-in
  Home panel after the frontend integration starts
- `custom_components/family_camera_streams/`: reconciles Git-owned Protect
  stream tiers and their native Home Assistant entities
- `custom_components/family_room_registry/`: idempotently reconciles Git-owned
  room areas and labels through Home Assistant's registries, including the
  dishwasher, washer, paired Echo devices and corrected camera placement
- `custom_components/family_jellyfin_sessions/`: exposes viewer-aware Jellyfin
  sessions for concurrent playback cards without another API poll
- `custom_components/family_music_assistant_sessions/`: mirrors dynamic Music
  Assistant players that deliberately opt out of native Home Assistant entities,
  reusing the integration's existing event stream without polling
- `custom_components/family_announcements/`: persists multiple account-attributed
  family bulletin messages, deletes them independently at expiry and sends each
  new message to the Companion App phones declared in the access policy
- `custom_components/family_seerr_requests/`: polls the local pending-request
  queue and exposes admin-checked approve/decline actions without sending the
  Seerr API key to the browser
- `www/family-fan-card.js`: renders senior-friendly, quota-conscious
  fan controls with a fixed-axis SVG rotor that spins cleanly without moving
  the centre hub, plus multi-entity Atomberg room controls
- `www/family-rooms-card.js`: routes the shared room index and nested room paths,
  applying each account's favourite ordering without hiding any room
- `www/family-room-summary-card.js`: renders compact room status with attention,
  appliance, playback and active-fan priority
- `www/family-room-card.js`: owns the reusable detail boundary so fan, appliance,
  camera and media modules can evolve independently
- `www/family-appliance-card.js`: presents read-only washer status and guarded
  Home Connect dishwasher controls
- `www/family-media-card.js`: merges duplicate Alexa and Music Assistant entities
  into one logical room speaker
- `themes/`: source-owned themes
- `packages/`: source-owned commute, household state/workflows and normalized
  temperature presentation
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

The Atomberg fork publishes requested command state immediately, then debounces
one authoritative all-fan cloud confirmation after successful cloud controls.
It also polls once per hour and persists hard limits of 1000 total cloud calls
and 24 poll calls per rolling 24 hours. Calls are spaced below five per second.
Confirmed states refresh the startup cache. Local UDP broadcasts remain the
preferred zero-quota low-latency update path when they can reach Home Assistant.
Atomberg's HTTP 403 explicit-deny quota response opens a persisted 24-hour
circuit breaker instead of triggering repeated authentication retries. During
that circuit break, HA starts the integration from its device cache and uses
matching network trackers for zero-quota local
UDP command fallback instead of leaving the fans unavailable.
Sleep and Timer are mutually exclusive in both the fan card and the
integration's acknowledged state. Enabling either mode clears the other from
the same native command, so the UI updates without another quota-consuming
request.

## Validation

Run the source tests with:

```sh
python3 -m unittest discover -s tests -v
```

Run the isolated phone component suite with Playwright available on `NODE_PATH`:

```sh
NODE_PATH=/path/to/node_modules node tests/mobile_dashboard_components.js
```

The browser suite covers 375px and 430px portrait phones, 844px landscape,
1024px tablet and 1440px desktop viewports. It checks horizontal overflow,
nested room navigation, shared room rendering, responsive grid reflow, Living
Room fan stacking, dial target separation, 44px touch targets, guarded
dishwasher controls, merged media playback, fan and announcement bottom sheets,
agenda interaction, and Seerr confirmation actions using mocked Home Assistant
services so no household device is changed.

The Kubernetes repository additionally validates the rendered Helm resource and
the live Fleet rollout that consumes this source.
