class FamilyRoomsCard extends HTMLElement {
  constructor(){super();this.attachShadow({mode:"open"});this._manifest=null;this._cards=[];this._loadPromise=null;this._renderToken=0;this._routeHandler=()=>this._render();}
  setConfig(config){this._config=config;this._load();}
  set hass(hass){this._hass=hass;for(const card of this._cards)card.hass=hass;}
  connectedCallback(){window.addEventListener("location-changed",this._routeHandler);window.addEventListener("popstate",this._routeHandler);if(!this._manifest)this._load();}
  disconnectedCallback(){window.removeEventListener("location-changed",this._routeHandler);window.removeEventListener("popstate",this._routeHandler);}
  getCardSize(){return 12;}
  _escape(value){return String(value??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");}
  async _load(){
    if(this._loadPromise)return this._loadPromise;
    this._loadPromise=(async()=>{try{const response=await fetch(this._config?.manifest_url||"/local/generated/family-rooms.json",{cache:"no-store"});if(!response.ok)throw new Error(`HTTP ${response.status}`);this._manifest=await response.json();await this._render();}
    catch(error){this.shadowRoot.innerHTML=`<ha-card><div style="padding:24px">Rooms are still loading. ${this._escape(error.message)}</div></ha-card>`;}
    finally{this._loadPromise=null;}})();
    return this._loadPromise;
  }
  _slug(){const base=this._manifest?.base_path||"/home-tablet/rooms";const path=window.location.pathname.replace(/\/$/,"");if(!path.startsWith(base))return null;return path.slice(base.length).replace(/^\//,"").split("/")[0]||null;}
  _profile(){return this._manifest?.profiles?.[this._hass?.user?.id]||null;}
  _occupants(room){if(room.occupants?.includes("shared"))return ["Shared room"];return (room.occupants||[]).map((username)=>this._manifest.occupant_names?.[username]||username).map((name)=>`Primary: ${name}`);}
  async _makeCards(configs){const helpers=await window.loadCardHelpers();const cards=configs.map((config)=>helpers.createCardElement(config));if(this._hass)cards.forEach((card)=>card.hass=this._hass);this._cards=cards;return cards;}
  _moduleConfig(module){
    if(module.pending||module.optional&&(module.players||[]).length===0)return null;
    if(module.type==="fans")return {type:"custom:family-fan-card",name:module.name,embedded:true,fans:module.fans};
    if(module.type==="media")return {type:"custom:family-media-card",module};
    if(module.type==="appliance")return {type:"custom:family-appliance-card",module};
    if(module.type==="camera")return {type:"picture-entity",entity:module.preview_entity||module.entity,name:module.name,camera_view:"live",show_state:false,show_name:true,tap_action:{action:"navigate",navigation_path:module.url||"/home-tablet/security"},hold_action:{action:"more-info",entity:module.entity}};
    return null;
  }
  _styles(){return `<style>
    :host{display:block;min-width:0;color:var(--primary-text-color);font-family:var(--secondary-font-family)}*{box-sizing:border-box}.shell{display:grid;gap:24px}.hero{display:flex;align-items:end;justify-content:space-between;gap:16px;padding:4px 4px 0}.hero h1{margin:0;font-family:var(--primary-font-family);font-size:40px;letter-spacing:-1.3px}.hero p{margin:7px 0 0;color:var(--contrast10);font-size:15px}.count{color:var(--contrast9);font-size:13px;font-weight:650}.section{display:grid;gap:12px}.section-title{display:flex;align-items:center;gap:8px;margin:0 3px;color:var(--contrast12);font-family:var(--primary-font-family);font-size:15px;font-weight:700}.section-title ha-icon{width:18px;height:18px}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.detail{min-width:0}
    @media(max-width:1099px){.grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
    @media(max-width:639px){.shell{gap:18px}.hero{align-items:start}.hero h1{font-size:28px;letter-spacing:-.6px}.hero p{font-size:13px}.count{display:none}.grid{grid-template-columns:1fr;gap:10px}}
  </style>`;}
  async _render(){
    if(!this._manifest)return;
    const token=++this._renderToken;
    const slug=this._slug(),room=slug?this._manifest.rooms.find((item)=>item.slug===slug):null;
    if(slug&&!room){window.history.replaceState({},"",this._manifest.base_path);window.dispatchEvent(new Event("location-changed"));return;}
    this.shadowRoot.replaceChildren();const style=document.createElement("style");style.textContent=this._styles().replace(/^<style>|<\/style>$/g,"");this.shadowRoot.append(style);
    if(room){
      const configs=(room.modules||[]).map((module)=>this._moduleConfig(module)).filter(Boolean);
      const detail=await this._makeCards([{type:"custom:family-room-card",name:room.name,icon:room.icon,accent:`var(--${room.accent||"pink"})`,occupants:this._occupants(room),back_path:this._manifest.base_path,cards:configs}]);
      if(token!==this._renderToken)return;
      this._cards=detail;
      const container=document.createElement("div");container.className="detail";container.append(detail[0]);this.shadowRoot.append(container);return;
    }
    const profile=this._profile(),favourites=profile?.favourites||[];
    const favoriteRooms=favourites.map((key)=>this._manifest.rooms.find((room)=>room.slug===key)).filter(Boolean);
    const moreRooms=this._manifest.rooms.filter((room)=>!favourites.includes(room.slug));
    const shell=document.createElement("div");shell.className="shell";shell.innerHTML=`<header class="hero"><div><h1>Rooms</h1><p>Everything in the house, room by room.</p></div><span class="count">${this._manifest.rooms.length} rooms</span></header>`;
    const groups=profile&&favoriteRooms.length?[["Your rooms","mdi:star-outline",favoriteRooms],["More rooms","mdi:floor-plan",moreRooms]]:[["All rooms","mdi:floor-plan",this._manifest.rooms]];
    const allCards=[];
    for(const [title,icon,rooms] of groups){if(!rooms.length)continue;const section=document.createElement("section");section.className="section";section.innerHTML=`<h2 class="section-title"><ha-icon icon="${icon}"></ha-icon>${title}</h2><div class="grid"></div>`;const cards=await this._makeCards(rooms.map((room)=>({type:"custom:family-room-summary-card",room,occupants:this._occupants(room),base_path:this._manifest.base_path})));section.querySelector(".grid").append(...cards);allCards.push(...cards);shell.append(section);}
    if(token!==this._renderToken)return;
    this._cards=allCards;this.shadowRoot.append(shell);
  }
}
customElements.define("family-rooms-card",FamilyRoomsCard);window.customCards=window.customCards||[];window.customCards.push({type:"family-rooms-card",name:"Family Rooms",description:"Shared nested room navigation with personalized ordering."});
