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
  }

  setConfig(config) {
    if (!config.entity) throw new Error("Family announcements require an entity");
    if (config.mode && !["banner", "composer"].includes(config.mode)) {
      throw new Error("Family announcements mode must be banner or composer");
    }
    this._config = { mode: "banner", ...config };
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
    return this._config?.mode === "composer" ? 5 : Math.max(1, this._announcements().length);
  }

  _build() {
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; color: var(--primary-text-color); }
        :host([hidden]) { display: none; }
        ha-card { box-shadow: none; color: var(--primary-text-color); }

        .banner-list { display: grid; gap: 8px; }
        .banner {
          position: relative;
          display: grid;
          grid-template-columns: 42px minmax(0, 1fr) 34px;
          align-items: center;
          gap: 13px;
          min-height: 68px;
          overflow: hidden;
          padding: 10px 11px 10px 13px;
          border: 1px solid color-mix(in srgb, var(--pink, var(--primary-color)) 22%, transparent);
          border-radius: 20px;
          background:
            linear-gradient(90deg, color-mix(in srgb, var(--pink, var(--primary-color)) 9%, transparent), transparent 31%),
            var(--contrast2, var(--ha-card-background));
        }
        .banner::before {
          position: absolute;
          inset: 13px auto 13px 0;
          width: 3px;
          border-radius: 0 5px 5px 0;
          background: var(--pink, var(--primary-color));
          content: "";
        }
        .banner-icon {
          display: grid;
          width: 42px;
          height: 42px;
          place-items: center;
          border-radius: 15px;
          background: color-mix(in srgb, var(--pink, var(--primary-color)) 16%, transparent);
          color: var(--pink, var(--primary-color));
        }
        .banner-icon ha-icon { width: 20px; }
        .banner-content { min-width: 0; }
        .banner-message {
          color: var(--contrast20, var(--primary-text-color));
          font-size: 15px;
          font-weight: 610;
          line-height: 1.35;
          overflow-wrap: anywhere;
        }
        .banner-meta {
          margin-top: 4px;
          color: var(--contrast10, var(--secondary-text-color));
          font-size: 10.5px;
          font-weight: 540;
        }
        .dismiss {
          display: grid;
          width: 34px;
          height: 34px;
          place-items: center;
          border: 0;
          border-radius: 12px;
          background: transparent;
          color: var(--contrast9, var(--secondary-text-color));
          cursor: pointer;
        }
        .dismiss:hover { background: var(--contrast4); color: var(--contrast18); }
        .dismiss:disabled { cursor: default; opacity: 0.35; }
        .dismiss ha-icon { width: 18px; }

        .composer {
          padding: 18px;
          border: 1px solid rgba(var(--rgb-primary-text-color), 0.06);
          border-radius: 24px;
          background: var(--contrast2, var(--ha-card-background));
        }
        .composer-header { display: flex; align-items: center; gap: 11px; margin-bottom: 15px; }
        .composer-icon {
          display: grid;
          width: 38px;
          height: 38px;
          flex: 0 0 38px;
          place-items: center;
          border-radius: 14px;
          background: color-mix(in srgb, var(--pink, var(--primary-color)) 15%, transparent);
          color: var(--pink, var(--primary-color));
        }
        .composer-icon ha-icon { width: 19px; }
        .composer-heading { min-width: 0; flex: 1; }
        h2 { margin: 0; color: var(--contrast20); font-size: 17px; font-weight: 680; letter-spacing: -0.02em; }
        .subtitle { margin-top: 2px; color: var(--contrast9); font-size: 10px; line-height: 1.3; }
        .count {
          padding: 5px 9px;
          border-radius: 999px;
          background: var(--contrast4);
          color: var(--contrast11);
          font-size: 10px;
          font-weight: 650;
          white-space: nowrap;
        }
        textarea, input[type="datetime-local"] {
          box-sizing: border-box;
          width: 100%;
          border: 1px solid var(--contrast5, rgba(var(--rgb-primary-text-color), 0.12));
          outline: 0;
          background: var(--contrast1, var(--primary-background-color));
          color: var(--contrast20, var(--primary-text-color));
          font: inherit;
          transition: border-color 140ms ease, box-shadow 140ms ease;
        }
        textarea {
          min-height: 78px;
          padding: 12px 13px;
          resize: vertical;
          border-radius: 16px;
          font-size: 13px;
          line-height: 1.45;
        }
        textarea::placeholder { color: var(--contrast8); }
        textarea:focus, input[type="datetime-local"]:focus {
          border-color: var(--pink, var(--primary-color));
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--pink, var(--primary-color)) 15%, transparent);
        }
        .draft-meta {
          display: flex;
          justify-content: space-between;
          margin: 6px 2px 12px;
          color: var(--contrast8);
          font-size: 10px;
        }
        .duration-label { margin: 0 0 7px 2px; color: var(--contrast10); font-size: 10.5px; font-weight: 620; }
        .durations { display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; }
        .duration {
          min-height: 34px;
          border: 0;
          border-radius: 11px;
          background: var(--contrast4);
          color: var(--contrast10);
          font: inherit;
          font-size: 10.5px;
          font-weight: 620;
          cursor: pointer;
        }
        .duration.active {
          background: color-mix(in srgb, var(--pink, var(--primary-color)) 18%, transparent);
          color: var(--pink, var(--primary-color));
        }
        .custom-time { display: none; margin-top: 8px; }
        .custom-time.visible { display: block; }
        input[type="datetime-local"] { height: 40px; padding: 0 11px; border-radius: 13px; color-scheme: dark; font-size: 11px; }
        .composer-actions { display: flex; align-items: center; gap: 10px; margin-top: 14px; }
        .delivery { min-width: 0; flex: 1; color: var(--contrast8); font-size: 9.5px; line-height: 1.3; }
        .publish {
          display: inline-flex;
          min-height: 40px;
          align-items: center;
          justify-content: center;
          gap: 7px;
          border: 0;
          border-radius: 14px;
          padding: 0 16px;
          background: var(--pink, var(--primary-color));
          color: var(--black, #09090b);
          font: inherit;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }
        .publish:disabled { cursor: default; opacity: 0.38; }
        .publish ha-icon { width: 17px; }
        .error { min-height: 0; color: var(--red, var(--error-color)); font-size: 10.5px; }
        .error.visible { min-height: 15px; margin-top: 8px; }
        button:focus-visible { outline: 2px solid var(--pink, var(--primary-color)); outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
      </style>
      <div class="root"></div>
    `;

    if (this._config.mode === "composer") this._buildComposer();
    this._update();
  }

  _buildComposer() {
    const root = this.shadowRoot.querySelector(".root");
    root.innerHTML = `
      <ha-card class="composer">
        <div class="composer-header">
          <div class="composer-icon"><ha-icon icon="mdi:bullhorn-outline"></ha-icon></div>
          <div class="composer-heading"><h2>Announcements</h2><div class="subtitle">Banner everyone sees · notification to family phones</div></div>
          <div class="count"></div>
        </div>
        <textarea maxlength="180" placeholder="Dinner is at 8, plumber arriving at 11…" aria-label="Announcement message"></textarea>
        <div class="draft-meta"><span>Ctrl + Enter to publish</span><span class="counter">0/180</span></div>
        <div class="duration-label">Keep banner visible</div>
        <div class="durations" role="group" aria-label="Announcement duration">
          <button type="button" class="duration active" data-duration="cleared">Until cleared</button>
          <button type="button" class="duration" data-duration="2h">2 hours</button>
          <button type="button" class="duration" data-duration="tonight">Tonight</button>
          <button type="button" class="duration" data-duration="custom">Custom</button>
        </div>
        <div class="custom-time"><input type="datetime-local" aria-label="Announcement end time"></div>
        <div class="composer-actions">
          <div class="delivery">The signed-in account is shown as the sender.</div>
          <button type="button" class="publish"><ha-icon icon="mdi:send"></ha-icon>Publish</button>
        </div>
        <div class="error" role="alert"></div>
      </ha-card>
    `;
    const textarea = root.querySelector("textarea");
    textarea.addEventListener("input", (event) => {
      this._draft = event.target.value;
      this._error = "";
      this._updateComposer();
    });
    textarea.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        this._publish();
      }
    });
    root.querySelectorAll(".duration").forEach((button) => button.addEventListener("click", () => {
      this._duration = button.dataset.duration;
      if (this._duration === "custom" && !this._customUntil) this._customUntil = this._defaultUntil();
      this._error = "";
      this._updateComposer();
    }));
    root.querySelector("input[type='datetime-local']").addEventListener("input", (event) => {
      this._customUntil = event.target.value;
      this._error = "";
      this._updateComposer();
    });
    root.querySelector(".publish").addEventListener("click", () => this._publish());
  }

  _announcements() {
    const state = this._hass?.states?.[this._config?.entity];
    return Array.isArray(state?.attributes?.announcements) ? state.attributes.announcements : [];
  }

  _update() {
    if (!this._config || !this.shadowRoot.querySelector(".root")) return;
    if (this._config.mode === "composer") this._updateComposer();
    else this._updateBanners();
  }

  _updateBanners() {
    const announcements = this._announcements();
    this.hidden = announcements.length === 0;
    const root = this.shadowRoot.querySelector(".root");
    root.replaceChildren();
    if (!announcements.length) return;

    const list = document.createElement("div");
    list.className = "banner-list";
    list.setAttribute("role", "region");
    list.setAttribute("aria-label", "Family announcements");
    announcements.forEach((announcement) => {
      const banner = document.createElement("ha-card");
      banner.className = "banner";

      const icon = document.createElement("div");
      icon.className = "banner-icon";
      icon.innerHTML = '<ha-icon icon="mdi:bullhorn-outline"></ha-icon>';

      const content = document.createElement("div");
      content.className = "banner-content";
      const message = document.createElement("div");
      message.className = "banner-message";
      message.textContent = announcement.message || "";
      const meta = document.createElement("div");
      meta.className = "banner-meta";
      meta.textContent = this._meta(announcement);
      content.append(message, meta);

      const dismiss = document.createElement("button");
      dismiss.type = "button";
      dismiss.className = "dismiss";
      dismiss.title = "Dismiss announcement";
      dismiss.setAttribute("aria-label", `Dismiss announcement from ${announcement.sender_name || announcement.sender_username}`);
      dismiss.disabled = this._dismissing.has(announcement.id);
      dismiss.innerHTML = '<ha-icon icon="mdi:close"></ha-icon>';
      dismiss.addEventListener("click", () => this._dismiss(announcement.id));

      banner.append(icon, content, dismiss);
      list.append(banner);
    });
    root.append(list);
  }

  _updateComposer() {
    const root = this.shadowRoot.querySelector(".root");
    const textarea = root.querySelector("textarea");
    if (!textarea) return;
    if (textarea.value !== this._draft) textarea.value = this._draft;
    root.querySelector(".counter").textContent = `${this._draft.length}/180`;
    const count = this._announcements().length;
    root.querySelector(".count").textContent = count ? `${count} active` : "None active";
    root.querySelectorAll(".duration").forEach((button) => button.classList.toggle("active", button.dataset.duration === this._duration));
    const custom = root.querySelector(".custom-time");
    custom.classList.toggle("visible", this._duration === "custom");
    const input = custom.querySelector("input");
    if (input.value !== this._customUntil) input.value = this._customUntil;
    root.querySelector(".publish").disabled = this._busy || !this._draft.trim();
    const error = root.querySelector(".error");
    error.textContent = this._error;
    error.classList.toggle("visible", Boolean(this._error));
  }

  _meta(announcement) {
    const sender = announcement.sender_name || `@${announcement.sender_username}` || "Home Assistant";
    const created = this._relativeTime(announcement.created_at);
    const expiry = announcement.expires_at ? ` · until ${this._formatTime(announcement.expires_at)}` : "";
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

  _formatTime(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "later";
    return date.toLocaleString([], { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });
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
      this._updateComposer();
      return;
    }
    this._busy = true;
    this._error = "";
    this._updateComposer();
    try {
      const data = { message };
      if (expiry) data.expires_at = expiry.toISOString();
      await this._hass.callService("family_announcements", "publish", data);
      this._draft = "";
      this._duration = "cleared";
      this._customUntil = "";
    } catch (_error) {
      this._error = "Could not publish. Check the connection and try again.";
    } finally {
      this._busy = false;
      this._updateComposer();
    }
  }

  async _dismiss(announcementId) {
    if (!announcementId || this._dismissing.has(announcementId)) return;
    this._dismissing.add(announcementId);
    this._updateBanners();
    try {
      await this._hass.callService("family_announcements", "dismiss", { announcement_id: announcementId });
    } catch (_error) {
      this._dismissing.delete(announcementId);
      this._updateBanners();
    }
  }
}

customElements.define("family-announcements-card", FamilyAnnouncementsCard);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "family-announcements-card",
  name: "Family Announcements",
  description: "Account-attributed family banners with a compact publisher.",
});
