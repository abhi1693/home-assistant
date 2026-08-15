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

  async _signedPath(path, expires = 90) {
    if (!path?.startsWith("/api/family_camera_events/")) return path;
    const signed = await this._hass.callWS({
      type: "auth/sign_path",
      path,
      expires,
    });
    return signed.path;
  }

  async _hydrateThumbnails(generation) {
    const images = [...this.shadowRoot.querySelectorAll("img[data-source]")];
    await Promise.all(images.map(async (image) => {
      const source = image.dataset.source;
      try {
        const signed = await this._signedPath(source);
        if (generation !== this._mediaGeneration || !image.isConnected) return;
        image.src = signed;
      } catch (_error) {
        if (image.isConnected) image.classList.add("failed");
      }
    }));
  }

  _closeClip() {
    const dialog = this.shadowRoot.querySelector("dialog.clip-dialog");
    const video = dialog?.querySelector("video");
    if (video) {
      video.pause();
      video.removeAttribute("src");
      video.load();
    }
    if (dialog?.open) dialog.close();
  }

  async _openClip(button) {
    const dialog = this.shadowRoot.querySelector("dialog.clip-dialog");
    const video = dialog?.querySelector("video");
    const message = dialog?.querySelector(".clip-message");
    if (!dialog || !video || !message) return;
    button.disabled = true;
    message.textContent = "Preparing clip…";
    try {
      video.src = await this._signedPath(button.dataset.video, 120);
      video.poster = await this._signedPath(button.dataset.thumbnail, 120);
      video.muted = true;
      message.textContent = `${button.dataset.title} · High resolution · Muted`;
      dialog.showModal();
      try {
        await video.play();
      } catch (_error) {
        message.textContent = `${button.dataset.title} · High resolution · Press play to start`;
      }
    } catch (_error) {
      message.textContent = "Clip could not be opened. Try again.";
      dialog.showModal();
    } finally {
      button.disabled = false;
    }
  }

  _render(force = false) {
    if (!this.shadowRoot || !this._hass) return;
    const cameras = this._visible();
    const signature = JSON.stringify({
      user: this._hass.user?.id,
      cameras: cameras.map((camera) => {
        const activity = this._hass.states[camera.activity_entity];
        return {
          key: camera.key,
          high: this._hass.states[camera.high_entity]?.state,
          recording: this._hass.states[camera.recording_entity]?.state,
          dark: this._hass.states[camera.dark_entity]?.state,
          microphone: this._hass.states[camera.microphone_entity]?.state,
          last_event: activity?.attributes?.last_event,
          events: activity?.attributes?.events,
        };
      }),
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
      const action = event.active ? "Live" : "Play clip";
      const title = `${label} · ${event.camera.name}`;
      return `<article class="event ${event.active ? "active" : ""}" data-camera="${cameraEventsEscape(event.camera.high_entity)}">
        <button type="button" class="event-open" aria-label="${cameraEventsEscape(`${action}: ${title}`)}" ${event.active ? 'data-live="true"' : `data-video="${cameraEventsEscape(event.video)}" data-thumbnail="${cameraEventsEscape(event.thumbnail)}" data-title="${cameraEventsEscape(title)}"`}>
          <div class="thumb"><img loading="lazy" data-source="${cameraEventsEscape(event.thumbnail)}" alt="${cameraEventsEscape(event.camera.name)} event"><ha-icon icon="${icon}"></ha-icon></div>
          <div class="event-copy"><div class="event-title">${cameraEventsEscape(title)}</div>
            <div class="event-footer"><span class="event-meta">${this._relative(event.start)}${event.active ? " · happening now" : ""}</span><span class="event-action">${action}<ha-icon icon="mdi:chevron-right"></ha-icon></span></div></div>
        </button>
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
        .timeline { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); align-items:stretch; gap:12px; }
        .event { min-width:0; }
        .event-open { display:grid; grid-template-rows:auto 1fr; width:100%; height:100%; min-height:44px; padding:0; overflow:hidden; text-align:left; color:inherit; font:inherit; border:1px solid transparent; border-radius:18px; background:var(--contrast1); cursor:pointer; }
        .event.active .event-open { border-color:color-mix(in srgb,var(--pink) 55%,transparent); }
        .event-open:hover { border-color:color-mix(in srgb,var(--pink) 40%,transparent); }
        .event-open:focus-visible { outline:2px solid var(--pink); outline-offset:2px; }
        .event-open:disabled { opacity:.55; cursor:wait; }
        .thumb { position:relative; width:100%; aspect-ratio:16 / 9; overflow:hidden; background:var(--contrast4); }
        .thumb img { width:100%; height:100%; object-fit:cover; display:block; }
        .thumb img.failed { display:none; }
        .thumb ha-icon { position:absolute; left:10px; bottom:10px; width:22px; height:22px; color:white; filter:drop-shadow(0 1px 3px #000); }
        .event-copy { display:grid; align-content:space-between; gap:12px; min-height:92px; padding:13px 14px 12px; }
        .event-title { font-size:14px; font-weight:700; color:var(--contrast18); }
        .event-footer { display:flex; align-items:center; justify-content:space-between; gap:8px; }
        .event-meta { color:var(--contrast9); font-size:11px; }
        .event-action { display:flex; align-items:center; flex:0 0 auto; gap:2px; color:var(--pink); font-size:12px; font-weight:700; }
        .event-action ha-icon { width:18px; height:18px; }
        .clip-dialog { width:min(920px,calc(100vw - 32px)); padding:0; border:1px solid var(--contrast5); border-radius:24px; color:var(--contrast18); background:var(--contrast2); }
        .clip-dialog::backdrop { background:rgba(0,0,0,.78); backdrop-filter:blur(6px); }
        .clip-head { display:flex; align-items:center; justify-content:space-between; gap:12px; padding:14px 16px; }
        .clip-message { font-size:14px; font-weight:700; }
        .clip-close { width:44px; height:44px; display:grid; place-items:center; border:0; border-radius:50%; color:var(--contrast18); background:var(--contrast4); cursor:pointer; }
        .clip-dialog video { display:block; width:100%; max-height:72vh; background:#000; }
        .empty { min-height:120px; display:grid; place-items:center; align-content:center; gap:6px; color:var(--contrast9); text-align:center; }
        .empty ha-icon { color:var(--green); width:30px; height:30px; }
        .empty strong { color:var(--contrast16); }
        .empty span { font-size:12px; }
        @media (max-width:1100px) { .timeline { grid-template-columns:repeat(2,minmax(0,1fr)); } }
        @media (max-width:900px) { .health-grid { grid-template-columns:1fr 1fr; } }
        @media (max-width:620px) {
          ha-card { padding:12px; border-radius:22px; }
          .health-grid,.health-grid.cols-2 { grid-template-columns:1fr; }
          .timeline { grid-template-columns:1fr; }
          .event-copy { min-height:84px; }
        }
      </style>
      <ha-card><div class="health-grid cols-${Math.min(3, cameras.length)}">${health}</div><div class="timeline">${timeline}</div></ha-card>
      <dialog class="clip-dialog"><div class="clip-head"><div class="clip-message">Recorded activity</div><button type="button" class="clip-close" aria-label="Close clip"><ha-icon icon="mdi:close"></ha-icon></button></div><video controls autoplay muted playsinline preload="metadata"></video></dialog>`;
    this.shadowRoot.querySelectorAll('button[data-live="true"]').forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        const entityId = button.closest("article")?.dataset.camera;
        if (!entityId) return;
        const detail = { entityId };
        this.dispatchEvent(new CustomEvent("hass-more-info", { bubbles: true, composed: true, detail }));
      });
    });
    this.shadowRoot.querySelectorAll("button[data-video]").forEach((button) => {
      button.addEventListener("click", () => this._openClip(button));
    });
    const dialog = this.shadowRoot.querySelector("dialog.clip-dialog");
    dialog.querySelector(".clip-close").addEventListener("click", () => this._closeClip());
    dialog.addEventListener("close", () => this._closeClip());
    this._mediaGeneration = (this._mediaGeneration || 0) + 1;
    void this._hydrateThumbnails(this._mediaGeneration);
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
