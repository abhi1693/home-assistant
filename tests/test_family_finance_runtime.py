"""Run with the deployed HA version installed; no live systems are contacted."""

import asyncio
import importlib.util
import json
from datetime import datetime
from pathlib import Path
from tempfile import TemporaryDirectory
from types import SimpleNamespace
import unittest
from unittest.mock import AsyncMock, Mock, patch

HAS_HA = importlib.util.find_spec("homeassistant") is not None
if HAS_HA:
    from aiohttp import ClientSession, web
    from custom_components.family_finance import CONFIG_SCHEMA, async_setup, investment_settings
    from custom_components.family_finance.client import FireflyClient
    from custom_components.family_finance.model import FinanceError, ZONE


@unittest.skipUnless(HAS_HA, "Requires the deployed Home Assistant version")
class FinanceRuntimeTests(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self):
        self.directory = TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.owner = "a" * 32
        access = Path(self.directory.name) / "access.json"
        access.write_text(json.dumps({"profiles": {"abhimanyu": {"user_id": self.owner}}}))
        self.config = CONFIG_SCHEMA({"family_finance": {"access_file": str(access)}})
        self.entry = SimpleNamespace(entry_id="native", disabled_by=None,
            data={"url": "http://firefly.invalid", "api_key": "test-only", "verify_ssl": True})
        async def executor(func): return func()
        self.hass = SimpleNamespace(data={}, auth=SimpleNamespace(async_get_user=AsyncMock(
            return_value=SimpleNamespace(id=self.owner, is_active=True))),
            async_add_executor_job=executor,
            config_entries=SimpleNamespace(async_entries=Mock(return_value=[self.entry])))
        self.commands = {}
        def register(hass, handler):
            self.commands[handler._ws_command] = handler
        with patch("custom_components.family_finance.websocket_api.async_register_command", register):
            await async_setup(self.hass, self.config)

    async def call(self, kind, user_id=None, **fields):
        connection = SimpleNamespace(user=SimpleNamespace(id=user_id or self.owner),
                                     send_error=Mock(), send_result=Mock())
        handler = self.commands[f"family_finance/{kind}"]
        # Invoke the coroutine wrapped by HA's async_response decorator.
        await handler.__wrapped__(self.hass, connection, {"id": 1, "type": f"family_finance/{kind}", **fields})
        return connection

    async def test_every_endpoint_denies_other_users_before_resolving_credentials(self):
        for kind in ["entries", "history", "overview", "series", "spending_summary", "spending_transactions", "spending_recurring", "spending_investments"]:
            self.hass.config_entries.async_entries.reset_mock()
            connection = await self.call(kind, "b" * 32)
            self.assertEqual(connection.send_error.call_args.args[1], "unauthorized")
            self.hass.config_entries.async_entries.assert_not_called()
            connection.send_result.assert_not_called()

    async def test_history_reads_oldest_page_and_refreshes_after_new_imports(self):
        client = FireflyClient(Mock(), "http://firefly.invalid", "test-only", {})
        newest = {"data": [{"attributes": {"transactions": [{"date": "2026-09-01T00:00:00+05:30"}]}}],
                  "meta": {"pagination": {"total_pages": 25001}}}
        oldest = {"data": [{"attributes": {"transactions": [{"date": "2023-02-27T23:30:00Z"}]}}]}
        with patch.object(client, "get", AsyncMock(side_effect=[newest, oldest, newest, oldest])) as get, \
             patch.object(client, "accounts", AsyncMock()) as accounts:
            self.assertEqual(await client.request("history", {}), {"first_date": "2023-02-28"})
            self.assertEqual(await client.request("history", {}), {"first_date": "2023-02-28"})
            self.assertEqual(get.await_count, 2)
            self.assertEqual(get.call_args.args[1]["page"], 25001)
            self.assertEqual(get.call_args.args[1]["limit"], 1)
            self.assertEqual(get.call_args.args[1]["end"], str(datetime.now(ZONE).date()))
            accounts.assert_not_awaited()
            client.cache.clear()
            oldest["data"][0]["attributes"]["transactions"][0]["date"] = "2022-01-01T00:00:00+05:30"
            self.assertEqual(await client.request("history", {}), {"first_date": "2022-01-01"})

    async def test_history_empty_ledger_has_no_invented_start_date(self):
        client = FireflyClient(Mock(), "http://firefly.invalid", "test-only", {})
        with patch.object(client, "get", AsyncMock(return_value={"data": []})) as get:
            self.assertEqual(await client.request("history", {}), {"first_date": None})
            self.assertEqual(get.await_count, 1)
        client.cache.clear()
        with patch.object(client, "get", AsyncMock(return_value={"data": {}})):
            with self.assertRaises(FinanceError):
                await client.request("history", {})

    async def test_private_investment_file_is_loaded_and_validated(self):
        file = Path(self.directory.name) / "investments.json"
        plan = {"id": "fund", "name": "Sample", "amount": "200", "source_account_id": 1,
                "destination_account_id": 2, "start_date": "2026-09-01", "frequency": "monthly"}
        file.write_text(json.dumps({"account_ids": [2], "plans": [plan]}))
        self.config["family_finance"]["investment_file"] = str(file)
        with patch("custom_components.family_finance.websocket_api.async_register_command", lambda h, c: None), \
             patch("custom_components.family_finance.async_get_clientsession", return_value=Mock()):
            await async_setup(self.hass, self.config)
        for changes in [{"amount": "NaN"}, {"amount": "-2"}, {"start_date": "2026-13-01"},
                        {"end_date": "2026-08-31"}, {"destination_account_id": 99}]:
            with self.subTest(changes=changes), self.assertRaises(Exception):
                investment_settings({"account_ids": [2], "plans": [{**plan, **changes}]})

    async def test_owner_reads_are_checked_again_after_fetch_and_deactivation_denies(self):
        with patch("custom_components.family_finance.async_get_clientsession", return_value=Mock()), \
             patch.object(FireflyClient, "request", AsyncMock(return_value={"balance": "100"})):
            connection = await self.call("overview")
            connection.send_result.assert_called_once_with(1, {"balance": "100"})
            self.hass.auth.async_get_user.side_effect = [SimpleNamespace(id=self.owner, is_active=True),
                                                       SimpleNamespace(id=self.owner, is_active=False)]
            connection = await self.call("overview")
            self.assertEqual(connection.send_error.call_args.args[1], "unauthorized")
            connection.send_result.assert_not_called()

    async def test_missing_native_connection_is_actionable_and_token_rotation_drops_cache(self):
        self.hass.config_entries.async_entries.return_value = []
        connection = await self.call("overview")
        self.assertIn("Configure one Firefly III", connection.send_error.call_args.args[2])
        self.hass.config_entries.async_entries.return_value = [self.entry]
        with patch("custom_components.family_finance.async_get_clientsession", return_value=Mock()), \
             patch.object(FireflyClient, "request", AsyncMock(return_value={})):
            await self.call("overview")
            original = self.hass.data["family_finance"]
            original.cache[("test",)] = (999999999999, "private")
            self.entry.data["api_key"] = "rotated-test-only"
            await self.call("overview")
            self.assertIsNot(original, self.hass.data["family_finance"])
            self.assertFalse(self.hass.data["family_finance"].cache)

    async def test_get_client_refuses_redirect_and_reads_complete_chunked_json(self):
        requests = []
        async def route(request):
            requests.append((request.method, request.path))
            if request.path.endswith("redirect"):
                raise web.HTTPFound("/stolen")
            response = web.StreamResponse(headers={"Content-Type": "application/json"})
            await response.prepare(request)
            await response.write(b'{"data":')
            await asyncio.sleep(0)
            await response.write(b'[],"meta":{"pagination":{"total_pages":1}}}')
            await response.write_eof()
            return response
        app = web.Application()
        app.router.add_route("*", "/{path:.*}", route)
        runner = web.AppRunner(app)
        await runner.setup()
        self.addAsyncCleanup(runner.cleanup)
        site = web.TCPSite(runner, "127.0.0.1", 0)
        await site.start()
        port = site._server.sockets[0].getsockname()[1]
        async with ClientSession() as session:
            client = FireflyClient(session, f"http://127.0.0.1:{port}", "test-only", {})
            self.assertEqual(await client.pages("accounts"), [])
            with self.assertRaisesRegex(FinanceError, "302"):
                await client.get("redirect")
        self.assertEqual(requests, [("GET", "/api/v1/accounts"), ("GET", "/api/v1/redirect")])

    async def test_income_and_cached_details_share_the_self_transfer_filter(self):
        client = FireflyClient(Mock(), "http://firefly.invalid", "test-only", {}, [3])
        groups = [{"attributes": {"transactions": [
            {"transaction_journal_id": str(identifier), "type": "deposit", "amount": value,
             "currency_code": "INR", "source_id": "9", "destination_id": "1",
             "date": "2026-08-18T00:00:00+05:30", "category_name": category}
            for identifier, value, category in [(1, "1000", "Salary"), (2, "14.04", "Royalty Income"),
                                                (3, "100000", None), (4, "25", None)]
        ]}}]
        with patch.object(client, "accounts", AsyncMock(return_value=[{"id": 1}])), \
             patch.object(client, "pages", AsyncMock(return_value=groups)) as pages:
            summary = await client.request("spending_summary", {"month": "2026-08"})
            details = await client.request("spending_transactions", {"month": "2026-08"})
            again = await client.request("spending_summary", {"month": "2026-08"})
        self.assertEqual(summary["total_income"], "1039.04")
        self.assertEqual({t["id"] for t in details["transactions"]}, {1, 2, 4})
        self.assertEqual(again, summary)
        pages.assert_awaited_once()

    async def test_history_uses_explicit_accounts_without_invalid_preselection(self):
        selected = []
        async def chart(request):
            # Firefly ChartRequest allows named presets, not its internal
            # "empty" sentinel. An explicit account list must omit the field.
            if "preselected" in request.query:
                return web.json_response({"message": "Invalid preselected"}, status=422)
            self.assertEqual(request.query["period"], "1D")
            self.assertEqual(len(request.query.getall("accounts[]")), 1)
            selected.append(int(request.query["accounts[]"]))
            return web.json_response([{"currency_code": "INR", "entries": {
                request.query["end"]: "120.00",
            }}])
        app = web.Application()
        app.router.add_get("/api/v1/chart/account/overview", chart)
        runner = web.AppRunner(app)
        await runner.setup()
        self.addAsyncCleanup(runner.cleanup)
        site = web.TCPSite(runner, "127.0.0.1", 0)
        await site.start()
        port = site._server.sockets[0].getsockname()[1]
        async with ClientSession() as session:
            client = FireflyClient(session, f"http://127.0.0.1:{port}", "test-only", {})
            with patch.object(client, "accounts", AsyncMock(return_value=[
                {"id": 1, "hidden": False}, {"id": 2, "hidden": True},
            ])):
                result = await client.request("series", {"range": "6m"})
        self.assertEqual(selected, [1, 2])
        self.assertEqual([s["account_id"] for s in result["series"]], [1, 2])
        self.assertTrue(all(s["points"][-1]["balance"] == "120.00" for s in result["series"]))

    async def test_overview_month_uses_closing_balances_and_keeps_current_cache_separate(self):
        now = datetime(2026, 9, 6, 12, tzinfo=ZONE)
        queried = []
        async def pages(path, params):
            queried.append(params["date"])
            return [{"id": "1", "attributes": {"name": "Account", "type": "asset",
                     "currency_code": "INR", "current_balance": "250" if params["date"] == "2026-08-31" else "400"}}]
        client = FireflyClient(Mock(), "http://firefly.invalid", "test-only", {})
        with patch("custom_components.family_finance.client.datetime") as clock, \
             patch.object(client, "pages", side_effect=pages):
            clock.now.return_value = now
            august = await client.request("overview", {"month": "2026-08"})
            current = await client.request("overview", {})
            september = await client.request("overview", {"month": "2026-09"})
            august_again = await client.request("overview", {"month": "2026-08"})
            with self.assertRaisesRegex(FinanceError, "Select a month"):
                await client.request("overview", {"month": "2026-10"})
        self.assertEqual(queried, ["2026-08-31", "2026-09-06"])
        self.assertEqual(august["accounts"][0]["balance"], "250")
        self.assertEqual(current["accounts"][0]["balance"], "400")
        self.assertEqual(september["accounts"], current["accounts"])
        self.assertEqual(august_again["accounts"], august["accounts"])

    async def test_period_income_details_and_monthly_totals_share_filtered_ledger(self):
        client = FireflyClient(Mock(), "http://firefly.invalid", "test-only", {}, [3])
        groups = [{"attributes": {"transactions": [
            {"transaction_journal_id": str(i), "type": kind, "amount": value,
             "currency_code": "INR", "source_id": source, "destination_id": dest,
             "date": day, "category_name": "Sample"}
            for i, kind, value, source, dest, day in [
                (1, "deposit", "1000", "9", "1", "2025-01-01"),
                (2, "deposit", "25", "9", "1", "2025-12-31"),
                (3, "deposit", "999999", "9", "1", "2025-06-01"),
                (4, "transfer", "200", "1", "2", "2025-07-01"),
                (5, "withdrawal", "0.10", "1", "9", "2025-02-28"),
                (6, "withdrawal", "0.20", "1", "9", "2025-02-28"),
                (7, "deposit", "99999", "9", "1", "2024-12-31"),
                (8, "deposit", "99999", "9", "1", "2026-01-01"),
                (9, "reconciliation", "99999", "9", "1", "2025-06-01"),
            ]
        ]}}]
        msg = {"start": "2025-01-01", "end": "2025-12-31"}
        with patch.object(client, "accounts", AsyncMock(return_value=[{"id": 1, "kind": "cash"}, {"id": 2, "kind": "cash"}])), \
             patch.object(client, "pages", AsyncMock(return_value=groups)) as pages:
            summary = await client.request("spending_summary", msg)
            details = await client.request("spending_transactions", msg)
        pages.assert_awaited_once_with("transactions", msg)
        self.assertEqual(summary["total_income"], "1025")
        self.assertEqual(summary["total_spend"], "0.30")
        self.assertEqual(summary["monthly"][1]["total"], "0.30")
        self.assertEqual(summary["income_monthly"][-1]["total"], "25")
        self.assertEqual({t["id"] for t in details["transactions"]}, {1, 2, 4, 5, 6})

    async def test_future_actuals_stop_today_but_bill_query_keeps_financial_year_end(self):
        now = datetime(2026, 9, 6, 12, tzinfo=ZONE)
        client = FireflyClient(Mock(), "http://firefly.invalid", "test-only", {})
        with patch("custom_components.family_finance.client.datetime") as clock, \
             patch.object(client, "accounts", AsyncMock(return_value=[])) as accounts, \
             patch.object(client, "pages", AsyncMock(return_value=[])) as pages:
            clock.now.return_value = now
            query = {"start": "2026-04-01", "end": "2027-03-31"}
            summary = await client.request("spending_summary", query)
            bills = await client.request("spending_recurring", query)
        self.assertEqual(pages.await_args_list[0].args, ("transactions", {"start": "2026-04-01", "end": "2026-09-06"}))
        self.assertEqual(pages.await_args_list[1].args, ("bills", query))
        self.assertEqual(summary["as_of"], "2026-09-06")
        self.assertIsNone(summary["monthly"][-1]["total"])
        self.assertEqual(bills["end"], "2027-03-31")

    async def test_invalid_periods_fail_before_fetch_and_period_series_includes_opening_day(self):
        client = FireflyClient(Mock(), "http://firefly.invalid", "test-only", {})
        with patch.object(client, "accounts", AsyncMock(return_value=[{"id": 1}])) as accounts, \
             patch.object(client, "get", AsyncMock(return_value=[{"currency_code": "INR", "entries": {"2025-12-31": "12"}}])) as get:
            for msg in [{"start": "2025-01-01"}, {"start": "2025-12-31", "end": "2025-01-01"}]:
                with self.assertRaises(FinanceError):
                    await client.request("series", msg)
            accounts.assert_not_awaited()
            await client.request("series", {"start": "2025-04-01", "end": "2026-03-31"})
        self.assertEqual(get.await_args.args[1], {"start": "2025-03-31", "end": "2026-03-31", "period": "1D", "accounts[]": 1})

    async def test_period_overview_reads_end_balance_and_separates_year_caches(self):
        client = FireflyClient(Mock(), "http://firefly.invalid", "test-only", {})
        async def pages(path, params):
            return [{"id": "1", "attributes": {"name": "Account", "type": "asset", "currency_code": "INR",
                     "current_balance": "100" if params["date"] == "2024-12-31" else "250"}}]
        with patch.object(client, "pages", side_effect=pages) as pages:
            old = await client.request("overview", {"start": "2024-01-01", "end": "2024-12-31"})
            new = await client.request("overview", {"start": "2025-01-01", "end": "2025-12-31"})
            await client.request("overview", {"start": "2024-01-01", "end": "2024-12-31"})
        self.assertEqual(pages.await_count, 2)
        self.assertEqual(old["accounts"][0]["balance"], "100")
        self.assertEqual(new["accounts"][0]["balance"], "250")
