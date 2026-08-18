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
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error("Family daily max chart requires an entity");
    }
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
    const key = `${this._config.entity}:${start.toISOString()}:${this._config.days}`;
    if (this._historyKey === key) return;
    this._loading = true;
    this._historyKey = key;
    this._error = null;
    try {
      const query = new URLSearchParams({
        filter_entity_id: this._config.entity,
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
    const value = Number(state?.state);
    return Number.isFinite(value) ? value : null;
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
      const changed = new Date(row.last_changed || row.last_updated);
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

  _render() {
    if (!this._config) return;
    const series = this._series();
    const values = series.map((item) => item.value).filter((value) => value !== null);
    const max = Math.max(1, ...values);
    const latest = [...series].reverse().find((item) => item.value !== null);
    const bars = series.map((item) => {
      const height = item.value === null ? 2 : Math.max(6, Math.round((item.value / max) * 92));
      return `
        <div class="bar-wrap" title="${item.label}: ${this._format(item.value)}">
          <div class="bar ${item.value === null ? "empty" : ""}" style="height:${height}%;"></div>
          <span>${item.label}</span>
        </div>
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
        .bar-wrap {
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
        <div class="bars">${bars}</div>
      </ha-card>
    `;
  }
}

customElements.define("family-daily-max-chart-card", FamilyDailyMaxChartCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "family-daily-max-chart-card",
  name: "Family Daily Max Chart",
  description: "Shows local-day maximums from raw Home Assistant history.",
});
