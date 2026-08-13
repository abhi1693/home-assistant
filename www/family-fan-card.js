const FAMILY_FAN_SPEEDS = [
  { speed: 1, percentage: 16 },
  { speed: 2, percentage: 33 },
  { speed: 3, percentage: 50 },
  { speed: 4, percentage: 66 },
  { speed: 5, percentage: 83 },
  { speed: 6, percentage: 100 },
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
    return 4;
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
    if (!Number.isFinite(percentage)) return null;
    return Math.max(1, Math.min(6, Math.round(percentage / (100 / 6))));
  }

  _status(unit) {
    const state = this._state(unit.fan);
    if (!state || ["unknown", "unavailable"].includes(state.state)) return "Unavailable";
    if (state.state !== "on") return "Off";
    const speed = this._speed(state);
    if (speed === 6) return "Running · Boost";
    return speed ? `Running · Speed ${speed}` : "Running";
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
    const duration = timer.state.replace(" hours", "h").replace(" hour", "h");
    return `${target} in ${duration}`;
  }

  _roomSummary() {
    const available = this._config.fans.filter((unit) => this._available(unit));
    const running = available.filter((unit) => this._running(unit));
    if (!available.length) return this._config.fans.length === 1 ? "Fan unavailable" : "Fans unavailable";
    if (!running.length) return this._config.fans.length === 1 ? "Fan is off" : "Both fans are off";
    if (running.length === 1) {
      return this._config.fans.length === 1
        ? this._status(running[0])
        : `${running[0].name || "One fan"} is running`;
    }
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

  _unit(unit, index) {
    const fan = this._state(unit.fan);
    const available = this._available(unit);
    const running = this._running(unit);
    const speed = this._speed(fan) || 1;
    const busy = this._busy.has(index);
    const fanName = unit.name || (this._config.fans.length > 1 ? `Fan ${index + 1}` : "Fan");
    const spin = Math.max(0.55, 2.2 - speed * 0.25);

    if (!available) {
      return `
        <section class="fan-unit unavailable">
          <div class="fan-heading">
            <button class="fan-identity" data-action="more-info" data-index="${index}" aria-label="Open ${this._escape(fanName)} details">
              <span class="fan-icon"><ha-icon icon="mdi:fan-off"></ha-icon></span>
              <span class="fan-copy"><span class="fan-name">${this._escape(fanName)}</span><span class="fan-status">Unavailable</span></span>
            </button>
          </div>
          <div class="unavailable-message" role="status">
            <ha-icon icon="mdi:power-plug-off-outline"></ha-icon>
            <span><strong>Fan unavailable</strong><small>Check the wall switch or Wi-Fi.</small></span>
          </div>
        </section>`;
    }

    const ledOn = this._state(unit.led)?.state === "on";
    const sleepOn = this._state(unit.sleep)?.state === "on";
    const timerOn = this._timerActive(unit);
    const timerAction = running ? "Turn off later" : "Turn on later";
    const featureDisabled = busy || !running;
    const decreaseDisabled = busy || speed <= 1;
    const increaseDisabled = busy || speed >= 6;

    return `
      <section class="fan-unit${running ? " running" : ""}${busy ? " busy" : ""}" style="--fan-spin:${spin}s">
        <div class="fan-heading">
          <button class="fan-identity" data-action="more-info" data-index="${index}" aria-label="Open ${this._escape(fanName)} details">
            <span class="fan-icon"><ha-icon icon="mdi:fan"></ha-icon></span>
            <span class="fan-copy"><span class="fan-name">${this._escape(fanName)}</span><span class="fan-status">${this._escape(busy ? "Please wait…" : this._status(unit))}</span></span>
          </button>
          ${this._powerButton(index, fanName, running, busy)}
        </div>
        <div class="speed-block">
          <span class="control-label">Speed</span>
          <div class="speed-stepper" aria-label="${this._escape(fanName)} speed">
            <button class="step" data-action="speed-down" data-index="${index}"${this._disabled(decreaseDisabled)} aria-label="Decrease ${this._escape(fanName)} speed"><ha-icon icon="mdi:minus"></ha-icon></button>
            <span class="speed-value" aria-live="polite"><strong>${speed === 6 ? "Boost" : speed}</strong><small>${running ? "Current speed" : "Starts at this speed"}</small></span>
            <button class="step" data-action="speed-up" data-index="${index}"${this._disabled(increaseDisabled)} aria-label="Increase ${this._escape(fanName)} speed"><ha-icon icon="mdi:plus"></ha-icon></button>
          </div>
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
            <span class="feature-copy"><strong>${timerAction}</strong><small>${this._escape(this._timerLabel(unit))}</small></span>
            <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
          </button>
        </div>
      </section>`;
  }

  _powerButton(index, fanName, running, busy) {
    const label = busy ? "Working…" : running ? "Turn off" : "Turn on";
    return `<button class="power${running ? " active" : ""}" data-action="power" data-index="${index}"${this._disabled(busy)} aria-label="${this._escape(label)} ${this._escape(fanName)}" aria-pressed="${running ? "true" : "false"}">
      <ha-icon icon="${busy ? "mdi:loading" : "mdi:power"}"></ha-icon><span>${this._escape(label)}</span>
    </button>`;
  }

  _timerDialog() {
    if (this._timerDialogIndex === null) return "";
    const index = this._timerDialogIndex;
    const unit = this._config.fans[index];
    if (!unit || !this._available(unit)) return "";
    const running = this._running(unit);
    const fanName = unit.name || (this._config.fans.length > 1 ? `Fan ${index + 1}` : `${this._config.name} fan`);
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
    const anyRunning = this._config.fans.some((unit) => this._running(unit));
    const multiple = this._config.fans.length > 1;
    const canAllOff = this._config.fans.some((unit, index) => this._running(unit) && !this._busy.has(index));
    this.shadowRoot.innerHTML = `
      <style>
        :host { display:block; color:var(--primary-text-color); font-family:var(--secondary-font-family, Inter, system-ui, sans-serif); }
        * { box-sizing:border-box; }
        button { font:inherit; -webkit-tap-highlight-color:transparent; }
        button:focus-visible { outline:3px solid var(--fan-accent, var(--pink)); outline-offset:3px; }
        ha-card { overflow:hidden; border:1px solid ${anyRunning ? "color-mix(in srgb, var(--fan-accent, var(--pink)) 30%, transparent)" : "rgba(var(--rgb-primary-text-color), .055)"}; border-radius:26px; padding:20px; background:${anyRunning ? "color-mix(in srgb, var(--fan-accent, var(--pink)) 7%, var(--contrast2))" : "var(--contrast2, var(--ha-card-background))"}; box-shadow:none; transition:background 180ms ease,border-color 180ms ease; }
        .room-heading { display:flex; min-height:52px; align-items:center; gap:12px; margin-bottom:16px; }
        .room-icon { display:grid; width:44px; height:44px; flex:0 0 44px; place-items:center; border-radius:15px; background:color-mix(in srgb, var(--fan-accent, var(--pink)) 13%, var(--contrast3)); color:var(--fan-accent, var(--pink)); }
        .room-icon ha-icon { width:23px; }
        .room-copy { display:grid; min-width:0; flex:1; gap:4px; }
        .room-name { color:var(--contrast20); font-family:var(--primary-font-family, Inter, system-ui, sans-serif); font-size:20px; font-weight:720; letter-spacing:-.025em; }
        .room-status { color:var(--contrast10); font-size:12px; font-weight:560; line-height:1.3; }
        .all-off { display:inline-flex; min-height:56px; align-items:center; gap:8px; border:0; border-radius:17px; padding:0 18px; background:var(--contrast4); color:var(--contrast15); font-size:13px; font-weight:700; cursor:pointer; }
        .all-off:hover:not(:disabled) { background:var(--contrast5); color:var(--contrast20); }
        .all-off ha-icon { width:19px; }
        .fan-list { display:grid; grid-template-columns:1fr; gap:14px; }
        .fan-unit { min-width:0; border:1px solid var(--contrast4); border-radius:21px; padding:16px; background:color-mix(in srgb, var(--contrast1) 55%, transparent); }
        .fan-unit.running { border-color:color-mix(in srgb, var(--fan-accent, var(--pink)) 25%, var(--contrast4)); }
        .fan-heading { display:flex; min-height:56px; align-items:center; gap:12px; }
        .fan-identity { display:flex; min-width:0; min-height:56px; flex:1; align-items:center; gap:12px; border:0; padding:0; background:transparent; color:inherit; text-align:left; cursor:pointer; }
        .fan-icon { display:grid; width:46px; height:46px; flex:0 0 46px; place-items:center; border-radius:16px; background:var(--contrast4); color:var(--contrast12); }
        .fan-icon ha-icon { width:25px; height:25px; }
        .running .fan-icon { background:color-mix(in srgb, var(--fan-accent, var(--pink)) 17%, var(--contrast3)); color:var(--fan-accent, var(--pink)); }
        .running .fan-icon ha-icon { animation:fan-spin var(--fan-spin) linear infinite; }
        .fan-copy { display:grid; min-width:0; gap:4px; }
        .fan-name { overflow:hidden; color:var(--contrast20); font-size:16px; font-weight:700; text-overflow:ellipsis; white-space:nowrap; }
        .fan-status { overflow:hidden; color:var(--contrast10); font-size:12px; font-weight:560; text-overflow:ellipsis; white-space:nowrap; }
        .power { display:flex; min-width:116px; min-height:56px; flex:0 0 auto; align-items:center; justify-content:center; gap:8px; border:0; border-radius:17px; padding:0 16px; background:var(--contrast4); color:var(--contrast15); font-size:13px; font-weight:720; cursor:pointer; transition:transform 120ms ease,background 140ms ease,color 140ms ease; }
        .power.active { background:var(--fan-accent, var(--pink)); color:var(--black, #08090b); }
        .power ha-icon { width:21px; height:21px; }
        .busy .power ha-icon { animation:busy-spin .8s linear infinite; }
        .speed-block { margin-top:14px; }
        .control-label { display:block; margin:0 2px 8px; color:var(--contrast14); font-size:12px; font-weight:680; }
        .speed-stepper { display:grid; grid-template-columns:72px minmax(130px, 1fr) 72px; min-height:68px; overflow:hidden; border:1px solid var(--contrast5); border-radius:18px; background:var(--contrast3); }
        .step { display:grid; min-width:72px; min-height:68px; place-items:center; border:0; background:transparent; color:var(--contrast17); cursor:pointer; }
        .step:first-child { border-right:1px solid var(--contrast5); }
        .step:last-child { border-left:1px solid var(--contrast5); }
        .step:hover:not(:disabled) { background:var(--contrast5); color:var(--fan-accent, var(--pink)); }
        .step ha-icon { width:27px; height:27px; }
        .speed-value { display:grid; place-content:center; gap:2px; text-align:center; }
        .speed-value strong { color:var(--contrast20); font-size:22px; font-weight:760; line-height:1; }
        .speed-value small { color:var(--contrast9); font-size:10px; font-weight:560; }
        .feature-row { display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); gap:10px; margin-top:12px; }
        .feature { position:relative; display:flex; min-width:0; min-height:64px; align-items:center; gap:10px; border:1px solid transparent; border-radius:17px; padding:8px 12px; background:var(--contrast3); color:var(--contrast12); text-align:left; cursor:pointer; transition:transform 120ms ease,background 140ms ease,color 140ms ease; }
        .feature:hover:not(:disabled) { background:var(--contrast5); color:var(--contrast19); }
        .feature.active { border-color:color-mix(in srgb, var(--fan-accent, var(--pink)) 30%, transparent); background:color-mix(in srgb, var(--fan-accent, var(--pink)) 15%, var(--contrast3)); color:var(--fan-accent, var(--pink)); }
        .feature.led.active { color:var(--yellow, #ffd76a); border-color:color-mix(in srgb, var(--yellow, #ffd76a) 30%, transparent); background:color-mix(in srgb, var(--yellow, #ffd76a) 12%, var(--contrast3)); }
        .feature.sleep.active { color:var(--purple, #c8a7ff); border-color:color-mix(in srgb, var(--purple, #c8a7ff) 30%, transparent); background:color-mix(in srgb, var(--purple, #c8a7ff) 12%, var(--contrast3)); }
        .feature-icon { display:grid; width:28px; height:28px; flex:0 0 28px; place-items:center; }
        .feature-icon ha-icon { width:23px; height:23px; }
        .feature-copy { display:grid; min-width:0; gap:3px; line-height:1.15; }
        .feature-copy strong { overflow:hidden; color:var(--contrast18); font-size:12px; font-weight:720; text-overflow:ellipsis; white-space:nowrap; }
        .feature-copy small { overflow:hidden; color:var(--contrast9); font-size:10px; font-weight:560; text-overflow:ellipsis; white-space:nowrap; }
        .feature.active .feature-copy strong, .feature.active .feature-copy small { color:currentColor; }
        .feature .chevron { width:17px; height:17px; flex:0 0 17px; margin-left:auto; }
        button:disabled { cursor:not-allowed; opacity:.42; }
        .feature:disabled { opacity:.52; }
        .feature:disabled .feature-copy small { color:var(--contrast8); }
        .unavailable { padding:16px; background:color-mix(in srgb, var(--contrast1) 28%, transparent); }
        .unavailable .fan-icon { color:var(--contrast8); }
        .unavailable-message { display:flex; min-height:74px; align-items:center; gap:12px; margin-top:10px; border-radius:17px; padding:13px 15px; background:var(--contrast3); color:var(--contrast10); }
        .unavailable-message ha-icon { width:25px; height:25px; flex:0 0 25px; }
        .unavailable-message span { display:grid; gap:3px; }
        .unavailable-message strong { color:var(--contrast16); font-size:13px; }
        .unavailable-message small { font-size:11px; }
        .error { margin:12px 2px -2px; color:var(--red, var(--error-color)); font-size:12px; font-weight:600; }
        .timer-dialog { width:min(460px, calc(100vw - 40px)); border:1px solid var(--contrast5); border-radius:26px; padding:20px; background:var(--contrast2); color:var(--contrast20); box-shadow:0 24px 80px rgba(0,0,0,.55); }
        .timer-dialog::backdrop { background:rgba(0,0,0,.68); backdrop-filter:blur(3px); }
        .dialog-heading { display:flex; align-items:center; gap:12px; }
        .dialog-heading > span:nth-child(2) { display:grid; min-width:0; flex:1; gap:3px; }
        .dialog-heading strong { font-size:18px; font-weight:740; }
        .dialog-heading small { color:var(--contrast10); font-size:12px; }
        .dialog-icon { display:grid; width:44px; height:44px; place-items:center; border-radius:15px; background:color-mix(in srgb, var(--fan-accent, var(--pink)) 15%, var(--contrast3)); color:var(--fan-accent, var(--pink)); }
        .dialog-close { display:grid; width:48px; height:48px; place-items:center; border:0; border-radius:15px; background:var(--contrast3); color:var(--contrast14); cursor:pointer; }
        .timer-choices { display:grid; grid-template-columns:repeat(2, 1fr); gap:10px; margin-top:20px; }
        .timer-choice { display:grid; min-height:78px; place-content:center; gap:3px; border:1px solid var(--contrast5); border-radius:18px; background:var(--contrast3); color:var(--contrast18); text-align:center; cursor:pointer; }
        .timer-choice:hover { border-color:color-mix(in srgb, var(--fan-accent, var(--pink)) 38%, var(--contrast5)); background:var(--contrast4); }
        .timer-choice strong { font-size:20px; font-weight:760; }
        .timer-choice small { color:var(--contrast10); font-size:11px; }
        .timer-choice.selected { border-color:var(--fan-accent, var(--pink)); color:var(--fan-accent, var(--pink)); }
        .cancel-timer { display:flex; grid-column:1 / -1; min-height:68px; align-items:center; justify-content:flex-start; gap:12px; padding:0 18px; color:var(--red, #ff768a); text-align:left; }
        .cancel-timer ha-icon { width:25px; height:25px; }
        .cancel-timer span { display:grid; gap:3px; }
        .cancel-timer strong { font-size:14px; }
        .dialog-cancel { width:100%; min-height:56px; margin-top:12px; border:0; border-radius:17px; background:var(--contrast4); color:var(--contrast16); font-size:13px; font-weight:700; cursor:pointer; }
        .power:active:not(:disabled), .step:active:not(:disabled), .feature:active:not(:disabled), .timer-choice:active, .dialog-cancel:active { transform:scale(.97); }
        @keyframes fan-spin { to { transform:rotate(360deg); } }
        @keyframes busy-spin { to { transform:rotate(360deg); } }
        @media (prefers-reduced-motion:reduce) { * { animation:none !important; transition:none !important; } }
      </style>
      <ha-card style="--fan-accent:${this._escape(this._config.accent || "var(--pink)")}">
        <header class="room-heading">
          <span class="room-icon"><ha-icon icon="${this._escape(this._config.icon || "mdi:fan")}"></ha-icon></span>
          <span class="room-copy"><span class="room-name">${this._escape(this._config.name)}</span><span class="room-status">${this._escape(this._roomSummary())}</span></span>
          ${multiple ? `<button class="all-off" data-action="all-off"${this._disabled(!canAllOff)}><ha-icon icon="mdi:fan-off"></ha-icon>All off</button>` : ""}
        </header>
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
      await this._runUnit(index, async () => {
        await this._callService("select", "select_option", { option }, unit.timer);
      });
      return;
    }
    if (action === "more-info") {
      this.dispatchEvent(new CustomEvent("hass-more-info", { bubbles: true, composed: true, detail: { entityId: unit.fan } }));
      return;
    }
    if (action === "timer") {
      if (!this._available(unit) || this._busy.has(index)) return;
      this._timerDialogIndex = index;
      this._render();
      return;
    }
    if (action === "all-off") {
      await this._allOff();
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
    } else if (action === "speed-up" || action === "speed-down") {
      const current = this._speed(this._state(unit.fan)) || 1;
      const next = Math.max(1, Math.min(6, current + (action === "speed-up" ? 1 : -1)));
      if (next === current) return;
      const percentage = FAMILY_FAN_SPEEDS[next - 1].percentage;
      const running = this._running(unit);
      await this._runUnit(index, async () => {
        const setSpeed = () => this._callService("fan", running ? "set_percentage" : "turn_on", { percentage }, unit.fan);
        if (running) {
          await setSpeed();
        } else {
          await this._afterTimerCancellation(
            unit,
            "The timer was cancelled, but the fan did not accept the new speed.",
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

  async _allOff() {
    const actions = this._config.fans
      .map((unit, index) => ({ unit, index }))
      .filter(({ unit, index }) => this._running(unit) && !this._busy.has(index));
    await Promise.all(actions.map(({ unit, index }) => this._runUnit(index, async () => {
      await this._afterTimerCancellation(
        unit,
        "The timer was cancelled, but the fan did not turn off.",
        () => this._callService("fan", "turn_off", {}, unit.fan),
      );
    })));
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
  description: "Simple, quota-conscious Atomberg room controls",
});
