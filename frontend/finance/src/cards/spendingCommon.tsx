import { MASK, money } from "../lib/format";

// Shared helpers for the spending cards, vendored from the app repo's
// frontend/components/spending/shared.tsx — keep the values and hashing
// identical so a merchant/theme looks the same in HA and on the web.

// Fixed theme → color map (color follows the entity: a theme keeps its hue
// whether or not it appears this month). "other" is deliberately gray.
export const THEME_COLORS: Record<string, string> = {
  dining: "#fb923c",
  shopping: "#60a5fa",
  groceries: "#34d399",
  subscriptions: "#a78bfa",
  utilities: "#22d3ee",
  housing: "#f472b6",
  transport: "#fbbf24",
  travel: "#93c5fd",
  health: "#4ade80",
  leisure: "#e879f9",
  fees: "#fca5a5",
  payments: "#fb7185",
  other: "#8b9bb4",
};
export const themeColor = (t: string) => THEME_COLORS[t.toLowerCase()] ?? ["#60a5fa", "#34d399", "#a78bfa", "#f472b6", "#fbbf24", "#22d3ee"][Array.from(t).reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 0) % 6];

export const NON_SPEND = new Set(["income", "transfers", "debt"]);

// Normalizing sub-monthly cadences into a monthly figure for the
// "recurring bills" stat.
export const PER_MONTH: Record<string, number> = {
  weekly: 52 / 12,
  biweekly: 26 / 12,
  monthly: 1,
  quarterly: 1 / 3,
  annual: 1 / 12,
};

export function amt(v: number, censored: boolean): string {
  return censored ? MASK : money(v, Math.abs(v) < 100);
}

export function currentMonth(): string {
  return new Intl.DateTimeFormat("en-CA", {timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit"}).format(new Date()).slice(0, 7);
}

export const FIRST_REPORTING_MONTH = "1970-02";

export function shiftMonth(month: string, delta: number): string {
  const [y, m] = month.split("-").map(Number);
  const d = new Date(Date.UTC(y, m - 1 + delta, 1));
  return d.toISOString().slice(0, 7);
}

export function monthLabel(month: string): string {
  const [y, m] = month.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

// ‹ Month YYYY › month stepper, forward disabled past the live month.
export function MonthNav({
  month,
  onChange,
  picker = false,
}: {
  month: string;
  onChange: (m: string) => void;
  picker?: boolean;
}) {
  return (
    <span className="seg">
      <button aria-label="Previous month" onClick={() => onChange(shiftMonth(month, -1))} disabled={month <= FIRST_REPORTING_MONTH}>‹</button>
      {picker ? <input className="month-picker" type="month" aria-label="Reporting month"
        value={month} min={FIRST_REPORTING_MONTH} max={currentMonth()} onChange={(event) => onChange(event.target.value)} />
        : <button className="active spend-month-label">{monthLabel(month)}</button>}
      <button aria-label="Next month" onClick={() => onChange(shiftMonth(month, 1))} disabled={month >= currentMonth()}>
        ›
      </button>
    </span>
  );
}
