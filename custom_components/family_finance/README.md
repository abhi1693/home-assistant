# Family Finance

Private Firefly III data for `/home-tablet/finance`. The dashboard is visible to
the `abhimanyu` profile and shows amounts after normal Home Assistant login,
without a PIN. Every `family_finance/*` WebSocket command checks that exact
active HA user before accessing a client/cache and again before returning data.
There is no administrator bypass on these commands.

The top reporting-month selector controls spending, accounts, bill schedules,
and credit-card history together. Past account balances are read at month end;
the current month uses today's balances. Net-worth cards retain their own
range. The chosen month stays in memory for this browser's HA connection and
user, without a shared HA helper or persistent browser storage.

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
  Excluded accounts remain visible in the account list and credit-card history.
  Chart requests select one explicit `accounts[]` ID and omit `preselected`;
  Firefly rejects its internal `empty` preset if sent as a query parameter.
- `ccAsset` identifies credit cards. Investments or imported cards with another
  role can be assigned explicitly by account ID under `account_overrides`.
- Monetary calculations use Python `Decimal`. The dashboard uses INR and Indian
  number formatting. Foreign records need Firefly's INR primary-currency
  conversion; missing conversion returns an error rather than a mixed total.
- Monthly spending sums withdrawal splits once. Income includes only deposits
  in the explicitly configured `income_categories` (currently `[Salary]`).
  Other deposits, including refunds, family credits and uncategorised receipts,
  remain visible separately as **Other credits**; their amounts are not deleted
  or reclassified in Firefly. The income Sources control groups both sets by
  source and expands to dated transactions with receiving accounts.
  Self-transfers between owned accounts, credit-card repayments, opening
  balances, and reconciliation entries are excluded from income and its
  source breakdown, including transfers labelled Salary. Firefly category
  names are preserved.
- Credit-card history uses the selected calendar month, including older months;
  negative card-side transfer entries identify payments. The chart displays
  daily closing ledger balances, not intraday bank snapshots.
- Bills come from Firefly subscriptions (`/bills`, the v1 API name), their
  remaining `pay_dates`, and recorded `paid_dates`. No obligations are inferred
  from merchant activity. Variable bills use their configured range midpoint
  for estimates; skipped periods affect the monthly estimate. An empty schedule
  remains empty. Recurring transaction templates are not subscription schedules.
- Reporting dates use `Asia/Kolkata`. Future transactions are excluded from
  current spending; future bill schedules remain visible.
- Successful responses share a five-minute in-memory cache (maximum 32 shapes).
  Cards check every minute. Requests are serialized to limit Firefly load;
  pagination is capped at 10,000 objects, responses at 8 MiB, and history at
  100 years. Failures are shown rather than silently returning partial totals.
- The adapter creates no entities, financial events, or Recorder entries. The
  native Firefly integration independently creates its normal sensors.

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
