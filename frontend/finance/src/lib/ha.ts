import {
  Account,
  AccountSeries,
  RangeKey,
  RecurringStream,
  SpendingSummary,
  SpendingTxn,
  StreamActual,
  StreamProjection,
} from "./types";

// The slice of the hass object the cards rely on.
export type Hass = {
  user?: { id: string };
  connection: {
    sendMessagePromise<T>(msg: Record<string, unknown>): Promise<T>;
    subscribeEvents<T>(
      callback: (ev: T) => void,
      eventType: string
    ): Promise<() => Promise<void>>;
  };
};

export type CensorChangedEvent = {
  data: { entry_id: string; censored: boolean };
};

// Fired by the integration whenever the key's censor state flips (a reveal
// from any card or device, a conceal, a service call, or window expiry).
export const EVENT_CENSOR_CHANGED = "netwrth_censor_changed";

export type Me = {
  label: string;
  scope: "read_censored" | "read_full";
  censored: boolean;
  revealed: boolean;
  reveal_expires: string | null;
  code_required: boolean;
  can_reveal: boolean;
};

export type Overview = {
  entry_id: string;
  me: Me;
  accounts: Account[];
  currency: string;
  default_reveal_ttl_minutes: number;
};

export type EntryInfo = { entry_id: string; title: string; scope: string | null };

export function fetchOverview(hass: Hass, entry?: string, month?: string): Promise<Overview> {
  return hass.connection.sendMessagePromise<Overview>({
    type: "family_finance/overview",
    ...(month ? { month } : {}),
    ...(entry ? { entry_id: entry } : {}),
  });
}

export function fetchSeries(
  hass: Hass,
  entry: string | undefined,
  range: RangeKey,
  month?: string
): Promise<{ series: AccountSeries[]; censored: boolean }> {
  return hass.connection.sendMessagePromise({
    type: "family_finance/series",
    range,
    ...(month ? { month } : {}),
    ...(entry ? { entry_id: entry } : {}),
  });
}

// ---- Spending (per-user feature: the integration answers the distinct
// error code "not_enabled" when the key's netwrth account lacks it) ----

export type SpendingRecurring = {
  censored: boolean;
  month: string;
  today: string; // YYYY-MM-DD for the live month; "" for history
  streams: RecurringStream[];
  expected: StreamProjection[];
  actuals: StreamActual[];
  total_due: string;
  total_remaining: string;
  bill_count: number;
};

export type InvestmentEntry = {
  id: string; date: string; name: string; amount: string;
  source_account_id: number; destination_account_id: number;
  status: "recorded" | "scheduled" | "awaiting_statement";
};

export type SpendingInvestments = {
  month: string; censored: boolean;
  total_recorded: string; total_pending: string; total_committed: string;
  recorded: InvestmentEntry[]; expected: InvestmentEntry[];
};

export function fetchSpendingInvestments(hass: Hass, entry: string | undefined, month: string): Promise<SpendingInvestments> {
  return hass.connection.sendMessagePromise({type: "family_finance/spending_investments", month,
    ...(entry ? {entry_id: entry} : {})});
}

export function fetchSpendingSummary(
  hass: Hass,
  entry: string | undefined,
  month?: string
): Promise<SpendingSummary> {
  return hass.connection.sendMessagePromise({
    type: "family_finance/spending_summary",
    ...(month ? { month } : {}),
    ...(entry ? { entry_id: entry } : {}),
  });
}

export function fetchSpendingRecurring(
  hass: Hass,
  entry: string | undefined,
  month?: string
): Promise<SpendingRecurring> {
  return hass.connection.sendMessagePromise({
    type: "family_finance/spending_recurring",
    ...(month ? { month } : {}),
    ...(entry ? { entry_id: entry } : {}),
  });
}

export function fetchSpendingTransactions(
  hass: Hass,
  entry: string | undefined,
  month?: string,
  theme?: string
): Promise<{ month: string; censored: boolean; transactions: SpendingTxn[] }> {
  return hass.connection.sendMessagePromise({
    type: "family_finance/spending_transactions",
    ...(month ? { month } : {}),
    ...(theme ? { theme } : {}),
    ...(entry ? { entry_id: entry } : {}),
  });
}

export function listEntries(hass: Hass): Promise<EntryInfo[]> {
  return hass.connection.sendMessagePromise({ type: "family_finance/entries" });
}
