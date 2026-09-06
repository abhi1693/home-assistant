import PanelLoading from "../components/PanelLoading";
import InfoTooltip from "../components/InfoTooltip";
import { useMemo, useState } from "react";
import Ambient from "../components/Ambient";
import { Hass } from "../lib/ha";
import { MASK, money, pct, shortDate, signedMoney } from "../lib/format";
import { Account, RANGES, RangeKey } from "../lib/types";
import { alignSeries, sumRow } from "../lib/series";
import { VIEWS, ViewKey } from "../lib/views";
import { BaseCardConfig, Segmented, useNetwrth, useVisibleAccounts, ambientEffect } from "./common";

export type StatCardConfig = BaseCardConfig & {
  view?: ViewKey;
  range?: RangeKey;
  show_controls?: boolean;
  show_range_selector?: boolean;
  // Retain the existing option name for the explanatory account breakdown.
  show_composition?: boolean;
  layout?: "card" | "banner";
};

type Part = { key: string; label: string; value: number; accounts: { name: string; value: number }[] };

function partsOf(values: Record<number, number>, accounts: Account[]): Part[] {
  const groups: Part[] = [
    { key: "cash", label: "Cash & bank", value: 0, accounts: [] },
    { key: "investments", label: "Investments", value: 0, accounts: [] },
    { key: "other", label: "Other assets", value: 0, accounts: [] },
    { key: "negative", label: "Negative balances", value: 0, accounts: [] },
  ];
  for (const account of accounts) {
    const value = values[account.id] ?? 0;
    if (!value) continue;
    // Every balance contributes once. A negative investment is not evidence of
    // a loan, and must not also enter the positive investment total.
    const group = groups[value < 0 ? 3 : account.kind === "cash" ? 0 : account.kind === "investment" ? 1 : 2];
    group.value += value;
    group.accounts.push({ name: account.nickname || account.name, value });
  }
  for (const group of groups) group.accounts.sort((a, b) => Math.abs(b.value) - Math.abs(a.value));
  return groups.filter((group) => group.accounts.length > 0);
}

const RANGE_LABELS: Record<RangeKey, string> = {
  "1d": "over 1 day", "1w": "over 7 days", "1m": "over 30 days", "3m": "over 90 days",
  "6m": "over 180 days", "1y": "over 365 days", all: "over available history",
};

function Breakdown({ parts }: { parts: Part[] }) {
  if (!parts.length) return null;
  return <section className="worth-breakdown" aria-label="Net worth breakdown">
    <div className="worth-breakdown-heading">What makes up this total</div>
    <div className="worth-equation">
      {parts.map((part, index) => <div className={`worth-term worth-${part.key}`} key={part.key}>
        <span className="worth-operator" aria-hidden="true">{part.value < 0 ? "−" : index ? "+" : ""}</span>
        <InfoTooltip className="worth-component"
          label={`${part.label}: ${money(Math.abs(part.value))}. Show account breakdown`}
          content={<>
            <h3>{part.label}</h3>
            <p>{part.value < 0 ? "Balances below zero subtract from tracked net worth." : "These positive balances add to tracked net worth."}</p>
            <dl className="worth-account-details">{part.accounts.map((account, i) =>
              <div key={i}><dt>{account.name}</dt><dd>{money(account.value, true)}</dd></div>)}</dl>
            <div className="worth-tooltip-total"><span>Total</span><strong>{money(part.value, true)}</strong></div>
          </>}>
          <span className="worth-component-label"><i aria-hidden="true" />{part.label}</span>
          <strong className="worth-component-value">{money(Math.abs(part.value))}</strong>
          <span className="worth-component-detail">{part.accounts.length} {part.accounts.length === 1 ? "account" : "accounts"}<span aria-hidden="true"> · ⓘ</span></span>
        </InfoTooltip>
      </div>)}
    </div>
  </section>;
}

export default function StatCard({ hass, config }: { hass: Hass; config: StatCardConfig }) {
  const view = VIEWS.find((v) => v.key === (config.view ?? "all")) ?? VIEWS[2];
  const [range, setRange] = useState<RangeKey>(config.range ?? "1m");
  const { overview, series, masked, error, loading } = useNetwrth(hass, config.entry, range);
  const visible = useVisibleAccounts(overview);
  const accounts = useMemo(() => visible.filter(view.pick), [visible, view]);
  const stat = useMemo(() => {
    if (!series) return null;
    const ids = new Set(accounts.map((a) => a.id));
    const rows = alignSeries(series.filter((s) => ids.has(s.account_id)));
    if (!rows.length) return null;
    const first = sumRow(rows[0], accounts);
    const last = sumRow(rows[rows.length - 1], accounts);
    return {
      first, last, diff: last - first, delta: first !== 0 ? (last - first) / Math.abs(first) : null,
      start: rows[0].ts, end: rows[rows.length - 1].ts,
      parts: partsOf(rows[rows.length - 1].values, accounts),
    };
  }, [series, accounts]);

  return <div className={`card stat-card${config.layout === "banner" ? " stat-banner" : ""}`} aria-busy={loading}>
    <Ambient effect={ambientEffect(config)} />
    <div className="head">
      <h2>{config.title ?? view.label}</h2>
      {config.show_controls !== false && config.show_range_selector !== false && <span className="head-right controls">
        <Segmented options={RANGES} value={range} onChange={setRange} />
      </span>}
    </div>
    {error && <div className="error-box">{error}</div>}
    <PanelLoading loading={loading} refreshing={!!overview} />
    {!loading && !error && !stat && <div className="status">No data for this view yet.</div>}
    {!error && stat && masked && <div className={`stat-value ${stat.delta != null && !view.flow ? stat.delta >= 0 ? "up" : "down" : ""}`}>
      {stat.delta != null && !view.flow ? pct(stat.delta) : MASK}
    </div>}
    {!error && stat && !masked && <div className="worth-summary">
      <div className="worth-primary">
        <div className="stat-value">{money(stat.last)}</div>
        <div className="stat-delta">
          <InfoTooltip key={range} className={`chip change-explainer ${stat.diff >= 0 ? "up" : "down"}`}
            label="Explain net worth change"
            content={<>
              <h3>Change in tracked net worth</h3>
              <p>Your tracked balance is {money(Math.abs(stat.diff), true)} {stat.diff < 0 ? "lower" : "higher"} than at the start of this comparison.</p>
              <dl className="worth-change-details">
                <div><dt>Start · {shortDate(stat.start, false, true)}</dt><dd>{money(stat.first, true)}</dd></div>
                <div><dt>End · {shortDate(stat.end, false, true)}</dt><dd>{money(stat.last, true)}</dd></div>
                <div className="worth-tooltip-total"><dt>End − start</dt><dd>{money(stat.diff, true)}</dd></div>
              </dl>
              {!view.flow && <p className="worth-formula">{stat.delta == null
                ? "Percentage change is unavailable because the starting balance is ₹0."
                : `Percentage = change ÷ absolute starting balance × 100 = ${pct(stat.delta)}.`}</p>}
              <p className="worth-change-note">This includes changes across all accounts in this total, including cash movements, imported valuations and balance corrections.</p>
            </>}>
            {signedMoney(stat.diff)}{!view.flow && stat.delta != null && ` (${pct(stat.delta)})`}<span aria-hidden="true"> ⓘ</span>
          </InfoTooltip>
          <span>{RANGE_LABELS[range]}</span>
        </div>
      </div>
      {config.show_composition !== false && <Breakdown parts={stat.parts} />}
    </div>}
  </div>;
}
