class FamilyAnnouncementsCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = null;
    this._hass = null;
    this._draft = "";
    this._duration = "cleared";
    this._customUntil = "";
    this._busy = false;
    this._dismissing = new Set();
    this._error = "";
    this._clock = null;
    this._returnFocus = null;
  }

  setConfig(config) {
    if (!config.entity) throw new Error("Family announcements require an entity");
    this._config = config;
    this._build();
  }

  set hass(hass) {
    this._hass = hass;
    this._update();
  }

  connectedCallback() {
    if (!this._clock) this._clock = window.setInterval(() => this._update(), 60000);
  }

  disconnectedCallback() {
    if (this._clock) window.clearInterval(this._clock);
    this._clock = null;
  }

  getCardSize() {
    return Math.max(1, this._announcements().length + 1);
  }

  _build() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          color: var(--primary-text-color);
          font-family: var(--secondary-font-family, Inter, system-ui, sans-serif);
        }
        * { box-sizing: border-box; }
        button, textarea, input { font: inherit; }
        button { -webkit-tap-highlight-color: transparent; }
        button:focus-visible, textarea:focus-visible, input:focus-visible {
          outline: 2px solid var(--pink, var(--primary-color));
          outline-offset: 2px;
        }

        .bulletin {
          display: block;
          overflow: hidden;
          padding: 8px 18px 9px;
          border: 1px solid rgba(var(--rgb-primary-text-color), 0.055);
          border-radius: 24px;
          background: var(--contrast2, var(--ha-card-background));
          box-shadow: none;
          color: var(--primary-text-color);
        }
        .bulletin.empty { padding-block: 4px; }
        .bulletin.empty .bulletin-header { min-height: 42px; }
        .bulletin.empty .content { display: none; }
        .bulletin-header {
          display: flex;
          min-height: 50px;
          align-items: center;
          gap: 10px;
        }
        .heading {
          margin: 0;
          color: var(--contrast20, var(--primary-text-color));
          font-family: var(--primary-font-family, Inter, system-ui, sans-serif);
          font-size: 15px;
          font-weight: 680;
          letter-spacing: -0.015em;
        }
        .summary {
          flex: 1;
          color: var(--contrast8, var(--secondary-text-color));
          font-size: 11px;
          font-weight: 560;
        }
        .add {
          display: inline-flex;
          min-height: 44px;
          align-items: center;
          justify-content: center;
          gap: 6px;
          border: 0;
          border-radius: 12px;
          padding: 0 11px;
          background: var(--contrast4, rgba(var(--rgb-primary-text-color), 0.08));
          color: var(--contrast17, var(--primary-text-color));
          font-size: 11px;
          font-weight: 680;
          cursor: pointer;
          transition: background 140ms ease, color 140ms ease, transform 120ms ease;
        }
        .add:hover { background: var(--contrast5); color: var(--contrast20); }
        .add:active { transform: scale(0.98); }
        .add ha-icon { width: 15px; }

        .announcement-list { border-top: 1px solid var(--contrast4); }
        .announcement {
          display: grid;
          grid-template-columns: 38px minmax(0, 1fr) 44px;
          align-items: center;
          gap: 12px;
          min-height: 66px;
          padding: 9px 0;
        }
        .announcement + .announcement { border-top: 1px solid var(--contrast4); }
        .avatar {
          display: grid;
          width: 36px;
          height: 36px;
          place-items: center;
          border: 1px solid color-mix(in srgb, var(--avatar-color) 26%, transparent);
          border-radius: 13px;
          background: color-mix(in srgb, var(--avatar-color) 14%, var(--contrast3));
          color: var(--avatar-color);
          font-family: var(--primary-font-family, Inter, system-ui, sans-serif);
          font-size: 12px;
          font-weight: 760;
          letter-spacing: 0.02em;
        }
        .announcement-content { min-width: 0; }
        .message {
          color: var(--contrast20, var(--primary-text-color));
          font-size: 14px;
          font-weight: 610;
          line-height: 1.38;
          overflow-wrap: anywhere;
        }
        .meta {
          margin-top: 3px;
          color: var(--contrast9, var(--secondary-text-color));
          font-size: 10.5px;
          font-weight: 520;
          line-height: 1.35;
        }
        .remove {
          display: grid;
          width: 44px;
          height: 44px;
          place-items: center;
          border: 0;
          border-radius: 11px;
          background: transparent;
          color: var(--contrast8, var(--secondary-text-color));
          cursor: pointer;
          transition: background 140ms ease, color 140ms ease;
        }
        .remove:hover { background: var(--contrast4); color: var(--contrast18); }
        .remove:disabled { cursor: default; opacity: 0.32; }
        .remove ha-icon { width: 17px; }
        .remove-spacer { width: 44px; height: 44px; }
        dialog {
          width: min(520px, calc(100vw - 48px));
          max-height: calc(100vh - 48px);
          overflow: auto;
          margin: auto;
          border: 1px solid var(--contrast5);
          border-radius: 28px;
          padding: 0;
          background: var(--contrast2, var(--ha-card-background));
          box-shadow: 0 24px 90px rgba(0, 0, 0, 0.55);
          color: var(--primary-text-color);
        }
        dialog::backdrop {
          background: rgba(2, 4, 8, 0.76);
          backdrop-filter: blur(5px);
        }
        .dialog-shell { padding: 22px; }
        .dialog-header { display: flex; align-items: flex-start; gap: 14px; }
        .dialog-title { min-width: 0; flex: 1; }
        .dialog-title h2 {
          margin: 0;
          color: var(--contrast20);
          font-family: var(--primary-font-family, Inter, system-ui, sans-serif);
          font-size: 21px;
          font-weight: 720;
          letter-spacing: -0.025em;
        }
        .dialog-title p {
          margin: 5px 0 0;
          color: var(--contrast9);
          font-size: 11px;
          line-height: 1.45;
        }
        .dialog-close {
          display: grid;
          width: 44px;
          height: 44px;
          flex: 0 0 44px;
          place-items: center;
          border: 0;
          border-radius: 12px;
          background: var(--contrast4);
          color: var(--contrast11);
          cursor: pointer;
        }
        .dialog-close:hover { color: var(--contrast20); }
        .dialog-close ha-icon { width: 18px; }
        .field-label {
          display: block;
          margin: 20px 0 8px 2px;
          color: var(--contrast12, var(--secondary-text-color));
          font-size: 11px;
          font-weight: 650;
        }
        textarea, input[type="datetime-local"] {
          width: 100%;
          border: 1px solid var(--contrast5);
          outline: 0;
          background: var(--contrast1, var(--primary-background-color));
          color: var(--contrast20, var(--primary-text-color));
          transition: border-color 140ms ease, box-shadow 140ms ease;
        }
        textarea {
          min-height: 112px;
          padding: 14px 15px;
          resize: vertical;
          border-radius: 17px;
          font-size: 14px;
          line-height: 1.48;
        }
        textarea::placeholder { color: var(--contrast8); }
        textarea:focus, input[type="datetime-local"]:focus {
          border-color: var(--pink, var(--primary-color));
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--pink, var(--primary-color)) 14%, transparent);
        }
        .field-meta {
          display: flex;
          justify-content: space-between;
          margin: 6px 2px 0;
          color: var(--contrast8);
          font-size: 10px;
        }
        .durations { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; }
        .duration {
          min-height: 44px;
          border: 0;
          border-radius: 12px;
          padding: 0 8px;
          background: var(--contrast4);
          color: var(--contrast10);
          font-size: 11px;
          font-weight: 640;
          cursor: pointer;
        }
        .duration:hover { color: var(--contrast18); }
        .duration.active {
          background: color-mix(in srgb, var(--pink, var(--primary-color)) 18%, var(--contrast3));
          color: var(--pink, var(--primary-color));
        }
        .custom-time { display: none; margin-top: 9px; }
        .custom-time.visible { display: block; }
        input[type="datetime-local"] {
          height: 44px;
          padding: 0 12px;
          border-radius: 14px;
          color-scheme: dark;
          font-size: 12px;
        }
        .error { min-height: 0; color: var(--red, var(--error-color)); font-size: 11px; }
        .error.visible { min-height: 16px; margin-top: 10px; }
        .dialog-actions {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          margin-top: 18px;
        }
        .dialog-action {
          display: inline-flex;
          min-height: 44px;
          align-items: center;
          justify-content: center;
          gap: 7px;
          border: 0;
          border-radius: 14px;
          padding: 0 16px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }
        .cancel { background: var(--contrast4); color: var(--contrast12); }
        .publish { background: var(--pink, var(--primary-color)); color: var(--black, #09090b); }
        .publish:disabled { cursor: default; opacity: 0.38; }
        .publish ha-icon { width: 17px; }

        @media (max-width: 639px) {
          .bulletin { padding-inline: 14px; border-radius: 21px; }
          .bulletin.empty .bulletin-header { min-height: 50px; }
          .add { min-width: 72px; min-height: 44px; border-radius: 14px; font-size: 12px; }
          .announcement { grid-template-columns: 38px minmax(0,1fr) 44px; gap: 10px; }
          .remove { width: 44px; height: 44px; border-radius: 14px; }
          .remove-spacer { width: 44px; height: 44px; }
          dialog {
            width: 100vw;
            max-width: none;
            max-height: calc(100dvh - 12px);
            margin: auto 0 0;
            border-radius: 24px 24px 0 0;
          }
          .dialog-shell { padding: 20px 16px max(16px, env(safe-area-inset-bottom)); }
          .dialog-close { width: 44px; height: 44px; flex-basis: 44px; border-radius: 14px; }
          .durations { grid-template-columns: repeat(2, 1fr); gap: 8px; }
          .duration { min-height: 48px; border-radius: 14px; font-size: 12px; }
          .dialog-actions { display: grid; grid-template-columns: 1fr 1fr; }
          .dialog-action { min-height: 50px; }
        }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
      </style>
      <ha-card class="bulletin">
        <div class="bulletin-header">
          <h2 class="heading">Announcements</h2>
          <div class="summary"></div>
          <button type="button" class="add"><ha-icon icon="mdi:plus"></ha-icon>Add</button>
        </div>
        <div class="content"></div>
      </ha-card>
      <dialog aria-labelledby="announcement-dialog-title">
        <div class="dialog-shell">
          <div class="dialog-header">
            <div class="dialog-title">
              <h2 id="announcement-dialog-title">New announcement</h2>
              <p>Everyone will see it here and receive it on their phone.</p>
            </div>
            <button type="button" class="dialog-close" aria-label="Close"><ha-icon icon="mdi:close"></ha-icon></button>
          </div>
          <label class="field-label" for="announcement-message">Message</label>
          <textarea id="announcement-message" maxlength="180" placeholder="Dinner will be ready at 8…"></textarea>
          <div class="field-meta"><span>Ctrl + Enter to publish</span><span class="counter">0/180</span></div>
          <div class="field-label">Keep visible</div>
          <div class="durations" role="group" aria-label="Announcement duration">
            <button type="button" class="duration active" data-duration="cleared">Until removed</button>
            <button type="button" class="duration" data-duration="2h">2 hours</button>
            <button type="button" class="duration" data-duration="tonight">Tonight</button>
            <button type="button" class="duration" data-duration="custom">Custom</button>
          </div>
          <div class="custom-time"><input type="datetime-local" aria-label="Announcement end time"></div>
          <div class="error" role="alert"></div>
          <div class="dialog-actions">
            <button type="button" class="dialog-action cancel">Cancel</button>
            <button type="button" class="dialog-action publish"><ha-icon icon="mdi:send"></ha-icon>Publish</button>
          </div>
        </div>
      </dialog>
    `;

    this.shadowRoot.querySelector(".add").addEventListener("click", (event) => this._openDialog(event.currentTarget));
    this.shadowRoot.querySelector(".dialog-close").addEventListener("click", () => this._closeDialog());
    this.shadowRoot.querySelector(".cancel").addEventListener("click", () => this._closeDialog());
    const dialog = this.shadowRoot.querySelector("dialog");
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) this._closeDialog();
    });
    dialog.addEventListener("cancel", (event) => {
      if (this._busy) event.preventDefault();
    });
    dialog.addEventListener("close", () => {
      this._resetDraft();
      this._returnFocus?.focus();
      this._returnFocus = null;
    });
    const textarea = this.shadowRoot.querySelector("textarea");
    textarea.addEventListener("input", (event) => {
      this._draft = event.target.value;
      this._error = "";
      this._updateDialog();
    });
    textarea.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        this._publish();
      }
    });
    this.shadowRoot.querySelectorAll(".duration").forEach((button) => button.addEventListener("click", () => {
      this._duration = button.dataset.duration;
      if (this._duration === "custom" && !this._customUntil) this._customUntil = this._defaultUntil();
      this._error = "";
      this._updateDialog();
    }));
    this.shadowRoot.querySelector("input[type='datetime-local']").addEventListener("input", (event) => {
      this._customUntil = event.target.value;
      this._error = "";
      this._updateDialog();
    });
    this.shadowRoot.querySelector(".publish").addEventListener("click", () => this._publish());
    this._update();
  }

  _announcements() {
    const state = this._hass?.states?.[this._config?.entity];
    return Array.isArray(state?.attributes?.announcements) ? state.attributes.announcements : [];
  }

  _update() {
    if (!this._config || !this.shadowRoot.querySelector(".content")) return;
    this._updateBulletin();
    this._updateDialog();
  }

  _updateBulletin() {
    const announcements = this._announcements();
    const summary = this.shadowRoot.querySelector(".summary");
    summary.textContent = announcements.length ? `· ${announcements.length}` : "";
    this.shadowRoot.querySelector(".bulletin").classList.toggle("empty", !announcements.length);
    const content = this.shadowRoot.querySelector(".content");
    content.replaceChildren();

    if (!announcements.length) return;

    const list = document.createElement("div");
    list.className = "announcement-list";
    list.setAttribute("role", "region");
    list.setAttribute("aria-label", "Family announcements");
    announcements.forEach((announcement) => list.append(this._announcementRow(announcement)));
    content.append(list);
  }

  _announcementRow(announcement) {
    const row = document.createElement("div");
    row.className = "announcement";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.style.setProperty("--avatar-color", this._senderColor(announcement.sender_user_id));
    avatar.textContent = this._initials(announcement.sender_name || announcement.sender_username);
    avatar.title = announcement.sender_name || announcement.sender_username || "Home Assistant";

    const content = document.createElement("div");
    content.className = "announcement-content";
    const message = document.createElement("div");
    message.className = "message";
    message.textContent = announcement.message || "";
    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = this._meta(announcement);
    content.append(message, meta);

    if (this._canDismiss(announcement)) {
      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "remove";
      remove.title = "Remove announcement";
      remove.setAttribute("aria-label", `Remove announcement from ${announcement.sender_name || announcement.sender_username}`);
      remove.disabled = this._dismissing.has(announcement.id);
      remove.innerHTML = '<ha-icon icon="mdi:close"></ha-icon>';
      remove.addEventListener("click", () => this._dismiss(announcement.id));
      row.append(avatar, content, remove);
    } else {
      const spacer = document.createElement("div");
      spacer.className = "remove-spacer";
      spacer.setAttribute("aria-hidden", "true");
      row.append(avatar, content, spacer);
    }
    return row;
  }

  _canDismiss(announcement) {
    const user = this._hass?.user;
    return Boolean(user?.is_admin || (user?.id && user.id === announcement.sender_user_id));
  }

  _initials(value) {
    const parts = String(value || "HA").trim().split(/\s+/).filter(Boolean);
    return parts.slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "HA";
  }

  _senderColor(value) {
    const palette = ["var(--pink)", "var(--blue)", "var(--teal)", "var(--yellow)", "var(--purple)"];
    const hash = [...String(value || "home-assistant")].reduce((total, char) => total + char.charCodeAt(0), 0);
    return palette[hash % palette.length];
  }

  _meta(announcement) {
    const sender = announcement.sender_name || `@${announcement.sender_username}` || "Home Assistant";
    const created = this._relativeTime(announcement.created_at);
    const expiry = announcement.expires_at ? ` · Until ${this._formatExpiry(announcement.expires_at)}` : " · Until removed";
    return `${sender} · ${created}${expiry}`;
  }

  _relativeTime(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "recently";
    const minutes = Math.max(0, Math.floor((Date.now() - date.getTime()) / 60000));
    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hr ago`;
    return date.toLocaleDateString([], { day: "numeric", month: "short" });
  }

  _formatExpiry(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "later";
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const sameDay = (left, right) => left.getFullYear() === right.getFullYear()
      && left.getMonth() === right.getMonth() && left.getDate() === right.getDate();
    const time = date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    if (sameDay(date, today)) return `today, ${time}`;
    if (sameDay(date, tomorrow)) return `tomorrow, ${time}`;
    return date.toLocaleString([], { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });
  }

  _openDialog(trigger) {
    const dialog = this.shadowRoot.querySelector("dialog");
    if (dialog.open) return;
    this._returnFocus = trigger;
    this._resetDraft();
    dialog.showModal();
    requestAnimationFrame(() => this.shadowRoot.querySelector("textarea").focus());
  }

  _closeDialog() {
    const dialog = this.shadowRoot.querySelector("dialog");
    if (dialog.open && !this._busy) dialog.close("cancel");
  }

  _resetDraft() {
    this._draft = "";
    this._duration = "cleared";
    this._customUntil = "";
    this._error = "";
    this._updateDialog();
  }

  _updateDialog() {
    const textarea = this.shadowRoot.querySelector("textarea");
    if (!textarea) return;
    if (textarea.value !== this._draft) textarea.value = this._draft;
    this.shadowRoot.querySelector(".counter").textContent = `${this._draft.length}/180`;
    this.shadowRoot.querySelectorAll(".duration").forEach((button) => button.classList.toggle("active", button.dataset.duration === this._duration));
    const custom = this.shadowRoot.querySelector(".custom-time");
    custom.classList.toggle("visible", this._duration === "custom");
    const input = custom.querySelector("input");
    if (input.value !== this._customUntil) input.value = this._customUntil;
    this.shadowRoot.querySelector(".publish").disabled = this._busy || !this._draft.trim();
    this.shadowRoot.querySelector(".dialog-close").disabled = this._busy;
    this.shadowRoot.querySelector(".cancel").disabled = this._busy;
    const error = this.shadowRoot.querySelector(".error");
    error.textContent = this._error;
    error.classList.toggle("visible", Boolean(this._error));
  }

  _defaultUntil() {
    const date = new Date(Date.now() + 24 * 60 * 60 * 1000);
    date.setMinutes(date.getMinutes() < 30 ? 30 : 0, 0, 0);
    if (date.getMinutes() === 0) date.setHours(date.getHours() + 1);
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 16);
  }

  _expiry() {
    if (this._duration === "cleared") return null;
    if (this._duration === "2h") return new Date(Date.now() + 2 * 60 * 60 * 1000);
    if (this._duration === "tonight") {
      const tonight = new Date();
      tonight.setHours(23, 59, 0, 0);
      return tonight.getTime() > Date.now() ? tonight : new Date(Date.now() + 2 * 60 * 60 * 1000);
    }
    return this._customUntil ? new Date(this._customUntil) : null;
  }

  async _publish() {
    const message = this._draft.trim();
    if (!message || this._busy) return;
    const expiry = this._expiry();
    if (this._duration === "custom" && (!expiry || Number.isNaN(expiry.getTime()) || expiry.getTime() <= Date.now())) {
      this._error = "Choose an end time in the future.";
      this._updateDialog();
      return;
    }
    this._busy = true;
    this._error = "";
    this._updateDialog();
    try {
      const data = { message };
      if (expiry) data.expires_at = expiry.toISOString();
      await this._hass.callService("family_announcements", "publish", data);
      this.shadowRoot.querySelector("dialog").close("published");
    } catch (_error) {
      this._error = "The announcement could not be published. Check the connection and try again.";
    } finally {
      this._busy = false;
      this._updateDialog();
    }
  }

  async _dismiss(announcementId) {
    if (!announcementId || this._dismissing.has(announcementId)) return;
    this._dismissing.add(announcementId);
    this._updateBulletin();
    try {
      await this._hass.callService("family_announcements", "dismiss", { announcement_id: announcementId });
    } catch (_error) {
      this._dismissing.delete(announcementId);
      this._updateBulletin();
    }
  }
}

customElements.define("family-announcements-card", FamilyAnnouncementsCard);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "family-announcements-card",
  name: "Family Announcements",
  description: "A quiet family bulletin with account-attributed messages.",
});
