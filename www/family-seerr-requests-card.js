class FamilySeerrRequestsCard extends HTMLElement {
  setConfig(config) {
    if (!config.entity) throw new Error("Seerr requests require an entity");
    this._config = config;
    this._busy = null;
    this._confirming = null;
    this.attachShadow({ mode: "open" });
    this._renderShell();
  }

  set hass(hass) {
    const previous = this._hass?.states?.[this._config.entity];
    this._hass = hass;
    const current = hass.states[this._config.entity];
    if (previous !== current) this._renderContent();
  }

  getCardSize() {
    return Math.max(1, Math.min(5, this._requests().length + 1));
  }

  _renderShell() {
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        ha-card {
          overflow: hidden;
          border: 0;
          border-radius: 24px;
          box-shadow: none;
          background: var(--contrast2);
          color: var(--primary-text-color);
        }
        .header {
          min-height: 52px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 16px;
        }
        .header-icon, .media-icon {
          display: grid;
          place-items: center;
          flex: none;
          border-radius: 12px;
          background: color-mix(in srgb, var(--blue) 17%, transparent);
          color: var(--blue);
        }
        .header-icon { width: 34px; height: 34px; }
        .header-icon ha-icon { --mdc-icon-size: 19px; }
        .title-wrap { min-width: 0; flex: 1; }
        h2 { margin: 0; font-size: 16px; font-weight: 700; line-height: 1.2; }
        .subtitle {
          margin-top: 2px;
          color: var(--contrast10);
          font-size: 10px;
          line-height: 1.2;
        }
        .count {
          min-width: 24px;
          height: 24px;
          display: grid;
          place-items: center;
          padding: 0 7px;
          border-radius: 10px;
          background: var(--contrast4);
          color: var(--contrast14);
          font-size: 11px;
          font-weight: 700;
        }
        .open {
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          padding: 0;
          border: 0;
          border-radius: 11px;
          background: transparent;
          color: var(--contrast11);
          cursor: pointer;
        }
        .open:hover, .open:focus-visible { background: var(--contrast4); color: var(--contrast18); }
        .open ha-icon { --mdc-icon-size: 18px; }
        .content { padding: 0 12px 12px; }
        .empty, .unavailable {
          display: flex;
          align-items: center;
          gap: 10px;
          min-height: 42px;
          padding: 0 4px;
          border-top: 1px solid var(--contrast4);
          color: var(--contrast11);
          font-size: 12px;
        }
        .empty ha-icon { color: var(--green); --mdc-icon-size: 18px; }
        .unavailable ha-icon { color: var(--orange); --mdc-icon-size: 18px; }
        .list { display: grid; gap: 8px; }
        .request {
          display: grid;
          grid-template-columns: 38px minmax(0, 1fr) auto;
          align-items: center;
          gap: 10px;
          min-height: 58px;
          padding: 8px;
          border: 1px solid var(--contrast4);
          border-radius: 16px;
          background: var(--contrast1);
        }
        .media-icon { width: 38px; height: 38px; }
        .media-icon.tv { background: color-mix(in srgb, var(--purple) 17%, transparent); color: var(--purple); }
        .media-icon ha-icon { --mdc-icon-size: 20px; }
        .details { min-width: 0; }
        .name {
          overflow: hidden;
          color: var(--contrast20);
          font-size: 13px;
          font-weight: 650;
          line-height: 1.25;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .meta {
          overflow: hidden;
          margin-top: 3px;
          color: var(--contrast10);
          font-size: 10px;
          line-height: 1.2;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .actions { display: flex; align-items: center; gap: 5px; }
        .action {
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          padding: 0;
          border: 0;
          border-radius: 11px;
          cursor: pointer;
        }
        .action ha-icon { --mdc-icon-size: 18px; }
        .approve { background: color-mix(in srgb, var(--green) 16%, transparent); color: var(--green); }
        .decline { background: color-mix(in srgb, var(--red) 12%, transparent); color: var(--red); }
        .cancel { background: var(--contrast4); color: var(--contrast13); }
        .action:hover, .action:focus-visible { filter: brightness(1.18); }
        .action:disabled { cursor: wait; filter: grayscale(0.6); opacity: 0.45; }
        .confirm-label { color: var(--red); font-size: 10px; font-weight: 700; }
        .more {
          display: block;
          width: 100%;
          padding: 10px 4px 0;
          border: 0;
          background: transparent;
          color: var(--blue);
          font: inherit;
          font-size: 11px;
          text-align: left;
          cursor: pointer;
        }
        @media (max-width: 639px) {
          ha-card { border-radius: 21px; }
          .header { min-height: 60px; padding-inline: 14px; }
          .open { width: 44px; height: 44px; border-radius: 14px; }
          .request {
            grid-template-columns: 42px minmax(0,1fr);
            min-height: 104px;
            padding: 10px;
          }
          .media-icon { width: 42px; height: 42px; }
          .actions { grid-column: 1 / -1; justify-content: flex-end; }
          .action { width: 48px; height: 44px; border-radius: 14px; }
          .more { min-height: 44px; padding-top: 12px; }
        }
        @media (prefers-reduced-motion: no-preference) {
          .action, .open { transition: background 140ms ease, color 140ms ease, filter 140ms ease; }
        }
      </style>
      <ha-card>
        <div class="header">
          <div class="header-icon"><ha-icon icon="mdi:movie-check-outline"></ha-icon></div>
          <div class="title-wrap">
            <h2>Requests</h2>
            <div class="subtitle">Seerr · pending approval</div>
          </div>
          <span class="count" hidden></span>
          <button class="open" type="button" aria-label="Open Seerr" title="Open Seerr">
            <ha-icon icon="mdi:open-in-new"></ha-icon>
          </button>
        </div>
        <div class="content"></div>
      </ha-card>
    `;
    this.shadowRoot.querySelector(".open").addEventListener("click", () => this._openSeerr());
  }

  _state() {
    return this._hass?.states?.[this._config.entity];
  }

  _requests() {
    const requests = this._state()?.attributes?.requests;
    return Array.isArray(requests) ? requests : [];
  }

  _renderContent() {
    const state = this._state();
    const requests = this._requests();
    const count = this.shadowRoot.querySelector(".count");
    count.hidden = !requests.length;
    count.textContent = String(requests.length);
    const content = this.shadowRoot.querySelector(".content");
    content.replaceChildren();

    if (!state || ["unknown", "unavailable"].includes(state.state)) {
      content.append(this._status("unavailable", "mdi:cloud-alert-outline", "Seerr is unavailable"));
      return;
    }
    if (!requests.length) {
      content.append(this._status("empty", "mdi:check-circle-outline", "No requests waiting"));
      return;
    }

    const list = document.createElement("div");
    list.className = "list";
    requests.slice(0, 4).forEach((request) => list.append(this._requestRow(request)));
    content.append(list);
    if (requests.length > 4) {
      const more = document.createElement("button");
      more.type = "button";
      more.className = "more";
      more.textContent = `View all ${requests.length} pending requests in Seerr`;
      more.addEventListener("click", () => this._openSeerr());
      content.append(more);
    }
  }

  _status(className, icon, label) {
    const row = document.createElement("div");
    row.className = className;
    const glyph = document.createElement("ha-icon");
    glyph.setAttribute("icon", icon);
    const text = document.createElement("span");
    text.textContent = label;
    row.append(glyph, text);
    return row;
  }

  _requestRow(request) {
    const row = document.createElement("div");
    row.className = "request";
    const media = document.createElement("div");
    media.className = `media-icon ${request.media_type === "tv" ? "tv" : "movie"}`;
    const mediaIcon = document.createElement("ha-icon");
    mediaIcon.setAttribute("icon", request.media_type === "tv" ? "mdi:television-classic" : "mdi:movie-open-outline");
    media.append(mediaIcon);

    const details = document.createElement("div");
    details.className = "details";
    const name = document.createElement("div");
    name.className = "name";
    name.textContent = request.year ? `${request.title} (${request.year})` : request.title;
    const meta = document.createElement("div");
    meta.className = "meta";
    const kind = request.media_type === "tv" ? "Series" : "Movie";
    const seasons = request.seasons?.length ? ` · S${request.seasons.join(", ")}` : "";
    meta.textContent = `${kind}${seasons} · ${request.requested_by}`;
    details.append(name, meta);

    const actions = document.createElement("div");
    actions.className = "actions";
    if (this._confirming === request.id) {
      const label = document.createElement("span");
      label.className = "confirm-label";
      label.textContent = "Decline?";
      actions.append(label, this._actionButton("cancel", "mdi:close", "Cancel", () => {
        this._confirming = null;
        this._renderContent();
      }), this._actionButton("decline", "mdi:delete-outline", "Confirm decline", () => this._manage(request.id, "decline")));
    } else {
      actions.append(this._actionButton("approve", "mdi:check", "Approve request", () => this._manage(request.id, "approve")), this._actionButton("decline", "mdi:close", "Decline request", () => {
        this._confirming = request.id;
        this._renderContent();
      }));
    }
    actions.querySelectorAll("button").forEach((button) => { button.disabled = this._busy !== null; });
    row.append(media, details, actions);
    return row;
  }

  _actionButton(className, icon, label, handler) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `action ${className}`;
    button.setAttribute("aria-label", label);
    button.title = label;
    const glyph = document.createElement("ha-icon");
    glyph.setAttribute("icon", icon);
    button.append(glyph);
    button.addEventListener("click", handler);
    return button;
  }

  async _manage(requestId, action) {
    this._busy = requestId;
    this._confirming = null;
    this._renderContent();
    try {
      await this._hass.callService("family_seerr_requests", action, { request_id: requestId });
    } catch (error) {
      this.dispatchEvent(new CustomEvent("hass-notification", {
        detail: { message: error?.message || `Unable to ${action} this request` },
        bubbles: true,
        composed: true,
      }));
    } finally {
      this._busy = null;
      this._renderContent();
    }
  }

  _openSeerr() {
    const url = this._state()?.attributes?.external_url || this._config.url;
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  }
}

customElements.define("family-seerr-requests-card", FamilySeerrRequestsCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "family-seerr-requests-card",
  name: "Family Seerr Requests",
  description: "A compact admin queue for pending Seerr requests.",
});
