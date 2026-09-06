import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import InfoTooltip from "../components/InfoTooltip";
import { money, moneyCompact, shortDate, signedMoney } from "../lib/format";
import { Account } from "../lib/types";
import { dateLabel, ReportPeriod, shiftYear } from "../lib/reportingPeriod";
import { ledgerDay, PAYMENT_METHODS, PaymentMethod, paymentBreakdown, paymentTimeline, savingsAccounts, savingsTimeline } from "../lib/cashflow";
import { CashflowPayload } from "./AccountsCard";

type Props = { accounts: Account[]; data: CashflowPayload; previous?: CashflowPayload; previousAccounts?: Account[];
  period: ReportPeriod; comparison?: ReportPeriod; savingsIds?: number[] };
const axisTick = { fill: "var(--nb-muted)", fontSize: 10 };
const grid = <CartesianGrid stroke="var(--nb-border)" strokeDasharray="3 3" vertical={false} />;
const monthLabel = (date: string) => new Date(`${date}T12:00:00Z`).toLocaleDateString("en-IN", { month: "short", year: "2-digit", timeZone: "UTC" });

export default function CashflowCharts({ accounts, data, previous, previousAccounts = [], period, comparison, savingsIds }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [method, setMethod] = useState<PaymentMethod | null>(null);
  const savings = useMemo(() => savingsAccounts(accounts, savingsIds), [accounts, savingsIds]);
  const referenceSavings = useMemo(() => savingsAccounts(previousAccounts, savingsIds), [previousAccounts, savingsIds]);
  const chosen = savings.filter(a => selected === null || a.id === selected);
  const referenceChosen = referenceSavings.filter(a => selected === null || a.id === selected);
  const currentLine = savingsTimeline(data.series, chosen, period);
  const oldLine = previous && comparison ? savingsTimeline(previous.series, referenceChosen, comparison) : [];
  type BalancePoint = { ts: number; current?: number; previous?: number; referenceDate?: string };
  const balanceMap = new Map<string, BalancePoint>();
  // Opening baseline and daily closing values must remain separate on day one.
  const balanceKey = (ts: number) => ts === Date.parse(`${period.start}T00:00:00+05:30`) ? "opening" : ledgerDay(ts);
  for (const row of currentLine) balanceMap.set(balanceKey(row.ts), { ts: row.ts, current: row.value });
  for (const row of oldLine) {
    const refDate = ledgerDay(row.ts), day = shiftYear(refDate, Number(period.start.slice(0, 4)) - Number(comparison!.start.slice(0, 4)));
    const opening = row.ts === Date.parse(`${comparison!.start}T00:00:00+05:30`);
    const key = opening ? "opening" : day;
    const point = balanceMap.get(key) ?? { ts: Date.parse(`${day}T${opening ? "00:00:00" : "23:59:59"}+05:30`) };
    balanceMap.set(key, { ...point, previous: row.value, referenceDate: refDate });
  }
  const balanceRows = [...balanceMap.values()].sort((a, b) => a.ts - b.ts);
  const balances = balanceRows.flatMap(row => [row.current, row.previous]).filter((v): v is number => v != null);
  const balanceTick = Math.max(...balances) - Math.min(...balances) < 10_000 ? money : moneyCompact;
  const closing = chosen.reduce((total, a) => total + Math.round(Number(a.balance ?? 0) * 100), 0) / 100;
  const referenceClosing = referenceChosen.reduce((total, a) => total + Math.round(Number(a.balance ?? 0) * 100), 0) / 100;
  const payments = useMemo(() => paymentBreakdown(data.transactions, accounts, savings, period), [data, accounts, savings, period]);
  const referencePayments = useMemo(() => previous && comparison ? paymentBreakdown(previous.transactions, previousAccounts, referenceSavings, comparison) : undefined,
    [previous, previousAccounts, referenceSavings, comparison]);
  const paymentRows = useMemo(() => paymentTimeline(payments, period, referencePayments, comparison), [payments, period, referencePayments, comparison]);
  const methods = PAYMENT_METHODS.filter(m => m.key !== "other" || payments.totals.other > 0 || (referencePayments?.totals.other ?? 0) > 0);
  const paymentAccounts = payments.byAccount.filter(a => a.method === method);
  const accountName = (id: number) => accounts.find(a => a.id === id)?.nickname || accounts.find(a => a.id === id)?.name || "Other account";
  return <div className="cashflow-charts">
    <section className="savings-chart" aria-label="Savings balance history">
      <div className="cashflow-chart-head"><div><h3>Savings balance</h3>
        <strong className="savings-total">{chosen.length ? money(closing) : "–"}</strong></div>
        <span className="muted">{period.end > period.actualEnd ? "As of" : "Closing"} {dateLabel(period.actualEnd)}</span>
      </div>
      {savings.length > 0 ? <>
        <div className="savings-tabs" role="group" aria-label="Savings account">
          <button aria-pressed={selected === null} onClick={() => setSelected(null)}>All savings</button>
          {savings.map(a => <button key={a.id} aria-pressed={selected === a.id} onClick={() => setSelected(a.id)}>{a.nickname || a.name}</button>)}
        </div>
        {comparison && <div className="cashflow-comparison"><span>{comparison.label}: <strong>{referenceChosen.length ? money(referenceClosing) : "No balance"}</strong></span>
          {referenceChosen.length > 0 && <span>{signedMoney(closing - referenceClosing)} change</span>}</div>}
        {balanceRows.length ? <div className="cashflow-plot"><ResponsiveContainer width="100%" height="100%"><LineChart data={balanceRows} accessibilityLayer margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
          {grid}<XAxis dataKey="ts" type="number" domain={[Date.parse(`${period.start}T00:00:00+05:30`), Date.parse(`${period.end}T23:59:59+05:30`)]}
            tickFormatter={ts => period.wide ? monthLabel(ledgerDay(ts)) : shortDate(ts)} minTickGap={35} tick={axisTick} />
          <YAxis tickFormatter={value => balanceTick(value)} width={76} tick={axisTick} domain={["auto", "auto"]} />
          <Tooltip content={({ active, payload }) => {
            const row = payload?.[0]?.payload as BalancePoint | undefined;
            return active && row ? <div className="cashflow-tooltip"><b>{shortDate(row.ts, false, true)}{balanceKey(row.ts) === "opening" ? " · opening" : " · closing"}</b>
              {row.current != null && <p><span>{selected === null ? "All savings" : accountName(selected)}</span><strong>{money(row.current, true)}</strong></p>}
              {row.previous != null && <p><span>{dateLabel(row.referenceDate!)}</span><strong>{money(row.previous, true)}</strong></p>}</div> : null;
          }} />
          <Line className="savings-balance-line" dataKey="current" name="Savings" type="stepAfter" stroke="#60a5fa" strokeWidth={2.5} dot={false} isAnimationActive={false} />
          {comparison && <Line className="savings-reference-line" dataKey="previous" name={comparison.label} type="stepAfter" stroke="#fbbf24" strokeWidth={2} strokeDasharray="5 4" dot={false} isAnimationActive={false} />}
        </LineChart></ResponsiveContainer></div> : <div className="cashflow-empty">No savings history for this period.</div>}
        {comparison && <div className="cashflow-legend"><span><i style={{ background: "#60a5fa" }} />{period.label}</span><span><i style={{ background: "#fbbf24" }} />{comparison.label} · dashed</span></div>}
      </> : <div className="cashflow-empty">No savings accounts selected.</div>}
    </section>
    <section className="payment-chart" aria-label="Spending by payment method">
      <div className="cashflow-chart-head"><div><h3><InfoTooltip className="payment-explainer" label="Explain spending by payment method" content={<><h3>How you paid</h3>
          <p>Direct from savings includes purchases paid from the selected savings accounts, such as bank transfers, UPI or debit-card payments. The statement may not distinguish those methods.</p>
          <p>Credit cards shows purchases charged during the period, including cards excluded from net worth. Paying the card bill does not count again.</p>
          <p>Own-account transfers and investment contributions are excluded. Other accounts appears only for purchases from accounts outside these two groups. Refunds remain in the dashboard's income figure.</p></>}>
          <span>How you paid <span className="muted" aria-hidden="true">ⓘ</span></span></InfoTooltip></h3>
        <strong className="payment-total">{money(payments.total / 100)} <small>spent</small></strong></div>
        <span className="muted">{period.wide ? "Monthly" : "Daily"} purchases</span>
      </div>
      <div className="payment-methods">{methods.map(m => <button key={m.key} className="payment-method" data-method={m.key}
        aria-label={`Show ${m.label.toLowerCase()} spending by account`} aria-expanded={method === m.key} onClick={() => setMethod(method === m.key ? null : m.key)}>
        <span><i style={{ background: m.color }} />{m.label}</span><strong>{money(payments.totals[m.key] / 100)}</strong>
        <small>{payments.total ? (payments.totals[m.key] / payments.total * 100).toFixed(1) : "0.0"}%</small>
      </button>)}</div>
      {comparison && <div className="cashflow-comparison"><span>{comparison.label}: <strong>{money((referencePayments?.total ?? 0) / 100)}</strong></span>
        <span>{signedMoney((payments.total - (referencePayments?.total ?? 0)) / 100)} change</span></div>}
      {payments.total > 0 || (referencePayments?.total ?? 0) > 0 ? <div className="payment-chart-scroll"><div style={{ minWidth: period.wide ? Math.max(260, paymentRows.length * (comparison ? 48 : 32)) : 260 }}>
        <div className="cashflow-plot"><ResponsiveContainer width="100%" height="100%"><BarChart data={paymentRows} accessibilityLayer margin={{ top: 12, right: 8, left: 0, bottom: 0 }}>
          {grid}<XAxis dataKey="day" tickFormatter={day => period.wide ? monthLabel(`${day}-01`) : String(Number(day.slice(8)))} minTickGap={16} tick={axisTick} />
          <YAxis tickFormatter={moneyCompact} width={62} tick={axisTick} />
          <Tooltip cursor={{ fill: "var(--nb-border)", fillOpacity: .35 }} content={({ active, payload }) => {
            const row = payload?.[0]?.payload as typeof paymentRows[number] | undefined;
            return active && row ? <div className="cashflow-tooltip"><b>{period.wide ? monthLabel(row.date) : dateLabel(row.date)}</b>
              {methods.map(m => <p key={m.key}><span><i style={{ background: m.color }} />{m.label}</span><strong>{row[m.key] == null ? "–" : money(Number(row[m.key]), true)}</strong></p>)}
              {comparison && <><b>{period.wide ? monthLabel(row.refDate) : `${dateLabel(row.refDate)}${row.refEndDate !== row.refDate ? ` – ${dateLabel(row.refEndDate)}` : ""}`}</b>{methods.map(m => <p key={m.key}><span>{m.label}</span><strong>{row[`${m.key}Previous`] == null ? "–" : money(Number(row[`${m.key}Previous`]), true)}</strong></p>)}</>}
            </div> : null;
          }} />
          {methods.map(m => <Bar key={m.key} dataKey={m.key} name={m.label} fill={m.color} stackId="current" isAnimationActive={false} maxBarSize={26} />)}
          {comparison && methods.map(m => <Bar key={`${m.key}-ref`} dataKey={`${m.key}Previous`} name={`${comparison.label} · ${m.label}`} fill={m.color} fillOpacity={.28} stroke={m.color} strokeDasharray="3 2" stackId="previous" isAnimationActive={false} maxBarSize={26} />)}
        </BarChart></ResponsiveContainer></div>
      </div></div> : <div className="cashflow-empty">No purchases recorded in this period.</div>}
      {period.wide && paymentRows.length > 6 && <p className="period-scroll-hint">Swipe the chart to see all months.</p>}
      {comparison && <div className="cashflow-legend"><span>Solid: {period.label}</span><span>Faded: {comparison.label}</span></div>}
      {method && <section className="payment-account-details" aria-label={`${PAYMENT_METHODS.find(m => m.key === method)!.label} spending by account`}>
        <div className="payment-account-heading"><h4>Spending by account</h4><button aria-label="Close spending by account" onClick={() => setMethod(null)}>×</button></div>
        {paymentAccounts.length ? paymentAccounts.map(a => <div className="payment-account" key={a.id}>
          <span>{accountName(a.id)}</span><strong>{money(a.cents / 100)}</strong>
          <div className="payment-account-track"><i style={{ width: `${a.cents / paymentAccounts[0].cents * 100}%`, background: PAYMENT_METHODS.find(m => m.key === method)!.color }} /></div>
          <small>{a.count} purchases</small>
        </div>) : <p className="muted">No purchases from these accounts.</p>}
      </section>}
    </section>
  </div>;
}
