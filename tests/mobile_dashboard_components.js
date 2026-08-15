const assert = require("node:assert/strict");
const path = require("node:path");
const { chromium } = require("playwright");

const ROOT = path.resolve(__dirname, "..");
const OUTPUT = process.env.HA_MOBILE_TEST_OUTPUT || "/tmp/ha-mobile-components";
const VIEWPORTS = [
  { name: "small", width: 375, height: 812 },
  { name: "large", width: 430, height: 932 },
  { name: "landscape", width: 844, height: 390 },
  { name: "tablet", width: 1024, height: 768 },
  { name: "desktop", width: 1440, height: 900 },
];

const state = (entity_id, value, attributes = {}) => ({
  entity_id,
  state: value,
  attributes,
  last_updated: new Date().toISOString(),
});

async function installComponents(page) {
  await page.route("http://dashboard.test/**", (route) => route.fulfill({
    status: 200,
    contentType: "text/html",
    body: "<!doctype html><title>Mobile dashboard fixture</title>",
  }));
  await page.goto("http://dashboard.test/home");
  await page.setContent(`
    <style>
      :root {
        --primary-text-color:#f8f9fb; --secondary-text-color:#8d9aae;
        --primary-background-color:#07090d; --ha-card-background:#11161e;
        --contrast1:#080b10; --contrast2:#11161e; --contrast3:#18202b;
        --contrast4:#222d3a; --contrast5:#2d3a49; --contrast7:#536274;
        --contrast8:#657488; --contrast9:#77879b; --contrast10:#8fa0b6;
        --contrast11:#a2afc0; --contrast12:#b3bfce; --contrast13:#c1cad6;
        --contrast14:#ccd4de; --contrast15:#d7dee7; --contrast16:#e1e6ed;
        --contrast17:#e9edf2; --contrast18:#eff2f6; --contrast19:#f5f7fa;
        --contrast20:#fff; --pink:#f47dcc; --blue:#84aef9; --teal:#57ded4;
        --green:#72e2ae; --yellow:#ffd76a; --orange:#ffa75f; --red:#ff768a;
        --purple:#be8cff; --black:#08090b; --room-accent:var(--teal);
      }
      * { box-sizing:border-box; }
      body { margin:0; padding:12px; background:var(--primary-background-color); color:var(--primary-text-color); font-family:Arial,sans-serif; }
      main { display:grid; gap:12px; max-width:1100px; margin:auto; }
      ha-card { display:block; }
      ha-icon { display:inline-grid; place-items:center; }
      ha-icon::before { content:"●"; font-size:12px; }
      test-card { display:block; min-height:72px; border-radius:18px; background:var(--contrast2); }
    </style>
    <main>
      <div id="responsive"></div>
      <div id="rooms"></div>
      <div id="room"></div>
      <div id="fan"></div>
      <div id="appliance"></div>
      <div id="media"></div>
      <div id="agenda"></div>
      <div id="announcements"></div>
      <div id="seerr"></div>
      <div id="camera-wall"></div>
      <div id="camera-events"></div>
    </main>
  `);
  await page.evaluate(() => {
    class HaCard extends HTMLElement {}
    class HaIcon extends HTMLElement {}
    class HuiPictureEntityCard extends HTMLElement {
      setConfig(config) {
        this._config = config;
        this._configCalls = (this._configCalls || 0) + 1;
        this.innerHTML = `<ha-card style="display:grid;place-items:center;min-height:210px">${config.name}</ha-card>`;
      }
      set hass(value) { this._hass = value; }
    }
    class TestCard extends HTMLElement {
      setConfig(config) { this._config = config; }
      set hass(value) { this._hass = value; }
    }
    customElements.define("ha-card", HaCard);
    customElements.define("ha-icon", HaIcon);
    customElements.define("test-card", TestCard);
    window.loadCardHelpers = async () => {
      await new Promise((resolve) => setTimeout(resolve));
      if (!customElements.get("hui-picture-entity-card")) {
        customElements.define("hui-picture-entity-card", HuiPictureEntityCard);
      }
      return {
        createCardElement(config) {
          const tag = config.type.startsWith("custom:") ? config.type.slice(7) : `hui-${config.type}-card`;
          const element = document.createElement(tag);
          element.setConfig?.(config);
          return element;
        },
      };
    };
  });
  for (const source of [
    "family-responsive-grid-card.js",
    "family-fan-card.js",
    "family-room-card.js",
    "family-room-summary-card.js",
    "family-appliance-card.js",
    "family-media-card.js",
    "family-rooms-card.js",
    "family-agenda-card.js",
    "family-announcements-card.js",
    "family-seerr-requests-card.js",
    "family-camera-wall-card.js",
    "family-camera-events-card.js",
  ]) {
    await page.addScriptTag({ path: path.join(ROOT, "www", source) });
  }
}

async function buildFixture(page) {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  tomorrow.setHours(10, 30, 0, 0);
  const previous = new Date(now.getTime() - 60000);
  const hassStates = {
    "fan.office": state("fan.office", "on", { percentage: 66 }),
    "light.office": state("light.office", "on"),
    "switch.office_sleep": state("switch.office_sleep", "off"),
    "select.office_timer": state("select.office_timer", "Off", { options: ["Off", "1 hour", "2 hours", "3 hours", "6 hours"] }),
    "sensor.office_timer_elapsed": state("sensor.office_timer_elapsed", "0"),
    "fan.living_1": state("fan.living_1", "on", { percentage: 33 }),
    "light.living_1": state("light.living_1", "off"),
    "switch.living_1_sleep": state("switch.living_1_sleep", "off"),
    "select.living_1_timer": state("select.living_1_timer", "Off", { options: ["Off", "1 hour", "2 hours"] }),
    "fan.living_2": state("fan.living_2", "off", { percentage: 50 }),
    "light.living_2": state("light.living_2", "off"),
    "switch.living_2_sleep": state("switch.living_2_sleep", "off"),
    "select.living_2_timer": state("select.living_2_timer", "Off", { options: ["Off", "1 hour", "2 hours"] }),
    "binary_sensor.dishwasher_connectivity": state("binary_sensor.dishwasher_connectivity", "on"),
    "binary_sensor.dishwasher_remote_control": state("binary_sensor.dishwasher_remote_control", "on"),
    "binary_sensor.dishwasher_remote_start": state("binary_sensor.dishwasher_remote_start", "on"),
    "sensor.dishwasher_door": state("sensor.dishwasher_door", "closed"),
    "sensor.dishwasher_operation_state": state("sensor.dishwasher_operation_state", "ready"),
    "sensor.dishwasher_program_progress": state("sensor.dishwasher_program_progress", "0", { unit_of_measurement:"%" }),
    "sensor.dishwasher_salt_nearly_empty": state("sensor.dishwasher_salt_nearly_empty", "off"),
    "sensor.dishwasher_rinse_aid_nearly_empty": state("sensor.dishwasher_rinse_aid_nearly_empty", "off"),
    "select.dishwasher_selected_program": state("select.dishwasher_selected_program", "dishcare_dishwasher_program_quick_65", { options:["dishcare_dishwasher_program_quick_65","dishcare_dishwasher_program_eco_50"] }),
    "switch.dishwasher_power": state("switch.dishwasher_power", "on"),
    "media_player.echo_ma": state("media_player.echo_ma", "playing", { media_title:"Morning music", media_artist:"Family playlist", volume_level:.35 }),
    "media_player.echo_alexa": state("media_player.echo_alexa", "idle", { volume_level:.35 }),
    "calendar.family": state("calendar.family", "off", { friendly_name: "Family" }),
    "sensor.family_announcements": state("sensor.family_announcements", "1", {
      announcements: [{
        id: "one", message: "Dinner is ready at eight.", sender_user_id: "owner",
        sender_name: "Abhimanyu", sender_username: "asaharan",
        created_at: now.toISOString(), expires_at: null,
      }],
    }),
    "sensor.seerr": state("sensor.seerr", "2", {
      external_url: "http://requests.example.test",
      requests: [
        { id: 1, title: "A long series title for a narrow phone", year: 2026, media_type: "tv", seasons: [2], requested_by: "Manisha" },
        { id: 2, title: "Family Movie", year: 2025, media_type: "movie", seasons: [], requested_by: "Krishna" },
      ],
    }),
    "camera.outside_high": state("camera.outside_high", "recording"),
    "camera.outside_medium": state("camera.outside_medium", "recording"),
    "camera.outside_low": state("camera.outside_low", "recording"),
    "camera.private_high": state("camera.private_high", "recording"),
    "camera.private_medium": state("camera.private_medium", "recording"),
    "sensor.outside_activity": state("sensor.outside_activity", "1", {
      last_event: now.toISOString(),
      events: [{
        id:"camera-event", camera_key:"outside", camera_name:"Outside",
        types:["person"], start:now.toISOString(), end:null, active:true,
        thumbnail:"data:image/gif;base64,R0lGODlhAQABAAAAACw=",
        video:"/api/family_camera_events/outside/camera-event/video",
      }, {
        id:"camera-clip", camera_key:"outside", camera_name:"Outside",
        types:["motion"], start:previous.toISOString(), end:now.toISOString(), active:false,
        thumbnail:"data:image/gif;base64,R0lGODlhAQABAAAAACw=",
        video:"/api/family_camera_events/outside/camera-clip/video",
      }],
    }),
    "sensor.outside_recording": state("sensor.outside_recording", "detections"),
    "binary_sensor.outside_dark": state("binary_sensor.outside_dark", "off"),
    "sensor.outside_microphone": state("sensor.outside_microphone", "70"),
    "binary_sensor.outside_person": state("binary_sensor.outside_person", "on"),
    "media_player.camera_speaker": state("media_player.camera_speaker", "idle"),
  };
  await page.evaluate(({ hassStates, eventStart }) => {
    window.__calls = [];
    window.__wsCalls = [];
    const hass = {
      states: hassStates,
      user: { id: "owner", name: "Abhimanyu", is_admin: true },
      callService: async (domain, service, data, target) => {
        window.__calls.push({ domain, service, data, target });
      },
      callWS: async (message) => {
        window.__wsCalls.push(message);
        if (message.type === "auth/sign_path") {
          return { path:`${message.path}?authSig=test` };
        }
        return {
          response: {
            "calendar.family": {
              events: [{ summary: "Dentist appointment", start: { dateTime: eventStart } }],
            },
          },
        };
      },
    };
    const office = { fan:"fan.office", led:"light.office", sleep:"switch.office_sleep", timer:"select.office_timer", timer_elapsed:"sensor.office_timer_elapsed" };
    const living = [
      { name:"Fan 1", fan:"fan.living_1", led:"light.living_1", sleep:"switch.living_1_sleep", timer:"select.living_1_timer" },
      { name:"Fan 2", fan:"fan.living_2", led:"light.living_2", sleep:"switch.living_2_sleep", timer:"select.living_2_timer" },
    ];
    const dishwasher = {
      type:"appliance", kind:"dishwasher", name:"Dishwasher", icon:"mdi:dishwasher", device_id:"dishwasher-device",
      entities:{ connectivity:"binary_sensor.dishwasher_connectivity", remote_control:"binary_sensor.dishwasher_remote_control", remote_start:"binary_sensor.dishwasher_remote_start", operation:"sensor.dishwasher_operation_state", door:"sensor.dishwasher_door", progress:"sensor.dishwasher_program_progress", salt:"sensor.dishwasher_salt_nearly_empty", rinse_aid:"sensor.dishwasher_rinse_aid_nearly_empty", selected_program:"select.dishwasher_selected_program", stop:"button.dishwasher_stop_program", power:"switch.dishwasher_power" },
    };
    window.fetch = async () => ({ ok:true, json:async () => ({
      version:1, base_path:"/home-tablet/rooms", access_mode:"shared",
      profiles:{ owner:{ username:"asaharan", name:"Abhimanyu", favourites:["office"] } },
      occupant_names:{ asaharan:"Abhimanyu", krishna:"Krishna", manisha:"Manisha" },
      rooms:[
        { slug:"office", name:"Office", icon:"mdi:desk", accent:"teal", occupants:["asaharan"], modules:[{type:"fans",name:"Fan",fans:[office]}] },
        { slug:"kitchen", name:"Kitchen", icon:"mdi:countertop-outline", accent:"orange", occupants:["shared"], modules:[dishwasher,{type:"media",name:"Kitchen Echo",icon:"mdi:speaker",players:["media_player.echo_ma","media_player.echo_alexa"]}] },
      ],
    }) });
    const mount = (target, tag, config) => {
      const element = document.createElement(tag);
      element.setConfig(config);
      element.hass = hass;
      document.querySelector(target).append(element);
      return element;
    };
    mount("#responsive", "family-responsive-grid-card", { cards:[{type:"custom:test-card"},{type:"custom:test-card"},{type:"custom:test-card"}], min_width:150 });
    mount("#rooms", "family-rooms-card", { manifest_url:"/local/generated/family-rooms.json" });
    mount("#room", "family-room-card", { name:"Living Room", icon:"mdi:sofa", accent:"var(--yellow)", cards:[{type:"custom:family-fan-card", name:"Living Room", embedded:true, fans:living}] });
    mount("#fan", "family-fan-card", { name:"Office", embedded:true, fans:[office] });
    mount("#appliance", "family-appliance-card", { module:dishwasher });
    mount("#media", "family-media-card", { module:{type:"media",name:"Kitchen Echo",icon:"mdi:speaker",players:["media_player.echo_ma","media_player.echo_alexa"]} });
    mount("#agenda", "family-agenda-card", { entities:[{entity:"calendar.family", name:"Family", color:"var(--green)"}], days:14, max_events:4 });
    mount("#announcements", "family-announcements-card", { entity:"sensor.family_announcements" });
    mount("#seerr", "family-seerr-requests-card", { entity:"sensor.seerr", url:"http://requests.example.test" });
    const cameraConfig = {
      key:"outside", name:"Outside", high_entity:"camera.outside_high",
      medium_entity:"camera.outside_medium", low_entity:"camera.outside_low",
      activity_entity:"sensor.outside_activity",
      detectors:["binary_sensor.outside_person"], users:["owner"],
    };
    mount("#camera-wall", "family-camera-wall-card", { cameras:[
      cameraConfig,
      { ...cameraConfig, key:"private", name:"Private", high_entity:"camera.private_high", medium_entity:"camera.private_medium", users:["other"] },
    ] });
    mount("#camera-events", "family-camera-events-card", { cameras:[{
      ...cameraConfig, recording_entity:"sensor.outside_recording",
      dark_entity:"binary_sensor.outside_dark", microphone_entity:"sensor.outside_microphone",
    }] });
  }, { hassStates, eventStart: tomorrow.toISOString() });
  await page.waitForTimeout(100);
}

const boxes = (locator) => locator.evaluateAll((elements) => elements.map((element) => {
  const box = element.getBoundingClientRect();
  return { x: box.x, y: box.y, width: box.width, height: box.height, right: box.right, bottom: box.bottom };
}));

function overlaps(left, right) {
  return left.x < right.right && left.right > right.x && left.y < right.bottom && left.bottom > right.y;
}

async function assertTargets(locator, minimum = 44) {
  const values = (await boxes(locator)).filter((box) => box.width > 0 && box.height > 0);
  assert(values.length, `No targets matched ${locator}`);
  values.forEach((box) => {
    assert(box.width >= minimum && box.height >= minimum, `Small touch target: ${JSON.stringify(box)}`);
  });
}

async function validate(page, viewport) {
  const doc = await page.evaluate(() => ({ width: document.documentElement.scrollWidth, viewport: innerWidth }));
  assert(doc.width <= doc.viewport, `Horizontal overflow at ${viewport.name}: ${JSON.stringify(doc)}`);

  const responsive = page.locator("family-responsive-grid-card");
  const responsiveCards = await boxes(responsive.locator("test-card"));
  assert.equal(responsiveCards.length, 3);
  if (viewport.width <= 430) {
    assert(Math.abs(responsiveCards[0].y - responsiveCards[1].y) < 2, "Responsive grid did not retain two readable columns");
    assert(responsiveCards[2].y > responsiveCards[0].y, "Responsive grid did not wrap its third card");
  }

  const rooms = page.locator("family-rooms-card");
  await rooms.locator("family-room-summary-card").first().waitFor();
  const roomSummaries = await boxes(rooms.locator("family-room-summary-card ha-card"));
  assert.equal(roomSummaries.length, 2, "Room router did not render the shared room list");
  await assertTargets(rooms.locator("family-room-summary-card ha-card"));
  await rooms.locator("family-room-summary-card").first().click();
  await rooms.locator("family-room-card").waitFor();
  assert.equal(new URL(page.url()).pathname, "/home-tablet/rooms/office");
  await assertTargets(rooms.locator("family-room-card .back"));
  await rooms.locator("family-room-card .back").click();
  await rooms.locator("family-room-summary-card").first().waitFor();

  const roomFan = page.locator("#room family-fan-card");
  const tiles = await boxes(roomFan.locator(".fan-tile"));
  assert.equal(tiles.length, 2);
  if (viewport.width <= 639) assert(tiles[1].y > tiles[0].bottom, "Living Room fans did not stack on phone");

  const fan = page.locator("#fan family-fan-card");
  await assertTargets(fan.locator(".power-core,.speed,.feature"));
  const core = (await boxes(fan.locator(".power-core")))[0];
  const speeds = await boxes(fan.locator(".speed"));
  speeds.forEach((speed) => assert(!overlaps(speed, core), "Speed target overlaps the power centre"));
  for (let left = 0; left < speeds.length; left += 1) {
    for (let right = left + 1; right < speeds.length; right += 1) {
      assert(!overlaps(speeds[left], speeds[right]), "Speed targets overlap each other");
    }
  }

  const clickFanAction = async (selector) => {
    await fan.locator(selector).click();
    await page.waitForTimeout(700);
  };
  await clickFanAction(".power-core");
  await clickFanAction(".speed-5");
  await clickFanAction('.feature[data-action="led"]');
  await clickFanAction('.feature[data-action="sleep"]');

  await fan.locator('.feature[data-action="timer"]').click();
  const timer = fan.locator("dialog.timer-dialog");
  await timer.waitFor({ state:"visible" });
  await assertTargets(timer.locator("button"));
  if (viewport.width <= 639) {
    const timerBox = (await boxes(timer))[0];
    assert(Math.abs(timerBox.width - viewport.width) <= 1, "Timer is not a full-width phone sheet");
  }
  await timer.locator('[data-action="timer-choice"][data-option="1 hour"]').click();
  await page.waitForTimeout(700);

  const appliance = page.locator("family-appliance-card");
  await appliance.locator("summary").click();
  await assertTargets(appliance.locator("select,button"));
  assert(await appliance.locator('[data-action="start"]').isEnabled(), "Dishwasher start should be available only when remote start and the closed door are confirmed");

  const media = page.locator("family-media-card");
  await assertTargets(media.locator("button"));
  assert.equal(await media.locator(".name").textContent(), "Morning music");

  const announcements = page.locator("family-announcements-card");
  await assertTargets(announcements.locator(".add,.remove"));
  await announcements.locator(".remove").click();
  await announcements.locator(".add").click();
  const announcementDialog = announcements.locator("dialog");
  await announcementDialog.waitFor({ state:"visible" });
  await assertTargets(announcementDialog.locator("button,input,textarea"));
  await announcementDialog.locator('[data-duration="custom"]').click();
  assert(await announcementDialog.locator(".custom-time").evaluate((element) => element.classList.contains("visible")));
  await announcementDialog.locator(".cancel").click();
  await announcements.locator(".add").click();
  await announcementDialog.locator("textarea").fill("Mobile announcement test");
  await announcementDialog.locator(".publish").click();

  const agenda = page.locator("family-agenda-card");
  await agenda.locator(".event").waitFor({ state:"visible" });
  await assertTargets(agenda.locator(".event"));
  await agenda.locator(".event").click();
  assert.equal(await page.evaluate(() => location.pathname), "/calendar");

  const seerr = page.locator("family-seerr-requests-card");
  await assertTargets(seerr.locator(".open,.action"));
  await seerr.locator('.action[aria-label="Approve request"]').first().click();
  await seerr.locator('.action[aria-label="Decline request"]').first().click();
  await assertTargets(seerr.locator('.action[aria-label="Cancel"],.action[aria-label="Confirm decline"]'));
  await seerr.locator('.action[aria-label="Cancel"]').click();
  await seerr.locator('.action[aria-label="Decline request"]').nth(1).click();
  await seerr.locator('.action[aria-label="Confirm decline"]').click();

  const cameraWall = page.locator("family-camera-wall-card");
  assert.equal(await cameraWall.locator(".camera").count(), 1, "Camera wall leaked a camera outside the signed-in account policy");
  assert.equal(await cameraWall.locator("hui-picture-entity-card").count(), 1);
  const ambientQuality = await cameraWall.locator("hui-picture-entity-card").evaluate((element) => element._config.camera_image);
  assert.equal(ambientQuality, viewport.width <= 767 ? "camera.outside_low" : "camera.outside_medium");
  const stablePlayer = await cameraWall.locator("hui-picture-entity-card").evaluate(async (element) => {
    const wall = element.getRootNode().host;
    const hass = wall._hass;
    const original = element;
    const changed = (value) => ({
      ...hass.states["binary_sensor.outside_person"],
      state:value,
      last_updated:new Date().toISOString(),
    });
    hass.states["binary_sensor.outside_person"] = changed("off");
    wall.hass = hass;
    hass.states["binary_sensor.outside_person"] = changed("on");
    wall.hass = hass;
    const current = wall.shadowRoot.querySelector("hui-picture-entity-card");
    return {
      same: original === current,
      image: current._config.camera_image,
      calls: current._configCalls,
      focused: current.closest(".camera").classList.contains("focused"),
    };
  });
  assert(stablePlayer.same, "Camera player DOM was replaced during a state update");
  assert.equal(stablePlayer.image, "camera.outside_high", "Activity did not promote the camera to high resolution");
  assert(stablePlayer.focused, "Activity camera was not focused");
  assert.equal(stablePlayer.calls, 2, "Camera player was configured more than once per quality change");

  const cameraEvents = page.locator("family-camera-events-card");
  await cameraEvents.locator('.event-action[data-video]').waitFor({ state:"visible" });
  await assertTargets(cameraEvents.locator(".event-action"));
  await cameraEvents.locator('.event-action[data-live="true"]').click();
  await cameraEvents.locator('.event-action[data-video]').click();
  const clipDialog = cameraEvents.locator("dialog.clip-dialog");
  await clipDialog.waitFor({ state:"visible" });
  assert((await clipDialog.locator("video").getAttribute("src")).includes("authSig=test"));
  await clipDialog.locator(".clip-close").click();
  const signedClip = await page.evaluate(() => window.__wsCalls.some((call) =>
    call.type === "auth/sign_path" && call.path.endsWith("/camera-clip/video")));
  assert(signedClip, "Completed clip did not request a user-bound signed path");

  const calls = await page.evaluate(() => window.__calls);
  const invoked = new Set(calls.map((call) => `${call.domain}.${call.service}`));
  for (const service of [
    "fan.turn_off", "fan.set_percentage", "light.turn_off", "switch.turn_on",
    "select.select_option", "family_announcements.dismiss",
    "family_announcements.publish", "family_seerr_requests.approve",
    "family_seerr_requests.decline",
  ]) {
    assert(invoked.has(service), `Service path was not exercised: ${service}`);
  }

  await page.screenshot({ path:`${OUTPUT}-${viewport.name}.png`, fullPage:true, animations:"disabled" });
}

(async () => {
  const browser = await chromium.launch({ executablePath:"/usr/bin/google-chrome", headless:true });
  const errors = [];
  for (const viewport of VIEWPORTS) {
    const page = await browser.newPage({ viewport: { width:viewport.width, height:viewport.height } });
    page.on("pageerror", (error) => errors.push(error.message));
    await installComponents(page);
    await buildFixture(page);
    await validate(page, viewport);
    await page.close();
  }
  assert.deepEqual(errors, []);
  await browser.close();
  console.log(`Validated ${VIEWPORTS.length} responsive component layouts and interactions.`);
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
