class FamilyAnnouncementCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = null;
    this._hass = null;
    this._draft = "";
    this._draftExpires = false;
    this._draftUntil = "";
    this._dirty = false;
    this._pending = null;
    this._busy = false;
    this._error = "";
  }

  setConfig(config) {
    if (!config.entity || !config.expires_entity || !config.until_entity) {
      throw new Error("Announcements require message, expiry, and end-time entities");
    }
    this._config = config;
    this._build();
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._config || !this.shadowRoot.querySelector("ha-card")) return;

    const current = this._currentMessage();
    const expires = this._currentExpires();
    const until = this._currentUntil();
    if (
      this._pending
      && current === this._pending.message
      && expires === this._pending.expires
      && (!expires || until === this._pending.until)
    ) {
      this._pending = null;
      this._dirty = false;
    }
    if (!this._dirty && !this._pending) this._syncDraft();
    this._update();
  }

  getCardSize() {
    return 5;
  }

  _build() {
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        ha-card {
          position: relative;
          overflow: hidden;
          padding: 18px;
          border: 1px solid rgba(var(--rgb-primary-text-color), 0.06);
          border-radius: 24px;
          background: var(--contrast2, var(--ha-card-background));
          box-shadow: none;
          color: var(--primary-text-color);
        }
        .header { display: flex; align-items: center; gap: 12px; }
        .icon {
          display: grid;
          width: 38px;
          height: 38px;
          flex: 0 0 38px;
          place-items: center;
          border-radius: 14px;
          background: var(--contrast4, rgba(var(--rgb-primary-text-color), 0.08));
          color: var(--pink, var(--primary-color));
        }
        .icon ha-icon { width: 20px; }
        .heading { min-width: 0; flex: 1; }
        .eyebrow {
          margin-bottom: 2px;
          color: var(--contrast9, var(--secondary-text-color));
          font-size: 10px;
          font-weight: 650;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        h2 { margin: 0; font-size: 18px; font-weight: 680; letter-spacing: -0.02em; }
        .status {
          padding: 5px 9px;
          border-radius: 999px;
          background: var(--contrast4, rgba(var(--rgb-primary-text-color), 0.08));
          color: var(--contrast11, var(--secondary-text-color));
          font-size: 10px;
          font-weight: 650;
          white-space: nowrap;
        }
        .status.live { background: color-mix(in srgb, var(--green) 18%, transparent); color: var(--green); }
        .current {
          margin: 15px 0 12px;
          padding: 13px 14px;
          border-left: 3px solid var(--pink, var(--primary-color));
          border-radius: 4px 15px 15px 4px;
          background: var(--contrast3, rgba(var(--rgb-primary-text-color), 0.04));
        }
        .current-message {
          color: var(--contrast20, var(--primary-text-color));
          font-size: 14px;
          font-weight: 590;
          line-height: 1.42;
          overflow-wrap: anywhere;
        }
        .current-message.empty { color: var(--contrast10, var(--secondary-text-color)); font-weight: 500; }
        .current-meta { margin-top: 5px; color: var(--contrast9, var(--secondary-text-color)); font-size: 10px; }
        label.field-label {
          display: block;
          margin: 0 0 7px 2px;
          color: var(--contrast11, var(--secondary-text-color));
          font-size: 11px;
          font-weight: 620;
        }
        textarea, input[type="datetime-local"] {
          box-sizing: border-box;
          width: 100%;
          border: 1px solid var(--contrast5, rgba(var(--rgb-primary-text-color), 0.12));
          border-radius: 15px;
          outline: none;
          background: var(--contrast1, var(--primary-background-color));
          color: var(--contrast20, var(--primary-text-color));
          font: inherit;
          transition: border-color 140ms ease, box-shadow 140ms ease;
        }
        textarea {
          min-height: 72px;
          padding: 12px 13px;
          resize: vertical;
          font-size: 13px;
          line-height: 1.42;
        }
        textarea::placeholder { color: var(--contrast8, var(--secondary-text-color)); }
        textarea:focus, input[type="datetime-local"]:focus {
          border-color: var(--pink, var(--primary-color));
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--pink, var(--primary-color)) 16%, transparent);
        }
        .field-meta {
          display: flex;
          justify-content: space-between;
          margin: 6px 2px 13px;
          color: var(--contrast8, var(--secondary-text-color));
          font-size: 10px;
        }
        .expiry-label { margin: 0 0 7px 2px; color: var(--contrast11, var(--secondary-text-color)); font-size: 11px; font-weight: 620; }
        .expiry-choice {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5px;
          padding: 4px;
          border-radius: 14px;
          background: var(--contrast3, rgba(var(--rgb-primary-text-color), 0.04));
        }
        .choice {
          min-height: 34px;
          border: 0;
          border-radius: 11px;
          background: transparent;
          color: var(--contrast10, var(--secondary-text-color));
          font: inherit;
          font-size: 11px;
          font-weight: 620;
          cursor: pointer;
        }
        .choice.active { background: var(--contrast5, rgba(var(--rgb-primary-text-color), 0.1)); color: var(--contrast20, var(--primary-text-color)); }
        .until { margin-top: 9px; }
        .until.hidden { display: none; }
        input[type="datetime-local"] { height: 42px; padding: 0 11px; color-scheme: dark; font-size: 12px; }
        .actions { display: flex; align-items: center; gap: 8px; margin-top: 14px; }
        button.action {
          display: inline-flex;
          min-height: 40px;
          align-items: center;
          justify-content: center;
          gap: 7px;
          border: 0;
          border-radius: 14px;
          padding: 0 15px;
          font: inherit;
          font-size: 12px;
          font-weight: 680;
          cursor: pointer;
          transition: transform 120ms ease, opacity 120ms ease;
        }
        button.action:active:not(:disabled) { transform: scale(0.98); }
        button.action:focus-visible, .choice:focus-visible { outline: 2px solid var(--pink, var(--primary-color)); outline-offset: 2px; }
        button.action:disabled { cursor: default; opacity: 0.38; }
        .publish { flex: 1; background: var(--pink, var(--primary-color)); color: var(--black, #09090b); }
        .clear { background: var(--contrast4, rgba(var(--rgb-primary-text-color), 0.08)); color: var(--contrast12, var(--secondary-text-color)); }
        button.action ha-icon { width: 17px; }
        .error { min-height: 0; margin-top: 0; color: var(--red, var(--error-color)); font-size: 11px; }
        .error.visible { min-height: 16px; margin-top: 8px; }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
      </style>
      <ha-card>
        <div class="header">
          <div class="icon"><ha-icon icon="mdi:bullhorn-outline"></ha-icon></div>
          <div class="heading"><div class="eyebrow">Shared with everyone</div><h2></h2></div>
          <div class="status"></div>
        </div>
        <div class="current">
          <div class="current-message"></div>
          <div class="current-meta"></div>
        </div>
        <label class="field-label" for="announcement">Write an announcement</label>
        <textarea id="announcement" rows="3" placeholder="Dinner is at 8, plumber arriving at 11…"></textarea>
        <div class="field-meta"><span>Ctrl + Enter to publish</span><span class="counter"></span></div>
        <div class="expiry-label">Keep visible</div>
        <div class="expiry-choice" role="group" aria-label="Announcement duration">
          <button type="button" class="choice until-cleared">Until cleared</button>
          <button type="button" class="choice choose-time">Choose end time</button>
        </div>
        <div class="until hidden"><input type="datetime-local" aria-label="Announcement end time"></div>
        <div class="actions">
          <button type="button" class="action clear"><ha-icon icon="mdi:close"></ha-icon>Clear</button>
          <button type="button" class="action publish"><ha-icon icon="mdi:send"></ha-icon>Publish</button>
        </div>
        <div class="error" role="alert"></div>
      </ha-card>
    `;

    this.shadowRoot.querySelector("h2").textContent = this._config.title || "Announcements";
    const textarea = this.shadowRoot.querySelector("textarea");
    textarea.addEventListener("input", (event) => {
      this._draft = event.target.value;
      this._dirty = true;
      this._error = "";
      this._update();
    });
    textarea.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        this._publish();
      }
    });
    this.shadowRoot.querySelector(".until-cleared").addEventListener("click", () => this._setExpiry(false));
    this.shadowRoot.querySelector(".choose-time").addEventListener("click", () => this._setExpiry(true));
    this.shadowRoot.querySelector("input[type='datetime-local']").addEventListener("input", (event) => {
      this._draftUntil = event.target.value;
      this._dirty = true;
      this._error = "";
      this._update();
    });
    this.shadowRoot.querySelector(".publish").addEventListener("click", () => this._publish());
    this.shadowRoot.querySelector(".clear").addEventListener("click", () => this._clear());
    this._update();
  }

  _entity(entityId) {
    return this._hass?.states?.[entityId];
  }

  _currentMessage() {
    const state = this._entity(this._config.entity)?.state;
    return !state || ["unknown", "unavailable"].includes(state) ? "" : state.trim();
  }

  _currentExpires() {
    return this._entity(this._config.expires_entity)?.state === "on";
  }

  _currentUntil() {
    const state = this._entity(this._config.until_entity)?.state;
    return !state || ["unknown", "unavailable"].includes(state) ? "" : state.slice(0, 16).replace(" ", "T");
  }

  _defaultUntil() {
    const date = new Date(Date.now() + 24 * 60 * 60 * 1000);
    date.setMinutes(date.getMinutes() < 30 ? 30 : 0, 0, 0);
    if (date.getMinutes() === 0) date.setHours(date.getHours() + 1);
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 16);
  }

  _syncDraft() {
    this._draft = this._currentMessage();
    this._draftExpires = this._currentExpires();
    this._draftUntil = this._currentUntil() || this._defaultUntil();
  }

  _setExpiry(expires) {
    this._draftExpires = expires;
    if (expires && !this._draftUntil) this._draftUntil = this._defaultUntil();
    this._dirty = true;
    this._error = "";
    this._update();
  }

  _formatUntil(value) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleString([], { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });
  }

  _update() {
    if (!this._config || !this.shadowRoot.querySelector("ha-card")) return;
    const message = this._currentMessage();
    const expires = this._currentExpires();
    const until = this._currentUntil();
    const deadline = until ? new Date(until) : null;
    const expired = Boolean(message && expires && deadline && deadline.getTime() <= Date.now());
    const live = Boolean(message && !expired);

    const status = this.shadowRoot.querySelector(".status");
    status.textContent = live ? "Live" : expired ? "Expired" : "Nothing posted";
    status.classList.toggle("live", live);
    const current = this.shadowRoot.querySelector(".current-message");
    current.textContent = message || "Nothing posted. Leave a short update for everyone at home.";
    current.classList.toggle("empty", !message);
    const meta = this.shadowRoot.querySelector(".current-meta");
    meta.textContent = live
      ? expires ? `Visible until ${this._formatUntil(until)}` : "Visible until someone clears it"
      : expired ? `Ended ${this._formatUntil(until)}` : "Announcements also appear in the greeting";

    const textarea = this.shadowRoot.querySelector("textarea");
    if (textarea.value !== this._draft) textarea.value = this._draft;
    textarea.maxLength = this._entity(this._config.entity)?.attributes?.max || 180;
    this.shadowRoot.querySelector(".counter").textContent = `${this._draft.length}/${textarea.maxLength}`;

    this.shadowRoot.querySelector(".until-cleared").classList.toggle("active", !this._draftExpires);
    this.shadowRoot.querySelector(".choose-time").classList.toggle("active", this._draftExpires);
    const untilWrap = this.shadowRoot.querySelector(".until");
    untilWrap.classList.toggle("hidden", !this._draftExpires);
    const untilInput = untilWrap.querySelector("input");
    if (untilInput.value !== this._draftUntil) untilInput.value = this._draftUntil;

    const unchanged = this._draft.trim() === message
      && this._draftExpires === expires
      && (!this._draftExpires || this._draftUntil === until);
    this.shadowRoot.querySelector(".publish").disabled = this._busy || !this._draft.trim() || unchanged;
    this.shadowRoot.querySelector(".clear").disabled = this._busy || !message;
    const error = this.shadowRoot.querySelector(".error");
    error.textContent = this._error;
    error.classList.toggle("visible", Boolean(this._error));
  }

  async _publish() {
    const message = this._draft.trim();
    if (!message || this._busy) return;
    if (this._draftExpires && !this._draftUntil) {
      this._error = "Choose when this announcement should end.";
      this._update();
      return;
    }
    this._busy = true;
    this._error = "";
    this._pending = { message, expires: this._draftExpires, until: this._draftUntil };
    this._update();
    try {
      await this._hass.callService("input_text", "set_value", {
        entity_id: this._config.entity,
        value: message,
      });
      if (this._draftExpires) {
        await this._hass.callService("input_datetime", "set_datetime", {
          entity_id: this._config.until_entity,
          datetime: `${this._draftUntil.replace("T", " ")}:00`,
        });
        await this._hass.callService("input_boolean", "turn_on", { entity_id: this._config.expires_entity });
      } else {
        await this._hass.callService("input_boolean", "turn_off", { entity_id: this._config.expires_entity });
      }
    } catch (error) {
      this._pending = null;
      this._error = "Could not publish. Check the connection and try again.";
    } finally {
      this._busy = false;
      this._update();
    }
  }

  async _clear() {
    if (this._busy || !this._currentMessage()) return;
    this._busy = true;
    this._error = "";
    this._pending = { message: "", expires: false, until: this._currentUntil() };
    this._update();
    try {
      await this._hass.callService("input_text", "set_value", { entity_id: this._config.entity, value: "" });
      await this._hass.callService("input_boolean", "turn_off", { entity_id: this._config.expires_entity });
      this._draft = "";
      this._draftExpires = false;
    } catch (error) {
      this._pending = null;
      this._error = "Could not clear the announcement. Try again.";
    } finally {
      this._busy = false;
      this._update();
    }
  }
}

customElements.define("family-announcement-card", FamilyAnnouncementCard);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "family-announcement-card",
  name: "Family Announcements",
  description: "Publish and clear a shared family announcement without entity dialogs.",
});
