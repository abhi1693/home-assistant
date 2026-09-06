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
bill/card charts. The dashboard defaults to a static dark background.

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
```

Run `test_family_finance_runtime.py` in a Python environment with the deployed
Home Assistant version installed (validated with 2026.9.1 / Python 3.14). It
exercises the real WebSocket decorators and the GET client against a local test
server; it does not contact the household services. Without HA installed those
runtime tests are skipped. The model and bootstrap tests need no HA install.

The Playwright suite checks 375, 768, and 1440px viewports, overflow, INR,
transaction drill-down, historical month requests, and clearing data when the
HA account changes. Screenshots use explicitly labelled sample ledger data
and are written to `/tmp/ha-finance-components` by default.

See the [integration README](../../custom_components/family_finance/README.md)
for data semantics, access control, and connection setup.
