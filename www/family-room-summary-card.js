class FamilyRoomSummaryCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._fingerprint = "";
  }

  setConfig(config) {
    if (!config.room) throw new Error("Family room summary requires room");
    this._config = config;
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    const ids = this._entityIds();
    const fingerprint = ids.map((id) => `${id}:${hass.states[id]?.state}:${hass.states[id]?.last_updated}`).join("|");
    if (fingerprint !== this._fingerprint) {
      this._fingerprint = fingerprint;
      this._render();
    }
  }

  getCardSize() { return 3; }
  _escape(value) { return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"); }
  _state(id) { return this._hass?.states[id]; }
  _entityIds() {
    const ids = [];
    for (const module of this._config.room.modules || []) {
      for (const fan of module.fans || []) ids.push(...Object.values(fan).filter((value) => typeof value === "string" && value.includes(".")));
      ids.push(...(module.players || []));
      ids.push(...Object.values(module.entities || {}));
      if (module.entity) ids.push(module.entity);
      if (module.preview_entity) ids.push(module.preview_entity);
    }
    return [...new Set(ids)];
  }

  _summary() {
    const room = this._config.room;
    let onFans = 0, availableFans = 0, media = null, appliance = null, warning = null, camera = null;
    for (const module of room.modules || []) {
      if (module.pending) continue;
      if (module.type === "fans") {
        for (const fan of module.fans || []) {
          const state = this._state(fan.fan);
          if (state && !["unknown", "unavailable"].includes(state.state)) {
            availableFans += 1;
            if (state.state === "on") onFans += 1;
          }
        }
      } else if (module.type === "media") {
        const active = (module.players || []).map((id) => this._state(id)).find((state) => ["playing", "paused"].includes(state?.state));
        if (active) media = active.state === "playing" ? (active.attributes.media_title || "Playing") : "Paused";
      } else if (module.type === "appliance") {
        const operation = this._state(module.entities?.operation || module.entities?.status);
        const value = operation?.state?.toLowerCase();
        if (["error", "fault", "aborting"].includes(value)) warning = `${module.name} needs attention`;
        else if (["finished", "complete", "completed", "end"].includes(value)) warning = `${module.name} is ready`;
        else if (value && !["off", "ready", "inactive", "unknown", "unavailable", "none"].includes(value)) appliance = `${module.name} · ${operation.state}`;
      } else if (module.type === "camera") {
        const state = this._state(module.preview_entity || module.entity);
        camera = state && !["unknown", "unavailable"].includes(state.state) ? "Camera online" : "Camera unavailable";
      }
    }
    if (warning) return { icon: "mdi:alert-circle-outline", text: warning, tone: "warning" };
    if (appliance) return { icon: "mdi:progress-clock", text: appliance, tone: "active" };
    if (media) return { icon: "mdi:play-circle-outline", text: media, tone: "active" };
    if (onFans) return { icon: "mdi:fan", text: `${onFans} fan${onFans === 1 ? "" : "s"} on`, tone: "active" };
    if (availableFans) return { icon: "mdi:weather-windy", text: "Quiet", tone: "quiet" };
    if (camera) return { icon: "mdi:cctv", text: camera, tone: camera.includes("unavailable") ? "muted" : "quiet" };
    return { icon: "mdi:power-plug-off-outline", text: "Turn on the wall switch", tone: "muted" };
  }

  _render() {
    if (!this._config) return;
    const room = this._config.room;
    const summary = this._summary();
    const occupants = this._config.occupants?.length ? this._config.occupants.join(" · ") : "Shared";
    this.shadowRoot.innerHTML = `<style>
      :host{display:block;min-width:0;font-family:var(--secondary-font-family);color:var(--primary-text-color)}*{box-sizing:border-box}
      ha-card{display:block;height:100%;min-height:132px;padding:18px;border:1px solid rgba(var(--rgb-primary-text-color),.07);border-radius:24px;background:var(--contrast2,var(--ha-card-background));box-shadow:none;cursor:pointer;transition:border-color .18s ease,transform .18s ease}
      ha-card:hover{border-color:color-mix(in srgb,var(--room-accent) 45%,transparent);transform:translateY(-1px)}
      .top{display:flex;align-items:center;gap:12px}.icon{display:grid;width:44px;height:44px;place-items:center;flex:0 0 44px;border-radius:15px;background:color-mix(in srgb,var(--room-accent) 15%,var(--contrast3));color:var(--room-accent)}
      .icon ha-icon{width:23px;height:23px}.copy{min-width:0;flex:1}.name{display:block;font-family:var(--primary-font-family);font-size:18px;font-weight:730;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.people{display:block;margin-top:3px;color:var(--contrast9);font-size:12px}.arrow{color:var(--contrast8)}
      .status{display:flex;align-items:center;gap:8px;margin-top:18px;color:var(--contrast11);font-size:14px;font-weight:600}.status.active{color:var(--room-accent)}.status.warning{color:var(--orange)}.status.muted{color:var(--contrast8)}.status ha-icon{width:18px;height:18px}
      @media(max-width:639px){ha-card{min-height:112px;padding:14px;border-radius:20px}.icon{width:40px;height:40px;flex-basis:40px;border-radius:14px}.name{font-size:17px}.status{margin-top:13px}}
    </style><ha-card tabindex="0" role="link" style="--room-accent:var(--${this._escape(room.accent || "pink")})"><div class="top"><span class="icon"><ha-icon icon="${this._escape(room.icon)}"></ha-icon></span><span class="copy"><strong class="name">${this._escape(room.name)}</strong><small class="people">${this._escape(occupants)}</small></span><ha-icon class="arrow" icon="mdi:chevron-right"></ha-icon></div><div class="status ${summary.tone}"><ha-icon icon="${summary.icon}"></ha-icon><span>${this._escape(summary.text)}</span></div></ha-card>`;
    const open = () => { window.history.pushState({}, "", `${this._config.base_path}/${room.slug}`); window.dispatchEvent(new Event("location-changed")); };
    const card = this.shadowRoot.querySelector("ha-card");
    card.addEventListener("click", open);
    card.addEventListener("keydown", (event) => { if (["Enter", " "].includes(event.key)) { event.preventDefault(); open(); } });
  }
}
customElements.define("family-room-summary-card", FamilyRoomSummaryCard);
window.customCards = window.customCards || [];
window.customCards.push({type:"family-room-summary-card",name:"Family Room Summary",description:"A safe room overview with priority-based status."});
