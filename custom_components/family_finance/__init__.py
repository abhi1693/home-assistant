"""Private Firefly III dashboard data; never published as HA entity state."""

from __future__ import annotations

import json
from pathlib import Path
from urllib.parse import urlsplit

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .client import FireflyClient
from .model import FinanceError, RANGES

DOMAIN = "family_finance"
KINDS = ("entries", "overview", "series", "spending_summary", "spending_recurring", "spending_transactions")


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
                                  settings["account_overrides"])
            signature = connection_settings
            hass.data[DOMAIN] = client
        return client

    for kind in KINDS:
        def register(command_kind):
            schema = {vol.Required("type"): f"{DOMAIN}/{command_kind}",
                      vol.Optional("entry_id"): vol.In(["firefly"])}
            if command_kind == "series":
                schema[vol.Optional("range", default="6m")] = vol.In([*RANGES, "all"])
            if command_kind == "series" or command_kind.startswith("spending_"):
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
