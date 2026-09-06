import { useEffect, useState } from "react";
import { Hass } from "../lib/ha";
import { PeriodMode, useReportingPeriod, dateLabel, todayDate } from "../lib/reportingPeriod";
import { BaseCardConfig } from "./common";
import { currentMonth, MonthNav } from "./spendingCommon";

export default function MonthSelectorCard({ hass, config }: { hass: Hass; config: BaseCardConfig }) {
  const {selection,select,period,comparison,month,setMonth}=useReportingPeriod(hass,config.month_group);
  const [start,setStart]=useState(selection.start),[end,setEnd]=useState(selection.end);
  useEffect(()=>{setStart(selection.start);setEnd(selection.end);},[selection.start,selection.end]);
  const currentYear=Number(todayDate().slice(0,4));
  const latestYear=selection.mode==="financial" && Number(currentMonth().slice(5))<4 ? currentYear-1 : currentYear;
  const years=Array.from({length:latestYear-1970},(_,i)=>latestYear-i);
  const invalidCustom=!start||!end||start>end||start>todayDate()||Date.parse(end)-Date.parse(start)>1830*86400000;
  const modes:[PeriodMode,string][]=[["month","Month"],["calendar","Calendar year"],["financial","Financial year"],["custom","Custom"]];
  return <div className="card reporting-month-card reporting-period-card">
    <div className="period-selector-top"><h2>{config.title ?? "Reporting period"}</h2>
      <span className="seg period-modes">{modes.map(([mode,label])=><button key={mode} aria-pressed={selection.mode===mode}
        className={selection.mode===mode?"active":""} onClick={()=>select({mode,compareYear:null,
          ...(mode==="financial"?{year:Math.min(selection.year,Number(currentMonth().slice(5))<4?currentYear-1:currentYear)}:{})})}>{label}</button>)}</span>
    </div>
    <div className="reporting-month-controls period-controls">
      {selection.mode==="month" ? <><MonthNav month={month} onChange={setMonth} picker />
        <span className="seg"><button disabled={month===currentMonth()} onClick={()=>setMonth(currentMonth())}>This month</button></span></>
        : selection.mode==="custom" ? <form className="period-custom" onSubmit={event=>{event.preventDefault();if(!invalidCustom)select({start,end});}}>
          <label>From<input type="date" aria-label="Period start" min="1970-02-01" max={todayDate()} value={start} onChange={e=>setStart(e.target.value)} required /></label>
          <label>To<input type="date" aria-label="Period end" min={start} value={end} onChange={e=>setEnd(e.target.value)} required /></label>
          <button className="period-apply" disabled={invalidCustom}>Apply dates</button>
        </form> : <span className="seg period-year-nav">
          <button aria-label="Previous year" disabled={selection.year<=1971} onClick={()=>select({year:selection.year-1,compareYear:null})}>‹</button>
          <select aria-label="Reporting year" value={selection.year} onChange={e=>select({year:Number(e.target.value),compareYear:null})}>
            {years.map(year=><option key={year} value={year}>{selection.mode==="financial"?`FY ${year}–${String(year+1).slice(-2)}`:year}</option>)}
          </select><button aria-label="Next year" disabled={selection.year>=latestYear} onClick={()=>select({year:selection.year+1,compareYear:null})}>›</button>
        </span>}
      <label className="period-compare-select">Compare with<select aria-label="Comparison year" value={comparison?selection.compareYear!:""}
        onChange={e=>select({compareYear:e.target.value?Number(e.target.value):null})}>
        <option value="">No comparison</option>
        {years.filter(year=>year<Number(period.start.slice(0,4))).map(year=><option key={year} value={year}>{selection.mode==="financial"?`FY ${year}–${String(year+1).slice(-2)}`:year}</option>)}
      </select></label>
    </div>
    {(selection.mode!=="month"||comparison) && <div className="period-context">
      <span>{dateLabel(period.start)} – {dateLabel(period.end)}</span>
      {period.actualEnd<period.end && <span>Actuals through {dateLabel(period.actualEnd)}; later commitments stay scheduled.</span>}
      {comparison && <span>Compared with {dateLabel(comparison.start)} – {dateLabel(comparison.end)}.</span>}
    </div>}
    {selection.mode==="custom"&&invalidCustom&&<p className="muted">Choose dates in order, up to five years, starting on or before today.</p>}
  </div>;
}
