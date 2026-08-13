const FAMILY_FAN_SPEEDS = [
  { speed: 1, percentage: 16, label: "1" },
  { speed: 2, percentage: 33, label: "2" },
  { speed: 3, percentage: 50, label: "3" },
  { speed: 4, percentage: 66, label: "4" },
  { speed: 5, percentage: 83, label: "5" },
  { speed: 6, percentage: 100, label: "Boost" },
];

const FAMILY_FAN_TIMER_MINUTES = {
  "1 hour": 60,
  "2 hours": 120,
  "3 hours": 180,
  "6 hours": 360,
};

class FamilyFanCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = null;
    this._hass = null;
    this._busy = new Set();
    this._error = "";
  }

  setConfig(config) {
    if (!config.name || !Array.isArray(config.fans) || !config.fans.length) {
      throw new Error("Family fan card requires a room name and at least one fan");
    }
    config.fans.forEach((fan) => {
      if (!fan.fan || !fan.led || !fan.sleep || !fan.timer) {
        throw new Error("Each family fan requires fan, led, sleep and timer entities");
      }
    });
    this._config = config;
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  getCardSize() {
    return 4;
  }

  _state(entityId) {
    return this._hass?.states?.[entityId];
  }

  _available(unit) {
    const state = this._state(unit.fan);
    return Boolean(state && !["unknown", "unavailable"].includes(state.state));
  }

  _speed(state) {
    const percentage = Number(state?.attributes?.percentage);
    if (!Number.isFinite(percentage)) return null;
    return Math.max(1, Math.min(6, Math.round(percentage / (100 / 6))));
  }

  _status(unit) {
    const state = this._state(unit.fan);
    if (!state || ["unknown", "unavailable"].includes(state.state)) {
      return "Unavailable · Check wall power or Wi-Fi";
    }
    if (state.state !== "on") return "Off";
    const speed = this._speed(state);
    if (speed === 6) return "Boost";
    return speed ? `On · Speed ${speed}` : "Running";
  }

  _timerLabel(unit) {
    const timer = this._state(unit.timer);
    if (!timer || ["unknown", "unavailable", "Off"].includes(timer.state)) {
      return "Timer";
    }
    const total = FAMILY_FAN_TIMER_MINUTES[timer.state];
    const elapsed = this._state(unit.timer_elapsed);
    const elapsedMinutes = Number(elapsed?.state);
    const updated = elapsed?.last_updated ? new Date(elapsed.last_updated).getTime() : 0;
    const fresh = updated && Date.now() - updated < 5 * 60 * 1000;
    if (total && fresh && Number.isFinite(elapsedMinutes) && elapsedMinutes > 0) {
      const remaining = Math.max(0, total - elapsedMinutes);
      const hours = Math.floor(remaining / 60);
      const minutes = remaining % 60;
      return hours ? `${hours}h ${minutes}m left` : `${minutes}m left`;
    }
    return timer.state.replace(" hours", "h").replace(" hour", "h");
  }

  _roomSummary() {
    const units = this._config.fans;
    const available = units.filter((unit) => this._available(unit));
    const running = available.filter((unit) => this._state(unit.fan)?.state === "on");
    if (!available.length) return "No fans reachable";
    if (!running.length) return available.length === units.length ? "Quiet and ready" : `${available.length} ready`;
    if (running.length === 1) return this._status(running[0]);
    return `${running.length} fans running`;
  }

  _timerOptions(unit) {
    const entity = this._state(unit.timer);
    const options = entity?.attributes?.options || ["Off", "1 hour", "2 hours", "3 hours", "6 hours"];
    return options.map((option) => `<option value="${this._escape(option)}"${entity?.state === option ? " selected" : ""}>${this._escape(option)}</option>`).join("");
  }

  _escape(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  _unit(unit, index) {
    const fan = this._state(unit.fan);
    const available = this._available(unit);
    const running = available && fan.state === "on";
    const speed = this._speed(fan);
    const ledOn = this._state(unit.led)?.state === "on";
    const sleepOn = this._state(unit.sleep)?.state === "on";
    const timerState = this._state(unit.timer)?.state;
    const timerOn = timerState && !["Off", "unknown", "unavailable"].includes(timerState);
    const disabled = available ? "" : " disabled";
    const fanName = unit.name || (this._config.fans.length > 1 ? `Fan ${index + 1}` : "Fan");
    const spin = speed ? Math.max(0.55, 2.2 - speed * 0.25) : 1.4;
    const speeds = FAMILY_FAN_SPEEDS.map((item) => {
      const active = running && speed === item.speed ? " active" : "";
      const busy = this._busy.has(`${index}:speed`) ? " busy" : "";
      return `<button class="speed${active}${busy}" data-action="speed" data-index="${index}" data-percentage="${item.percentage}"${disabled} aria-label="Set ${this._escape(fanName)} to ${item.label === "Boost" ? "boost" : `speed ${item.label}`}" aria-pressed="${active ? "true" : "false"}">${item.label}</button>`;
    }).join("");

    return `
      <section class="fan-unit${running ? " running" : ""}${available ? "" : " unavailable"}" style="--fan-spin:${spin}s">
        <div class="fan-heading">
          <button class="fan-identity" data-action="more-info" data-index="${index}" aria-label="Open ${this._escape(fanName)} details">
            <span class="fan-icon"><ha-icon icon="mdi:fan"></ha-icon></span>
            <span class="fan-copy">
              <span class="fan-name">${this._escape(fanName)}</span>
              <span class="fan-status">${this._escape(this._status(unit))}</span>
            </span>
          </button>
          <button class="power${running ? " active" : ""}" data-action="power" data-index="${index}"${disabled} aria-label="Turn ${this._escape(fanName)} ${running ? "off" : "on"}" aria-pressed="${running ? "true" : "false"}">
            <ha-icon icon="mdi:power"></ha-icon>
          </button>
        </div>
        <div class="speed-row" aria-label="${this._escape(fanName)} speed">${speeds}</div>
        <div class="feature-row">
          <button class="feature${ledOn ? " active led" : ""}" data-action="led" data-index="${index}"${disabled} aria-pressed="${ledOn ? "true" : "false"}">
            <ha-icon icon="${ledOn ? "mdi:lightbulb-on-outline" : "mdi:lightbulb-outline"}"></ha-icon><span>LED</span>
          </button>
          <button class="feature${sleepOn ? " active sleep" : ""}" data-action="sleep" data-index="${index}"${disabled} aria-pressed="${sleepOn ? "true" : "false"}">
            <ha-icon icon="${sleepOn ? "mdi:power-sleep" : "mdi:sleep-off"}"></ha-icon><span>Sleep</span>
          </button>
          <label class="feature timer${timerOn ? " active" : ""}${available ? "" : " disabled"}">
            <ha-icon icon="mdi:timer-outline"></ha-icon>
            <span>${this._escape(this._timerLabel(unit))}</span>
            <ha-icon class="chevron" icon="mdi:chevron-down"></ha-icon>
            <select data-action="timer" data-index="${index}"${disabled} aria-label="Set ${this._escape(fanName)} timer">${this._timerOptions(unit)}</select>
          </label>
        </div>
      </section>`;
  }

  _render() {
    if (!this._config) return;
    const running = this._config.fans.some((unit) => this._state(unit.fan)?.state === "on");
    const multiple = this._config.fans.length > 1;
    const canAllOff = this._config.fans.some((unit) => this._available(unit) && this._state(unit.fan)?.state === "on");
    this.shadowRoot.innerHTML = `
      <style>
        :host { display:block; color:var(--primary-text-color); font-family:var(--secondary-font-family, Inter, system-ui, sans-serif); }
        * { box-sizing:border-box; }
        button, select { font:inherit; -webkit-tap-highlight-color:transparent; }
        button:focus-visible, select:focus-visible { outline:2px solid var(--fan-accent, var(--pink)); outline-offset:2px; }
        ha-card { min-height:270px; overflow:hidden; border:1px solid ${running ? "color-mix(in srgb, var(--fan-accent, var(--pink)) 30%, transparent)" : "rgba(var(--rgb-primary-text-color), .055)"}; border-radius:26px; padding:18px; background:${running ? "color-mix(in srgb, var(--fan-accent, var(--pink)) 7%, var(--contrast2))" : "var(--contrast2, var(--ha-card-background))"}; box-shadow:none; transition:background 180ms ease,border-color 180ms ease; }
        .room-heading { display:flex; min-height:44px; align-items:center; gap:12px; margin-bottom:14px; }
        .room-icon { display:grid; width:40px; height:40px; flex:0 0 40px; place-items:center; border-radius:14px; background:color-mix(in srgb, var(--fan-accent, var(--pink)) 13%, var(--contrast3)); color:var(--fan-accent, var(--pink)); }
        .room-icon ha-icon { width:21px; }
        .room-copy { display:grid; min-width:0; flex:1; gap:3px; }
        .room-name { display:block; color:var(--contrast20); font-family:var(--primary-font-family, Inter, system-ui, sans-serif); font-size:18px; font-weight:720; letter-spacing:-.025em; }
        .room-status { display:block; color:var(--contrast9); font-size:11px; font-weight:540; }
        .all-off { display:inline-flex; min-height:36px; align-items:center; gap:6px; border:0; border-radius:12px; padding:0 11px; background:var(--contrast4); color:var(--contrast13); font-size:11px; font-weight:680; cursor:pointer; }
        .all-off:hover:not(:disabled) { background:var(--contrast5); color:var(--contrast20); }
        .all-off:disabled { cursor:default; opacity:.34; }
        .all-off ha-icon { width:16px; }
        .fan-list { display:grid; grid-template-columns:${multiple ? "repeat(2, minmax(0, 1fr))" : "1fr"}; gap:12px; }
        .fan-unit { min-width:0; border:1px solid var(--contrast4); border-radius:20px; padding:13px; background:color-mix(in srgb, var(--contrast1) 55%, transparent); }
        .fan-unit.running { border-color:color-mix(in srgb, var(--fan-accent, var(--pink)) 24%, var(--contrast4)); }
        .fan-unit.unavailable { background:color-mix(in srgb, var(--contrast1) 28%, transparent); }
        .fan-heading { display:flex; align-items:center; gap:10px; }
        .fan-identity { display:flex; min-width:0; flex:1; align-items:center; gap:10px; border:0; padding:0; background:transparent; color:inherit; text-align:left; cursor:pointer; }
        .fan-icon { display:grid; width:36px; height:36px; flex:0 0 36px; place-items:center; border-radius:13px; background:var(--contrast4); color:var(--contrast11); }
        .fan-icon ha-icon { width:20px; }
        .running .fan-icon { background:color-mix(in srgb, var(--fan-accent, var(--pink)) 17%, var(--contrast3)); color:var(--fan-accent, var(--pink)); }
        .running .fan-icon ha-icon { animation:fan-spin var(--fan-spin) linear infinite; }
        .unavailable .fan-icon { color:var(--contrast7); }
        .fan-copy { display:grid; min-width:0; gap:3px; }
        .fan-name { overflow:hidden; color:var(--contrast19); font-size:14px; font-weight:690; text-overflow:ellipsis; white-space:nowrap; }
        .fan-status { overflow:hidden; color:var(--contrast9); font-size:10px; font-weight:540; text-overflow:ellipsis; white-space:nowrap; }
        .unavailable .fan-status { color:var(--contrast8); }
        .power { display:grid; width:38px; height:38px; flex:0 0 38px; place-items:center; border:0; border-radius:13px; background:var(--contrast4); color:var(--contrast11); cursor:pointer; transition:transform 120ms ease,background 140ms ease,color 140ms ease; }
        .power:hover:not(:disabled) { color:var(--contrast20); }
        .power.active { background:var(--fan-accent, var(--pink)); color:var(--black, #08090b); }
        .power:active:not(:disabled), .speed:active:not(:disabled), .feature:active:not(:disabled) { transform:scale(.96); }
        button:disabled, select:disabled, .feature.disabled { cursor:default; opacity:.32; }
        .power ha-icon { width:19px; }
        .speed-row { display:grid; grid-template-columns:repeat(6, minmax(0, 1fr)); gap:5px; margin-top:13px; }
        .speed { min-width:0; height:36px; border:1px solid transparent; border-radius:11px; padding:0 3px; background:var(--contrast3); color:var(--contrast10); font-size:11px; font-weight:700; cursor:pointer; transition:transform 120ms ease,background 140ms ease,color 140ms ease; }
        .speed:last-child { font-size:9px; letter-spacing:-.015em; }
        .speed:hover:not(:disabled) { background:var(--contrast5); color:var(--contrast19); }
        .speed.active { border-color:color-mix(in srgb, var(--fan-accent, var(--pink)) 35%, transparent); background:color-mix(in srgb, var(--fan-accent, var(--pink)) 18%, var(--contrast3)); color:var(--fan-accent, var(--pink)); }
        .speed.busy { pointer-events:none; }
        .feature-row { display:grid; grid-template-columns:82px 92px minmax(112px, 1fr); gap:6px; margin-top:7px; }
        .feature { position:relative; display:flex; min-width:0; height:38px; align-items:center; justify-content:center; gap:6px; overflow:hidden; border:1px solid transparent; border-radius:12px; padding:0 9px; background:var(--contrast3); color:var(--contrast10); font-size:10px; font-weight:660; cursor:pointer; transition:transform 120ms ease,background 140ms ease,color 140ms ease; }
        .feature:hover:not(:disabled):not(.disabled) { background:var(--contrast5); color:var(--contrast18); }
        .feature.active { border-color:color-mix(in srgb, var(--fan-accent, var(--pink)) 28%, transparent); background:color-mix(in srgb, var(--fan-accent, var(--pink)) 14%, var(--contrast3)); color:var(--fan-accent, var(--pink)); }
        .feature.led.active { color:var(--yellow, #ffd76a); border-color:color-mix(in srgb, var(--yellow, #ffd76a) 28%, transparent); background:color-mix(in srgb, var(--yellow, #ffd76a) 12%, var(--contrast3)); }
        .feature.sleep.active { color:var(--purple, #c8a7ff); border-color:color-mix(in srgb, var(--purple, #c8a7ff) 28%, transparent); background:color-mix(in srgb, var(--purple, #c8a7ff) 12%, var(--contrast3)); }
        .feature ha-icon { width:16px; flex:0 0 16px; }
        .feature .chevron { width:13px; flex:0 0 13px; margin-left:auto; }
        .timer select { position:absolute; inset:0; width:100%; height:100%; opacity:0; cursor:pointer; }
        .error { margin:10px 2px -2px; color:var(--red, var(--error-color)); font-size:10px; }
        @keyframes fan-spin { to { transform:rotate(360deg); } }
        @media (max-width:760px) { .fan-list { grid-template-columns:1fr; } .feature-row { grid-template-columns:repeat(3, 1fr); } }
        @media (prefers-reduced-motion:reduce) { * { animation:none !important; transition:none !important; } }
      </style>
      <ha-card style="--fan-accent:${this._escape(this._config.accent || "var(--pink)")}">
        <header class="room-heading">
          <span class="room-icon"><ha-icon icon="${this._escape(this._config.icon || "mdi:fan")}"></ha-icon></span>
          <span class="room-copy"><span class="room-name">${this._escape(this._config.name)}</span><span class="room-status">${this._escape(this._roomSummary())}</span></span>
          ${multiple ? `<button class="all-off" data-action="all-off"${canAllOff ? "" : " disabled"}><ha-icon icon="mdi:fan-off"></ha-icon>All off</button>` : ""}
        </header>
        <div class="fan-list">${this._config.fans.map((unit, index) => this._unit(unit, index)).join("")}</div>
        ${this._error ? `<div class="error" role="alert">${this._escape(this._error)}</div>` : ""}
      </ha-card>`;
    this.shadowRoot.querySelectorAll("button[data-action]").forEach((button) => button.addEventListener("click", (event) => this._act(event.currentTarget)));
    this.shadowRoot.querySelectorAll('select[data-action="timer"]').forEach((select) => select.addEventListener("change", (event) => this._setTimer(event.currentTarget)));
  }

  async _act(button) {
    const action = button.dataset.action;
    const index = Number(button.dataset.index || 0);
    const unit = this._config.fans[index];
    if (action === "more-info") {
      this.dispatchEvent(new CustomEvent("hass-more-info", { bubbles: true, composed: true, detail: { entityId: unit.fan } }));
      return;
    }
    if (action === "all-off") {
      await this._call("room:off", "fan", "turn_off", {}, this._config.fans.filter((item) => this._available(item)).map((item) => item.fan));
      return;
    }
    if (!this._available(unit)) return;
    if (action === "power") {
      const service = this._state(unit.fan)?.state === "on" ? "turn_off" : "turn_on";
      await this._call(`${index}:power`, "fan", service, {}, unit.fan);
    } else if (action === "speed") {
      const percentage = Number(button.dataset.percentage);
      const service = this._state(unit.fan)?.state === "on" ? "set_percentage" : "turn_on";
      await this._call(`${index}:speed`, "fan", service, { percentage }, unit.fan);
    } else if (action === "led") {
      const service = this._state(unit.led)?.state === "on" ? "turn_off" : "turn_on";
      await this._call(`${index}:led`, "light", service, {}, unit.led);
    } else if (action === "sleep") {
      const service = this._state(unit.sleep)?.state === "on" ? "turn_off" : "turn_on";
      await this._call(`${index}:sleep`, "switch", service, {}, unit.sleep);
    }
  }

  async _setTimer(select) {
    const index = Number(select.dataset.index || 0);
    const unit = this._config.fans[index];
    if (!this._available(unit)) return;
    await this._call(`${index}:timer`, "select", "select_option", { option: select.value }, unit.timer);
  }

  async _call(key, domain, service, data, entityId) {
    if (!this._hass || this._busy.has(key)) return;
    this._busy.add(key);
    this._error = "";
    this._render();
    try {
      await this._hass.callService(domain, service, data, { entity_id: entityId });
    } catch (error) {
      this._error = error?.message || "The fan did not accept that command.";
    } finally {
      window.setTimeout(() => {
        this._busy.delete(key);
        this._render();
      }, 650);
    }
  }
}

class FamilyFanSummaryCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = null;
    this._hass = null;
  }

  setConfig(config) {
    if (!Array.isArray(config.fans) || !config.fans.length) throw new Error("Fan summary requires fans");
    this._config = config;
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  getCardSize() { return 1; }

  _render() {
    if (!this._config) return;
    const fans = this._config.fans.map((item) => ({ ...item, state: this._hass?.states?.[item.entity] }));
    const available = fans.filter((item) => item.state && !["unknown", "unavailable"].includes(item.state.state));
    const running = available.filter((item) => item.state.state === "on");
    const unavailable = fans.length - available.length;
    let headline = "Home is quiet";
    let detail = available.length
      ? available.length === 1 ? "1 fan ready" : `${available.length} fans ready`
      : "Fans are powered down";
    if (running.length === 1) {
      const percentage = Number(running[0].state.attributes.percentage);
      const speed = Number.isFinite(percentage) ? Math.max(1, Math.min(6, Math.round(percentage / (100 / 6)))) : null;
      headline = `${running[0].name} is running`;
      detail = speed === 6 ? "Boost mode" : speed ? `Speed ${speed}` : "Cooling now";
    } else if (running.length > 1) {
      headline = `${running.length} fans are running`;
      detail = running.map((item) => item.name).join(" · ");
    }
    this.shadowRoot.innerHTML = `
      <style>
        :host { display:block; font-family:var(--secondary-font-family, Inter, system-ui, sans-serif); }
        * { box-sizing:border-box; }
        ha-card { display:flex; min-height:78px; align-items:center; gap:13px; border:1px solid rgba(var(--rgb-primary-text-color),.055); border-radius:22px; padding:13px 16px; background:var(--contrast2); box-shadow:none; }
        .icon { display:grid; width:42px; height:42px; flex:0 0 42px; place-items:center; border-radius:15px; background:color-mix(in srgb,var(--blue) 14%,var(--contrast3)); color:var(--blue); }
        .icon ha-icon { width:22px; ${running.length ? "animation:spin 1.25s linear infinite;" : ""} }
        .copy { min-width:0; flex:1; }
        .headline { color:var(--contrast20); font-family:var(--primary-font-family, Inter, system-ui, sans-serif); font-size:15px; font-weight:700; letter-spacing:-.02em; }
        .detail { margin-top:3px; overflow:hidden; color:var(--contrast9); font-size:11px; text-overflow:ellipsis; white-space:nowrap; }
        .counts { display:flex; gap:7px; }
        .count { display:flex; min-height:32px; align-items:center; gap:6px; border-radius:11px; padding:0 10px; background:var(--contrast4); color:var(--contrast11); font-size:10px; font-weight:650; }
        .count ha-icon { width:15px; }
        .count.running { color:var(--blue); }
        .count.offline { color:var(--contrast8); }
        @keyframes spin { to { transform:rotate(360deg); } }
        @media (prefers-reduced-motion:reduce) { .icon ha-icon { animation:none; } }
      </style>
      <ha-card>
        <span class="icon"><ha-icon icon="mdi:fan"></ha-icon></span>
        <span class="copy"><div class="headline">${headline}</div><div class="detail">${detail}</div></span>
        <span class="counts">
          ${running.length ? `<span class="count running"><ha-icon icon="mdi:fan"></ha-icon>${running.length} running</span>` : ""}
          <span class="count"><ha-icon icon="mdi:check-circle-outline"></ha-icon>${available.length} ready</span>
          ${unavailable ? `<span class="count offline"><ha-icon icon="mdi:power-plug-off-outline"></ha-icon>${unavailable} unavailable</span>` : ""}
        </span>
      </ha-card>`;
  }
}

customElements.define("family-fan-card", FamilyFanCard);
customElements.define("family-fan-summary-card", FamilyFanSummaryCard);
window.customCards = window.customCards || [];
window.customCards.push(
  { type: "family-fan-card", name: "Family Fan Card", description: "Quota-conscious Atomberg room controls" },
  { type: "family-fan-summary-card", name: "Family Fan Summary", description: "Household fan status summary" },
);
