import React, { useMemo, useState } from "react";
import Ambient from "../components/Ambient";
import { Hass } from "../lib/ha";
import { money, pct } from "../lib/format";
import { Account, RANGES, RangeKey } from "../lib/types";
import { VIEWS, ViewKey } from "../lib/views";
import { useReportingMonth } from "../lib/reportingMonth";
import { monthLabel } from "./spendingCommon";
import {
  BaseCardConfig,
  Segmented,

  useNetwrth,
  ambientEffect,
} from "./common";

export type AccountsCardConfig = BaseCardConfig & {
  view?: ViewKey;
  range?: RangeKey;
  show_controls?: boolean;
  show_range_selector?: boolean;
  // Only show accounts whose nickname or name matches one of these
  // (case-insensitive substring). Applied on top of the view filter.
  accounts?: string[];
};

const KIND_ORDER = ["cash", "investment", "credit", "loan", "other"] as const;

// Stable account initials and colors avoid repeating the adapter's logo.
const MONO_GRADIENTS = [
  ["#3b82f6", "#2563eb"],
  ["#10b981", "#059669"],
  ["#8b5cf6", "#6366f1"],
  ["#f59e0b", "#d97706"],
  ["#ec4899", "#db2777"],
  ["#06b6d4", "#0891b2"],
] as const;

function monogram(a: Account) {
  const inst = a.nickname || a.name;
  let hash = 0;
  for (let i = 0; i < inst.length; i++) hash = (hash * 31 + inst.charCodeAt(i)) | 0;
  const [g1, g2] = MONO_GRADIENTS[Math.abs(hash) % MONO_GRADIENTS.length];
  const words = inst.trim().split(/\s+/);
  const letter = (words[0] === words[0].toUpperCase()
    ? words[0].slice(0, 2)
    : words.slice(0, 2).map(word => word[0]).join("")).toUpperCase();
  return { letter: letter || "?", g1, g2 };
}

function balanceLabel(a: Account, masked: boolean): string {
  if (a.balance == null) return "–";
  const v = parseFloat(a.balance);
  return masked ? `${v.toFixed(1)}%` : money(v, true);
}

// Responsive groups keep account names, balances and period changes together.
export default function AccountsCard({
  hass,
  config,
}: {
  hass: Hass;
  config: AccountsCardConfig;
}) {
  const view = VIEWS.find((v) => v.key === (config.view ?? "all")) ?? VIEWS[2];
  const [range, setRange] = useState<RangeKey>(config.range ?? "1m");
  const [month] = useReportingMonth(hass, config.month_group);
  const { overview, series, masked, error, refresh } = useNetwrth(hass, config.entry, range, config.month_group ? month : undefined);
  const visible = overview?.accounts ?? [];
  const nameFilter = config.accounts;
  const accounts = useMemo(() => {
    let list = visible.filter(view.pick);
    if (nameFilter && nameFilter.length > 0) {
      const wanted = nameFilter.map((n) => n.trim().toLowerCase()).filter(Boolean);
      list = list.filter((a) =>
        wanted.some(
          (w) =>
            (a.nickname ?? "").toLowerCase().includes(w) ||
            a.name.toLowerCase().includes(w)
        )
      );
    }
    return list;
  }, [visible, view, nameFilter]);

  // Change over the selected window, per account. Censored values are
  // rescaled proportionally server-side, so the percent survives masking.
  const deltas = useMemo(() => {
    const m = new Map<number, number>();
    if (!series) return m;
    for (const s of series) {
      if (s.points.length < 2) continue;
      const pts = [...s.points].sort(
        (a, b) => new Date(a.ts).getTime() - new Date(b.ts).getTime()
      );
      const first = parseFloat(pts[0].balance);
      const last = parseFloat(pts[pts.length - 1].balance);
      if (first !== 0) m.set(s.account_id, (last - first) / Math.abs(first));
    }
    return m;
  }, [series]);

  const groups = useMemo(
    () =>
      KIND_ORDER.map((kind) => ({
        kind,
        accounts: accounts.filter((a) => a.kind === kind),
      })).filter((g) => g.accounts.length > 0),
    [accounts]
  );

  return (
    <div className="card accounts-card" data-reporting-month={config.month_group ? month : undefined}>
      <Ambient effect={ambientEffect(config)} />
      <div className="head">
        <h2>{config.title ?? "Accounts"}</h2>
        <span className="head-right">
          {config.month_group && <span className="muted" title="Closing balances for the selected month; current month is as of today">{monthLabel(month)}</span>}
          {!config.month_group && config.show_controls !== false && config.show_range_selector !== false && (
            <span className="controls">
              <Segmented options={RANGES} value={range} onChange={setRange} />
            </span>
          )}
        </span>
      </div>
      {error && <div className="error-box">{error}</div>}
      {!error && !overview && <div className="status">Loading…</div>}
      {!error && overview && groups.length === 0 && (
        <div className="status">No accounts.</div>
      )}
      {!error && overview && groups.length > 0 && (
        <div className="account-groups">
            {groups.map((g) => (
              <AccountGroup
                key={g.kind}
                kind={g.kind}
                accounts={g.accounts}
                masked={masked}
                deltas={deltas}
                period={config.month_group ? monthLabel(month) : range}
              />
            ))}
        </div>
      )}
    </div>
  );
}

function AccountGroup({
  kind,
  accounts,
  masked,
  deltas,
  period,
}: {
  kind: string;
  accounts: Account[];
  masked: boolean;
  deltas: Map<number, number>;
  period: string;
}) {
  return (
    <section className="account-group" aria-label={`${kind} accounts`}>
      <h3>{kind} <span>{accounts.length}</span></h3>
      <div className="account-grid">
      {accounts.map((a) => {
        const delta = deltas.get(a.id);
        const mono = monogram(a);
        return (
          <div className="account-item" key={a.id}>
            <div className="name-cell">
              <span
                className="mono"
                style={{ "--mono-a": mono.g1, "--mono-b": mono.g2 } as React.CSSProperties}
              >
                {mono.letter}
              </span>
              <span className="name-text">
                <span>{a.nickname || a.name}</span>
              </span>
            </div>
            <div className="account-figures">
              <span className="num account-balance">{balanceLabel(a, masked)}</span>
              <span className={`row-delta ${delta == null || delta === 0 ? "muted" : delta > 0 ? "up" : "down"}`}
                title={`Balance change during ${period}`}>
                {delta == null ? "–" : delta === 0 ? "0.0%" : pct(delta)}
              </span>
            </div>
          </div>
        );
      })}
      </div>
    </section>
  );
}
