class FamilyCameraSpeakerCard extends HTMLElement {
  setConfig(config) {
    if (!config.camera_key || !config.speaker) throw new Error("Camera speaker configuration is incomplete");
    this.config = config;
    this.attachShadow({ mode: "open" });
  }

  set hass(hass) {
    this._hass = hass;
    const speaker = hass.states[this.config.speaker];
    const signature = speaker && !["unknown", "unavailable"].includes(speaker.state)
      ? "available" : "unavailable";
    if (signature === this._signature) return;
    this._signature = signature;
    this._render();
  }

  _render() {
    if (!this._hass) return;
    const speaker = this._hass.states[this.config.speaker];
    const available = speaker && !["unknown", "unavailable"].includes(speaker.state);
    this.shadowRoot.innerHTML = `
      <style>
        ha-card { padding:18px; border-radius:24px; background:var(--contrast2); }
        .head { display:grid; grid-template-columns:42px 1fr; gap:12px; align-items:center; }
        .icon { display:grid; place-items:center; width:42px; height:42px; border-radius:14px; background:var(--contrast4); color:${available ? "var(--pink)" : "var(--contrast8)"}; }
        .icon ha-icon { width:22px; height:22px; }
        h3 { margin:0; font-size:16px; } p { margin:3px 0 0; color:var(--contrast9); font-size:11px; }
        .compose { display:grid; grid-template-columns:1fr auto; gap:9px; margin-top:14px; }
        input { min-width:0; height:44px; padding:0 14px; border:1px solid var(--contrast5); border-radius:14px; color:var(--contrast18); background:var(--contrast1); font:inherit; }
        button { min-height:44px; border:0; border-radius:14px; padding:0 16px; color:var(--black); background:var(--pink); font-weight:750; cursor:pointer; }
        button:disabled { cursor:not-allowed; color:var(--contrast8); background:var(--contrast4); }
        .suggestions { display:flex; flex-wrap:wrap; gap:7px; margin-top:10px; }
        .suggestions button { min-height:44px; padding:0 12px; color:var(--contrast12); background:var(--contrast3); font-size:11px; font-weight:600; }
        .status { min-height:16px; margin-top:8px; color:var(--contrast9); font-size:11px; }
        @media (max-width:520px) { .compose { grid-template-columns:1fr; } }
      </style>
      <ha-card>
        <div class="head"><div class="icon"><ha-icon icon="mdi:account-voice"></ha-icon></div><div><h3>${this.config.name || "Camera speaker"}</h3><p>${available ? "Type a message, then send it to the room." : "Speaker is unavailable."}</p></div></div>
        <div class="compose"><input maxlength="180" aria-label="Announcement" placeholder="Write a short announcement" ${available ? "" : "disabled"}><button class="send" ${available ? "" : "disabled"}>Send</button></div>
        <div class="suggestions">
          <button data-message="Please come here when you are free." ${available ? "" : "disabled"}>Please come here</button>
          <button data-message="Dinner is ready." ${available ? "" : "disabled"}>Dinner is ready</button>
          <button data-message="Can you hear me?" ${available ? "" : "disabled"}>Can you hear me?</button>
        </div>
        <div class="status" role="status"></div>
      </ha-card>`;
    const input = this.shadowRoot.querySelector("input");
    const status = this.shadowRoot.querySelector(".status");
    this.shadowRoot.querySelectorAll("button[data-message]").forEach((button) => button.addEventListener("click", () => {
      input.value = button.dataset.message;
      input.focus();
    }));
    const send = async () => {
      const message = input.value.trim();
      if (!message) { status.textContent = "Write a message first."; return; }
      this.shadowRoot.querySelector(".send").disabled = true;
      status.textContent = "Sending…";
      try {
        await this._hass.callService("family_camera_events", "announce", {
          camera_key: this.config.camera_key,
          message,
        });
        input.value = "";
        status.textContent = "Sent.";
      } catch (error) {
        status.textContent = error?.message || "Could not send the announcement.";
      } finally {
        this.shadowRoot.querySelector(".send").disabled = !available;
      }
    };
    this.shadowRoot.querySelector(".send").addEventListener("click", send);
    input.addEventListener("keydown", (event) => { if (event.key === "Enter") send(); });
  }

  getCardSize() { return 3; }
  getGridOptions() { return { columns: "full", rows: "auto" }; }
}

customElements.define("family-camera-speaker-card", FamilyCameraSpeakerCard);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "family-camera-speaker-card",
  name: "Family Camera Speaker",
  description: "Backend-authorized text announcements through a Protect camera speaker.",
});
