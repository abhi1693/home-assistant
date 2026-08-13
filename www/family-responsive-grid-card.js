class FamilyResponsiveGridCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = null;
    this._hass = null;
    this._cards = [];
    this._renderToken = 0;
  }

  setConfig(config) {
    if (!Array.isArray(config.cards)) {
      throw new Error("Family responsive grid requires a cards array");
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
    return Math.max(1, Math.ceil(this._cards.length / 2) * 3);
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

    const minimum = Number(this._config?.min_width) || 420;
    this.shadowRoot.replaceChildren();
    const style = document.createElement("style");
    style.textContent = `
      :host { display: block; }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, ${minimum}px), 1fr));
        gap: var(--grid-card-gap, 16px);
      }
    `;
    const grid = document.createElement("div");
    grid.className = "grid";
    grid.append(...cards);
    this.shadowRoot.append(style, grid);
  }
}

customElements.define("family-responsive-grid-card", FamilyResponsiveGridCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "family-responsive-grid-card",
  name: "Family Responsive Grid",
  description: "A one-or-two-column family dashboard grid.",
});
