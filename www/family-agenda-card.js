class FamilyAgendaCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = null;
    this._hass = null;
    this._events = [];
    this._status = "loading";
    this._fingerprint = "";
    this._request = 0;
    this._refreshTimer = null;
    this._scheduled = false;
  }

  setConfig(config) {
    if (!Array.isArray(config.entities) || !config.entities.length) {
      throw new Error("Family agenda requires at least one calendar entity");
    }
    this._config = config;
    this._events = [];
    this._status = "loading";
    this._build();
    this._scheduleLoad();
  }

  set hass(hass) {
    this._hass = hass;
    const fingerprint = this._entities().map(({ entity }) => {
      const state = hass.states[entity];
      return `${entity}:${state?.last_updated || "missing"}`;
    }).join("|");
    if (fingerprint !== this._fingerprint) {
      this._fingerprint = fingerprint;
      this._scheduleLoad();
    }
  }

  connectedCallback() {
    if (!this._refreshTimer) {
      this._refreshTimer = window.setInterval(() => this._load(), 15 * 60 * 1000);
    }
    this._scheduleLoad();
  }

  disconnectedCallback() {
    if (this._refreshTimer) window.clearInterval(this._refreshTimer);
    this._refreshTimer = null;
  }

  getCardSize() {
    return Math.max(1, Math.ceil(Math.min(this._events.length, this._maxEvents()) * 1.4));
  }

  _entities() {
    return (this._config?.entities || []).map((item) => typeof item === "string"
      ? { entity: item }
      : item);
  }

  _maxEvents() {
    return Math.max(1, Number(this._config?.max_events) || 4);
  }

  _days() {
    return Math.max(1, Number(this._config?.days) || 14);
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
        ha-card {
          overflow: hidden;
          border: 1px solid rgba(var(--rgb-primary-text-color), 0.055);
          border-radius: 24px;
          background: var(--contrast2, var(--ha-card-background));
          box-shadow: none;
        }
        .events { padding: 7px 14px; }
        .event {
          display: grid;
          min-height: 58px;
          grid-template-columns: 47px 3px minmax(0, 1fr);
          align-items: stretch;
          column-gap: 11px;
          padding: 8px 0;
          cursor: pointer;
        }
        .event + .event { border-top: 1px solid var(--contrast4); }
        .event:focus-visible {
          outline: 2px solid var(--pink, var(--primary-color));
          outline-offset: 3px;
          border-radius: 12px;
        }
        .date {
          display: grid;
          align-content: center;
          justify-items: center;
          min-height: 42px;
          border-radius: 13px;
          background: var(--contrast3);
          line-height: 1;
        }
        .date.continuation { background: transparent; }
        .date.continuation::after {
          width: 1px;
          height: 28px;
          background: var(--contrast5);
          content: "";
        }
        .weekday {
          color: var(--contrast9);
          font-size: 8px;
          font-weight: 760;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .day {
          margin-top: 3px;
          color: var(--contrast20);
          font-family: var(--primary-font-family, Inter, system-ui, sans-serif);
          font-size: 19px;
          font-weight: 720;
          letter-spacing: -0.04em;
        }
        .accent {
          width: 3px;
          min-height: 42px;
          align-self: stretch;
          border-radius: 999px;
          background: var(--event-color, var(--pink));
        }
        .details {
          min-width: 0;
          align-self: center;
        }
        .title {
          display: -webkit-box;
          overflow: hidden;
          color: var(--contrast20);
          font-family: var(--primary-font-family, Inter, system-ui, sans-serif);
          font-size: 13px;
          font-weight: 670;
          letter-spacing: -0.015em;
          line-height: 1.25;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .meta {
          display: flex;
          min-width: 0;
          align-items: center;
          gap: 6px;
          margin-top: 5px;
          color: var(--contrast9);
          font-size: 10px;
          font-weight: 540;
          line-height: 1.25;
        }
        .source {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .source-dot {
          width: 5px;
          height: 5px;
          flex: 0 0 5px;
          border-radius: 50%;
          background: var(--event-color, var(--pink));
        }
        .empty {
          display: flex;
          min-height: 70px;
          align-items: center;
          gap: 11px;
          padding: 12px 16px;
          color: var(--contrast10);
          font-size: 12px;
        }
        .empty ha-icon { width: 19px; color: var(--contrast8); }
        @media (max-width: 639px) {
          ha-card { border-radius: 21px; }
          .events { padding-inline: 12px; }
          .event { min-height: 64px; grid-template-columns: 46px 3px minmax(0,1fr); column-gap: 10px; }
          .date,.accent { min-height: 46px; }
          .title { font-size: 13.5px; }
        }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
      </style>
      <ha-card><div class="content"></div></ha-card>
    `;
    this._render();
  }

  _scheduleLoad() {
    if (this._scheduled || !this._config || !this._hass) return;
    this._scheduled = true;
    queueMicrotask(() => {
      this._scheduled = false;
      this._load();
    });
  }

  async _load() {
    if (!this._config || !this._hass) return;
    const request = ++this._request;
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + this._days());

    try {
      const result = await this._hass.callWS({
        type: "call_service",
        domain: "calendar",
        service: "get_events",
        target: { entity_id: this._entities().map(({ entity }) => entity) },
        service_data: {
          start_date_time: start.toISOString(),
          end_date_time: end.toISOString(),
        },
        return_response: true,
      });
      if (request !== this._request) return;
      const response = result?.response || result || {};
      const events = [];
      this._entities().forEach((source) => {
        const calendar = response[source.entity];
        (calendar?.events || []).forEach((event) => {
          const startDate = this._date(event.start);
          if (!startDate) return;
          events.push({
            ...event,
            source,
            startDate,
            allDay: this._isAllDay(event.start),
          });
        });
      });
      const unique = new Map();
      events.sort((left, right) => left.startDate - right.startDate).forEach((event) => {
        const key = `${event.source.entity}|${event.startDate.toISOString()}|${event.summary}`;
        if (!unique.has(key)) unique.set(key, event);
      });
      this._events = [...unique.values()].slice(0, this._maxEvents());
      this._status = this._events.length ? "ready" : "empty";
    } catch (error) {
      if (request !== this._request) return;
      this._events = [];
      this._status = "error";
    }
    this._render();
  }

  _date(value) {
    const raw = typeof value === "object" && value
      ? value.dateTime || value.date
      : value;
    if (!raw) return null;
    if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
      const [year, month, day] = raw.split("-").map(Number);
      return new Date(year, month - 1, day);
    }
    const date = new Date(raw);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  _isAllDay(value) {
    const raw = typeof value === "object" && value ? value.date || value.dateTime : value;
    return typeof raw === "string" && /^\d{4}-\d{2}-\d{2}$/.test(raw);
  }

  _dateKey(date) {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }

  _weekday(date) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    if (this._dateKey(date) === this._dateKey(today)) return "Today";
    if (this._dateKey(date) === this._dateKey(tomorrow)) return "Tmrw";
    return date.toLocaleDateString([], { weekday: "short" });
  }

  _eventTime(event) {
    if (event.allDay) return "All day";
    return event.startDate.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  }

  _render() {
    const content = this.shadowRoot.querySelector(".content");
    if (!content) return;
    content.replaceChildren();

    if (this._status !== "ready") {
      const empty = document.createElement("div");
      empty.className = "empty";
      const icon = document.createElement("ha-icon");
      icon.icon = this._status === "error" ? "mdi:calendar-alert" : "mdi:calendar-blank-outline";
      const text = document.createElement("span");
      text.textContent = this._status === "loading"
        ? "Loading upcoming plans…"
        : this._status === "error"
          ? "Upcoming plans are unavailable"
          : `Nothing scheduled in the next ${this._days()} days`;
      empty.append(icon, text);
      content.append(empty);
      return;
    }

    const list = document.createElement("div");
    list.className = "events";
    let previousDate = "";
    this._events.forEach((event) => {
      const key = this._dateKey(event.startDate);
      const row = document.createElement("div");
      row.className = "event";
      row.tabIndex = 0;
      row.setAttribute("role", "link");
      row.setAttribute("aria-label", `Open calendar for ${event.summary || "event"}`);
      row.style.setProperty("--event-color", event.source.color || "var(--pink)");
      row.addEventListener("click", () => this._openCalendar());
      row.addEventListener("keydown", (keyboardEvent) => {
        if (keyboardEvent.key === "Enter" || keyboardEvent.key === " ") {
          keyboardEvent.preventDefault();
          this._openCalendar();
        }
      });

      const date = document.createElement("div");
      date.className = key === previousDate ? "date continuation" : "date";
      if (key !== previousDate) {
        const weekday = document.createElement("span");
        weekday.className = "weekday";
        weekday.textContent = this._weekday(event.startDate);
        const day = document.createElement("span");
        day.className = "day";
        day.textContent = event.startDate.toLocaleDateString([], { day: "numeric" });
        date.append(weekday, day);
      }

      const accent = document.createElement("div");
      accent.className = "accent";
      const details = document.createElement("div");
      details.className = "details";
      const title = document.createElement("div");
      title.className = "title";
      title.textContent = event.summary || "Untitled event";
      const meta = document.createElement("div");
      meta.className = "meta";
      const time = document.createElement("span");
      time.textContent = this._eventTime(event);
      const dot = document.createElement("span");
      dot.className = "source-dot";
      const source = document.createElement("span");
      source.className = "source";
      source.textContent = event.source.name
        || this._hass?.states[event.source.entity]?.attributes?.friendly_name
        || "Calendar";
      meta.append(time, dot, source);
      details.append(title, meta);
      row.append(date, accent, details);
      list.append(row);
      previousDate = key;
    });
    content.append(list);
  }

  _openCalendar() {
    window.history.pushState(null, "", "/calendar");
    window.dispatchEvent(new Event("location-changed"));
  }
}

customElements.define("family-agenda-card", FamilyAgendaCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "family-agenda-card",
  name: "Family Agenda",
  description: "A calm, permission-aware household agenda.",
});
