import { useId, useMemo, useState } from "react";
import { InvestmentEntry, SpendingInvestments } from "../lib/ha";
import { ReportPeriod } from "../lib/reportingPeriod";
import { money, MASK } from "../lib/format";

const COLORS = ["#60a5fa", "#a78bfa", "#facc15", "#34d399", "#fb923c", "#22d3ee", "#f472b6", "#f87171"];
const statusLabel = { recorded: "Recorded", scheduled: "Scheduled", awaiting_statement: "Awaiting statement" };
type Group = { name: string; cents: number; recorded: number; pending: number; rows: InvestmentEntry[]; color: string };

function groupsFor(rows: InvestmentEntry[]): Group[] {
  const groups = new Map<string, Group>();
  for (const row of rows) {
    const name = row.name || "Investment";
    const group = groups.get(name) ?? { name, cents: 0, recorded: 0, pending: 0, rows: [], color: "" };
    group.cents += Math.round(Number(row.amount) * 100);
    group[row.status === "recorded" ? "recorded" : "pending"]++;
    group.rows.push(row);
    groups.set(name, group);
  }
  // Preserve the source labels; provider guesses must not reclassify payments.
  // Assign distinct colors in name order so rankings cannot swap the colors.
  const used = new Set<number>();
  for (const [i, group] of [...groups.values()].sort((a, b) => a.name.localeCompare(b.name)).entries()) {
    let index = Array.from(group.name).reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 0) % COLORS.length;
    if (used.size < COLORS.length) {
      while (used.has(index)) index = (index + 1) % COLORS.length;
      used.add(index);
      group.color = COLORS[index];
    } else group.color = `hsl(${(i * 137.508) % 360} 65% 65%)`;
  }
  return [...groups.values()].sort((a, b) => b.cents - a.cents || a.name.localeCompare(b.name));
}

export default function InvestmentBreakdown({ investment, period, masked }: {
  investment: SpendingInvestments; period: ReportPeriod; masked: boolean;
}) {
  const [open, setOpen] = useState<"all" | { name: string } | null>(null);
  const detailsId = useId();
  const rows = useMemo(() => [...investment.recorded, ...investment.expected]
    .sort((a, b) => a.date.localeCompare(b.date) || a.name.localeCompare(b.name)), [investment]);
  const groups = useMemo(() => groupsFor(rows), [rows]);
  const total = groups.reduce((sum, group) => sum + group.cents, 0);
  const details = open === "all" ? rows : open ? groups.find(group => group.name === open.name)?.rows ?? [] : [];
  const format = (value: string | number) => masked ? MASK : money(Number(value));
  let offset = 0;
  return <>
    <div className="investment-overview">
      <div className="investment-donut-wrap">
        <svg viewBox="0 0 160 160" className="investment-donut" role="img" aria-label="Investment contributions by name, including scheduled commitments">
          <circle cx="80" cy="80" r="65" fill="none" stroke="var(--nb-border)" strokeWidth="24" />
          {groups.filter(group => group.cents > 0).map(group => {
            const share = group.cents / total * 100;
            const start = offset; offset += share;
            return <circle key={group.name} className="investment-slice" cx="80" cy="80" r="65" fill="none"
              stroke={group.color} strokeWidth="24" pathLength="100" strokeDasharray={`${share} ${100-share}`}
              strokeDashoffset={-start} transform="rotate(-90 80 80)">
              <title>{group.name}: {format(group.cents / 100)} · {share.toFixed(1)}%</title>
            </circle>;
          })}
        </svg>
        <div className="investment-donut-total"><strong className="investment-total">{format(investment.total_committed)}</strong>
          <span>{Number(investment.total_pending)>0 ? "Total committed" : "Recorded total"}</span></div>
      </div>
      <div className="investment-stats">
        <div><span className="spend-stat-label">Recorded</span><strong className="investment-recorded">{format(investment.total_recorded)}</strong></div>
        <div><span className="spend-stat-label">Scheduled / awaiting statement</span><strong className="investment-pending">{format(investment.total_pending)}</strong></div>
      </div>
      <div className="investment-allocation">
        {groups.length === 0 ? <p className="muted">No investments recorded or scheduled in this period.</p> : <>
          <div className="investment-provider-list">{groups.map(group => {
            const expanded = open !== null && open !== "all" && open.name === group.name;
            return <button type="button" className="investment-provider" key={group.name} aria-expanded={expanded}
              aria-controls={detailsId} aria-label={`Show ${group.name} payments`}
              onClick={() => setOpen(expanded ? null : { name: group.name })}>
              <i className="investment-provider-dot" style={{background:group.color}} aria-hidden="true" />
              <span className="investment-provider-name">{group.name}</span><strong>{format(group.cents / 100)}</strong>
              <span className="investment-provider-meta">{[group.recorded ? `${group.recorded} recorded` : "", group.pending ? `${group.pending} pending` : "",
                `${total > 0 ? (group.cents / total * 100).toFixed(1) : "0"}%`].filter(Boolean).join(" · ")}</span>
              <span className="investment-provider-chevron" aria-hidden="true">{expanded ? "⌃" : "⌄"}</span>
            </button>;
          })}</div>
          <button type="button" className="investment-details-toggle" aria-expanded={open === "all"} aria-controls={detailsId}
            onClick={() => setOpen(open === "all" ? null : "all")}>{open === "all" ? "Hide payments" : `View all ${rows.length} payments`}</button>
        </>}
      </div>
    </div>
    {open && details.length > 0 && <section className="investment-payment-details" id={detailsId} aria-label="Investment payment details">
      <div className="investment-details-head"><strong>{open === "all" ? "All payments" : open.name}</strong>
        <button type="button" onClick={() => setOpen(null)} aria-label="Close investment payments">Close ×</button></div>
      <div className="investment-list" role="list" aria-label="Investments in this period">{details.map(row => <div className="investment-row" role="listitem" key={row.id}>
        <time dateTime={row.date}>{new Date(`${row.date}T12:00:00+05:30`).toLocaleDateString("en-IN", {day:"numeric", month:"short", ...(period.wide?{year:"numeric" as const}:{}), timeZone:"Asia/Kolkata"})}</time>
        <div className="investment-name">{row.name}<span className={`investment-status ${row.status}`}>{statusLabel[row.status]}</span></div>
        <strong>{format(row.amount)}</strong>
      </div>)}</div>
    </section>}
  </>;
}
