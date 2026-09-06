"""Bounded, GET-only Firefly III client with short in-memory shared caches."""

from __future__ import annotations

import asyncio
from collections import OrderedDict
from datetime import datetime, timedelta
import json
import time

from aiohttp import ClientError, ClientSession, ClientTimeout

from .model import (
    FinanceError, RANGES, ZONE, accounts_payload, local_date, month_window,
    recurring_payload, series_payload, spending_payload, transactions_payload,
)


class FireflyClient:
    def __init__(self, session: ClientSession, base_url: str, token: str, overrides: dict) -> None:
        self.session = session
        self.base_url = base_url.rstrip("/")
        self.token = token
        self.overrides = overrides
        self.cache = OrderedDict()
        self.lock = asyncio.Lock()

    async def get(self, path: str, params: dict | None = None):
        if not self.token:
            raise FinanceError("Firefly connection is not configured")
        try:
            async with self.session.get(
                f"{self.base_url}/api/v1/{path}", params=params,
                headers={"Authorization": f"Bearer {self.token}", "Accept": "application/json"},
                timeout=ClientTimeout(total=30), allow_redirects=False,
            ) as response:
                if response.status != 200:
                    raise FinanceError(f"Firefly returned HTTP {response.status}")
                # Bound memory use and refuse non-JSON response bodies.
                raw = bytearray()
                async for chunk in response.content.iter_chunked(65536):
                    raw.extend(chunk)
                    if len(raw) > 8 * 1024 * 1024:
                        raise FinanceError("Firefly response exceeds the dashboard size limit")
                return json.loads(raw)
        except FinanceError:
            raise
        except (ClientError, TimeoutError, ValueError):
            raise FinanceError("Unable to read Firefly data") from None

    async def pages(self, path: str, params: dict | None = None) -> list:
        output = []
        for page in range(1, 101):
            result = await self.get(path, {**(params or {}), "page": page, "limit": 100})
            records = result.get("data")
            if not isinstance(records, list):
                raise FinanceError("Firefly returned an invalid collection")
            output.extend(records)
            pagination = result.get("meta", {}).get("pagination", {})
            if not pagination or page >= int(pagination.get("total_pages", 1)):
                return output
        raise FinanceError("Too many records for one dashboard request; select a smaller period")

    async def cached(self, key: tuple, fetch):
        # All callers hold request's lock. Cache contains only successful reads.
        cached = self.cache.get(key)
        if cached and cached[0] > time.monotonic():
            self.cache.move_to_end(key)
            return cached[1]
        value = await fetch()
        self.cache[key] = (time.monotonic() + 300, value)
        self.cache.move_to_end(key)
        while len(self.cache) > 32:
            self.cache.popitem(last=False)
        return value

    async def accounts(self, now: datetime) -> list:
        async def fetch():
            # Include closed accounts for historical totals. Expense/revenue
            # counterparties are filtered before sending anything to a card.
            raw = await self.pages("accounts", {"type": "all", "date": now.date().isoformat()})
            return accounts_payload(raw, self.overrides)
        return await self.cached(("accounts", now.date()), fetch)

    async def transactions(self, month: str, accounts: list, now: datetime) -> list:
        async def fetch():
            start, end = month_window(month, now.date())
            groups = await self.pages("transactions", {"start": str(start), "end": str(min(end, now.date()))})
            return transactions_payload(groups, accounts)
        return await self.cached(("transactions", month, now.date()), fetch)

    async def request(self, kind: str, msg: dict):
        # A page has several cards. Serialize/cache their work to avoid a
        # thundering herd against the small Firefly deployment.
        async with self.lock:
            now = datetime.now(ZONE)
            accounts = await self.accounts(now)
            if kind == "entries":
                return [{"entry_id": "firefly", "title": "Firefly III", "scope": "read_full"}]
            if kind == "overview":
                return {"entry_id": "firefly", "currency": "INR", "accounts": accounts,
                        "fetched_at": now.isoformat(), "default_reveal_ttl_minutes": 0,
                        "me": {"label": "Firefly III", "scope": "read_full", "censored": False,
                               "revealed": True, "reveal_expires": None, "code_required": False, "can_reveal": False}}
            month = msg.get("month") or now.strftime("%Y-%m")
            if kind == "series":
                async def fetch():
                    if msg.get("month"):
                        start, end = month_window(month, now.date())
                        start -= timedelta(days=1)
                        end = min(end, now.date())
                    else:
                        end = now.date()
                        if msg.get("range", "6m") == "all":
                            dates = [local_date(a["opening_date"] or a["created_at"]) for a in accounts
                                     if a.get("opening_date") or a.get("created_at")]
                            start = min(dates, default=end - timedelta(days=365)) - timedelta(days=1)
                        else:
                            start = end - timedelta(days=RANGES[msg.get("range", "6m")])
                    output = []
                    if (end - start).days > 36600:
                        raise FinanceError("Account history exceeds 100 years; select a shorter range")
                    for account in accounts:
                        if account["hidden"]:
                            continue
                        raw = await self.get("chart/account/overview", {
                            "start": str(start), "end": str(end), "period": "1D",
                            "preselected": "empty", "accounts[]": account["id"],
                        })
                        output.append(series_payload(account, raw, now))
                    return {"series": output, "censored": False}
                return await self.cached((kind, msg.get("range"), msg.get("month"), now.date()), fetch)
            if kind == "spending_recurring":
                async def fetch():
                    start, end = month_window(month, now.date())
                    records = await self.pages("bills", {"start": str(start), "end": str(end)})
                    return recurring_payload(records, month, now.date())
                return await self.cached((kind, month, now.date()), fetch)
            transactions = await self.transactions(month, accounts, now)
            if kind == "spending_summary":
                return spending_payload(transactions, month)
            if kind == "spending_transactions":
                if msg.get("theme") is not None:
                    transactions = [t for t in transactions if t["transaction_type"] == "withdrawal" and t["theme"] == msg["theme"]]
                return {"month": month, "censored": False, "transactions": transactions}
            raise FinanceError("Unknown finance request")
