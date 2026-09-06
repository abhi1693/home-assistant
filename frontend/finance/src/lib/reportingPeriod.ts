import { useMemo, useSyncExternalStore } from "react";
import type { Hass } from "./ha";
import { currentMonth, monthLabel, shiftMonth, FIRST_REPORTING_MONTH } from "../cards/spendingCommon";

export type PeriodMode = "month" | "calendar" | "financial" | "custom";
export type Selection = { mode: PeriodMode; month: string; year: number; start: string; end: string; compareYear: number | null };
export type ReportPeriod = {
  key: string; mode: PeriodMode; start: string; end: string; actualEnd: string;
  label: string; wide: boolean; query: { month: string } | { start: string; end: string };
};
export type PeriodQuery = string | ReportPeriod;
export type MonthlyTotal = { month: string; total: string | null };
export const todayDate = () => new Intl.DateTimeFormat("en-CA", {timeZone:"Asia/Kolkata",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date());
export const dateLabel = (date: string) => new Date(`${date}T12:00:00+05:30`).toLocaleDateString("en-IN", {day:"numeric",month:"short",year:"numeric",timeZone:"Asia/Kolkata"});
export const monthEnd = (month: string) => new Date(Date.parse(`${shiftMonth(month,1)}-01T00:00:00Z`)-86400000).toISOString().slice(0,10);
export const queryFields = (period?: PeriodQuery) => typeof period === "string" ? {month:period} : period?.query ?? {};

export function shiftYear(date: string, delta: number) {
  const year = Number(date.slice(0,4)) + delta;
  const month = `${year}-${date.slice(5,7)}`;
  return `${month}-${String(Math.min(Number(date.slice(8,10)),Number(monthEnd(month).slice(8,10)))).padStart(2,"0")}`;
}
export function resolvePeriod(selection: Selection, today = todayDate()): {period: ReportPeriod; comparison?: ReportPeriod} {
  const {mode,year,month} = selection;
  const start = mode === "month" ? `${month}-01` : mode === "calendar" ? `${year}-01-01`
    : mode === "financial" ? `${year}-04-01` : selection.start;
  const end = mode === "month" ? monthEnd(month) : mode === "calendar" ? `${year}-12-31`
    : mode === "financial" ? `${year+1}-03-31` : selection.end;
  const label = mode === "month" ? monthLabel(month) : mode === "calendar" ? String(year)
    : mode === "financial" ? `FY ${year}–${String(year+1).slice(-2)}` : `${dateLabel(start)} – ${dateLabel(end)}`;
  const period: ReportPeriod = {key:`${mode}:${start}:${end}`,mode,start,end,actualEnd:end<today?end:today,
    label,wide:start.slice(0,7)!==end.slice(0,7),query:mode==="month"?{month}:{start,end}};
  if(selection.compareYear == null) return {period};
  const delta = selection.compareYear - Number(start.slice(0,4));
  const refStart = shiftYear(start,delta), refEnd = shiftYear(period.actualEnd,delta);
  if(delta===0 || refStart>today || refEnd>today || refStart<FIRST_REPORTING_MONTH+"-01") return {period};
  const refLabel = mode==="financial" ? `FY ${selection.compareYear}–${String(selection.compareYear+1).slice(-2)}`
    : mode==="month" ? monthLabel(refStart.slice(0,7)) : mode==="calendar" ? String(selection.compareYear)
    : `${dateLabel(refStart)} – ${dateLabel(refEnd)}`;
  return {period,comparison:{key:`compare:${refStart}:${refEnd}`,mode,start:refStart,end:refEnd,actualEnd:refEnd,
    label:refLabel,wide:period.wide,query:{start:refStart,end:refEnd}}};
}
function createStore() {
  const month=currentMonth(),today=todayDate();
  let selection: Selection={mode:"month",month,year:Number(month.slice(0,4)),start:`${month}-01`,end:today,compareYear:null};
  const listeners=new Set<()=>void>();
  return {snapshot:()=>selection,subscribe:(fn:()=>void)=>{listeners.add(fn);return()=>{listeners.delete(fn);};},
    select:(patch:Partial<Selection>)=>{
      const next={...selection,...patch};
      if(!/^\d{4}-(0[1-9]|1[0-2])$/.test(next.month)||next.month<FIRST_REPORTING_MONTH||next.month>currentMonth())return;
      if(next.year<1970||next.year>Number(todayDate().slice(0,4)))return;
      const {period}=resolvePeriod(next);
      if(!/^\d{4}-\d{2}-\d{2}$/.test(period.start)||!/^\d{4}-\d{2}-\d{2}$/.test(period.end))return;
      const from=Date.parse(period.start),to=Date.parse(period.end);
      if(!Number.isFinite(from)||!Number.isFinite(to)||period.start>todayDate()||period.start<FIRST_REPORTING_MONTH+"-01"||from>to||to-from>1830*86400000)return;
      if(JSON.stringify(next)===JSON.stringify(selection))return;
      selection=next;listeners.forEach(fn=>fn());
    }};
}
const groups=new WeakMap<Hass["connection"],Map<string,ReturnType<typeof createStore>>>();
export function useReportingPeriod(hass:Hass,group?:string) {
  const store=useMemo(()=>{
    if(!group)return createStore();
    let map=groups.get(hass.connection);if(!map)groups.set(hass.connection,map=new Map());
    const key=JSON.stringify([hass.user?.id,group]);
    let store=map.get(key);if(!store)map.set(key,store=createStore());return store;
  },[hass.connection,hass.user?.id,group]);
  const selection=useSyncExternalStore(store.subscribe,store.snapshot);
  const today=todayDate();
  const resolved=useMemo(()=>resolvePeriod(selection,today),[selection,today]);
  return {...resolved,selection,select:store.select,month:selection.month,
    setMonth:(month:string)=>store.select({mode:"month",month,compareYear:null})};
}
export function periodTicks(period:ReportPeriod,max=12) {
  const from=Date.parse(`${period.start}T00:00:00+05:30`),end=Date.parse(`${period.end}T00:00:00+05:30`);
  if(!period.wide)return [1,8,15,22,29].map(d=>from+(d-1)*86400000).filter(ts=>ts<=end).map(ts=>({ts,label:String(new Date(ts+19800000).getUTCDate())}));
  const out=[];
  for(let month=period.start.slice(0,7);`${month}-01`<=period.end;month=shiftMonth(month,1)) {
    const day=`${month}-01`<period.start?period.start:`${month}-01`;
    out.push({ts:Date.parse(`${day}T00:00:00+05:30`),label:new Date(`${day}T12:00:00Z`).toLocaleDateString("en-IN",{month:"short",year:"2-digit",timeZone:"UTC"})});
  }
  return out.filter((_,i)=>i%Math.ceil(out.length/max)===0);
}
