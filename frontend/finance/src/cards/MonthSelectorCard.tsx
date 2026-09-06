import { Hass } from "../lib/ha";
import { useReportingMonth } from "../lib/reportingMonth";
import { BaseCardConfig } from "./common";
import { currentMonth, MonthNav } from "./spendingCommon";

export default function MonthSelectorCard({ hass, config }: { hass: Hass; config: BaseCardConfig }) {
  const [month, setMonth] = useReportingMonth(hass, config.month_group);
  return (
    <div className="card reporting-month-card">
      <h2>{config.title ?? "Reporting month"}</h2>
      <div className="reporting-month-controls">
        <MonthNav month={month} onChange={setMonth} picker />
        <span className="seg">
          <button disabled={month === currentMonth()} onClick={() => setMonth(currentMonth())}>This month</button>
        </span>
      </div>
    </div>
  );
}
