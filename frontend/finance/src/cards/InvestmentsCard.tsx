import { useCallback } from "react";
import PanelLoading from "../components/PanelLoading";
import Ambient from "../components/Ambient";
import { money, MASK } from "../lib/format";
import { Hass, SpendingInvestments, SpendingRecurring, fetchSpendingInvestments, fetchSpendingRecurring, fetchSpendingSummary } from "../lib/ha";
import { SpendingSummary } from "../lib/types";
import { useReportingPeriod, PeriodQuery } from "../lib/reportingPeriod";
import PeriodTrend from "../components/PeriodTrend";
import { BaseCardConfig, ambientEffect, useNetwrthCore } from "./common";
import { MonthNav } from "./spendingCommon";

type Payload = { investments: SpendingInvestments; bills: SpendingRecurring; spending: SpendingSummary };
const statusLabel = { recorded: "Recorded", scheduled: "Scheduled", awaiting_statement: "Awaiting statement" };

export default function InvestmentsCard({ hass, config }: {hass: Hass; config: BaseCardConfig}) {
  const {period,comparison,month,setMonth}=useReportingPeriod(hass,config.month_group);
  const fetchData = useCallback((h: Hass, entry: string | undefined, target: PeriodQuery = period) => Promise.all([
    fetchSpendingInvestments(h, entry, target), fetchSpendingRecurring(h, entry, target), fetchSpendingSummary(h, entry, target),
  ]).then(([investments, bills, spending]) => ({data: {investments, bills, spending}, censored: investments.censored})), [period,comparison]);
  const {overview, data, comparison: comparisonData, masked, error, loading} = useNetwrthCore<Payload>(hass, config.entry, fetchData, period, comparison);
  const format = (value: string | number) => masked ? MASK : money(Number(value));
  const investment = data?.investments;
  const rows = investment ? [...investment.recorded, ...investment.expected].sort((a,b) => a.date.localeCompare(b.date) || a.name.localeCompare(b.name)) : [];
  const remaining = data ? Number(data.spending.total_income) - Number(data.spending.total_spend)
    - Number(data.bills.total_remaining) - Number(data.investments.total_committed) : 0;
  return <div className="card investments-card" aria-busy={loading} data-reporting-month={period.mode==="month"?month:undefined} data-reporting-period={period.key}>
    <Ambient effect={ambientEffect(config)} />
    <div className="head"><h2>{config.title ?? "Investments"}</h2><span className="head-right">
      {config.month_group ? <span className="muted">{period.label}</span> : <MonthNav month={month} onChange={setMonth} />}
    </span></div>
    {error && <div className="error-box">{error}</div>}
    <PanelLoading loading={loading} refreshing={!!overview} />
    {!error && investment && <>
      <div className="investment-stats">
        <div><span className="spend-stat-label">Investments {period.mode==="month"?"this month":"in this period"}</span><strong className="investment-total">{format(investment.total_committed)}</strong></div>
        <div><span className="spend-stat-label">Recorded</span><strong className="investment-recorded">{format(investment.total_recorded)}</strong></div>
        <div><span className="spend-stat-label">Scheduled / awaiting statement</span><strong className="investment-pending">{format(investment.total_pending)}</strong></div>
      </div>
      <PeriodTrend period={period} comparison={comparison} metrics={[{key:"investments",label:"Investment contributions",
        monthly:investment.monthly,planned:investment.planned_monthly,comparison:comparisonData?.investments.monthly}]}/>
      {rows.length === 0 ? <div className="status">No investments recorded or scheduled in this period.</div> :
        <div className={`investment-list ${period.wide?"period-detail-list":""}`} role="list" aria-label="Investments in this period">{rows.map(row => <div className="investment-row" role="listitem" key={row.id}>
          <time dateTime={row.date}>{new Date(`${row.date}T12:00:00+05:30`).toLocaleDateString("en-IN", {day:"numeric", month:"short", ...(period.wide?{year:"numeric" as const}:{}), timeZone:"Asia/Kolkata"})}</time>
          <div className="investment-name">{row.name}<span className={`investment-status ${row.status}`}>{statusLabel[row.status]}</span></div>
          <strong>{format(row.amount)}</strong>
        </div>)}</div>}
      <div className="investment-remaining"><div><strong>Income after commitments</strong>
        <span className="muted">Recorded income − spending − remaining bills − investments</span></div>
        <strong className={remaining < 0 ? "down" : "up"}>{format(remaining)}</strong>
      </div>
    </>}
  </div>;
}
