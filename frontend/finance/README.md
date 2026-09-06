# Finance cards

The cards in this directory adapt
[`eduser25/netwrth-hacs`](https://github.com/eduser25/netwrth-hacs), commit
`d32f413b1391bdf2250b74bbf7cd07cb7b8a2ab9`, under the
[MIT license](LICENSE.netwrth). Copyright (c) 2026 Eduard Serra. The complete
license is also included in the generated bundle.

The local adapter replaces the netwrth API with Home Assistant's private
`family_finance/*` WebSocket commands. No netwrth deployment or account is
required. Changes include INR formatting, no PIN/reveal controls or bundled
demo data, account-switch cleanup, category drill-down race handling, selected
month credit history, explicit transaction types for repayments, and responsive
bill/card charts. Bill tooltips preserve Firefly's exact recurrence label,
including skipped periods, without rounding it to quarterly or annual text.
The dashboard defaults to a static dark background.
Net-worth exclusions affect totals and their chart only; the account list and
credit-card history still show these accounts.
Chart axes and hover dates include the year whenever the displayed history
includes another calendar year, using the dashboard's Asia/Kolkata timezone.

The net-worth summary uses exact INR amounts in a signed breakdown: Cash & bank,
Investments, any Other assets, and Negative balances. Each tracked balance enters
one group once; negative investment/retirement balances are subtracted without
being labelled as loans. Hover, focus, or tap an amount to see its contributing
accounts. The change badge explains the actual start/end dates and balances,
end minus start, and change divided by the absolute starting balance. It describes
change across the tracked ledger, including cash movements and imported
valuations. A zero starting balance shows the rupee change without a percentage.
Tooltips stay within the viewport, support Escape/outside dismissal, and close
when access changes. The summary follows the shared month and shows its closing
balance (or today), the dated component breakdown, and change from the previous
day's closing balance before the month began. The tooltip explains that opening
baseline, including the first day's movements. The net-worth history chart keeps
its independent range in Month mode.

`family-finance-month-card` provides the shared reporting-period control (the
existing tag and `month_group` option remain compatible). Select Month,
Calendar year (January–December), Financial year (April–March), or Custom dates
(up to five years), then optionally choose an earlier comparison year. The same
panels show period totals, monthly income/spending/contribution/bill charts,
category comparisons, account sparklines and closing balances, and credit-card
balance overlays. The net-worth summary follows every selected period. Its
history chart keeps an independent range in ordinary Month mode; annual/custom
views and explicit comparisons use the shared period. Assign the
same `month_group` to all participating cards, including net-worth cards.
Year and comparison options start at the first recorded Firefly transaction,
including its containing financial year. The selector shows that first date;
month navigation and custom-date inputs use it as their lower boundary. The
available history refreshes every five minutes and when the screen wakes.

An unfinished period includes actuals only through today. Its comparison ends
on the corresponding calendar date in the selected comparison year; leap days
clamp to the last valid day of February. Future months have no recorded bars,
while explicit future commitments remain separately labelled. The selector
shows the actual comparison dates. Net-worth comparison uses total balance
lines on a shared axis; standalone chart modes remain available outside
comparison mode. Category comparisons use the displayed category grouping.

Selections remain scoped to the HA connection, user and group in memory.
Changing periods clears obsolete figures and drill-downs. Comparison requests
share their panel's spinner and access checks. Mobile month charts scroll
inside their panel. Ungrouped cards retain standalone month/range controls.

Each data panel shows its own spinner during initial loading, period changes,
and background refreshes. Refreshes retain the current figures and keep
controls usable. Spinners settle on success or failure, and obsolete responses
cannot settle a newer request. Income-source and category details show their
spinner inside the expanded section. Loading states are labelled for assistive
technology and respect reduced-motion preferences.

Spending presents period totals and the eight largest named categories,
with remaining categories combined into Others and Uncategorised shown separately
when present. The donut and list share the same groups and a distinct color for
every displayed group. Names, amounts, shares, and transaction counts remain
visible. Others expands to its constituent spending transactions, labelled with
their original categories; income and transfers never enter that drill-down.
Expanded details stay beneath their category in its original grid column;
opening a category preserves the neighboring category's position and width.
Accounts use a responsive grid with account initials and period-end balances.
Accounts and scheduled
bills each occupy the full dashboard width, so an empty schedule stays compact
without leaving a gap beside the account list.

The recurring-bills tile shows the selected period's actual payments plus
remaining scheduled occurrences, without a monthly average or unrelated active
subscriptions. Its count includes only bills represented in that period.
The investments card lists dated contributions and explicit scheduled payments,
with separate Recorded and Scheduled / awaiting statement totals. It calculates
income after spending, remaining bills and investment commitments. Statement
matches replace scheduled amounts, preventing a second deduction. The panel has
its own loading/refresh spinner and follows the shared reporting period.
Recorded contributions use their configured provider name when account, amount,
and narration identify it, including months before the current schedule starts.

The Income tile totals all external credits, including salary, royalties,
refunds and other receipts. Its Sources control opens one breakdown
grouped by sender with exact amounts, transaction dates and
receiving accounts. It reads the existing private date-filtered transaction endpoint
on demand; closing the section or changing period discards pending responses.
Self-transfers, including reviewed deposits from historical imports, and card
repayments are excluded from income and its source breakdown, even if the
transfer has a Salary category. The backend filters these before returning
transaction details, so the hidden amounts are never added to the source list.

Build with Node.js and the committed dependency lockfile:

```sh
cd frontend/finance
npm ci --ignore-scripts
npm run typecheck
npm run build
```

This emits `www/family-finance-cards.js`, which is committed and installed by
the existing source bootstrap. HA does not need Node.js. Bump the resource
query version in `configuration.yaml` after changing the bundle.

From the repository root:

```sh
python3 -m unittest discover -s tests -v
NODE_PATH=/path/to/node_modules node tests/finance_dashboard_components.js
NODE_PATH=/path/to/node_modules node tests/finance_reporting_periods.js
```

Run `test_family_finance_runtime.py` in a Python environment with the deployed
Home Assistant version installed (validated with 2026.9.1 / Python 3.14). It
exercises the real WebSocket decorators and the GET client against a local test
server; it does not contact the household services. Without HA installed those
runtime tests are skipped. The model and bootstrap tests need no HA install.

The Playwright suite checks 375, 768, and 1440px viewports, overflow, INR,
the net-worth equation and account breakdown, change calculations, hover/touch/
keyboard tooltip access, zero baselines,
transaction drill-down, historical month requests, per-panel loading and
refreshing, request failures, stale responses, and clearing data when the HA
account changes. Screenshots use explicitly labelled sample ledger data
and are written to `/tmp/ha-finance-components` by default. The reporting-period
suite also checks calendar/FY boundaries, same-date comparisons, custom leap-day
ranges, annual drill-downs, comparison spinners and stale-response isolation at
all three widths; its screenshots go to `/tmp/ha-finance-periods`.

See the [integration README](../../custom_components/family_finance/README.md)
for data semantics, access control, and connection setup.
