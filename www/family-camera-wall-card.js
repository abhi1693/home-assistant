const cameraWallEscape = (value) => String(value ?? "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const cameraWallAvailable = (state) =>
  state && !["unknown", "unavailable"].includes(state.state);

class FamilyCameraWallCard extends HTMLElement {
  setConfig(config) {
    if (!Array.isArray(config.cameras) || !config.cameras.length) {
      throw new Error("Family camera wall requires cameras");
    }
    this.config = config;
    this._previous ||= new Map();
    this._entries ||= new Map();
    this._mobileQuery ||= window.matchMedia("(max-width: 767px)");
    this._handleMediaChange ||= () => this._render();
    this._mobileQuery.addEventListener("change", this._handleMediaChange);
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = `
        <style>
          :host { display:block; }
          .wall { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:14px; }
          .wall.cols-1 { grid-template-columns:1fr; }
          .wall.cols-2 { grid-template-columns:repeat(2,minmax(0,1fr)); }
          .camera { position:relative; min-width:0; overflow:hidden; border-radius:26px; background:var(--contrast2); }
          .camera.focused { grid-column:1 / -1; border:1px solid color-mix(in srgb,var(--pink) 60%,transparent); }
          .camera hui-picture-entity-card { display:block; }
          .camera.focused hui-picture-entity-card { max-width:1120px; margin:0 auto; }
          .focus { position:absolute; z-index:2; top:12px; left:12px; display:flex; align-items:center; gap:7px;
            padding:7px 10px; border-radius:999px; color:white; background:rgba(168,54,124,.88); font-size:12px; font-weight:700; }
          .focus[hidden],.offline[hidden] { display:none; }
          .offline { min-height:210px; display:grid; place-items:center; text-align:center; padding:20px; color:var(--contrast10); }
          .offline ha-icon { width:34px; height:34px; margin-bottom:10px; color:var(--contrast8); }
          .offline strong { display:block; color:var(--contrast16); font-size:16px; margin-bottom:4px; }
          @media (max-width:900px) { .wall { grid-template-columns:1fr 1fr; } }
          @media (max-width:620px) { .wall,.wall.cols-2 { grid-template-columns:1fr; } .camera.focused { grid-column:auto; } }
        </style>
        <div class="wall"></div>`;
    }
  }

  set hass(hass) {
    this._hass = hass;
    const visible = this.config.cameras.filter((camera) =>
      !camera.users || camera.users.includes(hass.user?.id));
    const now = Date.now();

    for (const camera of visible) {
      const signals = [...(camera.detectors || []), camera.activity_entity].filter(Boolean);
      for (const entityId of signals) {
        const state = hass.states[entityId];
        const marker = entityId === camera.activity_entity
          ? state?.attributes?.last_event
          : state?.state;
        const previous = this._previous.get(entityId);
        const active = entityId === camera.activity_entity
          ? marker && marker !== previous
          : marker === "on" && previous !== "on";
        if (active && previous !== undefined) {
          this._focusKey = camera.key;
          this._focusUntil = now + 30000;
          clearTimeout(this._focusTimer);
          this._focusTimer = setTimeout(() => {
            this._focusKey = null;
            this._render();
          }, 30100);
        }
        this._previous.set(entityId, marker);
      }
    }
    if (this._focusUntil && this._focusUntil <= now) this._focusKey = null;
    this._visible = visible;
    this._render();
  }

  disconnectedCallback() {
    clearTimeout(this._focusTimer);
    this._mobileQuery?.removeEventListener("change", this._handleMediaChange);
  }

  connectedCallback() {
    this._mobileQuery?.addEventListener("change", this._handleMediaChange);
  }

  _imageEntity(camera, focused) {
    if (focused) return camera.high_entity;
    const low = this._hass.states[camera.low_entity];
    if (this._mobileQuery.matches && cameraWallAvailable(low)) {
      return camera.low_entity;
    }
    const medium = this._hass.states[camera.medium_entity];
    return cameraWallAvailable(medium)
      ? camera.medium_entity
      : camera.high_entity;
  }

  _entry(camera) {
    let entry = this._entries.get(camera.key);
    if (entry) return entry;

    const wrapper = document.createElement("div");
    wrapper.className = "camera";
    const focus = document.createElement("div");
    focus.className = "focus";
    focus.hidden = true;
    focus.innerHTML = '<ha-icon icon="mdi:motion-sensor"></ha-icon> Activity now';
    const offline = document.createElement("div");
    offline.className = "offline";
    offline.hidden = true;
    offline.innerHTML = `<div><ha-icon icon="mdi:video-off-outline"></ha-icon><strong>${cameraWallEscape(camera.name)}</strong>Camera is offline</div>`;
    wrapper.append(focus, offline);
    this.shadowRoot.querySelector(".wall").append(wrapper);
    entry = {
      wrapper,
      focus,
      offline,
      child: null,
      signature: null,
      desiredConfig: null,
      desiredSignature: null,
      creating: null,
    };
    this._entries.set(camera.key, entry);
    return entry;
  }

  async _createChild(entry) {
    try {
      this._cardHelpers ||= window.loadCardHelpers();
      const helpers = await this._cardHelpers;
      if (entry.child || !entry.desiredConfig || !entry.wrapper.isConnected) return;
      const child = helpers.createCardElement(entry.desiredConfig);
      entry.child = child;
      entry.signature = entry.desiredSignature;
      entry.wrapper.append(child);
      child.hass = this._hass;
    } finally {
      entry.creating = null;
    }
  }

  _syncCamera(camera, focused) {
    const entry = this._entry(camera);
    const high = this._hass.states[camera.high_entity];
    const offline = !cameraWallAvailable(high);
    entry.wrapper.classList.toggle("focused", focused);
    entry.wrapper.style.order = focused ? "-1" : "0";
    entry.focus.hidden = !focused;
    entry.offline.hidden = !offline;

    if (offline) {
      entry.child?.remove();
      return;
    }
    const image = this._imageEntity(camera, focused);
    const signature = `${camera.high_entity}|${image}`;
    const config = {
      type: "picture-entity",
      entity: camera.high_entity,
      camera_image: image,
      name: camera.name,
      camera_view: "live",
      fit_mode: "cover",
      aspect_ratio: "16:9",
      show_state: false,
      tap_action: { action: "more-info" },
    };
    entry.desiredConfig = config;
    entry.desiredSignature = signature;
    if (!entry.child) {
      entry.creating ||= this._createChild(entry);
      return;
    }
    if (!entry.child.isConnected) entry.wrapper.append(entry.child);
    if (entry.signature !== signature) {
      entry.child.setConfig(config);
      entry.signature = signature;
    }
    entry.child.hass = this._hass;
  }

  _render() {
    if (!this.shadowRoot || !this._hass || !this._visible) return;
    const visibleKeys = new Set(this._visible.map((camera) => camera.key));
    for (const [key, entry] of this._entries) {
      if (visibleKeys.has(key)) continue;
      entry.wrapper.remove();
      this._entries.delete(key);
    }
    const wall = this.shadowRoot.querySelector(".wall");
    wall.className = `wall cols-${Math.min(3, this._visible.length)}`;
    for (const camera of this._visible) {
      this._syncCamera(camera, camera.key === this._focusKey);
    }
  }

  getCardSize() { return 6; }
  getGridOptions() { return { columns: "full", rows: "auto" }; }
}

customElements.define("family-camera-wall-card", FamilyCameraWallCard);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "family-camera-wall-card",
  name: "Family Camera Wall",
  description: "Account-aware live camera wall with temporary activity focus.",
});
