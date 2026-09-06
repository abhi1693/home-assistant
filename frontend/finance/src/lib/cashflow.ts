import { Account, AccountSeries, SpendingTxn } from "./types";
import { ReportPeriod, shiftYear } from "./reportingPeriod";
import { shiftMonth } from "../cards/spendingCommon";
import { alignSeries, clipRows, sumRow } from "./series";

export const PAYMENT_METHODS = [
  { key: "savings", label: "Direct from savings", color: "#2dd4bf" },
  { key: "credit", label: "Credit cards", color: "#a78bfa" },
  { key: "other", label: "Other accounts", color: "#fbbf24" },
] as const;
export type PaymentMethod = typeof PAYMENT_METHODS[number]["key"];
type Totals = Record<PaymentMethod, number>;
const zero = (): Totals => ({ savings: 0, credit: 0, other: 0 });
export const ledgerDay = (ts: string | number) => new Date(new Date(ts).getTime() + 19_800_000).toISOString().slice(0, 10);

// Explicit IDs survive renames. Standalone cards can discover savings by name;
// cash wallets, EMI ledgers and investment accounts are never inferred as savings.
export function savingsAccounts(accounts: Account[], ids?: number[]) {
  return accounts.filter(a => a.kind === "cash" && (ids !== undefined
    ? ids.includes(a.id) : /\bsavings?\b/i.test(a.nickname || a.name)));
}

export function paymentBreakdown(transactions: SpendingTxn[], accounts: Account[], savings: Account[], period: ReportPeriod) {
  const savingsIds = new Set(savings.map(a => a.id));
  const kinds = new Map(accounts.map(a => [a.id, a.kind]));
  const totals = zero(), byDate = new Map<string, Totals>();
  const byAccount = new Map<number, { id: number; method: PaymentMethod; cents: number; count: number }>();
  const seen = new Set<number>();
  for (const t of transactions) {
    // Purchases count when charged. Neither leg of an own-account transfer,
    // investment contribution or card repayment is another purchase.
    if (t.transaction_type !== "withdrawal" || t.pending || seen.has(t.id)) continue;
    if (!Number.isFinite(Date.parse(t.posted_at))) continue;
    const date = ledgerDay(t.posted_at), cents = Math.round(Number(t.amount) * 100);
    if (date < period.start || date > period.actualEnd || !Number.isFinite(cents) || cents <= 0) continue;
    seen.add(t.id);
    const method: PaymentMethod = savingsIds.has(t.account_id) ? "savings" : kinds.get(t.account_id) === "credit" ? "credit" : "other";
    totals[method] += cents;
    const bucket = period.wide ? date.slice(0, 7) : date;
    const day = byDate.get(bucket) ?? zero(); day[method] += cents; byDate.set(bucket, day);
    const account = byAccount.get(t.account_id) ?? { id: t.account_id, method, cents: 0, count: 0 };
    account.cents += cents; account.count++; byAccount.set(t.account_id, account);
  }
  return { totals, byDate, byAccount: [...byAccount.values()].sort((a, b) => b.cents - a.cents),
    total: totals.savings + totals.credit + totals.other };
}
export type PaymentBreakdown = ReturnType<typeof paymentBreakdown>;

export function paymentTimeline(current: PaymentBreakdown, period: ReportPeriod, previous?: PaymentBreakdown, comparison?: ReportPeriod) {
  const days: string[] = [];
  if (period.wide) {
    for (let m = period.start.slice(0, 7); `${m}-01` <= period.end; m = shiftMonth(m, 1)) days.push(m);
  } else {
    for (let ts = Date.parse(period.start); ts <= Date.parse(period.end); ts += 86_400_000) days.push(new Date(ts).toISOString().slice(0, 10));
  }
  const referenceBuckets = new Map<string, { totals: Totals; from: string; to: string }>();
  if (comparison && previous) {
    for (const [key, totals] of previous.byDate) {
      const originalDate = key.length === 7 ? `${key}-01` : key;
      let date = shiftYear(originalDate, Number(period.start.slice(0, 4)) - Number(comparison.start.slice(0, 4)));
      if (date < period.start) date = period.start;
      const mapped = period.wide ? date.slice(0, 7) : date;
      const bucket = referenceBuckets.get(mapped) ?? { totals: zero(), from: originalDate, to: originalDate };
      for (const { key: method } of PAYMENT_METHODS) bucket.totals[method] += totals[method];
      bucket.from = originalDate < bucket.from ? originalDate : bucket.from;
      bucket.to = originalDate > bucket.to ? originalDate : bucket.to;
      referenceBuckets.set(mapped, bucket);
    }
  }
  return days.map(day => {
    const date = day.length === 7 ? `${day}-01` : day;
    const refDate = comparison ? shiftYear(date, Number(comparison.start.slice(0, 4)) - Number(period.start.slice(0, 4))) : "";
    const reference = referenceBuckets.get(day);
    const values: Record<PaymentMethod | `${PaymentMethod}Previous`, number | null> = { ...zero(), savingsPrevious: null, creditPrevious: null, otherPrevious: null };
    for (const { key } of PAYMENT_METHODS) {
      values[key] = date <= period.actualEnd ? (current.byDate.get(day)?.[key] ?? 0) / 100 : null;
      // Calendar alignment preserves every reference purchase once. A Feb 29
      // comparison maps into Feb 28 in a non-leap year, with its date range
      // exposed in the tooltip; a Feb 28 reference is never copied twice.
      values[`${key}Previous`] = comparison && refDate <= comparison.actualEnd
        ? (reference?.totals[key] ?? 0) / 100 : null;
    }
    return { day, date, refDate: reference?.from ?? refDate, refEndDate: reference?.to ?? refDate, ...values };
  });
}

export function savingsTimeline(series: AccountSeries[], accounts: Account[], period: ReportPeriod) {
  const ids = new Set(accounts.map(a => a.id));
  const start = Date.parse(`${period.start}T00:00:00+05:30`);
  return clipRows(alignSeries(series.filter(s => ids.has(s.account_id))), start)
    .filter(row => row.ts >= start && ledgerDay(row.ts) <= period.actualEnd)
    .map(row => ({ ts: row.ts, value: sumRow(row, accounts) }));
}
