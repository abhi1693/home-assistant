"""Translate Firefly III's ledger into the finance cards' read-only contract."""

from __future__ import annotations

from collections import defaultdict
from datetime import date, datetime, time, timedelta
from decimal import Decimal, InvalidOperation
from typing import Any
from zoneinfo import ZoneInfo

ZONE = ZoneInfo("Asia/Kolkata")
RANGES = {"1d": 1, "1w": 7, "1m": 30, "3m": 90, "6m": 180, "1y": 365}
ACCOUNT_TYPES = {"asset", "cash", "liability", "liabilities"}


class FinanceError(Exception):
    """An error safe to display without leaking credentials or API responses."""


def amount(value: Any) -> Decimal:
    """Reject missing, malformed and non-finite money instead of showing zero."""
    try:
        result = Decimal(str(value))
        if not result.is_finite():
            raise InvalidOperation
        return result
    except (InvalidOperation, ValueError):
        raise FinanceError("Firefly returned an invalid or missing amount") from None


def money(value: Decimal) -> str:
    return format(value, "f")


def in_rupees(attributes: dict, key: str) -> Decimal:
    """Use Firefly's conversion; never add unrelated currencies together."""
    if attributes.get("currency_code") == "INR":
        return amount(attributes.get(key))
    if attributes.get("primary_currency_code") == "INR":
        value = attributes.get(f"pc_{key}")
        if value is not None:
            return amount(value)
    raise FinanceError("Enable INR primary-currency conversion in Firefly for foreign-currency records")


def local_date(value: str) -> date:
    parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
    return parsed.astimezone(ZONE).date() if parsed.tzinfo else parsed.date()


def month_window(month: str, today: date) -> tuple[date, date]:
    try:
        start = date.fromisoformat(f"{month}-01")
    except ValueError:
        raise FinanceError("Select a valid month") from None
    if start > today or start.year < 1900:
        raise FinanceError("Select a month between 1900 and the current month")
    next_month = (start.replace(day=28) + timedelta(days=4)).replace(day=1)
    return start, next_month - timedelta(days=1)


def accounts_payload(records: list[dict], overrides: dict) -> list[dict]:
    accounts = []
    for record in records:
        a = record["attributes"]
        if a.get("type") not in ACCOUNT_TYPES:
            continue
        identifier = int(record["id"])
        override = overrides.get(str(identifier), {})
        kind = ("credit" if a.get("account_role") == "ccAsset" else
                "loan" if a.get("type") in {"liability", "liabilities"} else "cash")
        # Keep Firefly's signed balance, including lending and overpaid cards.
        accounts.append({
            "id": identifier, "provider": "firefly-iii", "org_domain": "",
            "org_name": a.get("object_group_title") or "Firefly III",
            "name": a["name"], "nickname": None, "currency": "INR",
            "kind": override.get("kind", kind),
            "category": override.get("category"),
            "hidden": a.get("include_net_worth") is False,
            "active": a.get("active", True),
            "balance": money(in_rupees(a, "current_balance")),
            # An API query is not evidence of a recent bank-statement import.
            "balance_at": a.get("current_balance_date"),
            "created_at": a.get("created_at"),
            "opening_date": a.get("opening_balance_date"),
        })
    return accounts


def series_payload(account: dict, response: list, now: datetime) -> dict:
    if not isinstance(response, list) or len(response) != 1:
        raise FinanceError("Firefly returned an ambiguous account history")
    dataset = response[0]
    entries = dataset.get("entries")
    if dataset.get("currency_code") != "INR":
        if dataset.get("primary_currency_code") != "INR":
            raise FinanceError("Account history requires INR currency conversion in Firefly")
        entries = dataset.get("pc_entries")
    if not isinstance(entries, dict) or not entries:
        raise FinanceError("Firefly returned no balance history for a tracked account")
    points = []
    for timestamp, value in sorted(entries.items()):
        day = local_date(timestamp)
        if day > now.astimezone(ZONE).date():
            continue
        # Firefly charts contain the closing balance, despite midnight labels.
        end = min(datetime.combine(day, time(23, 59, 59), ZONE), now)
        points.append({"ts": end.isoformat(), "balance": money(amount(value))})
    return {"account_id": account["id"], "points": points}


def transactions_payload(groups: list[dict], accounts: list[dict]) -> list[dict]:
    tracked = {str(a["id"]): a for a in accounts}
    output = []
    seen = set()
    for group in groups:
        for split in group["attributes"].get("transactions", []):
            journal = str(split["transaction_journal_id"])
            if journal in seen:
                continue
            seen.add(journal)
            kind = split["type"]
            if kind not in {"withdrawal", "deposit", "transfer"}:
                continue  # opening balances and reconciliation are not income
            source, destination = str(split.get("source_id")), str(split.get("destination_id"))
            if source not in tracked and destination not in tracked:
                continue
            value = in_rupees(split, "amount")
            if value < 0:
                raise FinanceError("Firefly returned a negative transaction magnitude")
            category = split.get("category_name") or "Uncategorised"
            base = {
                "id": int(journal), "posted_at": split["date"], "currency": "INR",
                "description": split.get("description", ""), "logo_url": None,
                "category": split.get("category_name"), "pending": False,
                "theme_origin": "firefly", "logo_origin": "none", "merchant_renamed": False,
                "transaction_type": kind,
            }
            legs = ([(source, value), (destination, -value)] if kind == "transfer" else
                    [(source, value)] if kind == "withdrawal" else [(destination, -value)])
            for account_id, signed in legs:
                if account_id not in tracked:
                    continue
                merchant = split.get("destination_name" if signed >= 0 else "source_name") or "Unknown"
                output.append({
                    **base, "account_id": int(account_id), "amount": money(signed),
                    "merchant": merchant, "merchant_key": merchant,
                    "theme": "transfers" if kind == "transfer" else category,
                })
    return sorted(output, key=lambda t: (t["posted_at"], t["id"]), reverse=True)


def spending_payload(transactions: list[dict], month: str, income_categories=("Salary",)) -> dict:
    categories = defaultdict(lambda: {"total": Decimal(0), "count": 0})
    income_labels = [name.strip() for name in income_categories if name.strip()]
    confirmed_income = {name.casefold() for name in income_labels}
    spent = income = other_credits = Decimal(0)
    for transaction in transactions:
        value = amount(transaction["amount"])
        if transaction["transaction_type"] == "withdrawal":
            spent += value
            category = categories[transaction["theme"]]
            category["total"] += value
            category["count"] += 1
        elif transaction["transaction_type"] == "deposit":
            # A deposit can be a refund, repayment or misclassified transfer.
            # Only explicitly confirmed income categories feed the headline.
            if (transaction.get("category") or "").strip().casefold() in confirmed_income:
                income -= value
            else:
                other_credits -= value
    return {
        "month": month, "censored": False,
        "total_spend": money(spent), "total_income": money(income),
        "total_other_credits": money(other_credits), "total_credits": money(income + other_credits),
        "income_categories": income_labels,
        "themes": [{"theme": name, "total": money(item["total"]), "count": item["count"]}
                   for name, item in sorted(categories.items(), key=lambda pair: pair[1]["total"], reverse=True)],
    }


def recurring_payload(records: list[dict], month: str, today: date) -> dict:
    """Use only Firefly bill schedules and matches; do not infer obligations."""
    start, end = month_window(month, today)
    streams, expected, actuals = [], [], []
    for record in records:
        b = record["attributes"]
        key = f"bill-{record['id']}"
        dates = sorted(local_date(d) for d in b.get("pay_dates", []) if start <= local_date(d) <= end)
        paid = [p for p in b.get("paid_dates", []) if start <= local_date(p["date"]) <= min(end, today)]
        if not b.get("active", True) and not paid:
            continue
        lower, upper = in_rupees(b, "amount_min"), in_rupees(b, "amount_max")
        estimate = (lower + upper) / 2
        interval = {"weekly": 7, "monthly": 30.4375, "quarterly": 91.3125,
                    "half-year": 182.625, "yearly": 365.25}.get(b.get("repeat_freq"))
        if interval is None:
            raise FinanceError("A Firefly bill has an unsupported recurrence")
        interval *= int(b.get("skip", 0)) + 1
        frequency = ("weekly" if interval <= 7 else "biweekly" if interval <= 14 else
                     "monthly" if interval < 60 else "quarterly" if interval < 180 else "annual")
        actual_dates = [local_date(p["date"]) for p in paid]
        anchor = local_date(b["date"])
        streams.append({
            "merchant_key": key, "merchant": b["name"], "logo_url": None, "theme": "subscriptions",
            "frequency": frequency, "frequency_label": f"every {int(b.get('skip', 0)) + 1} {b.get('repeat_freq')} period(s)",
            "day_of_month": anchor.day, "interval_days": interval,
            "monthly_amount": money(estimate * Decimal("30.4375") / Decimal(str(interval))),
            "average_amount": money(estimate), "last_amount": money(in_rupees(paid[-1], "amount")) if paid else "0",
            "first_seen": b["date"], "last_seen": max(actual_dates).isoformat() if actual_dates else b["date"],
            "count": len(paid), "active": b.get("active", True), "is_income": False, "merchant_renamed": False,
        })
        for payment in paid:
            actuals.append({"merchant_key": key, "date": local_date(payment["date"]).isoformat(),
                            "amount": money(in_rupees(payment, "amount")), "is_income": False})
        # Firefly's BillDateCalculator already excludes occurrences through
        # the last payment. Preserve the remaining schedule exactly.
        if b.get("active", True):
            for day in dates:
                expected.append({"merchant_key": key, "merchant": b["name"], "frequency": frequency,
                                 "is_income": False, "date": day.isoformat(), "amount": float(estimate),
                                 "overdue": day < today})
    return {"month": month, "censored": False, "today": today.isoformat() if start <= today <= end else "",
            "streams": streams, "expected": expected, "actuals": actuals}
