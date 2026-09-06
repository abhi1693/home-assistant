import { useCallback } from "react";
import PanelLoading from "../components/PanelLoading";
import Ambient from "../components/Ambient";
import { Hass, fetchSeries, fetchSpendingTransactions } from "../lib/ha";
import { AccountSeries, SpendingTxn } from "../lib/types";
import { useReportingPeriod, PeriodQuery } from "../lib/reportingPeriod";
import { BaseCardConfig, ambientEffect, useNetwrthCore } from "./common";
import { MonthNav } from "./spendingCommon";
import CashflowCharts from "./CashflowCharts";

export type AccountsCardConfig = BaseCardConfig & { savings_account_ids?: number[] };
export type CashflowPayload = { series: AccountSeries[]; transactions: SpendingTxn[] };

// Keep the existing custom-card tag so the dashboard migrates in place.
export default function AccountsCard({ hass, config }: { hass: Hass; config: AccountsCardConfig }) {
  const { period, comparison, month, setMonth } = useReportingPeriod(hass, config.month_group);
  const fetchData = useCallback((h: Hass, entry: string | undefined, target: PeriodQuery = period) =>
    Promise.all([fetchSeries(h, entry, "1m", target), fetchSpendingTransactions(h, entry, target)])
      .then(([series, tx]) => ({ data: { series: series.series, transactions: tx.transactions }, censored: tx.censored })), [period]);
  const { overview, data, comparison: previous, comparisonOverview, loading, error } = useNetwrthCore<CashflowPayload>(hass, config.entry, fetchData, period, comparison);
  return <div className="card accounts-card cashflow-card" aria-busy={loading}
    data-reporting-month={period.mode === "month" ? month : undefined} data-reporting-period={period.key}>
    <Ambient effect={ambientEffect(config)} />
    <div className="head"><h2>{config.title ?? "Savings & spending"}</h2><span className="head-right">
      {config.month_group ? <span className="muted">{period.label}</span> : <MonthNav month={month} onChange={setMonth} />}
    </span></div>
    {error && <div className="error-box">{error}</div>}
    <PanelLoading loading={loading} refreshing={!!overview} />
    {!error && overview && data && <CashflowCharts key={`${period.key}:${comparison?.key ?? ""}`}
      accounts={overview.accounts} data={data} previous={previous ?? undefined} previousAccounts={comparisonOverview?.accounts}
      period={period} comparison={comparison} savingsIds={config.savings_account_ids} />}
  </div>;
}
