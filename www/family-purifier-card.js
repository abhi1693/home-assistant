class FamilyPurifierCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this._busy = false;
    this._error = "";
    this._detailsOpen = false;
    this._history = {};
    this._historyAttempt = 0;
    this._timerMinutes = "60";
    this._notice = "";
  }
  setConfig(config) {
    const entities = config.module?.entities;
    if (!entities || ["fan", "pm25", "pm10", "night", "monitoring", "hepa", "carbon"].some(key => !entities[key])) {
      throw new Error("Purifier card requires fan, particulate, night and filter entities");
    }
    this._config = config.module;
    this._render();
  }
  set hass(hass) {
    this._hass = hass;
    this._loadHistory();
    const fingerprint = JSON.stringify(Object.values(this._config?.entities || {}).map(id => hass.states[id]));
    if (fingerprint === this._fingerprint) return;
    this._fingerprint = fingerprint;
    if (!this.shadowRoot.activeElement && !this._busy) this._focusKey = null;
    // Preserve keyboard interaction while a native select is open.
    if (["SELECT", "INPUT"].includes(this.shadowRoot.activeElement?.tagName)) { this._pendingRender = true; return; }
    this._render();
  }

  connectedCallback() {
    if (!this._refreshTimer) this._refreshTimer = setInterval(() => { this._loadHistory(); this._refreshView(); }, 60000);
    this._loadHistory();
  }
  disconnectedCallback() { clearInterval(this._refreshTimer); this._refreshTimer = null; }
  _refreshView() {
    if (!this.isConnected) return;
    if (["SELECT", "INPUT"].includes(this.shadowRoot.activeElement?.tagName)) { this._pendingRender = true; return; }
    if (!this.shadowRoot.activeElement && !this._busy) this._focusKey = null;
    this._render();
  }
  async _loadHistory() {
    if (!this._hass?.callApi || !this._config || this._historyLoading || Date.now() - this._historyAttempt < 300000) return;
    this._historyLoading = true; this._historyAttempt = Date.now();
    const end = Date.now(), start = end - 86400000;
    const ids = ["pm25", "pm10"].map(key => this._config.entities[key]);
    try {
      const query = new URLSearchParams({filter_entity_id:ids.join(","),end_time:new Date(end).toISOString(),minimal_response:"1",no_attributes:"1"});
      const data = await this._hass.callApi("GET", `history/period/${encodeURIComponent(new Date(start).toISOString())}?${query}`);
      this._history = {};
      for (const key of ["pm25", "pm10"]) {
        const rows = (Array.isArray(data) ? data : []).find(group => group?.[0]?.entity_id === this._config.entities[key]) || [];
        this._history[key] = this._summarize(rows, start, end);
      }
      this._historyError = ""; this._historyUpdated = end;
    } catch (error) { this._historyError = "History unavailable. Retrying automatically."; }
    finally { this._historyLoading = false; this._refreshView(); }
  }
  _summarize(rows, start, end) {
    // Recorder carries the boundary state; unknown intervals break coverage.
    const events = rows.map(row => ({time:Date.parse(row.last_changed || row.last_updated),
      value:typeof row.state === "string" && row.state.trim() && Number.isFinite(Number(row.state)) && Number(row.state) >= 0 ? Number(row.state) : null}))
      .filter(row => Number.isFinite(row.time) && row.time <= end).sort((a,b) => a.time-b.time);
    const buckets = Array.from({length:288}, () => ({total:0,duration:0}));
    let total=0,duration=0,peak=null;
    for (let i=0;i<events.length;i++) {
      const event=events[i],from=Math.max(start,event.time),to=Math.min(end,events[i+1]?.time ?? end);
      if (event.value===null || to<=from) continue;
      total+=event.value*(to-from);duration+=to-from;peak=peak===null?event.value:Math.max(peak,event.value);
      for(let j=Math.max(0,Math.floor((from-start)/300000));j<288 && start+j*300000<to;j++){
        const overlap=Math.min(to,start+(j+1)*300000)-Math.max(from,start+j*300000);
        if(overlap>0){buckets[j].total+=event.value*overlap;buckets[j].duration+=overlap;}
      }
    }
    return {mean:duration?total/duration:null,peak,duration,points:buckets.map(b=>b.duration?b.total/b.duration:null)};
  }
  _freshness(key) {
    const st=this._state(key);
    if(!this._available(key))return "Unavailable";
    const reported=st?.last_reported,stamp=reported || st?.last_updated;
    const time=Date.parse(stamp);
    if(!Number.isFinite(time))return "Timestamp unavailable";
    const minutes=Math.max(0,Math.floor((Date.now()-time)/60000));
    const age=minutes<1?"just now":minutes<60?`${minutes}m ago`:`${Math.floor(minutes/60)}h ${minutes%60}m ago`;
    return `${reported?"HA last report":"State last updated"} ${age}`;
  }
  _chart(key,name) {
    const history=this._history[key],unit=this._state(key)?.attributes?.unit_of_measurement || "µg/m³";
    if(!history || history.mean===null)return `<section class="trend"><h4>${name}</h4><p class="hint">${this._historyLoading?"Loading history…":this._historyError || "No recorded data in the last 24 hours."}</p></section>`;
    const max=Math.max(1,...history.points.filter(v=>v!==null)),scale=100/max;
    let path="",continuing=false;
    history.points.forEach((v,i)=>{if(v===null){continuing=false;return;}path+=`${continuing?"L":"M"}${(i/287*300).toFixed(2)},${(105-v*scale).toFixed(2)} `;continuing=true;});
    const mean=history.mean.toFixed(1),peak=history.peak.toFixed(1),hours=(history.duration/3600000).toFixed(1);
    return `<section class="trend"><h4>${name} · 24 hours</h4><svg viewBox="0 0 300 125" role="img" aria-label="${name}, 24-hour trend, time-weighted average ${mean}, peak ${peak} ${this._escape(unit)}, ${hours} hours recorded"><title>${name}: 5-minute time-weighted averages</title><path d="M0 105H300" stroke="var(--contrast5)" fill="none"/><path d="${path}" stroke="var(--room-accent,var(--teal))" stroke-width="2" fill="none"/><text x="0" y="10">${max.toFixed(0)}</text><text x="0" y="121">24h ago</text><text x="300" y="121" text-anchor="end">Now</text></svg><div class="trend-stats"><span>Average <strong>${mean}</strong></span><span>Peak <strong>${peak}</strong></span><span>${this._escape(unit)}</span></div><p class="hint">${hours}h recorded · time-weighted average; chart uses 5-minute averages.</p></section>`;
  }

  getCardSize() { return 9; }
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
  async _call(domain, service, key, data = {}, notice = "") {
    if (this._busy || !this._available(key)) return;
    this._busy = true;
    this._error = "";
    this._notice = "";
    this._render();
    try {
      await this._hass.callService(domain, service, {entity_id: this._config.entities[key], ...data});
      this._notice = notice;
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
    this._pendingRender = false;
    const focused = this.shadowRoot.activeElement;
    if (focused?.dataset.action) this._focusKey = `[data-action="${focused.dataset.action}"]`;
    else if (focused?.dataset.mode) this._focusKey = `[data-mode="${focused.dataset.mode}"]`;
    else if (focused?.tagName === "SUMMARY") this._focusKey = "summary";
    else if (focused?.tagName === "SELECT") this._focusKey = "select";
    else if (focused?.tagName === "INPUT") this._focusKey = "[data-timer-minutes]";
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
    const monitoring = this._available("monitoring") && this._state("monitoring").state === "on";
    const filter = key => this._number(key) === null ? "Unavailable" : `${this._number(key)}% remaining`;
    this.shadowRoot.innerHTML = `
      <style>
        :host{display:block;grid-column:1 / -1;min-width:0;color:var(--primary-text-color);font-family:var(--secondary-font-family)}
        *{box-sizing:border-box}ha-card{display:block;background:var(--contrast1,var(--ha-card-background));border:1px solid rgba(var(--rgb-primary-text-color),.07);border-radius:24px;padding:18px;box-shadow:none}
        header{display:flex;align-items:center;gap:12px}.icon{display:grid;place-items:center;width:44px;height:44px;border-radius:15px;background:color-mix(in srgb,var(--room-accent,var(--teal)) 15%,var(--contrast3));color:var(--room-accent,var(--teal))}
        .heading{flex:1;min-width:0}h3{margin:0;font:700 17px var(--primary-font-family)}.status{display:block;margin-top:4px;color:var(--contrast10);font-size:12px}
        button,input,select,summary{font:inherit;min-height:44px}button,input,select{border:1px solid var(--contrast5);border-radius:12px;background:var(--contrast3);color:var(--primary-text-color);padding:10px 14px}
        button{cursor:pointer}button[aria-pressed=true]{background:color-mix(in srgb,var(--room-accent,var(--teal)) 24%,var(--contrast3));border-color:var(--room-accent,var(--teal))}button:disabled,select:disabled{opacity:.5;cursor:default}
        button:focus-visible,input:focus-visible,select:focus-visible,summary:focus-visible{outline:3px solid var(--room-accent,var(--teal));outline-offset:3px}
        .readings{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:18px 0}.reading{padding:14px;border-radius:16px;background:var(--contrast2)}.reading span,.reading small{display:block;color:var(--contrast10);font-size:12px}.reading strong{display:block;font-size:24px;margin:5px 0;overflow-wrap:anywhere}
        .controls{display:flex;gap:8px;flex-wrap:wrap}.controls button{flex:1}.speed{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:12px;font-size:13px}.speed select{min-width:120px;max-width:60%}
        .hint{color:var(--contrast10);font-size:12px;margin:8px 0 0;line-height:1.5}details{margin-top:16px;border-top:1px solid var(--contrast4)}summary{cursor:pointer;padding:14px 0;color:var(--contrast12);font-size:13px}.filter{display:flex;justify-content:space-between;gap:10px;font-size:13px;padding:8px 0}.filter span{color:var(--contrast10)}.error{color:var(--red);margin-top:12px;font-size:13px;overflow-wrap:anywhere}
        .freshness{display:flex;flex-wrap:wrap;gap:8px 18px;font-size:12px;color:var(--contrast10);margin:10px 0}.trends{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:14px 0}.trend{min-width:0;background:var(--contrast2);border-radius:16px;padding:14px}.trend h4{font-size:13px;margin:0 0 8px}.trend svg{display:block;width:100%;height:auto;max-height:170px}.trend text{fill:var(--contrast10);font-size:9px}.trend-stats{display:flex;flex-wrap:wrap;gap:8px 16px;font-size:12px}.timer{display:flex;flex-wrap:wrap;align-items:end;gap:10px;margin-top:16px}.timer label{display:grid;gap:6px;font-size:13px}.timer input{width:120px;max-width:100%}.notice{font-size:12px;color:var(--teal);margin:10px 0}.monitoring{margin-top:12px}
        @media(max-width:639px){.trends{grid-template-columns:1fr}.timer button{flex:1}}
        @media(max-width:639px){ha-card{padding:14px;border-radius:20px}h3{font-size:16px}.controls button{padding:10px}.reading{padding:12px}}
      </style>
      <ha-card aria-busy="${this._busy}">
        <header><span class="icon"><ha-icon icon="mdi:air-purifier"></ha-icon></span><div class="heading"><h3>${this._escape(this._config.name || "Air purifier")}</h3><span class="status" role="status">${this._busy ? "Sending command…" : status}</span></div><button data-action="power" aria-label="${available ? `Turn purifier ${running ? "off" : "on"}` : "Purifier unavailable"}" aria-pressed="${running}" ${disabled ? "disabled" : ""}>${!available ? "Unavailable" : running ? "On" : "Off"}</button></header>
        <div class="readings" aria-label="Office indoor particulate readings">${this._reading("pm25", "Indoor PM2.5")}${this._reading("pm10", "Indoor PM10")}</div>
        <div class="freshness"><span>Device: ${available ? "Available" : "Unavailable"} · ${this._freshness("fan")}</span><span>PM2.5: ${this._freshness("pm25")}</span><span>PM10: ${this._freshness("pm10")}</span></div>
        <p class="hint">HA timestamps are not a guarantee of a new physical measurement.</p>
        ${this._historyUpdated ? `<p class="hint">History updated ${new Date(this._historyUpdated).toLocaleTimeString()} · refreshed every 5 minutes.</p>` : ""}
        <div class="trends">${this._chart("pm25","PM2.5")}${this._chart("pm10","PM10")}</div>
        ${this._historyError && this._historyUpdated ? `<p class="hint">History refresh failed; showing cached data from ${new Date(this._historyUpdated).toLocaleTimeString()}.</p>` : ""}
        <div class="controls">
          <button data-mode="Auto" aria-pressed="${running && auto}" ${disabled || !running || !modes.includes("Auto") ? "disabled" : ""}>Auto</button>
          <button data-mode="Normal" aria-pressed="${running && mode === "Normal"}" ${disabled || !running || !modes.includes("Normal") ? "disabled" : ""}>Manual</button>
          <button data-action="night" aria-pressed="${night}" ${this._busy || !this._available("night") ? "disabled" : ""}>Night ${!this._available("night") ? "unavailable" : night ? "on" : "off"}</button>
        </div>
        <label class="speed">Fan speed<select aria-label="Purifier fan speed" ${disabled || !running || auto ? "disabled" : ""}>
          <option value="" ${speed === null || auto || !running ? "selected" : ""} disabled>${auto && running ? "Automatic" : !running ? "Off" : "Not reported"}</option>
          ${Array.from({length:10}, (_,i) => `<option value="${(i+1)*10}" ${!auto && running && speed===i+1 ? "selected" : ""}>${i+1} / 10</option>`).join("")}
        </select></label>
        <p class="hint">${auto ? "Choose Manual to set a fixed speed." : "Manual is Dyson’s Normal mode."} Indoor particulate readings are concentrations, not outdoor AQI.</p>
        <div class="timer"><label>Sleep timer (minutes)<input data-timer-minutes aria-label="Sleep timer minutes" type="number" min="0" max="540" step="1" value="${this._escape(this._timerMinutes)}" ${disabled ? "disabled" : ""}></label><button data-action="timer" ${disabled ? "disabled" : ""}>Set timer</button><button data-action="cancel-timer" ${disabled ? "disabled" : ""}>Cancel timer</button></div>
        <p class="hint">0–540 minutes; 0 cancels. The device does not report remaining time to Home Assistant.</p>
        <button class="monitoring" data-action="monitoring" aria-pressed="${monitoring}" ${this._busy || !this._available("monitoring") ? "disabled" : ""}>Continuous monitoring ${!this._available("monitoring") ? "unavailable" : monitoring ? "on" : "off"}</button>
        <p class="hint">Keeps monitoring air while the purifier is in standby.</p>
        ${this._notice ? `<p class="notice" role="status">${this._escape(this._notice)}</p>` : ""}
        <details ${this._detailsOpen ? "open" : ""}><summary>Filter details</summary><div class="filter"><span>Electrostatic filter</span><strong>${filter("hepa")}</strong></div><div class="filter"><span>Carbon filter</span><strong>${filter("carbon")}</strong></div></details>
        ${this._error ? `<div class="error" role="alert">${this._escape(this._error)}</div>` : ""}
      </ha-card>`;
    this.shadowRoot.querySelector('[data-action="power"]').onclick = () => this._call("fan", running ? "turn_off" : "turn_on", "fan");
    this.shadowRoot.querySelectorAll("[data-mode]").forEach(button => button.onclick = () => this._call("fan", "set_preset_mode", "fan", {preset_mode:button.dataset.mode}));
    this.shadowRoot.querySelector('[data-action="night"]').onclick = () => this._call("switch", night ? "turn_off" : "turn_on", "night");
    this.shadowRoot.querySelector("select").onchange = event => {
      const percentage = Number(event.target.value);
      if (!auto && running && percentage >= 10 && percentage <= 100) this._call("fan", "set_percentage", "fan", {percentage});
    };
    this.shadowRoot.querySelector('[data-action="monitoring"]').onclick = () => this._call("switch",monitoring ? "turn_off" : "turn_on","monitoring");
    const timerInput=this.shadowRoot.querySelector("[data-timer-minutes]");
    timerInput.oninput=()=>{this._timerMinutes=timerInput.value;};
    this.shadowRoot.querySelector('[data-action="timer"]').onclick=()=>{
      if (!timerInput.reportValidity() || !timerInput.value.trim()) return;
      const timer=Number(timerInput.value);
      if (!Number.isInteger(timer) || timer<0 || timer>540) return;
      this._call("dyson_local","set_timer","fan",{timer},timer ? `Requested a ${timer}-minute sleep timer. Remaining time is not reported.` : "Requested timer cancellation.");
    };
    this.shadowRoot.querySelector('[data-action="cancel-timer"]').onclick=()=>this._call("dyson_local","set_timer","fan",{timer:0},"Requested timer cancellation.");
    const refreshOnBlur = event => {
      this._focusKey = null;
      // Keep the clicked action in the DOM until its click handler receives the event.
      if (event.relatedTarget?.tagName === "BUTTON" && this.shadowRoot.contains(event.relatedTarget)) return;
      if (this._pendingRender) { this._pendingRender = false; this._render(); }
    };
    this.shadowRoot.onclick=()=>{if(this._pendingRender)this._refreshView();};
    timerInput.onblur=refreshOnBlur;
    this.shadowRoot.querySelector("select").onblur=refreshOnBlur;
    const restore = this._focusKey && this.shadowRoot.querySelector(this._focusKey);
    if (restore && !restore.disabled) restore.focus({preventScroll:true});
    this.shadowRoot.querySelector("details").ontoggle = event => {this._detailsOpen = event.target.open;};
  }
}
customElements.define("family-purifier-card", FamilyPurifierCard);
window.customCards = window.customCards || [];
window.customCards.push({type:"family-purifier-card",name:"Family Air Purifier",description:"Indoor air and native purifier controls."});
