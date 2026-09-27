class FamilyDailyMaxChartCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = null;
    this._hass = null;
    this._history = null;
    this._historyKey = null;
    this._loading = false;
    this._error = null;
    this._activeDay = null;
    this._pinnedDay = null;
    this._dismissOutside = (event) => {
      if (!event.composedPath().includes(this)) this._hideTooltip();
    };
    this.shadowRoot.addEventListener("pointerover", (event) => {
      if (event.pointerType === "touch") return;
      const bar = event.target.closest(".bar-wrap");
      if (bar) this._showTooltip(bar.dataset.day);
    });
    this.shadowRoot.addEventListener("pointerout", (event) => {
      const bar = event.target.closest(".bar-wrap");
      if (bar && !bar.contains(event.relatedTarget)) this._showTooltip(this._pinnedDay);
    });
    this.shadowRoot.addEventListener("focusin", (event) => {
      const bar = event.target.closest(".bar-wrap");
      if (bar) this._showTooltip(bar.dataset.day);
    });
    this.shadowRoot.addEventListener("focusout", () => this._showTooltip(this._pinnedDay));
    this.shadowRoot.addEventListener("click", (event) => {
      const bar = event.target.closest(".bar-wrap");
      if (!bar) return;
      this._pinnedDay = this._pinnedDay === bar.dataset.day ? null : bar.dataset.day;
      this._showTooltip(this._pinnedDay);
    });
    this.shadowRoot.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        this._hideTooltip();
        return;
      }
      const bars = [...this.shadowRoot.querySelectorAll(".bar-wrap")];
      const index = bars.indexOf(event.target);
      if (index < 0) return;
      const next = { ArrowLeft: Math.max(0, index - 1), ArrowRight: Math.min(bars.length - 1, index + 1), Home: 0, End: bars.length - 1 }[event.key];
      if (next === undefined) return;
      event.preventDefault();
      this._pinnedDay = null;
      bars[next].focus();
    });
  }

  connectedCallback() {
    document.addEventListener("pointerdown", this._dismissOutside);
  }

  disconnectedCallback() {
    document.removeEventListener("pointerdown", this._dismissOutside);
  }

  _hideTooltip() {
    this._pinnedDay = null;
    this._showTooltip(null);
  }

  _showTooltip(day) {
    this._activeDay = day;
    const tooltip = this.shadowRoot.querySelector(".tooltip");
    if (!tooltip) return;
    const bucket = this._series().find((item) => item.key === day);
    tooltip.hidden = !bucket;
    if (bucket) {
      const date = new Date(`${bucket.key}T12:00:00`).toLocaleDateString([], {
        weekday: "long", day: "numeric", month: "short", year: "numeric",
      });
      tooltip.textContent = `${date} · ${bucket.value === null ? "No recorded data" : this._tooltipValue(bucket.value)}`;
    }
    for (const bar of this.shadowRoot.querySelectorAll(".bar-wrap")) {
      const active = bar.dataset.day === day;
      bar.classList.toggle("selected", active);
      if (active) bar.setAttribute("aria-describedby", "daily-tooltip");
      else bar.removeAttribute("aria-describedby");
    }
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error("Family daily max chart requires an entity");
    }
    this._activeDay = null;
    this._pinnedDay = null;
    this._config = {
      days: 7,
      color: "var(--blue)",
      format: "number",
      ...config,
    };
    this._history = null;
    this._historyKey = null;
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._loadHistory();
    this._render();
  }

  getCardSize() {
    return 4;
  }

  async _loadHistory() {
    if (!this._hass || !this._config || this._loading) return;
    const start = this._startDate();
    const end = new Date();
    const key = `${this._config.entity}:${start.toISOString()}:${end.toISOString()}:${this._config.days}`;
    if (this._historyKey === key) return;
    this._loading = true;
    this._historyKey = key;
    this._error = null;
    try {
      const query = new URLSearchParams({
        filter_entity_id: this._config.entity,
        end_time: end.toISOString(),
        minimal_response: "1",
        no_attributes: "1",
      });
      const rows = await this._hass.callApi(
        "GET",
        `history/period/${encodeURIComponent(start.toISOString())}?${query.toString()}`,
      );
      this._history = Array.isArray(rows?.[0]) ? rows[0] : [];
    } catch (error) {
      this._error = error;
      this._history = [];
    } finally {
      this._loading = false;
      this._render();
    }
  }

  _startDate() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate() - (Number(this._config?.days) || 7) + 1);
  }

  _dayKey(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }

  _dayLabel(date) {
    return date.toLocaleDateString([], { weekday: "short" });
  }

  _readNumber(state) {
    const value = Number(state?.state ?? state?.s);
    return Number.isFinite(value) ? value : null;
  }

  _readTimestamp(state) {
    const raw = state?.last_changed ?? state?.last_updated ?? state?.lc ?? state?.lu;
    if (typeof raw === "number") return new Date(raw * 1000);
    return new Date(raw);
  }

  _series() {
    const days = Number(this._config?.days) || 7;
    const start = this._startDate();
    const buckets = [];
    const byKey = new Map();
    for (let index = 0; index < days; index += 1) {
      const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + index);
      const bucket = { key: this._dayKey(date), label: this._dayLabel(date), value: null };
      buckets.push(bucket);
      byKey.set(bucket.key, bucket);
    }
    for (const row of this._history || []) {
      const value = this._readNumber(row);
      if (value === null) continue;
      const changed = this._readTimestamp(row);
      if (Number.isNaN(changed.getTime())) continue;
      const bucket = byKey.get(this._dayKey(changed));
      if (!bucket) continue;
      bucket.value = bucket.value === null ? value : Math.max(bucket.value, value);
    }
    const current = this._hass?.states?.[this._config.entity];
    const currentValue = this._readNumber(current);
    if (currentValue !== null) {
      const currentBucket = byKey.get(this._dayKey(new Date()));
      if (currentBucket) {
        currentBucket.value = currentBucket.value === null
          ? currentValue
          : Math.max(currentBucket.value, currentValue);
      }
    }
    return buckets;
  }

  _format(value) {
    if (value === null) return "—";
    if (this._config.format === "steps") return Math.round(value).toLocaleString();
    if (this._config.format === "distance") {
      return value >= 1000 ? `${(value / 1000).toFixed(1)} km` : `${Math.round(value)} m`;
    }
    if (this._config.format === "calories") return `${Math.round(value).toLocaleString()} kcal`;
    if (this._config.format === "floors") return `${Math.round(value)} floors`;
    const unit = this._config.unit || this._hass?.states?.[this._config.entity]?.attributes?.unit_of_measurement || "";
    return `${Math.round(value).toLocaleString()}${unit ? ` ${unit}` : ""}`;
  }

  _tooltipValue(value) {
    if (this._config.format === "distance" && value >= 1000) {
      return `${this._format(value)} (${value.toLocaleString(undefined, { maximumFractionDigits: 20 })} m)`;
    }
    return this._format(value);
  }

  _render() {
    if (!this._config) return;
    const activeDay = this._activeDay;
    const focusedDay = this.shadowRoot.activeElement?.dataset.day;
    const series = this._series();
    const values = series.map((item) => item.value).filter((value) => value !== null);
    const max = Math.max(1, ...values);
    const latest = [...series].reverse().find((item) => item.value !== null);
    const bars = series.map((item) => {
      const height = item.value === null ? 2 : Math.max(6, Math.round((item.value / max) * 92));
      return `
        <button type="button" class="bar-wrap" data-day="${item.key}">
          <span aria-hidden="true" class="bar ${item.value === null ? "empty" : ""}" style="height:${height}%;"></span>
          <span aria-hidden="true">${item.label}</span>
        </button>
      `;
    }).join("");
    const subtitle = this._error
      ? "History unavailable"
      : this._loading && !this._history
        ? "Loading history"
        : latest
          ? `Latest daily max ${this._format(latest.value)}`
          : "Waiting for history";

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        ha-card {
          position: relative;
          display: grid;
          gap: 14px;
          min-height: 248px;
          padding: 20px 16px 14px;
          border-radius: 22px;
          background: var(--contrast2);
          border: 1px solid rgba(var(--rgb-primary-text-color), 0.06);
          box-shadow: none;
        }
        .header { display: flex; align-items: start; justify-content: space-between; gap: 12px; }
        h3 { margin: 0; color: var(--contrast20); font-size: 24px; line-height: 1.1; font-weight: 500; }
        p { margin: 6px 0 0; color: var(--contrast10); font-size: 12px; }
        ha-icon { color: var(--contrast14); width: 24px; height: 24px; }
        .bars {
          display: grid;
          grid-template-columns: repeat(${series.length}, minmax(0, 1fr));
          align-items: end;
          gap: 9px;
          min-height: 142px;
          padding-top: 6px;
        }
        .tooltip {
          position: absolute;
          z-index: 1;
          top: 84px;
          left: 12px;
          right: 12px;
          padding: 9px 12px;
          border-radius: 10px;
          background: var(--contrast4, #263342);
          color: var(--contrast20, #fff);
          box-shadow: 0 4px 16px #0005;
          font-size: 12px;
          line-height: 1.4;
          text-align: center;
          overflow-wrap: anywhere;
          pointer-events: none;
        }
        .tooltip[hidden] { display: none; }
        .bar-wrap:focus-visible { outline: 2px solid var(--contrast20, #fff); outline-offset: 3px; }
        .bar-wrap.selected .bar { filter: brightness(1.2); }
        .bar-wrap {
          appearance: none;
          padding: 0;
          border: 0;
          border-radius: 6px;
          background: transparent;
          font: inherit;
          cursor: pointer;
          touch-action: manipulation;
          display: grid;
          grid-template-rows: minmax(100px, 1fr) min-content;
          align-items: end;
          gap: 8px;
          min-width: 0;
          height: 100%;
        }
        .bar {
          width: 100%;
          min-height: 2px;
          border-radius: 999px 999px 6px 6px;
          background: linear-gradient(180deg, color-mix(in srgb, ${this._config.color} 96%, white 8%), ${this._config.color});
          box-shadow: 0 0 0 1px color-mix(in srgb, ${this._config.color} 24%, transparent);
        }
        .bar.empty {
          background: var(--contrast4);
          box-shadow: none;
          opacity: 0.55;
        }
        span {
          overflow: hidden;
          color: var(--contrast9);
          font-size: 11px;
          text-align: center;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      </style>
      <ha-card>
        <div class="header">
          <div>
            <h3>${this._config.title || this._hass?.states?.[this._config.entity]?.attributes?.friendly_name || this._config.entity}</h3>
            <p>${subtitle}</p>
          </div>
          <ha-icon icon="mdi:chevron-right"></ha-icon>
        </div>
        <div id="daily-tooltip" class="tooltip" role="tooltip" hidden></div>
        <div class="bars">${bars}</div>
      </ha-card>
    `;
    for (const bar of this.shadowRoot.querySelectorAll(".bar-wrap")) {
      const item = series.find((bucket) => bucket.key === bar.dataset.day);
      const date = new Date(`${item.key}T12:00:00`).toLocaleDateString([], {
        weekday: "long", day: "numeric", month: "short", year: "numeric",
      });
      bar.setAttribute("aria-label", `${date}: ${item.value === null ? "No recorded data" : this._tooltipValue(item.value)}`);
    }
    if (focusedDay) {
      this.shadowRoot.querySelector(`[data-day="${focusedDay}"]`)?.focus({ preventScroll: true });
    }
    this._showTooltip(activeDay);
  }
}

customElements.define("family-daily-max-chart-card", FamilyDailyMaxChartCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "family-daily-max-chart-card",
  name: "Family Daily Max Chart",
  description: "Shows local-day maximums from raw Home Assistant history.",
});
