import { useEffect, useState } from "react";
import { Hass } from "../lib/ha";
import { PeriodMode, useReportingPeriod, dateLabel, todayDate, resolvePeriod, comparisonMonths } from "../lib/reportingPeriod";
import { BaseCardConfig } from "./common";
import { currentMonth, monthLabel, MonthNav } from "./spendingCommon";

export default function MonthSelectorCard({ hass, config }: { hass: Hass; config: BaseCardConfig }) {
  const {selection,select,period,comparison,month,setMonth}=useReportingPeriod(hass,config.month_group);
  const [history,setHistory]=useState<{connection:Hass["connection"];userId?:string;entry?:string;firstDate:string|null;error?:string}|null>(null);
  useEffect(()=>{
    let alive=true;
    const refresh=()=>hass.connection.sendMessagePromise<{first_date:string|null}>({type:"family_finance/history",
      ...(config.entry?{entry_id:config.entry}:{})}).then(result=>{
        if(alive)setHistory({connection:hass.connection,userId:hass.user?.id,entry:config.entry,firstDate:result.first_date});
      }).catch(error=>{
        if(alive)setHistory({connection:hass.connection,userId:hass.user?.id,entry:config.entry,firstDate:null,error:error?.message??"Unable to load available dates"});
      });
    void refresh();
    const timer=setInterval(refresh,300_000);
    const wake=()=>{if(document.visibilityState==="visible")void refresh();};
    document.addEventListener("visibilitychange",wake);
    return()=>{alive=false;clearInterval(timer);document.removeEventListener("visibilitychange",wake);};
  },[hass.connection,hass.user?.id,config.entry]);
  const currentHistory=history?.connection===hass.connection&&history.userId===hass.user?.id&&history.entry===config.entry?history:null;
  const loading=!currentHistory;
  const firstDate=currentHistory?.firstDate??todayDate();
  const firstMonth=firstDate.slice(0,7);
  const [start,setStart]=useState(selection.start),[end,setEnd]=useState(selection.end);
  useEffect(()=>{setStart(selection.start);setEnd(selection.end);},[selection.start,selection.end]);
  const currentYear=Number(todayDate().slice(0,4));
  const latestYear=selection.mode==="financial" && Number(currentMonth().slice(5))<4 ? currentYear-1 : currentYear;
  const earliestYear=Number(firstDate.slice(0,4))-(selection.mode==="financial"&&Number(firstDate.slice(5,7))<4?1:0);
  const years=Array.from({length:Math.max(1,latestYear-earliestYear+1)},(_,i)=>latestYear-i);
  const comparisonYears=years.filter(year=>{
    if(year>=Number(period.start.slice(0,4)))return false;
    const candidate=resolvePeriod({...selection,compareYear:year}).comparison;
    return candidate&&candidate.end>=firstDate;
  });
  const months=currentHistory?.firstDate ? comparisonMonths(month,firstMonth) : [];
  const monthly=selection.mode==="month";
  const options=monthly ? months.map(value=>({value,label:monthLabel(value)}))
    : comparisonYears.map(year=>({value:String(year),label:selection.mode==="financial"?`FY ${year}–${String(year+1).slice(-2)}`:String(year)}));
  useEffect(()=>{
    if(!currentHistory||currentHistory.error)return;
    if(selection.mode==="month"&&month<firstMonth)select({month:firstMonth,compareYear:null,compareMonth:null});
    else if(["calendar","financial"].includes(selection.mode)&&selection.year<earliestYear)select({year:earliestYear,compareYear:null});
    else if(selection.mode==="custom"&&selection.start<firstDate)select({start:firstDate,end:selection.end<firstDate?firstDate:selection.end,compareYear:null});
    else if(monthly&&selection.compareMonth!==null&&!months.includes(selection.compareMonth))select({compareMonth:null});
    else if(!monthly&&selection.compareYear!==null&&!comparisonYears.includes(selection.compareYear))select({compareYear:null});
  },[currentHistory,selection,firstDate,firstMonth,earliestYear,comparisonYears.join(","),months.join(","),monthly,month,select]);
  const invalidCustom=!start||!end||start<firstDate||start>end||start>todayDate()||Date.parse(end)-Date.parse(start)>1830*86400000;
  const modes:[PeriodMode,string][]=[["month","Month"],["calendar","Calendar year"],["financial","Financial year"],["custom","Custom"]];
  return <div className="card reporting-month-card reporting-period-card">
    <div className="period-selector-top"><h2>{config.title ?? "Reporting period"}</h2>
      <span className="seg period-modes">{modes.map(([mode,label])=><button key={mode} aria-pressed={selection.mode===mode}
        disabled={loading||!!currentHistory?.error} className={selection.mode===mode?"active":""} onClick={()=>select({mode,compareYear:null,compareMonth:null,
          ...(mode==="financial"?{year:Math.min(selection.year,Number(currentMonth().slice(5))<4?currentYear-1:currentYear)}:{})})}>{label}</button>)}</span>
    </div>
    <div className="reporting-month-controls period-controls">
      {selection.mode==="month" ? <><MonthNav month={month} onChange={setMonth} picker firstMonth={firstMonth} disabled={loading} />
        <span className="seg"><button disabled={month===currentMonth()} onClick={()=>setMonth(currentMonth())}>This month</button></span></>
        : selection.mode==="custom" ? <form className="period-custom" onSubmit={event=>{event.preventDefault();if(!invalidCustom)select({start,end});}}>
          <label>From<input type="date" aria-label="Period start" min={firstDate} max={todayDate()} value={start} onChange={e=>setStart(e.target.value)} required /></label>
          <label>To<input type="date" aria-label="Period end" min={start} value={end} onChange={e=>setEnd(e.target.value)} required /></label>
          <button className="period-apply" disabled={invalidCustom}>Apply dates</button>
        </form> : <span className="seg period-year-nav">
          <button aria-label="Previous year" disabled={loading||selection.year<=earliestYear} onClick={()=>select({year:selection.year-1,compareYear:null})}>‹</button>
          <select aria-label="Reporting year" disabled={loading} value={selection.year} onChange={e=>select({year:Number(e.target.value),compareYear:null})}>
            {years.map(year=><option key={year} value={year}>{selection.mode==="financial"?`FY ${year}–${String(year+1).slice(-2)}`:year}</option>)}
          </select><button aria-label="Next year" disabled={selection.year>=latestYear} onClick={()=>select({year:selection.year+1,compareYear:null})}>›</button>
        </span>}
      <label className="period-compare-select">Compare with<select aria-label={monthly?"Comparison month":"Comparison year"} disabled={loading||!!currentHistory?.error||options.length===0} value={comparison?(monthly?selection.compareMonth!:selection.compareYear!):""}
        onChange={e=>select(monthly?{compareMonth:e.target.value||null,compareYear:null}:{compareYear:e.target.value?Number(e.target.value):null,compareMonth:null})}>
        <option value="">No comparison</option>
        {options.map(option=><option key={option.value} value={option.value}>{option.label}</option>)}
      </select></label>
    </div>
    {loading?<p className="muted" role="status">Loading available dates…</p>
      :currentHistory.error?<p className="error-box" role="alert">{currentHistory.error}</p>
      :<p className="muted">{currentHistory.firstDate?`Records from ${dateLabel(firstDate)}`:"No transactions recorded yet"}</p>}
    {(selection.mode!=="month"||comparison) && <div className="period-context">
      <span>{dateLabel(period.start)} – {dateLabel(period.end)}</span>
      {period.actualEnd<period.end && <span>Actuals through {dateLabel(period.actualEnd)}; later commitments stay scheduled.</span>}
      {comparison && <span>Compared with {dateLabel(comparison.start)} – {dateLabel(comparison.end)}.</span>}
      {monthly&&comparison&&<span>{month===currentMonth()?"Matching days elapsed in each month.":"Full calendar months."} Charts align by day of month.</span>}
    </div>}
    {selection.mode==="custom"&&invalidCustom&&<p className="muted">Choose dates in order, up to five years, starting on or before today.</p>}
  </div>;
}
