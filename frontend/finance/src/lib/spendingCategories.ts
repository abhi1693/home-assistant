import { SpendingSummary, SpendingTxn } from "./types";

export type SpendingCategory = {
  id: string;
  theme: string;
  total: string;
  count: number;
  themes: string[];
  color: string;
  kind: "category" | "others" | "uncategorised";
};

// Eight distinct category colors; the two aggregate colors are reserved.
const COLORS = ["#60a5fa", "#fb923c", "#34d399", "#a78bfa", "#facc15", "#22d3ee", "#f472b6", "#f87171"];
const isUncategorised = (name: string) => ["", "uncategorised", "uncategorized"].includes(name.trim().toLowerCase());
const cents = (value: string) => Math.round(Number(value) * 100);

export function spendingCategories(themes: SpendingSummary["themes"]): SpendingCategory[] {
  const positive = themes.filter(t => cents(t.total) > 0);
  const ranked = positive.filter(t => !isUncategorised(t.theme))
    .sort((a, b) => cents(b.total) - cents(a.total) || a.theme.localeCompare(b.theme));
  const leading = ranked.slice(0, 8);
  const colors = new Map<string, string>();
  const used = new Set<number>();
  // Resolve collisions instead of repeating colors. Allocation depends on the
  // category names, so changing their rank does not change their colors.
  for (const row of [...leading].sort((a, b) => a.theme.localeCompare(b.theme))) {
    let index = Array.from(row.theme).reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 0) % COLORS.length;
    while (used.has(index)) index = (index + 1) % COLORS.length;
    used.add(index);
    colors.set(row.theme, COLORS[index]);
  }
  const rows: SpendingCategory[] = leading.map(t => ({
    ...t, id: `category:${t.theme}`, themes: [t.theme], color: colors.get(t.theme)!, kind: "category",
  }));
  const appendGroup = (members: SpendingSummary["themes"], kind: "others" | "uncategorised", theme: string, color: string) => {
    if (!members.length) return;
    rows.push({id: kind, kind, theme, color, themes: members.map(t => t.theme),
      total: (members.reduce((sum, t) => sum + cents(t.total), 0) / 100).toFixed(2),
      count: members.reduce((sum, t) => sum + t.count, 0)});
  };
  appendGroup(ranked.slice(8), "others", "Others", "#94a3b8");
  appendGroup(positive.filter(t => isUncategorised(t.theme)), "uncategorised", "Uncategorised", "#b89b72");
  return rows;
}

export function categoryTransactions(transactions: SpendingTxn[], row: SpendingCategory): SpendingTxn[] {
  const members = new Set(row.themes);
  return transactions.filter(tx => tx.transaction_type === "withdrawal" && members.has(tx.theme ?? "Uncategorised"));
}
