import { useCallback } from "react";
import PanelLoading from "../components/PanelLoading";
import Ambient from "../components/Ambient";
import { money, MASK } from "../lib/format";
import { Hass, SpendingInvestments, SpendingRecurring, fetchSpendingInvestments, fetchSpendingRecurring, fetchSpendingSummary } from "../lib/ha";
import { SpendingSummary } from "../lib/types";
import { useReportingPeriod, PeriodQuery } from "../lib/reportingPeriod";
import PeriodTrend from "../components/PeriodTrend";
import InfoTooltip from "../components/InfoTooltip";
import InvestmentBreakdown from "./InvestmentBreakdown";
import { BaseCardConfig, ambientEffect, useNetwrthCore } from "./common";
import { MonthNav } from "./spendingCommon";

type Payload = { investments: SpendingInvestments; bills: SpendingRecurring; spending: SpendingSummary };

export default function InvestmentsCard({ hass, config }: {hass: Hass; config: BaseCardConfig}) {
  const {period,comparison,month,setMonth}=useReportingPeriod(hass,config.month_group);
  const fetchData = useCallback((h: Hass, entry: string | undefined, target: PeriodQuery = period) => Promise.all([
    fetchSpendingInvestments(h, entry, target), fetchSpendingRecurring(h, entry, target), fetchSpendingSummary(h, entry, target),
  ]).then(([investments, bills, spending]) => ({data: {investments, bills, spending}, censored: investments.censored})), [period,comparison]);
  const {overview, data, comparison: comparisonData, masked, error, loading} = useNetwrthCore<Payload>(hass, config.entry, fetchData, period, comparison);
  const format = (value: string | number) => masked ? MASK : money(Number(value));
  const investment = data?.investments;
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
      <InvestmentBreakdown key={period.key} investment={investment} period={period} masked={masked} />
      <PeriodTrend period={period} comparison={comparison} metrics={[{key:"investments",label:"Investment contributions",
        monthly:investment.monthly,planned:investment.planned_monthly,comparison:comparisonData?.investments.monthly}]}/>
      <div className="investment-remaining"><InfoTooltip key={period.key} className="investment-remaining-label" label="Explain income after commitments"
        content={<><h3>Income after commitments</h3><p>Recorded income − spending − remaining bills − investments.</p>
          <p>Investments include recorded contributions and scheduled payments awaiting a statement. Paid bills are already included in spending.</p></>}>
        <span>Income after commitments <span className="muted" aria-hidden="true">ⓘ</span></span></InfoTooltip>
        <strong className={remaining < 0 ? "down" : "up"}>{format(remaining)}</strong>
      </div>
    </>}
  </div>;
}
