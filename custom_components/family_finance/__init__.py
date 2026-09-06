"""Private Firefly III dashboard data; never published as HA entity state."""

from __future__ import annotations

import json
import os
from datetime import date
from pathlib import Path
from urllib.parse import urlsplit

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .client import FireflyClient
from .model import FinanceError, RANGES, amount

DOMAIN = "family_finance"
KINDS = ("entries", "overview", "series", "spending_summary", "spending_recurring", "spending_transactions", "spending_investments")

INVESTMENT_SETTINGS = vol.Schema({
    vol.Optional("account_ids", default=[]): vol.All(cv.ensure_list, [cv.positive_int]),
    vol.Optional("plans", default=[]): [vol.Schema({
        vol.Required("id"): vol.All(cv.string, vol.Length(min=1, max=100)),
        vol.Required("name"): vol.All(cv.string, vol.Length(min=1, max=255)),
        vol.Required("amount"): cv.string,
        vol.Required("source_account_id"): cv.positive_int,
        vol.Required("destination_account_id"): cv.positive_int,
        vol.Required("start_date"): vol.All(cv.string, vol.Match(r"^\d{4}-\d{2}-\d{2}$")),
        vol.Optional("end_date"): vol.All(cv.string, vol.Match(r"^\d{4}-\d{2}-\d{2}$")),
        vol.Required("frequency"): vol.In(["weekly", "monthly"]),
        vol.Optional("description_contains", default=""): cv.string,
    })],
})


def investment_settings(value):
    settings = INVESTMENT_SETTINGS(value)
    identifiers = set()
    for plan in settings["plans"]:
        try:
            start = date.fromisoformat(plan["start_date"])
            end = date.fromisoformat(plan.get("end_date", "9999-12-31"))
            valid_amount = amount(plan["amount"]) > 0
        except (ValueError, FinanceError):
            raise vol.Invalid("Investment plan needs a valid date and positive amount") from None
        if (not valid_amount or end < start or plan["id"] in identifiers or
                plan["destination_account_id"] not in settings["account_ids"] or
                plan["source_account_id"] == plan["destination_account_id"]):
            raise vol.Invalid("Investment plan has an invalid range, account, amount or duplicate ID")
        identifiers.add(plan["id"])
    return settings


def base_url(value):
    value = cv.url(value)
    parsed = urlsplit(value)
    if parsed.scheme not in {"http", "https"} or parsed.username or parsed.password or parsed.query or parsed.fragment:
        raise vol.Invalid("Use an HTTP(S) Firefly URL without credentials, a query, or a fragment")
    return value


CONFIG_SCHEMA = vol.Schema({
    DOMAIN: vol.Schema({
        vol.Optional("base_url"): base_url,
        vol.Optional("api_token"): cv.string,
        vol.Optional("firefly_entry_id"): cv.string,
        vol.Optional("access_file", default="/config/access/family-dashboard.json"): cv.string,
        vol.Optional("investment_file"): cv.string,
        vol.Optional("self_transfer_journal_ids", default=[]): vol.All(cv.ensure_list, [cv.positive_int]),
        vol.Optional("account_overrides", default={}): {
            cv.string: vol.Schema({
                vol.Optional("kind"): vol.In(["cash", "credit", "investment", "loan", "other"]),
                vol.Optional("category"): vol.In(["retirement", "taxable"]),
            })
        },
    })
}, extra=vol.ALLOW_EXTRA)


async def allowed(hass, connection, owner_id: str) -> bool:
    """Require the exact mapped active account, including for cached responses."""
    if connection.user.id != owner_id:
        return False
    user = await hass.auth.async_get_user(connection.user.id)
    return user is not None and user.is_active and user.id == owner_id


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    settings = config[DOMAIN]
    def read_owner():
        access = json.loads(Path(settings["access_file"]).read_text())
        owner = access["profiles"]["abhimanyu"]["user_id"]
        if not isinstance(owner, str) or len(owner) != 32:
            raise ValueError("Finance requires Abhimanyu's immutable HA user ID")
        return owner
    owner_id = await hass.async_add_executor_job(read_owner)
    investment_file = settings.get("investment_file") or os.environ.get("FAMILY_FINANCE_INVESTMENT_FILE")
    def read_investments():
        return investment_settings(json.loads(Path(investment_file).read_text()) if investment_file else {})
    investments = await hass.async_add_executor_job(read_investments)
    overrides = {**settings["account_overrides"]}
    for identifier in investments["account_ids"]:
        overrides[str(identifier)] = {**overrides.get(str(identifier), {}), "kind": "investment"}
    client = None
    signature = None

    def resolve_client():
        nonlocal client, signature
        if settings.get("api_token") and settings.get("base_url"):
            connection_settings = (settings["base_url"], settings["api_token"].strip(), True)
        else:
            entries = [entry for entry in hass.config_entries.async_entries("firefly_iii")
                       if entry.disabled_by is None and
                       (not settings.get("firefly_entry_id") or entry.entry_id == settings["firefly_entry_id"])]
            if len(entries) != 1:
                raise FinanceError("Configure one Firefly III integration in Settings > Devices & services")
            entry = entries[0]
            connection_settings = (base_url(entry.data["url"]), entry.data["api_key"], entry.data.get("verify_ssl", True))
        if signature != connection_settings:
            url, token, verify_ssl = connection_settings
            client = FireflyClient(async_get_clientsession(hass, verify_ssl=verify_ssl), url, token,
                                  overrides, settings["self_transfer_journal_ids"], investments["plans"])
            signature = connection_settings
            hass.data[DOMAIN] = client
        return client

    for kind in KINDS:
        def register(command_kind):
            schema = {vol.Required("type"): f"{DOMAIN}/{command_kind}",
                      vol.Optional("entry_id"): vol.In(["firefly"])}
            if command_kind == "series":
                schema[vol.Optional("range", default="6m")] = vol.In([*RANGES, "all"])
            if command_kind in {"overview", "series"} or command_kind.startswith("spending_"):
                schema[vol.Optional("month")] = vol.Match(r"^\d{4}-(0[1-9]|1[0-2])$")
            if command_kind == "spending_transactions":
                schema[vol.Optional("theme")] = vol.All(cv.string, vol.Length(min=1, max=255))

            @websocket_api.websocket_command(schema)
            @websocket_api.async_response
            async def handle(hass, connection, msg):
                if not await allowed(hass, connection, owner_id):
                    connection.send_error(msg["id"], "unauthorized", "This dashboard is private")
                    return
                try:
                    result = await resolve_client().request(command_kind, msg)
                except FinanceError as error:
                    connection.send_error(msg["id"], "finance_error", str(error))
                    return
                except (KeyError, TypeError, ValueError, OverflowError):
                    connection.send_error(msg["id"], "finance_error", "Firefly returned an unsupported response")
                    return
                if not await allowed(hass, connection, owner_id):
                    connection.send_error(msg["id"], "unauthorized", "This dashboard is private")
                    return
                connection.send_result(msg["id"], result)
            websocket_api.async_register_command(hass, handle)
        register(kind)
    return True
