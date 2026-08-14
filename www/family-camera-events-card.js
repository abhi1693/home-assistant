const cameraEventsEscape = (value) => String(value ?? "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const CAMERA_EVENT_META = {
  animal: ["mdi:paw", "Animal"],
  baby_cry: ["mdi:baby-face-outline", "Baby cry"],
  barking: ["mdi:dog", "Dog barking"],
  car_horn: ["mdi:car-emergency", "Car horn"],
  co: ["mdi:molecule-co", "CO alarm"],
  glass_break: ["mdi:glass-fragile", "Glass break"],
  motion: ["mdi:motion-sensor", "Motion"],
  package: ["mdi:package-variant-closed", "Package"],
  person: ["mdi:account", "Person"],
  security_alarm: ["mdi:shield-alert-outline", "Security alarm"],
  siren: ["mdi:alarm-light-outline", "Siren"],
  smoke: ["mdi:smoke-detector-alert", "Smoke alarm"],
  speaking: ["mdi:account-voice", "Speaking"],
  vehicle: ["mdi:car", "Vehicle"],
};

class FamilyCameraEventsCard extends HTMLElement {
  setConfig(config) {
    if (!Array.isArray(config.cameras) || !config.cameras.length) {
      throw new Error("Family camera events requires cameras");
    }
    this.config = config;
    this.attachShadow({ mode: "open" });
    this._timer = setInterval(() => this._render(true), 60000);
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  disconnectedCallback() { clearInterval(this._timer); }

  _visible() {
    return this.config.cameras.filter((camera) =>
      !camera.users || camera.users.includes(this._hass.user?.id));
  }

  _relative(value) {
    const time = new Date(value).getTime();
    if (!Number.isFinite(time)) return "Recently";
    const minutes = Math.max(1, Math.round((Date.now() - time) / 60000));
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.round(minutes / 60)}h ago`;
    return `${Math.round(minutes / 1440)}d ago`;
  }

  _health(camera) {
    const live = this._hass.states[camera.high_entity];
    const recording = this._hass.states[camera.recording_entity];
    const dark = this._hass.states[camera.dark_entity]?.state === "on";
    const mic = this._hass.states[camera.microphone_entity]?.state;
    const online = live && !["unknown", "unavailable"].includes(live.state);
    const mode = recording && !["unknown", "unavailable"].includes(recording.state)
      ? recording.state.replaceAll("_", " ") : "Not recording";
    return `<div class="health ${online ? "online" : "offline"}">
      <div class="health-name"><span class="dot"></span><strong>${cameraEventsEscape(camera.name)}</strong></div>
      <div class="signals">
        <span title="${online ? "Online" : "Offline"}"><ha-icon icon="${online ? "mdi:video-check-outline" : "mdi:video-off-outline"}"></ha-icon>${online ? "Online" : "Offline"}</span>
        <span title="Recording mode"><ha-icon icon="mdi:record-rec"></ha-icon>${cameraEventsEscape(mode)}</span>
        ${dark ? '<span title="Night vision"><ha-icon icon="mdi:weather-night"></ha-icon>Night</span>' : ""}
        ${mic && mic !== "unavailable" ? `<span title="Microphone"><ha-icon icon="mdi:microphone-outline"></ha-icon>${cameraEventsEscape(mic)}%</span>` : ""}
      </div>
    </div>`;
  }

  _render(force = false) {
    if (!this.shadowRoot || !this._hass) return;
    const cameras = this._visible();
    const signature = JSON.stringify({
      user: this._hass.user?.id,
      states: cameras.flatMap((camera) => [
        camera.high_entity,
        camera.activity_entity,
        camera.recording_entity,
        camera.dark_entity,
        camera.microphone_entity,
      ].map((entityId) => {
        const state = this._hass.states[entityId];
        return [entityId, state?.state, state?.last_updated];
      })),
    });
    if (!force && signature === this._signature) return;
    this._signature = signature;
    const events = cameras.flatMap((camera) => {
      const state = this._hass.states[camera.activity_entity];
      return (state?.attributes?.events || []).map((event) => ({ ...event, camera }));
    }).sort((a, b) => String(b.start).localeCompare(String(a.start))).slice(0, 12);
    const health = cameras.map((camera) => this._health(camera)).join("");
    const timeline = events.length ? events.map((event) => {
      const primary = event.types?.find((type) => type !== "motion") || event.types?.[0] || "motion";
      const [icon, label] = CAMERA_EVENT_META[primary] || ["mdi:cctv", primary.replaceAll("_", " ")];
      const href = event.active ? "#" : event.video;
      const action = event.active ? "Live" : "Play clip";
      return `<article class="event ${event.active ? "active" : ""}" data-camera="${cameraEventsEscape(event.camera.high_entity)}">
        <div class="thumb"><img loading="lazy" src="${cameraEventsEscape(event.thumbnail)}" alt="${cameraEventsEscape(event.camera.name)} event"><ha-icon icon="${icon}"></ha-icon></div>
        <div class="event-copy"><div class="event-title">${cameraEventsEscape(label)} · ${cameraEventsEscape(event.camera.name)}</div>
          <div class="event-meta">${this._relative(event.start)}${event.active ? " · happening now" : ""}</div></div>
        <a class="event-action" href="${cameraEventsEscape(href)}" ${event.active ? "data-live=\"true\"" : 'target="_blank" rel="noopener"'}>${action}<ha-icon icon="mdi:chevron-right"></ha-icon></a>
      </article>`;
    }).join("") : '<div class="empty"><ha-icon icon="mdi:shield-check-outline"></ha-icon><strong>No recorded activity yet</strong><span>New Protect events will appear here automatically.</span></div>';

    this.shadowRoot.innerHTML = `
      <style>
        :host { display:block; }
        ha-card { padding:18px; border-radius:28px; background:var(--contrast2); }
        .health-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:10px; margin-bottom:18px; }
        .health-grid.cols-1 { grid-template-columns:1fr; }
        .health-grid.cols-2 { grid-template-columns:repeat(2,minmax(0,1fr)); }
        .health { padding:13px 14px; border:1px solid var(--contrast4); border-radius:18px; min-width:0; }
        .health-name { display:flex; align-items:center; gap:8px; margin-bottom:9px; }
        .dot { width:8px; height:8px; border-radius:50%; background:var(--red); box-shadow:0 0 0 4px color-mix(in srgb,var(--red) 16%,transparent); }
        .health.online .dot { background:var(--green); box-shadow:0 0 0 4px color-mix(in srgb,var(--green) 16%,transparent); }
        .signals { display:flex; flex-wrap:wrap; gap:7px 12px; color:var(--contrast10); font-size:11px; text-transform:capitalize; }
        .signals span { display:flex; align-items:center; gap:4px; }
        .signals ha-icon { width:15px; height:15px; }
        .timeline { display:grid; gap:9px; }
        .event { display:grid; grid-template-columns:108px minmax(0,1fr) auto; align-items:center; gap:14px; min-height:76px; padding:8px; border-radius:18px; background:var(--contrast1); border:1px solid transparent; }
        .event.active { border-color:color-mix(in srgb,var(--pink) 55%,transparent); }
        .thumb { position:relative; height:62px; border-radius:13px; overflow:hidden; background:var(--contrast4); }
        .thumb img { width:100%; height:100%; object-fit:cover; display:block; }
        .thumb ha-icon { position:absolute; left:7px; bottom:7px; width:18px; height:18px; color:white; filter:drop-shadow(0 1px 3px #000); }
        .event-title { font-size:14px; font-weight:700; color:var(--contrast18); }
        .event-meta { margin-top:4px; color:var(--contrast9); font-size:11px; }
        .event-action { display:flex; align-items:center; gap:2px; min-height:44px; color:var(--pink); text-decoration:none; font-size:12px; font-weight:700; padding:10px; }
        .event-action ha-icon { width:18px; height:18px; }
        .empty { min-height:120px; display:grid; place-items:center; align-content:center; gap:6px; color:var(--contrast9); text-align:center; }
        .empty ha-icon { color:var(--green); width:30px; height:30px; }
        .empty strong { color:var(--contrast16); }
        .empty span { font-size:12px; }
        @media (max-width:900px) { .health-grid { grid-template-columns:1fr 1fr; } }
        @media (max-width:620px) {
          ha-card { padding:12px; border-radius:22px; }
          .health-grid,.health-grid.cols-2 { grid-template-columns:1fr; }
          .event { grid-template-columns:82px minmax(0,1fr); gap:10px; }
          .event-action { grid-column:2; padding:0 4px 4px; justify-self:start; }
          .thumb { height:66px; grid-row:1 / 3; }
        }
      </style>
      <ha-card><div class="health-grid cols-${Math.min(3, cameras.length)}">${health}</div><div class="timeline">${timeline}</div></ha-card>`;
    this.shadowRoot.querySelectorAll('a[data-live="true"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const entityId = link.closest("article")?.dataset.camera;
        if (!entityId) return;
        const detail = { entityId };
        this.dispatchEvent(new CustomEvent("hass-more-info", { bubbles: true, composed: true, detail }));
      });
    });
    this.shadowRoot.querySelectorAll("img").forEach((image) => image.addEventListener("error", () => image.style.display = "none"));
  }

  getCardSize() { return 6; }
  getGridOptions() { return { columns: "full", rows: "auto" }; }
}

customElements.define("family-camera-events-card", FamilyCameraEventsCard);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "family-camera-events-card",
  name: "Family Camera Events",
  description: "Private Protect health and event timeline with thumbnails and clips.",
});
