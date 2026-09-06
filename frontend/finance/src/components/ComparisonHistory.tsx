import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Row, sumRow, clipRows } from "../lib/series";
import { Account } from "../lib/types";
import { ReportPeriod, alignComparisonDate, comparisonPlotPeriod, dayOfPeriod, isMonthComparison, dateLabel } from "../lib/reportingPeriod";
import { money, moneyCompact, shortDate } from "../lib/format";
import { useChartTooltip } from "../lib/useChartTooltip";

export default function ComparisonHistory({rows,accounts,referenceRows,referenceAccounts,period,comparison}:{
  rows:Row[];accounts:Account[];referenceRows:Row[];referenceAccounts:Account[];period:ReportPeriod;comparison:ReportPeriod;
}) {
  const interaction=useChartTooltip();
  const monthly=isMonthComparison(period,comparison),plot=comparisonPlotPeriod(period,comparison);
  const start=Date.parse(`${period.start}T00:00:00+05:30`),refStart=Date.parse(`${comparison.start}T00:00:00+05:30`);
  type Point={ts:number;current?:number;previous?:number;referenceDate?:string;opening?:boolean};
  const points=new Map<string,Point>();
  const key=(ts:number)=>new Date(ts+19800000).toISOString().slice(0,10);
  for(const row of clipRows(rows,start).filter(row=>key(row.ts)<=period.actualEnd))points.set(row.ts===start?"opening":key(row.ts),{ts:row.ts,current:sumRow(row,accounts),opening:row.ts===start});
  for(const row of clipRows(referenceRows,refStart).filter(row=>key(row.ts)<=comparison.actualEnd)) {
    const date=key(row.ts),day=alignComparisonDate(date,comparison,period),opening=row.ts===refStart;
    const pointKey=opening?"opening":day;
    const point=points.get(pointKey)??{ts:Date.parse(`${day}T${opening?"00:00:00":"23:59:59"}+05:30`),opening};
    points.set(pointKey,{...point,previous:sumRow(row,referenceAccounts),referenceDate:date});
  }
  const data=[...points.values()].sort((a,b)=>a.ts-b.ts);
  return <section className="comparison-history" aria-label="Net worth comparison">
    <div className="period-legend"><span><i style={{background:"#60a5fa"}}/>{period.label}</span>
      <span><i style={{background:"#fbbf24"}}/>{comparison.label}</span><span>{monthly?"Aligned by day of month":"Aligned by calendar date"}</span></div>
    <div {...interaction.plot}>
    <ResponsiveContainer width="100%" height={340}><LineChart data={data} margin={{top:8,right:12,bottom:0,left:0}} accessibilityLayer>
      <CartesianGrid stroke="var(--nb-border)" strokeDasharray="3 3"/>
      <XAxis dataKey="ts" type="number" domain={monthly?[start,Date.parse(`${plot.end}T23:59:59+05:30`)]:["dataMin","dataMax"]} tickFormatter={ts=>monthly?String(dayOfPeriod(key(ts),period)):shortDate(ts,false,true)} minTickGap={45} tick={{fill:"var(--nb-muted)",fontSize:11}}/>
      <YAxis tickFormatter={moneyCompact} width={76} domain={["auto","auto"]} tick={{fill:"var(--nb-muted)",fontSize:11}}/>
      <Tooltip key={interaction.key} {...interaction.tooltip} wrapperStyle={{maxWidth:"calc(100% - 88px)"}} content={({active,payload})=>{const row=payload?.[0]?.payload as Point|undefined;return active&&row?<div className="history-comparison-tooltip" role="tooltip">
        {row.opening&&<b>Opening balances</b>}
        {row.current!=null&&<p>{shortDate(row.ts,false,true)}<strong>{money(row.current,true)}</strong></p>}
        {row.previous!=null&&<p>{dateLabel(row.referenceDate!)}<strong>{money(row.previous,true)}</strong></p>}
      </div>:null;}}/>
      <Line type="stepAfter" dataKey="current" stroke="#60a5fa" strokeWidth={2.5} dot={false} connectNulls={false} isAnimationActive={false}/>
      <Line type="stepAfter" dataKey="previous" stroke="#fbbf24" strokeWidth={2} strokeDasharray="6 4" dot={false} connectNulls={false} isAnimationActive={false}/>
    </LineChart></ResponsiveContainer></div>
  </section>;
}
