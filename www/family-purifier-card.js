class FamilyPurifierCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this._busy = false;
    this._error = "";
    this._detailsOpen = false;
  }
  setConfig(config) {
    const entities = config.module?.entities;
    if (!entities || ["fan", "pm25", "pm10", "night", "hepa", "carbon"].some(key => !entities[key])) {
      throw new Error("Purifier card requires fan, particulate, night and filter entities");
    }
    this._config = config.module;
    this._render();
  }
  set hass(hass) {
    this._hass = hass;
    const fingerprint = JSON.stringify(Object.values(this._config?.entities || {}).map(id => hass.states[id]));
    if (fingerprint === this._fingerprint) return;
    this._fingerprint = fingerprint;
    if (!this.shadowRoot.activeElement && !this._busy) this._focusKey = null;
    // Preserve keyboard interaction while a native select is open.
    if (this.shadowRoot.activeElement?.tagName === "SELECT") { this._pendingRender = true; return; }
    this._render();
  }
  getCardSize() { return 5; }
  _escape(value) {
    return String(value ?? "").replaceAll("&","&amp;").replaceAll("<","&lt;")
      .replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
  }
  _state(key) { return this._hass?.states?.[this._config.entities[key]]; }
  _available(key) {
    const state = this._state(key)?.state;
    return state !== undefined && !["unknown", "unavailable", ""].includes(state);
  }
  _number(key) {
    if (!this._available(key)) return null;
    const raw = this._state(key).state;
    const value = raw.trim() ? Number(raw) : NaN;
    return Number.isFinite(value) && value >= 0 ? value : null;
  }
  async _call(domain, service, key, data = {}) {
    if (this._busy || !this._available(key)) return;
    this._busy = true;
    this._error = "";
    this._render();
    try {
      await this._hass.callService(domain, service, {entity_id: this._config.entities[key], ...data});
    } catch (error) {
      this._error = error.message || "Control failed. Please try again.";
    } finally {
      this._busy = false;
      this._render();
    }
  }
  _reading(key, name) {
    const value = this._number(key);
    const unit = this._state(key)?.attributes?.unit_of_measurement || "µg/m³";
    return `<div class="reading"><span>${name}</span><strong>${value === null ? "Unavailable" : this._escape(value)}</strong>${value === null ? "" : `<small>${this._escape(unit)}</small>`}</div>`;
  }
  _render() {
    if (!this._config) return;
    const focused = this.shadowRoot.activeElement;
    if (focused?.dataset.action) this._focusKey = `[data-action="${focused.dataset.action}"]`;
    else if (focused?.dataset.mode) this._focusKey = `[data-mode="${focused.dataset.mode}"]`;
    else if (focused?.tagName === "SUMMARY") this._focusKey = "summary";
    else if (focused?.tagName === "SELECT") this._focusKey = "select";
    const fan = this._state("fan");
    const available = this._available("fan");
    const running = available && fan.state === "on";
    const mode = fan?.attributes?.preset_mode;
    const modes = fan?.attributes?.preset_modes || [];
    const auto = mode === "Auto";
    const rawPercentage = fan?.attributes?.percentage;
    const percentage = typeof rawPercentage === "number" && Number.isFinite(rawPercentage) ? rawPercentage : null;
    const speed = percentage === null ? null : Math.round(percentage / 10);
    const status = !available ? "Unavailable" : !running ? "Off" : auto ? "Auto · speed adjusts automatically" : mode === "Normal" ? "Manual" : "On";
    const disabled = this._busy || !available;
    const night = this._available("night") && this._state("night").state === "on";
    const filter = key => this._number(key) === null ? "Unavailable" : `${this._number(key)}% remaining`;
    this.shadowRoot.innerHTML = `
      <style>
        :host{display:block;grid-column:1 / -1;min-width:0;color:var(--primary-text-color);font-family:var(--secondary-font-family)}
        *{box-sizing:border-box}ha-card{display:block;background:var(--contrast1,var(--ha-card-background));border:1px solid rgba(var(--rgb-primary-text-color),.07);border-radius:24px;padding:18px;box-shadow:none}
        header{display:flex;align-items:center;gap:12px}.icon{display:grid;place-items:center;width:44px;height:44px;border-radius:15px;background:color-mix(in srgb,var(--room-accent,var(--teal)) 15%,var(--contrast3));color:var(--room-accent,var(--teal))}
        .heading{flex:1;min-width:0}h3{margin:0;font:700 17px var(--primary-font-family)}.status{display:block;margin-top:4px;color:var(--contrast10);font-size:12px}
        button,select,summary{font:inherit;min-height:44px}button,select{border:1px solid var(--contrast5);border-radius:12px;background:var(--contrast3);color:var(--primary-text-color);padding:10px 14px}
        button{cursor:pointer}button[aria-pressed=true]{background:color-mix(in srgb,var(--room-accent,var(--teal)) 24%,var(--contrast3));border-color:var(--room-accent,var(--teal))}button:disabled,select:disabled{opacity:.5;cursor:default}
        button:focus-visible,select:focus-visible,summary:focus-visible{outline:3px solid var(--room-accent,var(--teal));outline-offset:3px}
        .readings{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:18px 0}.reading{padding:14px;border-radius:16px;background:var(--contrast2)}.reading span,.reading small{display:block;color:var(--contrast10);font-size:12px}.reading strong{display:block;font-size:24px;margin:5px 0;overflow-wrap:anywhere}
        .controls{display:flex;gap:8px;flex-wrap:wrap}.controls button{flex:1}.speed{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:12px;font-size:13px}.speed select{min-width:120px;max-width:60%}
        .hint{color:var(--contrast10);font-size:12px;margin:8px 0 0;line-height:1.5}details{margin-top:16px;border-top:1px solid var(--contrast4)}summary{cursor:pointer;padding:14px 0;color:var(--contrast12);font-size:13px}.filter{display:flex;justify-content:space-between;gap:10px;font-size:13px;padding:8px 0}.filter span{color:var(--contrast10)}.error{color:var(--red);margin-top:12px;font-size:13px;overflow-wrap:anywhere}
        @media(max-width:639px){ha-card{padding:14px;border-radius:20px}h3{font-size:16px}.controls button{padding:10px}.reading{padding:12px}}
      </style>
      <ha-card aria-busy="${this._busy}">
        <header><span class="icon"><ha-icon icon="mdi:air-purifier"></ha-icon></span><div class="heading"><h3>${this._escape(this._config.name || "Air purifier")}</h3><span class="status" role="status">${this._busy ? "Sending command…" : status}</span></div><button data-action="power" aria-label="${available ? `Turn purifier ${running ? "off" : "on"}` : "Purifier unavailable"}" aria-pressed="${running}" ${disabled ? "disabled" : ""}>${!available ? "Unavailable" : running ? "On" : "Off"}</button></header>
        <div class="readings" aria-label="Office indoor particulate readings">${this._reading("pm25", "Indoor PM2.5")}${this._reading("pm10", "Indoor PM10")}</div>
        <div class="controls">
          <button data-mode="Auto" aria-pressed="${running && auto}" ${disabled || !running || !modes.includes("Auto") ? "disabled" : ""}>Auto</button>
          <button data-mode="Normal" aria-pressed="${running && mode === "Normal"}" ${disabled || !running || !modes.includes("Normal") ? "disabled" : ""}>Manual</button>
          <button data-action="night" aria-pressed="${night}" ${this._busy || !this._available("night") ? "disabled" : ""}>Night ${night ? "on" : "off"}</button>
        </div>
        <label class="speed">Fan speed<select aria-label="Purifier fan speed" ${disabled || !running || auto ? "disabled" : ""}>
          <option value="" ${speed === null || auto || !running ? "selected" : ""} disabled>${auto && running ? "Automatic" : !running ? "Off" : "Not reported"}</option>
          ${Array.from({length:10}, (_,i) => `<option value="${(i+1)*10}" ${!auto && running && speed===i+1 ? "selected" : ""}>${i+1} / 10</option>`).join("")}
        </select></label>
        <p class="hint">${auto ? "Choose Manual to set a fixed speed." : "Manual is Dyson’s Normal mode."} Indoor particulate readings are concentrations, not outdoor AQI.</p>
        <details ${this._detailsOpen ? "open" : ""}><summary>Filter details</summary><div class="filter"><span>HEPA filter</span><strong>${filter("hepa")}</strong></div><div class="filter"><span>Carbon filter</span><strong>${filter("carbon")}</strong></div></details>
        ${this._error ? `<div class="error" role="alert">${this._escape(this._error)}</div>` : ""}
      </ha-card>`;
    this.shadowRoot.querySelector('[data-action="power"]').onclick = () => this._call("fan", running ? "turn_off" : "turn_on", "fan");
    this.shadowRoot.querySelectorAll("[data-mode]").forEach(button => button.onclick = () => this._call("fan", "set_preset_mode", "fan", {preset_mode:button.dataset.mode}));
    this.shadowRoot.querySelector('[data-action="night"]').onclick = () => this._call("switch", night ? "turn_off" : "turn_on", "night");
    this.shadowRoot.querySelector("select").onchange = event => {
      const percentage = Number(event.target.value);
      if (!auto && running && percentage >= 10 && percentage <= 100) this._call("fan", "set_percentage", "fan", {percentage});
    };
    this.shadowRoot.querySelector("select").onblur = () => {
      this._focusKey = null;
      if (this._pendingRender) { this._pendingRender = false; this._render(); }
    };
    const restore = this._focusKey && this.shadowRoot.querySelector(this._focusKey);
    if (restore && !restore.disabled) restore.focus({preventScroll:true});
    this.shadowRoot.querySelector("details").ontoggle = event => {this._detailsOpen = event.target.open;};
  }
}
customElements.define("family-purifier-card", FamilyPurifierCard);
window.customCards = window.customCards || [];
window.customCards.push({type:"family-purifier-card",name:"Family Air Purifier",description:"Indoor air and native purifier controls."});
