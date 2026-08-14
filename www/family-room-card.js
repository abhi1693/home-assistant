class FamilyRoomCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = null;
    this._hass = null;
    this._cards = [];
    this._renderToken = 0;
  }

  setConfig(config) {
    if (!config.name || !Array.isArray(config.cards) || !config.cards.length) {
      throw new Error("Family room card requires a room name and at least one child card");
    }
    this._config = config;
    this._renderCards(config.cards);
  }

  set hass(hass) {
    this._hass = hass;
    this._cards.forEach((card) => {
      card.hass = hass;
    });
  }

  getCardSize() {
    return Math.max(6, this._cards.reduce((size, card) => size + (card.getCardSize?.() || 1), 1));
  }

  _escape(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  async _renderCards(configs) {
    const token = ++this._renderToken;
    const helpers = await window.loadCardHelpers();
    if (token !== this._renderToken) return;

    const cards = configs.map((config) => helpers.createCardElement(config));
    if (this._hass) {
      cards.forEach((card) => {
        card.hass = this._hass;
      });
    }
    this._cards = cards;

    const accent = this._escape(this._config.accent || "var(--pink)");
    const icon = this._escape(this._config.icon || "mdi:home-outline");
    const name = this._escape(this._config.name);
    this.shadowRoot.replaceChildren();

    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: block;
        min-width: 0;
        color: var(--primary-text-color);
        font-family: var(--secondary-font-family);
      }
      * { box-sizing: border-box; }
      ha-card {
        display: block;
        overflow: hidden;
        border: 1px solid rgba(var(--rgb-primary-text-color), .06);
        border-radius: 28px;
        padding: 20px;
        background: var(--contrast2, var(--ha-card-background));
        box-shadow: none;
      }
      .room-heading {
        display: flex;
        min-height: 48px;
        align-items: center;
        gap: 12px;
        margin-bottom: 16px;
      }
      .back {
        display: grid;
        width: 44px;
        height: 44px;
        flex: 0 0 44px;
        place-items: center;
        border: 0;
        border-radius: 14px;
        background: var(--contrast3);
        color: var(--contrast13);
        cursor: pointer;
      }
      .back ha-icon { width: 22px; height: 22px; }
      .room-icon {
        display: grid;
        width: 42px;
        height: 42px;
        flex: 0 0 42px;
        place-items: center;
        border-radius: 15px;
        background: color-mix(in srgb, var(--room-accent) 14%, var(--contrast3));
        color: var(--room-accent);
      }
      .room-icon ha-icon { width: 22px; height: 22px; }
      .room-name {
        overflow: hidden;
        color: var(--contrast20);
        font-family: var(--primary-font-family);
        font-size: 20px;
        font-weight: 730;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .room-copy { min-width: 0; flex: 1; }
      .room-context {
        display: block;
        margin-top: 3px;
        color: var(--contrast10);
        font-size: 13px;
        font-weight: 550;
      }
      .room-content {
        display: grid;
        min-width: 0;
        gap: 14px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
      .room-content > * { min-width: 0; }
      .room-content > family-fan-card:first-child { grid-column: 1 / -1; }
      @media (max-width: 639px) {
        ha-card {
          border-radius: 22px;
          padding: 12px;
        }
        .room-heading {
          min-height: 44px;
          gap: 10px;
          margin-bottom: 10px;
        }
        .room-icon {
          width: 40px;
          height: 40px;
          flex-basis: 40px;
          border-radius: 14px;
        }
        .room-name { font-size: 18px; }
        .room-content { gap: 10px; grid-template-columns: 1fr; }
        .room-content > family-fan-card:first-child { grid-column: auto; }
      }
    `;

    const shell = document.createElement("ha-card");
    shell.style.setProperty("--room-accent", accent);
    shell.style.setProperty("--fan-accent", accent);
    const heading = document.createElement("header");
    heading.className = "room-heading";
    const occupantText = this._config.occupants?.length
      ? this._config.occupants.join(" · ")
      : "Shared room";
    heading.innerHTML = `${this._config.back_path ? '<button class="back" type="button" aria-label="Back to rooms"><ha-icon icon="mdi:arrow-left"></ha-icon></button>' : ""}<span class="room-icon"><ha-icon icon="${icon}"></ha-icon></span><span class="room-copy"><strong class="room-name">${name}</strong><span class="room-context">${this._escape(occupantText)}</span></span>`;
    heading.querySelector(".back")?.addEventListener("click", () => {
      window.history.pushState({}, "", this._config.back_path);
      window.dispatchEvent(new Event("location-changed"));
    });
    const content = document.createElement("div");
    content.className = "room-content";
    content.append(...cards);
    shell.append(heading, content);
    this.shadowRoot.append(style, shell);
  }
}

customElements.define("family-room-card", FamilyRoomCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "family-room-card",
  name: "Family Room Card",
  description: "An extensible room shell for family-friendly device cards.",
});
