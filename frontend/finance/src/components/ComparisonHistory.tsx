import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Row, sumRow } from "../lib/series";
import { Account } from "../lib/types";
import { ReportPeriod, shiftYear, dateLabel } from "../lib/reportingPeriod";
import { money, moneyCompact, shortDate } from "../lib/format";

export default function ComparisonHistory({rows,accounts,referenceRows,referenceAccounts,period,comparison}:{
  rows:Row[];accounts:Account[];referenceRows:Row[];referenceAccounts:Account[];period:ReportPeriod;comparison:ReportPeriod;
}) {
  type Point={ts:number;current?:number;previous?:number;referenceDate?:string};
  const points=new Map<string,Point>();
  const key=(ts:number)=>new Date(ts+19800000).toISOString().slice(0,10);
  for(const row of rows)points.set(key(row.ts),{ts:row.ts,current:sumRow(row,accounts)});
  const delta=Number(period.start.slice(0,4))-Number(comparison.start.slice(0,4));
  for(const row of referenceRows) {
    const date=key(row.ts),day=shiftYear(date,delta);
    const point=points.get(day)??{ts:Math.min(Date.parse(`${day}T23:59:59+05:30`),Date.now())};
    points.set(day,{...point,previous:sumRow(row,referenceAccounts),referenceDate:date});
  }
  const data=[...points.values()].sort((a,b)=>a.ts-b.ts);
  return <section className="comparison-history" aria-label="Net worth comparison">
    <div className="period-legend"><span><i style={{background:"#60a5fa"}}/>{period.label}</span>
      <span><i style={{background:"#fbbf24"}}/>{comparison.label}</span><span>Aligned by calendar date</span></div>
    <ResponsiveContainer width="100%" height={340}><LineChart data={data} margin={{top:8,right:12,bottom:0,left:0}} accessibilityLayer>
      <CartesianGrid stroke="var(--nb-border)" strokeDasharray="3 3"/>
      <XAxis dataKey="ts" type="number" domain={["dataMin","dataMax"]} tickFormatter={ts=>shortDate(ts,false,true)} minTickGap={45} tick={{fill:"var(--nb-muted)",fontSize:11}}/>
      <YAxis tickFormatter={moneyCompact} width={76} domain={["auto","auto"]} tick={{fill:"var(--nb-muted)",fontSize:11}}/>
      <Tooltip content={({active,payload})=>{const row=payload?.[0]?.payload as Point|undefined;return active&&row?<div className="history-comparison-tooltip">
        {row.current!=null&&<p>{shortDate(row.ts,false,true)}<strong>{money(row.current,true)}</strong></p>}
        {row.previous!=null&&<p>{dateLabel(row.referenceDate!)}<strong>{money(row.previous,true)}</strong></p>}
      </div>:null;}}/>
      <Line type="stepAfter" dataKey="current" stroke="#60a5fa" strokeWidth={2.5} dot={false} connectNulls={false} isAnimationActive={false}/>
      <Line type="stepAfter" dataKey="previous" stroke="#fbbf24" strokeWidth={2} strokeDasharray="6 4" dot={false} connectNulls={false} isAnimationActive={false}/>
    </LineChart></ResponsiveContainer>
  </section>;
}
