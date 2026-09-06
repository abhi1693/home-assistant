import { useEffect, useState } from "react";
import { Hass, fetchSpendingTransactions } from "../lib/ha";
import { money } from "../lib/format";
import { Account, SpendingSummary, SpendingTxn } from "../lib/types";

type Source = { name: string; total: number; transactions: SpendingTxn[] };

export default function IncomeBreakdown({ hass, entry, month, summary, accounts }: {
  hass: Hass; entry?: string; month: string; summary: SpendingSummary; accounts: Account[];
}) {
  const [result, setResult] = useState<{
    summary: SpendingSummary; transactions: SpendingTxn[]; error?: string;
  } | null>(null);
  useEffect(() => {
    let active = true;
    fetchSpendingTransactions(hass, entry, month)
      .then(out => {
        if (active) setResult({ summary, transactions: out.transactions.filter(tx => tx.transaction_type === "deposit") });
      })
      .catch(() => {
        if (active) setResult({ summary, transactions: [], error: "Unable to load income sources." });
      });
    return () => { active = false; };
  }, [hass.connection, hass.user?.id, entry, month, summary]);

  const current = result?.summary === summary ? result : null;
  if (!current) return <div className="income-breakdown status">Loading income sources…</div>;
  if (current.error) return <div className="error-box">{current.error}</div>;
  if (!current.transactions.length) return <div className="income-breakdown status">No credits recorded this month.</div>;

  const incomeCategories = new Set(summary.income_categories.map(name => name.trim().toLowerCase()));
  const accountNames = new Map(accounts.map(account => [account.id, account.nickname || account.name]));
  const groups = [new Map<string, Source>(), new Map<string, Source>()];
  for (const tx of current.transactions) {
    const included = incomeCategories.has((tx.category ?? "").trim().toLowerCase());
    const sources = groups[included ? 0 : 1];
    const name = tx.merchant && !["(no name)", "unknown"].includes(tx.merchant.toLowerCase())
      ? tx.merchant : tx.description || "Unlabelled source";
    const source = sources.get(name) ?? { name, total: 0, transactions: [] };
    source.total -= Number(tx.amount);
    source.transactions.push(tx);
    sources.set(name, source);
  }

  return (
    <div className="income-breakdown">
      <div className="income-breakdown-head">
        <h3>Where the money came from</h3>
        <span className="muted">Recorded credits <strong>{money(Number(summary.total_credits), true)}</strong></span>
      </div>
      {groups.map((sources, index) => {
        if (!sources.size) return null;
        const title = index === 0 ? "Income" : "Other credits";
        return (
          <section className="income-source-group" key={title} aria-label={title}>
            <div className="income-group-head">
              <span>{title} <small className="muted">{index === 0 ? summary.income_categories.join(" + ") : "Excluded from income"}</small></span>
              <strong className={index === 0 ? "up" : ""}>{money(Number(index === 0 ? summary.total_income : summary.total_other_credits), true)}</strong>
            </div>
            {[...sources.values()].sort((a, b) => b.total - a.total).map(source => (
              <details className="income-source" key={source.name}>
                <summary>
                  <span className="income-source-name">{source.name}</span>
                  <span className="income-source-amount">{money(source.total, true)}<small className="muted">{source.transactions.length} {source.transactions.length === 1 ? "credit" : "credits"}</small></span>
                </summary>
                <div className="income-transactions">
                  {source.transactions.map(tx => (
                    <div className="income-transaction" key={tx.id}>
                      <div>
                        <div className="income-transaction-description">{tx.description}</div>
                        <div className="muted income-transaction-meta">
                          {new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeZone: "Asia/Kolkata" }).format(new Date(tx.posted_at))}
                          {" · "}{accountNames.get(tx.account_id) ?? `Account ${tx.account_id}`}
                          {tx.category ? ` · ${tx.category}` : ""}
                        </div>
                      </div>
                      <strong>{money(-Number(tx.amount), true)}</strong>
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </section>
        );
      })}
    </div>
  );
}
