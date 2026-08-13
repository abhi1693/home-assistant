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
    this._lastFingerprint = null;
    this._timerDialogIndex = null;
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
    this._lastFingerprint = null;
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    const fingerprint = this._fingerprint();
    if (fingerprint !== this._lastFingerprint) {
      this._lastFingerprint = fingerprint;
      if (this.shadowRoot?.querySelector("dialog[open]")) return;
      this._render();
    }
  }

  getCardSize() {
    return 6;
  }

  _state(entityId) {
    return this._hass?.states?.[entityId];
  }

  _available(unit) {
    const state = this._state(unit.fan);
    return Boolean(state && !["unknown", "unavailable"].includes(state.state));
  }

  _running(unit) {
    return this._available(unit) && this._state(unit.fan)?.state === "on";
  }

  _timerActive(unit) {
    const state = this._state(unit.timer)?.state;
    return Boolean(state && !["Off", "unknown", "unavailable"].includes(state));
  }

  _fingerprint() {
    if (!this._config || !this._hass) return "";
    return JSON.stringify(this._config.fans.flatMap((unit) =>
      [unit.fan, unit.led, unit.sleep, unit.timer, unit.timer_elapsed]
        .filter(Boolean)
        .map((entityId) => {
          const entity = this._state(entityId);
          return [
            entityId,
            entity?.state,
            entity?.attributes?.percentage,
            entity?.attributes?.options,
            entity?.last_updated,
          ];
        })));
  }

  _speed(state) {
    const percentage = Number(state?.attributes?.percentage);
    if (!Number.isFinite(percentage)) return 1;
    return Math.max(1, Math.min(6, Math.round(percentage / (100 / 6))));
  }

  _fanName(unit, index) {
    if (unit.name) return unit.name;
    if (this._config.fans.length > 1) return `Fan ${index + 1}`;
    return `${this._config.name} Fan`;
  }

  _status(unit) {
    if (!this._available(unit)) return "Unavailable";
    const speed = this._speed(this._state(unit.fan));
    if (!this._running(unit)) return speed === 6 ? "Off · Last speed Boost" : `Off · Last speed ${speed}`;
    return speed === 6 ? "Running · Boost" : `Running · Speed ${speed}`;
  }

  _timerTarget(unit) {
    return this._running(unit) ? "off" : "on";
  }

  _timerLabel(unit) {
    const timer = this._state(unit.timer);
    if (!timer || ["unknown", "unavailable", "Off"].includes(timer.state)) return "Not set";
    const target = this._timerTarget(unit) === "off" ? "Off" : "On";
    const total = FAMILY_FAN_TIMER_MINUTES[timer.state];
    const elapsed = this._state(unit.timer_elapsed);
    const elapsedMinutes = Number(elapsed?.state);
    const updated = elapsed?.last_updated ? new Date(elapsed.last_updated).getTime() : 0;
    const fresh = updated && Date.now() - updated < 5 * 60 * 1000;
    if (total && fresh && Number.isFinite(elapsedMinutes) && elapsedMinutes >= 0) {
      const remaining = Math.max(0, total - elapsedMinutes);
      const hours = Math.floor(remaining / 60);
      const minutes = remaining % 60;
      const duration = hours && minutes ? `${hours}h ${minutes}m` : hours ? `${hours}h` : `${minutes}m`;
      return `${target} in ${duration}`;
    }
    return `${target} in ${timer.state.replace(" hours", "h").replace(" hour", "h")}`;
  }

  _roomSummary() {
    const available = this._config.fans.filter((unit) => this._available(unit));
    const running = available.filter((unit) => this._running(unit));
    if (!available.length) return "Fans unavailable";
    if (!running.length) return available.length === this._config.fans.length ? "Both fans are off" : `${available.length} fan ready`;
    if (running.length === 1) return `${running[0].name || "One fan"} is running`;
    return "Both fans are running";
  }

  _escape(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  _disabled(disabled) {
    return disabled ? " disabled" : "";
  }

  _unavailableUnit(unit, index) {
    const fanName = this._fanName(unit, index);
    return `
      <section class="fan-tile unavailable" aria-disabled="true">
        <div class="tile-heading">
          <span class="tile-icon"><ha-icon icon="mdi:fan-off"></ha-icon></span>
          <span class="tile-copy"><strong>${this._escape(fanName)}</strong><small>Unavailable</small></span>
        </div>
        <div class="unavailable-body" role="status">
          <span class="unavailable-icon"><ha-icon icon="mdi:light-switch-off"></ha-icon></span>
          <strong>Turn on the wall switch</strong>
          <small>Controls will appear automatically.</small>
        </div>
      </section>`;
  }

  _speedRing(unit, index, speed, running, busy, fanName) {
    return FAMILY_FAN_SPEEDS.map((item) => {
      const selected = speed === item.speed;
      const active = running && selected;
      const stateClass = active ? " active" : selected ? " remembered" : "";
      const label = item.speed === 6 ? "Boost" : `speed ${item.speed}`;
      return `<button class="speed speed-${item.speed}${stateClass}" data-action="speed" data-index="${index}" data-percentage="${item.percentage}"${this._disabled(busy)} aria-label="Set ${this._escape(fanName)} to ${label}${running ? "" : " and turn it on"}" aria-pressed="${active ? "true" : "false"}"><span>${item.label}</span></button>`;
    }).join("");
  }

  _unit(unit, index) {
    if (!this._available(unit)) return this._unavailableUnit(unit, index);

    const fan = this._state(unit.fan);
    const running = this._running(unit);
    const speed = this._speed(fan);
    const busy = this._busy.has(index);
    const fanName = this._fanName(unit, index);
    const ledOn = this._state(unit.led)?.state === "on";
    const sleepOn = this._state(unit.sleep)?.state === "on";
    const timerOn = this._timerActive(unit);
    const timerAction = running ? "Turn off later" : "Turn on later";
    const spin = Math.max(0.55, 2.2 - speed * 0.25);
    const featureDisabled = busy || !running;

    return `
      <section class="fan-tile${running ? " running" : ""}${busy ? " busy" : ""}" style="--fan-spin:${spin}s">
        <div class="tile-heading">
          <span class="tile-icon"><ha-icon icon="mdi:fan"></ha-icon></span>
          <span class="tile-copy"><strong>${this._escape(fanName)}</strong><small>${this._escape(busy ? "Please wait…" : this._status(unit))}</small></span>
        </div>
        <div class="dial" role="group" aria-label="${this._escape(fanName)} power and speed">
          <div class="dial-ring" aria-hidden="true"></div>
          ${this._speedRing(unit, index, speed, running, busy, fanName)}
          <button class="power-core" data-action="power" data-index="${index}"${this._disabled(busy)} aria-label="${running ? "Turn off" : "Turn on"} ${this._escape(fanName)} at ${speed === 6 ? "Boost" : `speed ${speed}`}" aria-pressed="${running ? "true" : "false"}">
            <span class="core-fan"><ha-icon icon="${busy ? "mdi:loading" : "mdi:fan"}"></ha-icon></span>
            <strong>${busy ? "Working…" : running ? (speed === 6 ? "Boost" : `Speed ${speed}`) : "Off"}</strong>
            <small>${busy ? "Please wait" : running ? "Tap to turn off" : `Tap to start at ${speed === 6 ? "Boost" : `speed ${speed}`}`}</small>
          </button>
        </div>
        <div class="feature-row">
          <button class="feature${running && ledOn ? " active led" : ""}" data-action="led" data-index="${index}"${this._disabled(featureDisabled)} aria-label="${running ? `Turn ${this._escape(fanName)} light ${ledOn ? "off" : "on"}` : `${this._escape(fanName)} light. Turn fan on first`}" aria-pressed="${running && ledOn ? "true" : "false"}">
            <span class="feature-icon"><ha-icon icon="${ledOn ? "mdi:lightbulb-on-outline" : "mdi:lightbulb-outline"}"></ha-icon></span>
            <span class="feature-copy"><strong>Light</strong><small>${running ? (ledOn ? "On" : "Off") : "Turn fan on first"}</small></span>
          </button>
          <button class="feature${running && sleepOn ? " active sleep" : ""}" data-action="sleep" data-index="${index}"${this._disabled(featureDisabled)} aria-label="${running ? `Turn ${this._escape(fanName)} sleep mode ${sleepOn ? "off" : "on"}` : `${this._escape(fanName)} sleep mode. Turn fan on first`}" aria-pressed="${running && sleepOn ? "true" : "false"}">
            <span class="feature-icon"><ha-icon icon="mdi:weather-night"></ha-icon></span>
            <span class="feature-copy"><strong>Sleep</strong><small>${running ? (sleepOn ? "On · slows gradually" : "Off") : "Turn fan on first"}</small></span>
          </button>
          <button class="feature timer${timerOn ? " active" : ""}" data-action="timer" data-index="${index}"${this._disabled(busy)} aria-label="${this._escape(timerAction)} for ${this._escape(fanName)}">
            <span class="feature-icon"><ha-icon icon="mdi:timer-outline"></ha-icon></span>
            <span class="feature-copy"><strong>Timer</strong><small>${this._escape(timerOn ? this._timerLabel(unit) : timerAction)}</small></span>
            <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
          </button>
        </div>
      </section>`;
  }

  _timerDialog() {
    if (this._timerDialogIndex === null) return "";
    const index = this._timerDialogIndex;
    const unit = this._config.fans[index];
    if (!unit || !this._available(unit)) return "";
    const running = this._running(unit);
    const fanName = this._fanName(unit, index);
    const current = this._state(unit.timer)?.state;
    const active = this._timerActive(unit);
    const options = this._state(unit.timer)?.attributes?.options || ["Off", "1 hour", "2 hours", "3 hours", "6 hours"];
    const durations = options.filter((option) => option !== "Off");
    return `
      <dialog class="timer-dialog" aria-labelledby="timer-title-${index}">
        <div class="dialog-heading">
          <span class="dialog-icon"><ha-icon icon="mdi:timer-outline"></ha-icon></span>
          <span><strong id="timer-title-${index}">Turn ${this._escape(fanName)} ${running ? "off" : "on"} after</strong><small>Choose a delay</small></span>
          <button class="dialog-close" data-action="close-timer" aria-label="Close timer"><ha-icon icon="mdi:close"></ha-icon></button>
        </div>
        <div class="timer-choices">
          ${active ? `<button class="timer-choice cancel-timer" data-action="timer-choice" data-index="${index}" data-option="Off"><ha-icon icon="mdi:timer-off-outline"></ha-icon><span><strong>Cancel timer</strong><small>${this._escape(this._timerLabel(unit))}</small></span></button>` : ""}
          ${durations.map((option) => `<button class="timer-choice${current === option ? " selected" : ""}" data-action="timer-choice" data-index="${index}" data-option="${this._escape(option)}"><strong>${this._escape(option.replace(" hours", "").replace(" hour", ""))}</strong><small>${option === "1 hour" ? "hour" : "hours"}</small></button>`).join("")}
        </div>
        <button class="dialog-cancel" data-action="close-timer">Cancel</button>
      </dialog>`;
  }

  _render() {
    if (!this._config) return;
    const multiple = this._config.fans.length > 1;
    this.shadowRoot.innerHTML = `
      <style>
        :host { display:block; color:var(--primary-text-color); font-family:var(--secondary-font-family); }
        * { box-sizing:border-box; }
        button { font:inherit; -webkit-tap-highlight-color:transparent; }
        button:focus-visible { outline:3px solid var(--fan-accent, var(--pink)); outline-offset:3px; }
        ha-card { overflow:hidden; border:1px solid rgba(var(--rgb-primary-text-color),.06); border-radius:28px; padding:${multiple ? "20px" : "0"}; background:${multiple ? "var(--contrast2, var(--ha-card-background))" : "transparent"}; box-shadow:none; }
        .room-heading { display:flex; min-height:48px; align-items:center; gap:12px; margin-bottom:16px; }
        .room-icon { display:grid; width:42px; height:42px; place-items:center; border-radius:15px; background:color-mix(in srgb,var(--fan-accent,var(--pink)) 14%,var(--contrast3)); color:var(--fan-accent,var(--pink)); }
        .room-icon ha-icon { width:22px; }
        .room-copy { display:grid; gap:3px; }
        .room-copy strong { color:var(--contrast20); font-family:var(--primary-font-family); font-size:20px; font-weight:730; }
        .room-copy small { color:var(--contrast10); font-size:12px; font-weight:560; }
        .fan-list { display:grid; grid-template-columns:${multiple ? "repeat(2,minmax(0,1fr))" : "1fr"}; gap:14px; }
        .fan-tile { min-width:0; overflow:hidden; border:1px solid var(--contrast4); border-radius:24px; padding:18px; background:color-mix(in srgb,var(--contrast1) 52%,transparent); transition:border-color 180ms ease,background 180ms ease; }
        .fan-tile.running { border-color:color-mix(in srgb,var(--fan-accent,var(--pink)) 32%,var(--contrast4)); background:color-mix(in srgb,var(--fan-accent,var(--pink)) 5%,var(--contrast1)); }
        .tile-heading { display:flex; min-height:48px; align-items:center; gap:11px; }
        .tile-icon { display:grid; width:42px; height:42px; flex:0 0 42px; place-items:center; border-radius:15px; background:var(--contrast4); color:var(--contrast11); }
        .tile-icon ha-icon { width:22px; }
        .running .tile-icon { background:color-mix(in srgb,var(--fan-accent,var(--pink)) 16%,var(--contrast3)); color:var(--fan-accent,var(--pink)); }
        .tile-copy { display:grid; min-width:0; gap:3px; }
        .tile-copy strong { color:var(--contrast20); font-family:var(--primary-font-family); font-size:17px; font-weight:720; }
        .tile-copy small { color:var(--contrast10); font-size:11px; font-weight:560; }
        .dial { position:relative; width:min(340px,100%); height:350px; margin:8px auto 4px; }
        .dial-ring { position:absolute; width:246px; height:246px; left:50%; top:50%; border:1px solid var(--contrast5); border-radius:50%; transform:translate(-50%,-48%); }
        .dial-ring::before { position:absolute; inset:9px; border:1px solid color-mix(in srgb,var(--fan-accent,var(--pink)) 12%,transparent); border-radius:50%; content:""; }
        .power-core { position:absolute; z-index:2; display:grid; width:166px; height:166px; left:50%; top:50%; place-content:center; justify-items:center; gap:6px; border:1px solid var(--contrast5); border-radius:50%; background:var(--contrast2); color:var(--contrast18); cursor:pointer; transform:translate(-50%,-48%); transition:transform 140ms ease,background 180ms ease,border-color 180ms ease; }
        .power-core:hover:not(:disabled) { border-color:color-mix(in srgb,var(--fan-accent,var(--pink)) 45%,var(--contrast5)); background:var(--contrast3); }
        .power-core:active:not(:disabled) { transform:translate(-50%,-48%) scale(.97); }
        .running .power-core { border-color:color-mix(in srgb,var(--fan-accent,var(--pink)) 48%,var(--contrast5)); background:color-mix(in srgb,var(--fan-accent,var(--pink)) 12%,var(--contrast2)); }
        .core-fan { display:grid; width:54px; height:54px; place-items:center; color:var(--contrast11); }
        .core-fan ha-icon { width:46px; height:46px; }
        .running .core-fan { color:var(--fan-accent,var(--pink)); }
        .running .core-fan ha-icon { animation:fan-spin var(--fan-spin) linear infinite; }
        .busy .core-fan ha-icon { animation:busy-spin .8s linear infinite; }
        .power-core strong { color:var(--contrast20); font-size:17px; font-weight:760; }
        .power-core small { max-width:122px; color:var(--contrast9); font-size:10px; font-weight:570; line-height:1.25; text-align:center; }
        .speed { position:absolute; z-index:3; display:grid; width:56px; height:56px; place-items:center; border:1px solid transparent; border-radius:50%; background:var(--contrast3); color:var(--contrast12); font-size:14px; font-weight:750; cursor:pointer; transition:transform 120ms ease,background 160ms ease,color 160ms ease,border-color 160ms ease; }
        .speed:hover:not(:disabled) { background:var(--contrast5); color:var(--contrast20); }
        .speed:active:not(:disabled) { transform:scale(.94); }
        .speed.remembered { border-color:var(--contrast7); color:var(--contrast17); }
        .speed.active { border-color:var(--fan-accent,var(--pink)); background:var(--fan-accent,var(--pink)); color:var(--black,#08090b); box-shadow:0 0 0 5px color-mix(in srgb,var(--fan-accent,var(--pink)) 12%,transparent); }
        .speed-1 { left:0; top:176px; }
        .speed-2 { left:32px; top:55px; }
        .speed-3 { left:calc(50% - 28px); top:0; }
        .speed-4 { right:32px; top:55px; }
        .speed-5 { right:0; top:176px; }
        .speed-6 { width:74px; left:calc(50% - 37px); bottom:0; border-radius:20px; font-size:10px; }
        .feature-row { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:10px; margin-top:8px; }
        .feature { display:flex; min-width:0; min-height:64px; align-items:center; gap:10px; border:1px solid transparent; border-radius:17px; padding:8px 12px; background:var(--contrast3); color:var(--contrast12); text-align:left; cursor:pointer; transition:transform 120ms ease,background 140ms ease,color 140ms ease; }
        .feature:hover:not(:disabled) { background:var(--contrast5); color:var(--contrast19); }
        .feature:active:not(:disabled) { transform:scale(.97); }
        .feature.active { border-color:color-mix(in srgb,var(--fan-accent,var(--pink)) 30%,transparent); background:color-mix(in srgb,var(--fan-accent,var(--pink)) 14%,var(--contrast3)); color:var(--fan-accent,var(--pink)); }
        .feature.led.active { color:var(--yellow,#ffd76a); border-color:color-mix(in srgb,var(--yellow,#ffd76a) 30%,transparent); background:color-mix(in srgb,var(--yellow,#ffd76a) 12%,var(--contrast3)); }
        .feature-icon { display:grid; width:27px; height:27px; flex:0 0 27px; place-items:center; }
        .feature-icon ha-icon { width:22px; height:22px; }
        .feature-copy { display:grid; min-width:0; gap:3px; line-height:1.15; }
        .feature-copy strong { overflow:hidden; color:var(--contrast18); font-size:12px; font-weight:720; text-overflow:ellipsis; white-space:nowrap; }
        .feature-copy small { overflow:hidden; color:var(--contrast9); font-size:9px; font-weight:560; text-overflow:ellipsis; white-space:nowrap; }
        .feature.active .feature-copy strong,.feature.active .feature-copy small { color:currentColor; }
        .chevron { width:16px; height:16px; margin-left:auto; }
        button:disabled { cursor:not-allowed; opacity:.44; }
        .feature:disabled { opacity:.5; }
        .unavailable { min-height:300px; background:color-mix(in srgb,var(--contrast1) 28%,transparent); }
        .unavailable .tile-icon { color:var(--contrast8); }
        .unavailable-body { display:grid; min-height:216px; place-content:center; justify-items:center; gap:7px; padding:20px; text-align:center; }
        .unavailable-icon { display:grid; width:64px; height:64px; place-items:center; border-radius:22px; background:var(--contrast3); color:var(--contrast8); }
        .unavailable-icon ha-icon { width:30px; height:30px; }
        .unavailable-body strong { margin-top:5px; color:var(--contrast15); font-size:14px; }
        .unavailable-body small { max-width:240px; color:var(--contrast9); font-size:11px; line-height:1.4; }
        .error { margin:12px 2px -2px; color:var(--red,var(--error-color)); font-size:12px; font-weight:600; }
        .timer-dialog { width:min(460px,calc(100vw - 40px)); border:1px solid var(--contrast5); border-radius:26px; padding:20px; background:var(--contrast2); color:var(--contrast20); box-shadow:0 24px 80px rgba(0,0,0,.55); }
        .timer-dialog::backdrop { background:rgba(0,0,0,.68); backdrop-filter:blur(3px); }
        .dialog-heading { display:flex; align-items:center; gap:12px; }
        .dialog-heading>span:nth-child(2) { display:grid; min-width:0; flex:1; gap:3px; }
        .dialog-heading strong { font-size:18px; font-weight:740; }
        .dialog-heading small { color:var(--contrast10); font-size:12px; }
        .dialog-icon { display:grid; width:44px; height:44px; place-items:center; border-radius:15px; background:color-mix(in srgb,var(--fan-accent,var(--pink)) 15%,var(--contrast3)); color:var(--fan-accent,var(--pink)); }
        .dialog-close { display:grid; width:48px; height:48px; place-items:center; border:0; border-radius:15px; background:var(--contrast3); color:var(--contrast14); cursor:pointer; }
        .timer-choices { display:grid; grid-template-columns:repeat(2,1fr); gap:10px; margin-top:20px; }
        .timer-choice { display:grid; min-height:78px; place-content:center; gap:3px; border:1px solid var(--contrast5); border-radius:18px; background:var(--contrast3); color:var(--contrast18); text-align:center; cursor:pointer; }
        .timer-choice:hover { border-color:color-mix(in srgb,var(--fan-accent,var(--pink)) 38%,var(--contrast5)); background:var(--contrast4); }
        .timer-choice strong { font-size:20px; font-weight:760; }
        .timer-choice small { color:var(--contrast10); font-size:11px; }
        .timer-choice.selected { border-color:var(--fan-accent,var(--pink)); color:var(--fan-accent,var(--pink)); }
        .cancel-timer { display:flex; grid-column:1/-1; min-height:68px; align-items:center; justify-content:flex-start; gap:12px; padding:0 18px; color:var(--red,#ff768a); text-align:left; }
        .cancel-timer ha-icon { width:25px; height:25px; }
        .cancel-timer span { display:grid; gap:3px; }
        .cancel-timer strong { font-size:14px; }
        .dialog-cancel { width:100%; min-height:56px; margin-top:12px; border:0; border-radius:17px; background:var(--contrast4); color:var(--contrast16); font-size:13px; font-weight:700; cursor:pointer; }
        @keyframes fan-spin { to { transform:rotate(360deg); } }
        @keyframes busy-spin { to { transform:rotate(360deg); } }
        @media (prefers-reduced-motion:reduce) { * { animation:none!important; transition:none!important; } }
      </style>
      <ha-card style="--fan-accent:${this._escape(this._config.accent || "var(--pink)")}">
        ${multiple ? `<header class="room-heading"><span class="room-icon"><ha-icon icon="${this._escape(this._config.icon || "mdi:fan")}"></ha-icon></span><span class="room-copy"><strong>${this._escape(this._config.name)}</strong><small>${this._escape(this._roomSummary())}</small></span></header>` : ""}
        <div class="fan-list">${this._config.fans.map((unit, index) => this._unit(unit, index)).join("")}</div>
        ${this._error ? `<div class="error" role="alert">${this._escape(this._error)}</div>` : ""}
      </ha-card>
      ${this._timerDialog()}`;

    this.shadowRoot.querySelectorAll("button[data-action]").forEach((button) => button.addEventListener("click", (event) => this._act(event.currentTarget)));
    const dialog = this.shadowRoot.querySelector("dialog");
    if (dialog) {
      dialog.addEventListener("cancel", (event) => {
        event.preventDefault();
        this._closeTimerDialog();
      });
      dialog.addEventListener("click", (event) => {
        if (event.target === dialog) this._closeTimerDialog();
      });
      dialog.showModal();
    }
  }

  async _act(button) {
    const action = button.dataset.action;
    const index = Number(button.dataset.index || 0);
    const unit = this._config.fans[index];

    if (action === "close-timer") {
      this._closeTimerDialog();
      return;
    }
    if (action === "timer-choice") {
      const option = button.dataset.option;
      this._timerDialogIndex = null;
      await this._runUnit(index, () => this._callService("select", "select_option", { option }, unit.timer));
      return;
    }
    if (action === "timer") {
      if (!this._available(unit) || this._busy.has(index)) return;
      this._timerDialogIndex = index;
      this._render();
      return;
    }
    if (!this._available(unit) || this._busy.has(index)) return;

    if (action === "power") {
      const running = this._running(unit);
      await this._runUnit(index, async () => {
        await this._afterTimerCancellation(
          unit,
          "The timer was cancelled, but the fan did not accept the power command.",
          () => this._callService("fan", running ? "turn_off" : "turn_on", {}, unit.fan),
        );
      });
    } else if (action === "speed") {
      const percentage = Number(button.dataset.percentage);
      const running = this._running(unit);
      await this._runUnit(index, async () => {
        const setSpeed = () => this._callService("fan", running ? "set_percentage" : "turn_on", { percentage }, unit.fan);
        if (running) {
          await setSpeed();
        } else {
          await this._afterTimerCancellation(
            unit,
            "The timer was cancelled, but the fan did not accept the selected speed.",
            setSpeed,
          );
        }
      });
    } else if (action === "led" && this._running(unit)) {
      const service = this._state(unit.led)?.state === "on" ? "turn_off" : "turn_on";
      await this._runUnit(index, () => this._callService("light", service, {}, unit.led));
    } else if (action === "sleep" && this._running(unit)) {
      const service = this._state(unit.sleep)?.state === "on" ? "turn_off" : "turn_on";
      await this._runUnit(index, () => this._callService("switch", service, {}, unit.sleep));
    }
  }

  _closeTimerDialog() {
    this._timerDialogIndex = null;
    this._render();
  }

  async _cancelTimer(unit) {
    if (!this._timerActive(unit)) return false;
    try {
      await this._callService("select", "select_option", { option: "Off" }, unit.timer);
      return true;
    } catch (_error) {
      throw new Error("The timer could not be cancelled, so the fan was not changed.");
    }
  }

  async _afterTimerCancellation(unit, failureMessage, task) {
    const timerCancelled = await this._cancelTimer(unit);
    try {
      await task();
    } catch (error) {
      if (timerCancelled) throw new Error(failureMessage);
      throw error;
    }
  }

  async _runUnit(index, task) {
    if (!this._hass || this._busy.has(index)) return;
    this._busy.add(index);
    this._error = "";
    this._render();
    try {
      await task();
    } catch (error) {
      this._error = error?.message || "The fan did not accept that command.";
    } finally {
      window.setTimeout(() => {
        this._busy.delete(index);
        this._render();
      }, 650);
    }
  }

  async _callService(domain, service, data, entityId) {
    await this._hass.callService(domain, service, data, { entity_id: entityId });
  }
}

customElements.define("family-fan-card", FamilyFanCard);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "family-fan-card",
  name: "Family Fan Card",
  description: "Atomberg-style circular fan controls",
});
