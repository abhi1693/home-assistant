"""Run with the deployed HA version installed; no live systems are contacted."""

import asyncio
import importlib.util
import json
from pathlib import Path
from tempfile import TemporaryDirectory
from types import SimpleNamespace
import unittest
from unittest.mock import AsyncMock, Mock, patch

HAS_HA = importlib.util.find_spec("homeassistant") is not None
if HAS_HA:
    from aiohttp import ClientSession, web
    from custom_components.family_finance import CONFIG_SCHEMA, async_setup
    from custom_components.family_finance.client import FireflyClient
    from custom_components.family_finance.model import FinanceError


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
        for kind in ["entries", "overview", "series", "spending_summary", "spending_transactions", "spending_recurring"]:
            self.hass.config_entries.async_entries.reset_mock()
            connection = await self.call(kind, "b" * 32)
            self.assertEqual(connection.send_error.call_args.args[1], "unauthorized")
            self.hass.config_entries.async_entries.assert_not_called()
            connection.send_result.assert_not_called()

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
                {"id": 1, "hidden": False}, {"id": 2, "hidden": False},
            ])):
                result = await client.request("series", {"range": "6m"})
        self.assertEqual(selected, [1, 2])
        self.assertEqual([s["account_id"] for s in result["series"]], [1, 2])
        self.assertTrue(all(s["points"][-1]["balance"] == "120.00" for s in result["series"]))
