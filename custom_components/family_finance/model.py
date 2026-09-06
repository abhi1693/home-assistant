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


def reporting_window(msg: dict, today: date) -> tuple[date, date]:
    """Validate inclusive dates before any network request; retain month clients."""
    if "start" not in msg and "end" not in msg:
        return month_window(msg.get("month") or today.strftime("%Y-%m"), today)
    if "month" in msg or "start" not in msg or "end" not in msg:
        raise FinanceError("Choose a month or both reporting dates")
    try:
        start, end = date.fromisoformat(msg["start"]), date.fromisoformat(msg["end"])
    except (ValueError, TypeError):
        raise FinanceError("Select valid reporting dates") from None
    if start.year < 1900 or start > today or end < start or (end - start).days > 1830:
        raise FinanceError("Select a reporting period of up to five years, starting on or before today")
    return start, end


def calendar_months(start: date, end: date):
    cursor = start.replace(day=1)
    while cursor <= end:
        following = (cursor.replace(day=28) + timedelta(days=4)).replace(day=1)
        yield max(start, cursor), min(end, following - timedelta(days=1))
        cursor = following


def monthly_totals(entries: list[dict], start: date, end: date, today: date,
                   date_key: str = "date", value_key: str = "amount") -> list[dict]:
    totals = defaultdict(lambda: Decimal(0))
    for entry in entries:
        day = local_date(entry[date_key])
        if start <= day <= min(end, today):
            totals[day.strftime("%Y-%m")] += amount(entry[value_key])
    return [{"month": first.strftime("%Y-%m"),
             "total": money(totals[first.strftime("%Y-%m")]) if first <= today else None}
            for first, _ in calendar_months(start, end)]


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


def transactions_payload(groups: list[dict], accounts: list[dict], self_transfer_journal_ids=()) -> list[dict]:
    tracked = {str(a["id"]): a for a in accounts}
    self_transfers = {str(identifier) for identifier in self_transfer_journal_ids}
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
            # Some historical imports recorded own-account receipts as deposits
            # from an unnamed revenue account. Exclude reviewed journal IDs
            # before totals AND drill-downs. Never infer this from a recipient's
            # name in a salary narration or from a generic unnamed counterparty.
            if kind == "deposit" and (journal in self_transfers or
                                      source in tracked and destination in tracked):
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
                    "investment_account_id": int(destination) if (
                        kind == "transfer" and account_id == source and
                        tracked[source]["kind"] != "investment" and
                        tracked.get(destination, {}).get("kind") == "investment"
                    ) else None,
                })
    return sorted(output, key=lambda t: (t["posted_at"], t["id"]), reverse=True)


def spending_payload(transactions: list[dict], month: str) -> dict:
    categories = defaultdict(lambda: {"total": Decimal(0), "count": 0})
    spent = income = Decimal(0)
    for transaction in transactions:
        value = amount(transaction["amount"])
        if transaction["transaction_type"] == "withdrawal":
            spent += value
            category = categories[transaction["theme"]]
            category["total"] += value
            category["count"] += 1
        elif transaction["transaction_type"] == "deposit":
            # The household definition includes all external credits: salary,
            # royalties, refunds and other receipts. Own-account deposits have
            # already been removed; actual transfer legs never enter this sum.
            income -= value
    return {
        "month": month, "censored": False,
        "total_spend": money(spent), "total_income": money(income),
        # Keep an already-open older frontend usable until its resource reloads.
        # These describe the combined total; categories no longer gate income.
        "total_other_credits": "0", "total_credits": money(income),
        "income_categories": sorted({(t.get("category") or "").strip() for t in transactions
                                     if t["transaction_type"] == "deposit"}),
        "themes": [{"theme": name, "total": money(item["total"]), "count": item["count"]}
                   for name, item in sorted(categories.items(), key=lambda pair: pair[1]["total"], reverse=True)],
    }


def recurring_payload(records: list[dict], month: str, today: date,
                      window: tuple[date, date] | None = None) -> dict:
    """Use only Firefly bill schedules and matches; do not infer obligations."""
    start, end = window or month_window(month, today)
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
    remaining = sum((amount(e["amount"]) for e in expected), Decimal(0))
    paid_total = sum((amount(a["amount"]) for a in actuals), Decimal(0))
    return {"month": month, "censored": False, "today": today.isoformat() if start <= today <= end else "",
            "streams": streams, "expected": expected, "actuals": actuals,
            "total_due": money(remaining + paid_total), "total_remaining": money(remaining),
            "bill_count": len({item["merchant_key"] for item in [*expected, *actuals]})}


def investment_plan_matches(transaction: dict, plan: dict) -> bool:
    """Match the reviewed account, amount and narration independently of cadence."""
    return (transaction["source_account_id"] == plan["source_account_id"] and
            transaction["destination_account_id"] == plan["destination_account_id"] and
            amount(transaction["amount"]) == amount(plan["amount"]) and
            plan.get("description_contains", "").casefold() in transaction["description"].casefold())


def investments_payload(transactions: list[dict], plans: list[dict], month: str, today: date,
                        window: tuple[date, date] | None = None) -> dict:
    """Count investment funding once; explicit plans reserve cash without posting entries."""
    start, end = window or month_window(month, today)
    recorded = []
    seen = set()
    for t in transactions:
        day = local_date(t["posted_at"])
        if not t.get("investment_account_id") or t["id"] in seen or not start <= day <= min(end, today):
            continue
        seen.add(t["id"])
        recorded.append({"id": str(t["id"]), "date": day.isoformat(), "amount": t["amount"],
                         "name": t["merchant"], "source_account_id": t["account_id"],
                         "destination_account_id": t["investment_account_id"],
                         "description": t["description"], "status": "recorded"})
    for contribution in recorded:
        # Imported providers can share one Firefly account. Identify recorded
        # payments even before the current forecast starts, but only with an
        # explicit narration and an unambiguous name. This is not a paid-date match.
        names = {plan["name"] for plan in plans if plan.get("description_contains", "").strip()
                 and investment_plan_matches(contribution, plan)}
        if len(names) == 1:
            contribution["name"] = names.pop()
    schedule = []
    for plan in plans:
        anchor = date.fromisoformat(plan["start_date"])
        last = date.fromisoformat(plan["end_date"]) if plan.get("end_date") else end
        value = amount(plan["amount"])
        if value <= 0:
            raise FinanceError("Investment plan amounts must be positive")
        if plan["frequency"] == "monthly":
            dates = []
            for first, _ in calendar_months(start, end):
                following = (first.replace(day=28) + timedelta(days=4)).replace(day=1)
                last_day = (following - timedelta(days=1)).day
                dates.append(first.replace(day=min(anchor.day, last_day)))
        elif plan["frequency"] == "weekly":
            first = max(anchor, start)
            first += timedelta(days=(anchor.weekday() - first.weekday()) % 7)
            dates = [first + timedelta(days=i * 7) for i in range(max(0, (end - first).days // 7 + 1))]
        else:
            raise FinanceError("Unsupported investment frequency")
        for day in dates:
            if not max(start, anchor) <= day <= min(end, last):
                continue
            schedule.append((day, plan, value))
    matched = set()
    expected = []
    for day, plan, value in sorted(schedule, key=lambda item: (item[0], item[1]["id"])):
        candidates = [t for t in recorded if t["id"] not in matched and
                      investment_plan_matches(t, plan) and
                      abs((date.fromisoformat(t["date"]) - day).days) <= 3]
        if candidates:
            match = min(candidates, key=lambda t: (abs((date.fromisoformat(t["date"]) - day).days), t["date"], t["id"]))
            match["name"] = plan["name"]
            match["plan_id"] = plan["id"]
            matched.add(match["id"])
        else:
            expected.append({"id": f'{plan["id"]}-{day}', "date": day.isoformat(), "name": plan["name"],
                             "amount": money(value), "source_account_id": plan["source_account_id"],
                             "destination_account_id": plan["destination_account_id"],
                             "status": "awaiting_statement" if day <= today else "scheduled"})
    actual_total = sum((amount(t["amount"]) for t in recorded), Decimal(0))
    pending_total = sum((amount(t["amount"]) for t in expected), Decimal(0))
    return {"month": month, "censored": False, "recorded": recorded, "expected": expected,
            "total_recorded": money(actual_total), "total_pending": money(pending_total),
            "total_committed": money(actual_total + pending_total)}
