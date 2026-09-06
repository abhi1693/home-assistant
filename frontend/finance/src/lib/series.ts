import { Account, AccountSeries, RangeKey } from "./types";

// One aligned timeline row: epoch millis + forward-filled balance per account.
export type Row = { ts: number; values: Record<number, number> };

// Align per-account series onto a shared timeline, forward-filling each
// account's last known balance. Before an account's first snapshot its first
// known balance is backfilled, so onboarding an account reads as "it was
// always worth that" rather than a jump from 0.
export function alignSeries(series: AccountSeries[]): Row[] {
  const tsSet = new Set<number>();
  for (const s of series) {
    for (const p of s.points) tsSet.add(new Date(p.ts).getTime());
  }
  const timeline = [...tsSet].sort((a, b) => a - b);
  const rows: Row[] = timeline.map((ts) => ({ ts, values: {} }));

  for (const s of series) {
    const pts = s.points
      .map((p) => ({ ts: new Date(p.ts).getTime(), v: parseFloat(p.balance) }))
      .sort((a, b) => a.ts - b.ts);
    let i = 0;
    let last = 0;
    for (const row of rows) {
      while (i < pts.length && pts[i].ts <= row.ts) {
        last = pts[i].v;
        i++;
      }
      row.values[s.account_id] = last;
    }
  }
  return rows;
}

// Snap the timeline to a baseline: everything at-or-before `baseline` is
// collapsed into a single synthetic row at exactly `baseline` carrying each
// account's value at that moment, so charts and deltas start there.
export function clipRows(rows: Row[], baseline: number | null): Row[] {
  if (baseline == null || rows.length === 0) return rows;
  let idx = -1;
  for (let i = rows.length - 1; i >= 0; i--) {
    if (rows[i].ts <= baseline) {
      idx = i;
      break;
    }
  }
  if (idx < 0) return rows;
  const base: Row = { ts: baseline, values: { ...rows[idx].values } };
  return [base, ...rows.slice(idx + 1)];
}

export function sumRow(
  row: Row,
  accounts: Account[],
  pick: (a: Account) => boolean = () => true
): number {
  let total = 0;
  for (const a of accounts) {
    if (pick(a)) total += row.values[a.id] ?? 0;
  }
  return total;
}

// Calendar bucketing shared by the delta-shaped charts: day buckets for
// short ranges, weeks for months, months for everything longer.
function bucketKeyOf(range: RangeKey): (ts: number) => number {
  const bucket =
    range === "1d" || range === "1w" ? "day" : range === "1m" || range === "3m" ? "week" : "month";
  return (ts: number) => {
    const d = new Date(ts);
    if (bucket === "day") return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    if (bucket === "week") {
      const monday = (d.getDay() + 6) % 7;
      return new Date(d.getFullYear(), d.getMonth(), d.getDate() - monday).getTime();
    }
    return new Date(d.getFullYear(), d.getMonth(), 1).getTime();
  };
}

// Net flow per calendar bucket for a group of accounts: the change in the
// group's total balance within each day/week/month (granularity follows the
// selected range). Positive = money kept, negative = burn. This is the flow
// view's chart — balance deltas stand in for income minus spending.
export function flowSeries(
  rows: Row[],
  accounts: Account[],
  range: RangeKey
): { ts: number; flow: number }[] {
  if (rows.length === 0) return [];
  const keyOf = bucketKeyOf(range);
  // Last known group total within each bucket.
  const endTotals = new Map<number, number>();
  for (const r of rows) endTotals.set(keyOf(r.ts), sumRow(r, accounts));
  const keys = [...endTotals.keys()].sort((a, b) => a - b);
  let prev = sumRow(rows[0], accounts);
  return keys.map((k) => {
    const end = endTotals.get(k)!;
    const flow = end - prev;
    prev = end;
    return { ts: k, flow };
  });
}

// Per-account balance change within each calendar bucket (same bucketing as
// flowSeries): not how much each account holds, but who moved the total.
// Feeds the stacked mode's sign-stacked bars; net is the bucket's sum.
export function deltaSeries(
  rows: Row[],
  accounts: Account[],
  range: RangeKey
): { ts: number; deltas: Record<number, number>; net: number }[] {
  if (rows.length === 0) return [];
  const keyOf = bucketKeyOf(range);
  // Last known row within each bucket carries every account's end balance.
  const endRows = new Map<number, Row>();
  for (const r of rows) endRows.set(keyOf(r.ts), r);
  const keys = [...endRows.keys()].sort((a, b) => a - b);
  let prev = rows[0];
  return keys.map((k) => {
    const end = endRows.get(k)!;
    const deltas: Record<number, number> = {};
    let net = 0;
    for (const a of accounts) {
      const d = (end.values[a.id] ?? 0) - (prev.values[a.id] ?? 0);
      deltas[a.id] = d;
      net += d;
    }
    prev = end;
    return { ts: k, deltas, net };
  });
}

export function debtOfRow(row: Row, accounts: Account[]): number {
  let debt = 0;
  for (const a of accounts) {
    const v = row.values[a.id] ?? 0;
    if (v < 0) debt += v;
  }
  return debt;
}
