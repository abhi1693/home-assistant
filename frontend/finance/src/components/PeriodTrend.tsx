import { useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { MonthlyTotal, ReportPeriod } from "../lib/reportingPeriod";
import { monthLabel, shiftMonth } from "../cards/spendingCommon";
import { money, moneyCompact, pct, signedMoney } from "../lib/format";

type Metric={key:string;label:string;monthly?:MonthlyTotal[];comparison?:MonthlyTotal[];planned?:MonthlyTotal[]};
export default function PeriodTrend({period,comparison,metrics}:{period:ReportPeriod;comparison?:ReportPeriod;metrics:Metric[]}) {
  const [selected,setSelected]=useState(metrics[0]?.key);
  const metric=metrics.find(m=>m.key===selected)??metrics[0];
  if(!metric||(!period.wide&&!comparison))return null;
  const dates:string[]=[];
  for(let month=period.start.slice(0,7);`${month}-01`<=period.end;month=shiftMonth(month,1))dates.push(month);
  const lookup=(rows:MonthlyTotal[]|undefined,month:string)=>{const row=rows?.find(r=>r.month===month);return row?.total==null?null:Number(row.total);};
  const rows=dates.map((month,index)=>{
    const refMonth=comparison?shiftMonth(comparison.start.slice(0,7),index):"";
    return {month,label:new Date(`${month}-01T12:00:00Z`).toLocaleDateString("en-IN",{month:"short",...(period.start.slice(0,4)!==period.end.slice(0,4)?{year:"2-digit" as const}:{}),timeZone:"UTC"}),
      current:lookup(metric.monthly,month),previous:lookup(metric.comparison,refMonth),planned:lookup(metric.planned,month),refMonth};
  });
  const total=rows.reduce((sum,r)=>sum+(r.current??0),0),previous=rows.reduce((sum,r)=>sum+(r.previous??0),0);
  const hasPlanned=rows.some(r=>(r.planned??0)>0);
  return <section className="period-trend" aria-label={`${metric.label} by month`}>
    <div className="period-trend-head"><div><h3>{metric.label} by month</h3>
      {comparison&&<div className="period-total-comparison"><strong>{money(total)}</strong><span>vs {money(previous)}</span>
        <span>{signedMoney(total-previous)}{previous!==0?` (${pct((total-previous)/Math.abs(previous))})`:" · no percentage baseline"}</span></div>}
    </div>{metrics.length>1&&<span className="seg">{metrics.map(m=><button key={m.key} aria-pressed={m.key===metric.key}
      className={m.key===metric.key?"active":""} onClick={()=>setSelected(m.key)}>{m.label}</button>)}</span>}</div>
    <div className="period-legend"><span><i style={{background:"#60a5fa"}}/>{period.label} · recorded</span>
      {hasPlanned&&<span><i style={{background:"#a78bfa"}}/>Scheduled / awaiting statement</span>}
      {comparison&&<span><i style={{background:"#fbbf24"}}/>{comparison.label} · recorded</span>}</div>
    <div className="period-trend-plot">
    <ResponsiveContainer width="100%" height="100%" minWidth={0}><BarChart data={rows} barGap="10%" barCategoryGap="18%" margin={{top:12,right:8,bottom:0,left:0}} accessibilityLayer>
      <CartesianGrid stroke="var(--nb-border)" strokeDasharray="3 3" vertical={false}/>
      <XAxis dataKey="month" tickFormatter={month=>rows.find(row=>row.month===month)?.label??month}
        tick={{fill:"var(--nb-muted)",fontSize:11}} interval="preserveStartEnd" minTickGap={16}/>
      <YAxis tickFormatter={moneyCompact} width={72} tick={{fill:"var(--nb-muted)",fontSize:11}}/>
      <Tooltip wrapperStyle={{maxWidth:"calc(100% - 84px)"}} itemStyle={{whiteSpace:"normal"}} contentStyle={{whiteSpace:"normal",background:"var(--nb-panel-2)",border:"1px solid var(--nb-border)",borderRadius:8,fontSize:12}}
        labelFormatter={(_,payload)=>{const row=payload?.[0]?.payload;return row?`${monthLabel(row.month)}${comparison&&row.previous!=null?` · vs ${monthLabel(row.refMonth)}`:""}`:"";}}
        formatter={(value,name)=>[money(Number(value),true),name]} cursor={{fill:"var(--nb-border)",fillOpacity:.35}}/>
      <Bar dataKey="current" name={`${period.label} recorded`} fill="#60a5fa" stackId="current" isAnimationActive={false} maxBarSize={34}/>
      {hasPlanned&&<Bar dataKey="planned" name="Scheduled / awaiting statement" fill="#a78bfa" fillOpacity={.55} stackId="current" isAnimationActive={false} maxBarSize={34}/>}
      {comparison&&<Bar dataKey="previous" name={`${comparison.label} recorded`} fill="#fbbf24" isAnimationActive={false} maxBarSize={34}/>}
    </BarChart></ResponsiveContainer></div>
  </section>;
}
