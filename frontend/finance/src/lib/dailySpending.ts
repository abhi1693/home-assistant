import { ReportPeriod, dayOfPeriod } from "./reportingPeriod";
import { SpendingTxn } from "./types";
import { ledgerDay } from "./cashflow";

export type DailyTotal = { date: string; total: number | null };
const DAY = 86_400_000;
const dateAt = (period: ReportPeriod, index: number) => new Date(Date.parse(period.start) + index * DAY).toISOString().slice(0, 10);

/** The authorised backend feed has already removed reviewed own-account deposits. */
export function dailySpending(transactions: SpendingTxn[], period: ReportPeriod) {
  const buckets = new Map<string, { spending: number; income: number }>();
  const seen = new Set<number>();
  for (const tx of transactions) {
    if (tx.pending || seen.has(tx.id) || !["withdrawal", "deposit"].includes(tx.transaction_type ?? "")) continue;
    if (!Number.isFinite(Date.parse(tx.posted_at))) continue;
    const date = ledgerDay(tx.posted_at), paise = Math.round(Number(tx.amount) * 100);
    if (date < period.start || date > period.actualEnd || !Number.isFinite(paise)) continue;
    seen.add(tx.id);
    const bucket = buckets.get(date) ?? { spending: 0, income: 0 };
    // Signed amounts match the summary: withdrawals are positive, deposits negative.
    if (tx.transaction_type === "withdrawal") bucket.spending += paise;
    else bucket.income -= paise;
    buckets.set(date, bucket);
  }
  const days = Array.from({ length: dayOfPeriod(period.end, period) }, (_, i) => dateAt(period, i));
  const totals = (key: "spending" | "income"): DailyTotal[] => days.map(date => ({
    date, total: date <= period.actualEnd ? (buckets.get(date)?.[key] ?? 0) / 100 : null,
  }));
  return { spending: totals("spending"), income: totals("income") };
}

/** Align full months by day number; missing and future days remain absent. */
export function dailyComparisonRows(current: DailyTotal[], period: ReportPeriod, previous: DailyTotal[], comparison: ReportPeriod) {
  const length = Math.max(dayOfPeriod(period.end, period), dayOfPeriod(comparison.end, comparison));
  const currentValues = new Map(current.map(row => [row.date, row.total]));
  const previousValues = new Map(previous.map(row => [row.date, row.total]));
  return Array.from({ length }, (_, index) => {
    const date = dateAt(period, index), refDate = dateAt(comparison, index);
    return { month: String(index + 1), label: String(index + 1), date, refDate, refMonth: comparison.start.slice(0, 7),
      current: date <= period.actualEnd ? currentValues.get(date) ?? null : null,
      previous: refDate <= comparison.actualEnd ? previousValues.get(refDate) ?? null : null,
      planned: null };
  });
}
