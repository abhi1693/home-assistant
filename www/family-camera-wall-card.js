const cameraWallEscape = (value) => String(value ?? "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

class FamilyCameraWallCard extends HTMLElement {
  setConfig(config) {
    if (!Array.isArray(config.cameras) || !config.cameras.length) {
      throw new Error("Family camera wall requires cameras");
    }
    this.config = config;
    this.attachShadow({ mode: "open" });
    this._previous = new Map();
    this._children = new Map();
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
  }

  _picture(camera) {
    let child = this._children.get(camera.key);
    const high = this._hass.states[camera.high_entity];
    const medium = this._hass.states[camera.medium_entity];
    const image = medium && !["unknown", "unavailable"].includes(medium.state)
      ? camera.medium_entity
      : camera.high_entity;
    const signature = `${camera.high_entity}|${image}`;
    if (!child || child.dataset.signature !== signature) {
      child = document.createElement("hui-picture-entity-card");
      child.dataset.signature = signature;
      child.setConfig({
        type: "picture-entity",
        entity: camera.high_entity,
        camera_image: image,
        name: camera.name,
        camera_view: "live",
        fit_mode: "cover",
        aspect_ratio: "16:9",
        show_state: false,
        tap_action: { action: "more-info" },
      });
      this._children.set(camera.key, child);
    }
    child.hass = this._hass;
    return child;
  }

  _render() {
    if (!this.shadowRoot || !this._hass || !this._visible) return;
    const focused = this._focusKey;
    const cameras = [...this._visible].sort((a, b) =>
      Number(b.key === focused) - Number(a.key === focused));
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
        .offline { min-height:210px; display:grid; place-items:center; text-align:center; padding:20px; color:var(--contrast10); }
        .offline ha-icon { width:34px; height:34px; margin-bottom:10px; color:var(--contrast8); }
        .offline strong { display:block; color:var(--contrast16); font-size:16px; margin-bottom:4px; }
        @media (max-width:900px) { .wall { grid-template-columns:1fr 1fr; } }
        @media (max-width:620px) { .wall,.wall.cols-2 { grid-template-columns:1fr; } .camera.focused { grid-column:auto; } }
      </style>
      <div class="wall cols-${Math.min(3, cameras.length)}"></div>`;
    const wall = this.shadowRoot.querySelector(".wall");
    for (const camera of cameras) {
      const high = this._hass.states[camera.high_entity];
      const offline = !high || ["unknown", "unavailable"].includes(high.state);
      const wrapper = document.createElement("div");
      wrapper.className = `camera${camera.key === focused ? " focused" : ""}`;
      if (camera.key === focused) {
        wrapper.innerHTML = `<div class="focus"><ha-icon icon="mdi:motion-sensor"></ha-icon> Activity now</div>`;
      }
      if (offline) {
        wrapper.insertAdjacentHTML("beforeend", `<div class="offline"><div><ha-icon icon="mdi:video-off-outline"></ha-icon><strong>${cameraWallEscape(camera.name)}</strong>Camera is offline</div></div>`);
      } else {
        wrapper.appendChild(this._picture(camera));
      }
      wall.appendChild(wrapper);
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
