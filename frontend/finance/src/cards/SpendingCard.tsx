import PanelLoading from "../components/PanelLoading";
import Ambient from "../components/Ambient";
import IncomeBreakdown from "./IncomeBreakdown";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { MASK, money } from "../lib/format";
import {
  Hass,
  SpendingRecurring,
  fetchSpendingRecurring,
  fetchSpendingSummary,
  fetchSpendingTransactions,
} from "../lib/ha";
import { SpendingSummary, SpendingTxn } from "../lib/types";
import { useReportingMonth } from "../lib/reportingMonth";
import { BaseCardConfig, ambientEffect, useNetwrthCore } from "./common";
import {
  MonthNav,
  PER_MONTH,
  amt,
  currentMonth,
  monthLabel,
  themeColor,
} from "./spendingCommon";

// Counterpart of the web dashboard's spending tab summary: the month's
// Spent / Income / Recurring stat tiles, the share-of-spending donut, and
// the "where it went" theme bars with a read-only transaction drill-down.
// Vendored from frontend/components/spending/SpendingPanel.tsx in the app
// repo — re-sync against it when the web graphs change.

export type SpendingCardConfig = BaseCardConfig & {
  show_stats?: boolean;
  show_donut?: boolean;
};

type Payload = { summary: SpendingSummary; recurring: SpendingRecurring };

// Small round merchant mark: logo when we have one, colored initial when
// we don't.
function MerchantDot({ tx }: { tx: SpendingTxn }) {
  const [broken, setBroken] = useState(false);
  const label = tx.merchant ?? tx.merchant_key;
  if (tx.logo_url && !broken) {
    return (
      <img
        className="spend-txn-logo"
        src={tx.logo_url}
        alt=""
        onError={() => setBroken(true)}
      />
    );
  }
  // Neutral chip with a thin theme-colored ring: no invented hues, and
  // the ring's meaning comes from the one system that already has color.
  return (
    <span
      className="spend-txn-logo spend-txn-initial"
      style={{ borderColor: themeColor(tx.theme ?? "other") }}
    >
      {(label.charAt(0) || "?").toUpperCase()}
    </span>
  );
}

// Part-to-whole donut beside the theme bars: at-a-glance shares only (the
// bars carry the exact comparisons). Top slices + a gray fold keep it ≤ 6
// segments.
function SpendDonut({
  rows,
  totalSpend,
  censored,
}: {
  rows: { theme: string; total: string }[];
  totalSpend: number;
  censored: boolean;
}) {
  const total = rows.reduce((a, r) => a + parseFloat(r.total), 0);
  if (total <= 0) return null;
  const MAX_SLICES = 5;
  const slices: { theme: string; value: number; color: string }[] = rows
    .slice(0, MAX_SLICES)
    .map((r) => ({ theme: r.theme, value: parseFloat(r.total), color: themeColor(r.theme) }));
  const rest = rows.slice(MAX_SLICES).reduce((a, r) => a + parseFloat(r.total), 0);
  if (rest > 0) slices.push({ theme: "everything else", value: rest, color: "#8b9bb4" });

  const R = 80;
  const r = 50;
  const C = 90;
  let angle = -Math.PI / 2; // start at 12 o'clock
  const arcs = slices.map((s) => {
    const sweep = (s.value / total) * Math.PI * 2;
    const a0 = angle;
    const a1 = angle + sweep;
    angle = a1;
    const large = sweep > Math.PI ? 1 : 0;
    const p = (rad: number, a: number) => `${C + rad * Math.cos(a)},${C + rad * Math.sin(a)}`;
    const d = `M${p(R, a0)} A${R},${R} 0 ${large} 1 ${p(R, a1)} L${p(r, a1)} A${r},${r} 0 ${large} 0 ${p(r, a0)} Z`;
    const mid = (a0 + a1) / 2;
    return { ...s, d, mid, share: s.value / total };
  });

  return (
    <svg viewBox="0 0 180 180" className="spend-donut" role="img" aria-label="Share of spending by theme">
      {arcs.map((a) => (
        <path key={a.theme} d={a.d} fill={a.color} fillOpacity={0.85}
          stroke="var(--nb-bg)" strokeWidth="2">
          <title>{`${a.theme} — ${Math.round(a.share * 100)}%${censored ? "" : ` (${amt(a.value, censored)})`}`}</title>
        </path>
      ))}
      {arcs
        .filter((a) => a.share >= 0.08)
        .map((a) => (
          <text
            key={`l-${a.theme}`}
            x={C + ((R + r) / 2) * Math.cos(a.mid)}
            y={C + ((R + r) / 2) * Math.sin(a.mid) + 4}
            textAnchor="middle"
            fill="#0b0f17"
            fontSize="11"
            fontWeight="600"
            pointerEvents="none"
          >
            {Math.round(a.share * 100)}%
          </text>
        ))}
      <text x={C} y={C - 2} textAnchor="middle" fill="var(--nb-text)" fontSize="15" fontWeight="600">
        {censored ? MASK : money(totalSpend)}
      </text>
      <text x={C} y={C + 14} textAnchor="middle" fill="var(--nb-muted)" fontSize="10">
        spent
      </text>
    </svg>
  );
}

export default function SpendingCard({
  hass,
  config,
}: {
  hass: Hass;
  config: SpendingCardConfig;
}) {
  const [month, setMonth] = useReportingMonth(hass, config.month_group);
  const [openTheme, setOpenTheme] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [showIncome, setShowIncome] = useState(false);
  const detailId = useId();
  const [txns, setTxns] = useState<SpendingTxn[] | null>(null);
  const [txnError, setTxnError] = useState<string | null>(null);
  const requestSequence = useRef(0);
  useEffect(() => {
    requestSequence.current += 1;
    setOpenTheme(null);
    setShowAll(false);
    setShowIncome(false);
    setTxns(null);
    setTxnError(null);
    return () => { requestSequence.current += 1; };
  }, [month]);

  const fetchData = useCallback(
    (h: Hass, e: string | undefined) =>
      Promise.all([fetchSpendingSummary(h, e, month), fetchSpendingRecurring(h, e, month)]).then(
        ([summary, recurring]) => ({ data: { summary, recurring } as Payload, censored: summary.censored })
      ),
    [month]
  );
  const { overview, data, masked, error, loading } = useNetwrthCore<Payload>(
    hass,
    config.entry,
    fetchData,
    month
  );

  const toggleTheme = (theme: string) => {
    const sequence = ++requestSequence.current;
    setTxnError(null);
    if (openTheme === theme) {
      setOpenTheme(null);
      setTxns(null);
      return;
    }
    setOpenTheme(theme);
    setTxns(null);
    fetchSpendingTransactions(hass, config.entry, month, theme)
      .then((out) => { if (sequence === requestSequence.current) setTxns(out.transactions); })
      .catch(() => { if (sequence === requestSequence.current) setTxnError("Unable to load these transactions."); });
  };

  const summary = data?.summary ?? null;
  const recurring = data?.recurring ?? null;

  const spendRows = summary
    ? summary.themes.filter((t) => parseFloat(t.total) > 0)
    : [];
  const maxTotal = Math.max(1e-9, ...spendRows.map((t) => parseFloat(t.total)));
  const visibleRows = showAll ? spendRows : spendRows.slice(0, 8);
  const totalSpend = Number(summary?.total_spend ?? 0);
  const bills = recurring ? recurring.streams.filter((s) => !s.is_income) : [];
  const activeBills = bills.filter((s) => s.active);
  const recurringMonthly = activeBills.reduce(
    (acc, s) => acc + parseFloat(s.monthly_amount ?? s.average_amount) * (s.monthly_amount ? 1 : (PER_MONTH[s.frequency] ?? 1)),
    0
  );
  // "On track for": what already left this month plus the bills still
  // predicted to come. Only meaningful while looking at the live month.
  const expectedBillsRemaining = recurring
    ? recurring.expected
        .filter((e) => !e.is_income && !e.overdue)
        .reduce((acc, e) => acc + e.amount, 0)
    : 0;
  const projectedSpend =
    summary && month === currentMonth() && expectedBillsRemaining > 0
      ? parseFloat(summary.total_spend) + expectedBillsRemaining
      : null;

  return (
    <div aria-busy={loading} className="card spending-card" data-reporting-month={month}>
      <Ambient effect={ambientEffect(config)} />
      <div className="head">
        <h2>{config.title ?? "Spending"}</h2>
        <span className="head-right">
          {config.month_group ? <span className="muted">{monthLabel(month)}</span> : <MonthNav month={month} onChange={setMonth} />}
        </span>
      </div>
      {error && <div className="error-box">{error}</div>}
      <PanelLoading loading={loading} refreshing={!!overview} />
      {!error && summary && (
        <>
          {config.show_stats !== false && (
            <div className="spend-stats">
              <div className="spend-stat">
                <span className="spend-stat-label">Spent</span>
                <span className="spend-stat-value">
                  {masked ? MASK : money(parseFloat(summary.total_spend))}
                </span>
                {projectedSpend !== null && !masked && (
                  <span className="muted">plus scheduled bills ~{money(projectedSpend)}</span>
                )}
              </div>
              <button className="spend-stat spend-income-trigger" onClick={() => setShowIncome(!showIncome)}
                aria-label="View income sources" aria-expanded={showIncome} aria-controls={`${detailId}-income`}>
                <span className="spend-stat-label">Income <span className="income-trigger-hint">Sources {showIncome ? "↑" : "↓"}</span></span>
                <span className="spend-stat-value up">
                  {masked ? MASK : money(parseFloat(summary.total_income))}
                </span>
                <span className="muted">{summary.income_categories.join(" + ")}</span>
                {Number(summary.total_other_credits) > 0 && <span className="muted income-other-total">
                  Other credits {money(Number(summary.total_other_credits))}
                </span>}
              </button>
              <div className="spend-stat">
                <span className="spend-stat-label">Recurring bills</span>
                <span className="spend-stat-value">
                  {masked ? MASK : `${money(recurringMonthly)}/mo`}
                </span>
                <span className="muted">{activeBills.length} active</span>
              </div>
            </div>
          )}
          {showIncome && <section id={`${detailId}-income`} aria-label="Income sources">
            <IncomeBreakdown key={month} hass={hass} entry={config.entry} month={month}
              summary={summary} accounts={overview?.accounts ?? []} />
          </section>}

          {spendRows.length === 0 && <div className="status">No spending recorded this month.</div>}
          {spendRows.length > 0 && (
            <div className="spend-themes-split">
              {config.show_donut !== false && (
                <div className="spend-breakdown-summary">
                <SpendDonut
                  rows={spendRows}
                  totalSpend={parseFloat(summary.total_spend)}
                  censored={masked}
                />
                  <div className="spend-category-caption">{spendRows.length} spending categories</div>
                  <p className="muted">Select a category to see its transactions.</p>
                </div>
              )}
              <div className="spend-themes-bars">
                <div className="spend-category-grid">
                {visibleRows.map((t, index) => (
                  <div key={t.theme} className={`spend-category-entry ${openTheme === t.theme ? "expanded" : ""}`}>
                    <button
                      className={`spend-row ${openTheme === t.theme ? "open" : ""}`}
                      onClick={() => toggleTheme(t.theme)}
                      aria-expanded={openTheme === t.theme}
                      aria-controls={`${detailId}-${index}`}
                    >
                      <span className="spend-row-label">
                        <span
                          className="spend-theme-dot"
                          style={{ background: themeColor(t.theme) }}
                        />
                        <span>{t.theme}</span>
                      </span>
                      <span className="spend-row-amount">{amt(parseFloat(t.total), masked)}</span>
                      <span className="spend-row-bar">
                        <span
                          className="spend-row-fill"
                          style={{
                            width: `${(parseFloat(t.total) / maxTotal) * 100}%`,
                            ["--bar-color" as string]: themeColor(t.theme),
                          }}
                        />
                      </span>
                      <span className="muted spend-row-count">{(Number(t.total) / totalSpend * 100).toFixed(1)}% · {t.count} {t.count === 1 ? "txn" : "txns"}</span>
                    </button>
                    {openTheme === t.theme && (
                      <div className="spend-txns" aria-busy={txns === null && !txnError} id={`${detailId}-${index}`}>
                        {txnError && <div className="error-box">{txnError}</div>}
                        <PanelLoading loading={txns === null && !txnError} label="Loading transactions…" />
                        {txns !== null &&
                          [...txns]
                            .sort(
                              (a, b) =>
                                Number(b.pending) - Number(a.pending) ||
                                b.posted_at.localeCompare(a.posted_at)
                            )
                            .map((tx) => (
                              <div key={tx.id} className="spend-txn">
                                <span className="muted spend-txn-date">
                                  {new Date(tx.posted_at).toLocaleDateString("en-IN", {
                                    month: "short",
                                    day: "numeric",
                                    timeZone: "Asia/Kolkata",
                                  })}
                                </span>
                                <MerchantDot tx={tx} />
                                <span className="spend-txn-desc" title={tx.description}>
                                  {tx.merchant ?? tx.description}
                                  {tx.pending ? " · pending" : ""}
                                </span>
                                <span className="spend-txn-amount">
                                  {amt(parseFloat(tx.amount), masked)}
                                </span>
                              </div>
                            ))}
                      </div>
                    )}
                  </div>
                ))}
                </div>
                {spendRows.length > 8 && <button className="spend-show-all" aria-expanded={showAll}
                  onClick={() => { setShowAll(!showAll); requestSequence.current += 1; setOpenTheme(null); setTxns(null); setTxnError(null); }}>
                  {showAll ? "Show top 8 categories" : `Show all ${spendRows.length} categories`}
                  <span aria-hidden="true">{showAll ? "↑" : "↓"}</span>
                </button>}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
