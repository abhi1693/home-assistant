import { useCallback } from "react";
import PanelLoading from "../components/PanelLoading";
import Ambient from "../components/Ambient";
import { money, MASK } from "../lib/format";
import { Hass, SpendingInvestments, SpendingRecurring, fetchSpendingInvestments, fetchSpendingRecurring, fetchSpendingSummary } from "../lib/ha";
import { SpendingSummary } from "../lib/types";
import { useReportingMonth } from "../lib/reportingMonth";
import { BaseCardConfig, ambientEffect, useNetwrthCore } from "./common";
import { MonthNav, monthLabel } from "./spendingCommon";

type Payload = { investments: SpendingInvestments; bills: SpendingRecurring; spending: SpendingSummary };
const statusLabel = { recorded: "Recorded", scheduled: "Scheduled", awaiting_statement: "Awaiting statement" };

export default function InvestmentsCard({ hass, config }: {hass: Hass; config: BaseCardConfig}) {
  const [month, setMonth] = useReportingMonth(hass, config.month_group);
  const fetchData = useCallback((h: Hass, entry: string | undefined) => Promise.all([
    fetchSpendingInvestments(h, entry, month), fetchSpendingRecurring(h, entry, month), fetchSpendingSummary(h, entry, month),
  ]).then(([investments, bills, spending]) => ({data: {investments, bills, spending}, censored: investments.censored})), [month]);
  const {overview, data, masked, error, loading} = useNetwrthCore<Payload>(hass, config.entry, fetchData, month);
  const format = (value: string | number) => masked ? MASK : money(Number(value));
  const investment = data?.investments;
  const rows = investment ? [...investment.recorded, ...investment.expected].sort((a,b) => a.date.localeCompare(b.date) || a.name.localeCompare(b.name)) : [];
  const remaining = data ? Number(data.spending.total_income) - Number(data.spending.total_spend)
    - Number(data.bills.total_remaining) - Number(data.investments.total_committed) : 0;
  return <div className="card investments-card" aria-busy={loading} data-reporting-month={month}>
    <Ambient effect={ambientEffect(config)} />
    <div className="head"><h2>{config.title ?? "Investments"}</h2><span className="head-right">
      {config.month_group ? <span className="muted">{monthLabel(month)}</span> : <MonthNav month={month} onChange={setMonth} />}
    </span></div>
    {error && <div className="error-box">{error}</div>}
    <PanelLoading loading={loading} refreshing={!!overview} />
    {!error && investment && <>
      <div className="investment-stats">
        <div><span className="spend-stat-label">Investments this month</span><strong className="investment-total">{format(investment.total_committed)}</strong></div>
        <div><span className="spend-stat-label">Recorded</span><strong className="investment-recorded">{format(investment.total_recorded)}</strong></div>
        <div><span className="spend-stat-label">Scheduled / awaiting statement</span><strong className="investment-pending">{format(investment.total_pending)}</strong></div>
      </div>
      {rows.length === 0 ? <div className="status">No investments recorded or scheduled this month.</div> :
        <div className="investment-list" role="list" aria-label="Monthly investments">{rows.map(row => <div className="investment-row" role="listitem" key={row.id}>
          <time dateTime={row.date}>{new Date(`${row.date}T12:00:00+05:30`).toLocaleDateString("en-IN", {day:"numeric", month:"short", timeZone:"Asia/Kolkata"})}</time>
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
