export type Account = {
  id: number;
  provider: string;
  org_domain: string;
  org_name: string;
  name: string;
  nickname: string | null;
  currency: string;
  kind: "cash" | "investment" | "credit" | "loan" | "other";
  category: "retirement" | "taxable" | null;
  hidden: boolean;
  balance: string | null;
  balance_at: string | null;
  created_at: string;
};

export type SeriesPoint = { ts: string; balance: string };
export type AccountSeries = { account_id: number; points: SeriesPoint[] };

export type ProviderConn = {
  id: number;
  kind: string;
  external_id: string;
  label: string;
  created_at: string;
  last_ok: string | null;
  last_error: string | null;
};

export type Settings = {
  baseline: string | null;
  censored: boolean;
  code_required: boolean;
  plaid_available: boolean;
};

export type ApiKey = {
  id: number;
  label: string;
  scope: "read_censored" | "read_full";
  created_at: string;
  last_used_at: string | null;
  revealed: boolean;
  reveal_expires: string | null;
};

// ---- Spending (mirrors frontend/lib/types.ts in the app repo; keep the
// shapes byte-identical so web-side changes re-sync as a straight diff) ----

export type ThemeTotal = {
  theme: string;
  total: string; // decimal string, positive = money out; censor-scaled when censored
  count: number;
};

export type SpendingSummary = {
  month: string; // YYYY-MM
  censored: boolean;
  themes: ThemeTotal[];
  total_spend: string;
  total_income: string;
  total_other_credits: string;
  total_credits: string;
  income_categories: string[];
};

export type SpendingTxn = {
  transaction_type?: "withdrawal" | "deposit" | "transfer";
  id: number;
  account_id: number;
  posted_at: string;
  amount: string;
  currency: string;
  description: string;
  merchant: string | null;
  merchant_key: string;
  logo_url: string | null;
  category: string | null;
  theme: string | null;
  provider_theme?: string | null; // what the bank's category alone maps to
  pending: boolean;
  theme_origin: string;
  logo_origin: string;
  merchant_renamed: boolean;
  provider_merchant?: string | null;
};

export type RecurringStream = {
  monthly_amount?: string;
  frequency_label?: string;
  merchant_key: string;
  merchant: string | null;
  logo_url: string | null;
  theme: string | null;
  frequency: "weekly" | "biweekly" | "monthly" | "quarterly" | "annual";
  day_of_month: number;
  interval_days: number;
  average_amount: string;
  last_amount: string;
  first_seen: string;
  last_seen: string;
  count: number;
  active: boolean;
  is_income: boolean;
  merchant_renamed: boolean;
};

// One predicted occurrence in the current month (backend-computed;
// overdue = expected before today but never observed).
export type StreamProjection = {
  merchant_key: string;
  merchant?: string;
  logo_url?: string;
  frequency: RecurringStream["frequency"];
  is_income: boolean;
  date: string;
  amount: number;
  overdue: boolean;
};

// A real charge/paycheck this month matched to a detected stream.
export type StreamActual = {
  merchant_key: string;
  date: string;
  amount: string;
  is_income: boolean;
};

export type ChartMode = "flow" | "total" | "stacked" | "category";

export type RangeKey = "1d" | "1w" | "1m" | "3m" | "6m" | "1y" | "all";
export const RANGES: RangeKey[] = ["1d", "1w", "1m", "3m", "6m", "1y", "all"];
