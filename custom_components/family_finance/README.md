# Family Finance

Private Firefly III data for `/home-tablet/finance`. The dashboard is visible to
the `abhimanyu` profile and shows amounts after normal Home Assistant login,
without a PIN. Every `family_finance/*` WebSocket command checks that exact
active HA user before accessing a client/cache and again before returning data.
There is no administrator bypass on these commands.

The top reporting-period selector supports months, calendar years
(January–December), financial years (April–March), and inclusive custom dates.
All existing panels use those dates, including their transaction drill-downs.
Balances are snapshots at the period end (or today), never sums of monthly
balances. The net-worth summary follows the selected period in every mode,
including months. Its change uses the closing balance immediately before the
period starts, including all movements on the first day. Current-month balances
stop at today. The net-worth history chart retains its independent range in
ordinary Month mode and follows annual/custom views and explicit month/year comparisons.
Selections stay in memory for the HA connection and user.

The private `family_finance/history` command supplies the earliest recorded
transaction date for the selectors. It reads the first and last pages of
Firefly's date-descending transaction collection with one record per page and
shares the five-minute cache. It does not download the entire ledger or infer
history from account creation dates. Calendar and comparison years start in
that year; financial years include the April–March period containing the first
record. Month comparisons list earlier months back to that first recorded month;
month and custom-date inputs also stop at the available history.
An empty ledger offers only the current reporting year, without inventing dates.

Every period-data command accepts the existing `month` or a paired `start`/`end`
(`YYYY-MM-DD`), never both. Invalid, inverted, future-starting or over-five-year
explicit windows fail before any Firefly request. Queries use Asia/Kolkata
calendar dates. Actual transactions and balances stop at today; bill and
investment forecasts can extend to the requested end. Overview and spending responses include
`start`, `end`, `as_of`; spending responses also include decimal monthly totals, with `null` recorded totals
for future months. Comparison requests use the same authorized endpoints,
using full completed months or matching elapsed days for a current-month
comparison, and matching elapsed calendar dates for year comparisons. Cache keys
include both dates and actuals' cutoff, keeping years separate.

Investment schedules are expanded over the full date range before matching,
so a payment near a month boundary settles one occurrence, not two. Firefly
bill schedules are requested for the full range; only included paid/remaining
dates enter totals. No subscriptions, transfers or valuations are synthesized.

## Connection

Configure the built-in **Firefly III** integration under **Settings > Devices &
services**. In this deployment its URL is
`http://finance.home:80` or `http://firefly-iii.finance.svc.cluster.local:8080`.
Keep the explicit port: HA 2026.9.1's Firefly client otherwise defaults to 9000.
Enter the personal access token in that integration's UI. Family Finance reads the saved entry through
HA's config-entry API; credentials never enter Lovelace, Git, browser storage,
or response/error payloads. It detects later setup and token rotation without
a dashboard restart. Exactly one enabled native connection is selected by
default. With several connections, set `firefly_entry_id` under `family_finance`.

The native integration's sensors remain separate from these chart responses.
Bootstrap excludes every entity with platform `firefly_iii` from non-owner
family grants, including accounts/categories created before the next bootstrap.
New sensors have no implicit sensor-domain grant. As with all HA integrations,
HA server operators and administrators retain control over the underlying system.

For a deployment without the native integration, optional `base_url` and
`api_token: !env_var FIREFLY_TOKEN` settings provide the same server-side client.
Use an encrypted Secret for that environment variable; do not put tokens in YAML.

## Data behavior

- GET-only requests to the Firefly v1 API; redirects are refused.
- Account closing balances and daily history from Firefly, including closed
  accounts for historical continuity. `include_net_worth: false` excludes an
  account from the net-worth cards. Loan signs are preserved, including lending.
  Excluded accounts still contribute purchases to payment-method spending and
  remain available in credit-card history. The savings chart selects only the
  configured savings account IDs; it does not expose the full balance inventory.
  Chart requests select one explicit `accounts[]` ID and omit `preselected`;
  Firefly rejects its internal `empty` preset if sent as a query parameter.
- `ccAsset` identifies credit cards. Investments or imported cards with another
  role can be assigned explicitly by account ID under `account_overrides`.
- Monetary calculations use Python `Decimal`. The dashboard uses INR and Indian
  number formatting. Foreign records need Firefly's INR primary-currency
  conversion; missing conversion returns an error rather than a mixed total.
- Monthly spending sums withdrawal splits once. Income follows the household's
  definition: all external deposits, including salary, Amazon royalties, refunds,
  family credits and uncategorised receipts. Sources groups them by sender and
  expands to dated transactions with receiving accounts. There is no separate
  "Other credits" total or category allowlist.
- Self-transfers, credit-card repayments, opening balances and reconciliation
  entries are excluded from income and its source breakdown. A deposit whose
  source and destination are both owned ledger accounts is excluded too.
  `self_transfer_journal_ids` handles reviewed historical receipts imported as
  deposits from an unnamed revenue account. The configured eight IDs were
  identified from own-sender bank narrations in April–July 2024, April 2025 and
  August 2026. They are removed before caching monthly transaction details, so
  summary and display use the same filter. Review new misclassified imports
  before adding their journal IDs; never exclude all unnamed receipts or match
  the owner's name anywhere in a description (salary can name the recipient).
  This filter changes only the dashboard: Firefly transactions, categories,
  signed balances, net-worth history and actual transfer/payment data remain
  intact.
- Credit-card history uses the selected calendar month, including older months;
  negative card-side transfer entries identify payments. The chart displays
  daily closing ledger balances, not intraday bank snapshots.
- Bills come from Firefly subscriptions (`/bills`, the v1 API name), their
  remaining `pay_dates`, and recorded `paid_dates`. No obligations are inferred
  from merchant activity. Variable bills use their configured range midpoint
  for estimates; skipped periods affect the monthly estimate. An empty schedule
  remains empty. Recurring transaction templates are not subscription schedules.
  The tile sums recorded payments and remaining occurrences inside the
  selected period. It does not annualize subscriptions or include starts beyond
  that period; paid bills are not added to remaining costs.
- Investment funding counts only the outgoing leg of transfers from a
  non-investment account to an explicitly classified investment account.
  Redemptions, transfers between investment accounts, and ordinary bank/card
  transfers do not count as new contributions. Income and spending are unchanged.
  The investment panel shows recorded contributions plus unmatched planned
  dates in the selected period. Past dates awaiting a statement are labelled
  accordingly, not treated as confirmed payments. Remaining income subtracts
  spending, remaining bills, and investment commitments; paid bills are already
  in spending and are not deducted twice.
- Reporting dates use `Asia/Kolkata`. Future transactions are excluded from
  current spending; future bill schedules remain visible.
- Successful responses share a five-minute in-memory cache (maximum 32 shapes).
  Cards check every minute. Requests are serialized to limit Firefly load;
  pagination is capped at 10,000 objects, responses at 8 MiB, and history at
  100 years. Failures are shown rather than silently returning partial totals.
- The adapter creates no entities, financial events, or Recorder entries. The
  native Firefly integration independently creates its normal sensors.

## Private investment schedules

Use `investment_file` or the `FAMILY_FINANCE_INVESTMENT_FILE` environment variable
to point to a server-side JSON file. Keep household amounts and schedules in
private deployment configuration, outside this public repository. It is read
and validated at integration startup; a configured missing or invalid file
fails setup instead of silently hiding commitments. Without a file, no plans
are inferred. The optional file has this shape (sample values only):

```json
{
  "account_ids": [456],
  "plans": [{
    "id": "sample-fund", "name": "Sample fund", "amount": "2000",
    "source_account_id": 123, "destination_account_id": 456,
    "start_date": "2026-09-01", "frequency": "monthly",
    "description_contains": "FUND"
  }]
}
```

`account_ids` classifies existing asset accounts as investments. Plans support
`weekly` (weekday anchored by `start_date`) and `monthly` (day anchored by
`start_date`, clamped to the last day in shorter months), with optional inclusive
`end_date`. Only dates on or after the explicit start enter forecasts. A
recorded contribution replaces one scheduled occurrence when source,
destination, amount and description match within three days; matching is
case-insensitive and each payment is used once. Different amounts or narration
and payments outside that window need review. Historical contributions remain
visible even before a current plan's start. When source, destination, amount,
and a nonempty description matcher identify one provider name, recorded rows
use that name independently of schedule dates. Empty or ambiguous matchers
retain the Firefly counterparty name. A display-name match does not mark a
scheduled occurrence paid or create a historical forecast. These plans create no Firefly
transactions, subscriptions, rules, or HA financial entities.

Example optional overrides (replace IDs with the actual Firefly account IDs):

```yaml
family_finance:
  access_file: /config/access/family-dashboard.json
  account_overrides:
    "123":
      kind: credit
    "456":
      kind: investment
      category: retirement
```

Frontend sources, provenance, and build instructions are in
[`frontend/finance`](../../frontend/finance/README.md). The network policy is owned
by the home-lab Fleet bundles; direct live workload changes are not needed.
