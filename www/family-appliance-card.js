class FamilyApplianceCard extends HTMLElement {
  constructor() { super(); this.attachShadow({mode:"open"}); this._fingerprint=""; }
  setConfig(config) { if (!config.module) throw new Error("Family appliance card requires module"); this._config=config; this._render(); }
  set hass(hass) {
    this._hass=hass;
    const fingerprint=Object.values(this._config.module.entities||{}).map((id)=>`${id}:${hass.states[id]?.state}:${hass.states[id]?.last_updated}`).join("|");
    if(fingerprint!==this._fingerprint){this._fingerprint=fingerprint;this._render();}
  }
  getCardSize(){return 4;}
  _escape(value){return String(value??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");}
  _state(key){const id=this._config.module.entities?.[key];return id?this._hass?.states[id]:null;}
  _valid(state){return state && !["unknown","unavailable","none",""] .includes(String(state.state).toLowerCase());}
  _format(value){return String(value??"").replaceAll("_"," ").replace(/\b\w/g,(letter)=>letter.toUpperCase());}
  _programLabel(value){const parts=String(value||"").split("_");const marker=parts.lastIndexOf("program");const useful=(marker>=0?parts.slice(marker+1):parts).map((part)=>/^\d+$/.test(part)?`${part}°C`:this._format(part));return useful.join(" ")||"Program";}
  _running(){const value=String(this._state("operation")?.state||"").toLowerCase();return !["","ready","inactive","off","unknown","unavailable","finished","complete","completed"].includes(value);}
  _canStart(){return this._state("connectivity")?.state==="on"&&this._state("remote_control")?.state==="on"&&this._state("remote_start")?.state==="on"&&String(this._state("door")?.state).toLowerCase()==="closed"&&this._valid(this._state("selected_program"));}
  async _call(domain,service,data={},target){await this._hass.callService(domain,service,data,target);}

  _status() {
    const module=this._config.module;
    const primary=this._state(module.kind==="washer"?"status":"operation");
    if(!this._valid(primary)) return {label:"Unavailable",detail:"Turn on the appliance to see its status",tone:"muted"};
    const value=String(primary.state).toLowerCase();
    if(["finished","complete","completed","end"].includes(value)) return {label:"Ready",detail:module.kind==="washer"?"Laundry is ready":"Dishes are ready",tone:"ready"};
    if(["error","fault","aborting"].includes(value)) return {label:"Needs attention",detail:this._format(primary.state),tone:"warning"};
    const remaining=this._state("remaining");
    const progress=this._state("progress");
    let detail="Ready when you are";
    if(this._running()&&this._valid(remaining)) detail=`${remaining.state} remaining`;
    else if(this._running()&&this._valid(progress)) detail=`${progress.state}${progress.attributes.unit_of_measurement||""} complete`;
    return {label:this._format(primary.state),detail,tone:this._running()?"active":"quiet"};
  }

  _render(){
    if(!this._config)return;
    const module=this._config.module,status=this._status(),dishwasher=module.kind==="dishwasher",running=this._running();
    const progress=this._state("progress");
    const progressValue=this._valid(progress)?Math.max(0,Math.min(100,Number(progress.state))):0;
    const warnings=[];
    if(this._state("salt")?.state==="on") warnings.push("Refill salt");
    if(this._state("rinse_aid")?.state==="on") warnings.push("Refill rinse aid");
    const selected=this._state("selected_program");
    const options=selected?.attributes?.options||[];
    this.shadowRoot.innerHTML=`<style>
      :host{display:block;min-width:0;font-family:var(--secondary-font-family);color:var(--primary-text-color)}*{box-sizing:border-box}ha-card{display:block;height:100%;padding:18px;border:1px solid rgba(var(--rgb-primary-text-color),.07);border-radius:24px;background:var(--contrast2,var(--ha-card-background));box-shadow:none}
      .head{display:flex;align-items:center;gap:12px}.icon{display:grid;width:44px;height:44px;place-items:center;border-radius:15px;background:var(--contrast3);color:var(--room-accent,var(--orange))}.icon ha-icon{width:23px;height:23px}.copy{min-width:0;flex:1}.name{display:block;font-family:var(--primary-font-family);font-size:17px;font-weight:730}.state{display:block;margin-top:2px;color:var(--contrast9);font-size:12px}.pill{padding:6px 9px;border-radius:999px;background:var(--contrast3);color:var(--contrast11);font-size:11px;font-weight:700}.pill.active,.pill.ready{color:var(--teal)}.pill.warning{color:var(--orange)}
      .detail{margin:16px 0 0;color:var(--contrast11);font-size:14px}.progress{height:5px;margin-top:12px;overflow:hidden;border-radius:99px;background:var(--contrast3)}.progress span{display:block;height:100%;border-radius:inherit;background:var(--room-accent,var(--teal))}.warnings{display:flex;flex-wrap:wrap;gap:7px;margin-top:12px}.warning{padding:7px 9px;border-radius:10px;background:color-mix(in srgb,var(--orange) 14%,var(--contrast3));color:var(--orange);font-size:12px;font-weight:650}
      details{margin-top:14px;border-top:1px solid var(--contrast4);padding-top:12px}summary{min-height:44px;display:flex;align-items:center;gap:8px;cursor:pointer;color:var(--contrast11);font-size:13px;font-weight:650;list-style:none}summary::-webkit-details-marker{display:none}.controls{display:grid;gap:10px;padding-top:8px}.field{display:grid;gap:6px;color:var(--contrast9);font-size:12px}select,button{min-height:48px;border:1px solid var(--contrast5);border-radius:14px;background:var(--contrast3);color:var(--primary-text-color);font:inherit}select{width:100%;padding:0 12px}button{padding:0 16px;font-weight:700;cursor:pointer}button.primary{border-color:color-mix(in srgb,var(--room-accent,var(--teal)) 55%,var(--contrast5));background:color-mix(in srgb,var(--room-accent,var(--teal)) 18%,var(--contrast3));color:var(--room-accent,var(--teal))}button.danger{color:var(--orange)}button:disabled{cursor:not-allowed;opacity:.42}.actions{display:grid;grid-template-columns:1fr 1fr;gap:10px}.hint{color:var(--contrast8);font-size:11px;line-height:1.4}
      @media(max-width:639px){ha-card{padding:14px;border-radius:20px}.actions{grid-template-columns:1fr}.name{font-size:16px}}
    </style><ha-card><div class="head"><span class="icon"><ha-icon icon="${this._escape(module.icon)}"></ha-icon></span><span class="copy"><strong class="name">${this._escape(module.name)}</strong><small class="state">${this._escape(status.detail)}</small></span><span class="pill ${status.tone}">${this._escape(status.label)}</span></div>${progressValue?`<div class="progress" aria-label="${progressValue}% complete"><span style="width:${progressValue}%"></span></div>`:""}${warnings.length?`<div class="warnings">${warnings.map((item)=>`<span class="warning">${item}</span>`).join("")}</div>`:""}${dishwasher?`<details><summary><ha-icon icon="mdi:tune-variant"></ha-icon> Programs and controls</summary><div class="controls"><label class="field">Program<select data-action="program" ${running?"disabled":""}>${options.map((option)=>`<option value="${this._escape(option)}" ${option===selected?.state?"selected":""}>${this._escape(this._format(option.split("_").at(-1)))}</option>`).join("")}</select></label><label class="field">Start<select data-action="delay" ${running?"disabled":""}><option value="0">Now</option><option value="3600">In 1 hour</option><option value="7200">In 2 hours</option><option value="14400">In 4 hours</option></select></label><div class="actions">${running?'<button class="danger" data-action="stop">Stop program</button>':`<button class="primary" data-action="start" ${this._canStart()?"":"disabled"}>Start program</button>`}<button data-action="power">Power ${this._state("power")?.state==="on"?"off":"on"}</button></div>${!running&&!this._canStart()?'<div class="hint">Close the door and enable remote start on the dishwasher before starting.</div>':""}</div></details>`:""}</ha-card>`;
    this.shadowRoot.querySelectorAll('[data-action="program"] option').forEach((option)=>{option.textContent=this._programLabel(option.value);});
    this.shadowRoot.querySelector('[data-action="program"]')?.addEventListener("change",(event)=>this._call("select","select_option",{option:event.target.value},{entity_id:module.entities.selected_program}));
    this.shadowRoot.querySelector('[data-action="start"]')?.addEventListener("click",async()=>{const delay=Number(this.shadowRoot.querySelector('[data-action="delay"]')?.value||0);const label=delay?`in ${delay/3600} hour${delay===3600?"":"s"}`:"now";if(!window.confirm(`Start ${module.name.toLowerCase()} ${label}?`))return;await this._call("home_connect","start_selected_program",{device_id:module.device_id,b_s_h_common_option_start_in_relative:delay});});
    this.shadowRoot.querySelector('[data-action="stop"]')?.addEventListener("click",async()=>{if(window.confirm(`Stop the ${module.name.toLowerCase()}?`))await this._call("button","press",{}, {entity_id:module.entities.stop});});
    this.shadowRoot.querySelector('[data-action="power"]')?.addEventListener("click",()=>this._call("switch",this._state("power")?.state==="on"?"turn_off":"turn_on",{}, {entity_id:module.entities.power}));
  }
}
customElements.define("family-appliance-card",FamilyApplianceCard);
window.customCards=window.customCards||[];window.customCards.push({type:"family-appliance-card",name:"Family Appliance Card",description:"Safe family controls and clear appliance progress."});
