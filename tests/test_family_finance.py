import importlib.util
from datetime import date, datetime
from decimal import Decimal
from pathlib import Path
import unittest

ROOT = Path(__file__).parents[1]
SPEC = importlib.util.spec_from_file_location("finance_model", ROOT / "custom_components/family_finance/model.py")
MODEL = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MODEL)


def account(identifier, **values):
    return {"id": str(identifier), "attributes": {"name": f"Account {identifier}", "type": "asset",
            "currency_code": "INR", "current_balance": "100.00", **values}}


def transaction(identifier, kind, value, source="1", destination="2", **values):
    return {"transaction_journal_id": str(identifier), "type": kind, "amount": value,
            "currency_code": "INR", "source_id": source, "destination_id": destination,
            "date": "2026-09-03T12:00:00+05:30", "description": "Test", **values}


class FinanceModelTests(unittest.TestCase):
    def test_preserves_signed_credit_and_lending_balances_and_net_worth_selection(self):
        records = [account(1), account(2, account_role="ccAsset", current_balance="-123.45"),
                   account(3, type="liability", current_balance="123.45", liability_direction="credit"),
                   account(4, type="expense"), account(5, include_net_worth=False)]
        result = MODEL.accounts_payload(records, {})
        self.assertEqual([a["id"] for a in result], [1, 2, 3, 5])
        self.assertEqual(result[1]["kind"], "credit")
        self.assertEqual(result[1]["balance"], "-123.45")
        self.assertEqual(result[2]["balance"], "123.45")
        self.assertTrue(result[3]["hidden"])

    def test_no_foreign_currency_is_silently_added_as_rupees(self):
        with self.assertRaises(MODEL.FinanceError):
            MODEL.accounts_payload([account(1, currency_code="USD")], {})
        result = MODEL.accounts_payload([account(1, currency_code="USD", primary_currency_code="INR", pc_current_balance="8500")], {})
        self.assertEqual(result[0]["balance"], "8500")

    def test_invalid_and_missing_amounts_are_not_presented_as_zero(self):
        for value in [None, "unknown", "NaN", "Infinity", "-Infinity"]:
            with self.subTest(value=value), self.assertRaises(MODEL.FinanceError):
                MODEL.amount(value)

    def test_split_expenses_are_counted_once_and_transfers_are_not_income_or_spending(self):
        accounts = MODEL.accounts_payload([account(1), account(2, account_role="ccAsset")], {})
        splits = [transaction(1, "withdrawal", "0.10", category_name="Food"),
                  transaction(2, "withdrawal", "0.20", category_name="Food"),
                  transaction(3, "deposit", "1000", source="9", destination="1", category_name="Salary"),
                  transaction(4, "transfer", "100", source="1", destination="2"),
                  transaction(5, "opening balance", "90000"),
                  transaction(6, "reconciliation", "90000")]
        groups = [{"attributes": {"transactions": splits}}, {"attributes": {"transactions": [splits[0]]}}]
        output = MODEL.transactions_payload(groups, accounts)
        summary = MODEL.spending_payload(output, "2026-09")
        self.assertEqual(summary["total_spend"], "0.30")
        self.assertEqual(summary["total_income"], "1000")
        self.assertEqual(summary["themes"], [{"theme": "Food", "total": "0.30", "count": 2}])
        repayments = [t for t in output if t["id"] == 4]
        self.assertEqual({(t["account_id"], t["amount"]) for t in repayments}, {(1, "100"), (2, "-100")})

    def test_only_confirmed_income_categories_count_and_all_other_credits_remain_visible(self):
        accounts = MODEL.accounts_payload([account(1), account(2)], {})
        splits = [
            transaction(1, "deposit", "1000.00", source="9", destination="1", category_name=" Salary "),
            transaction(2, "deposit", "125.50", source="9", destination="1", category_name="Family Support"),
            transaction(3, "deposit", "50.25", source="9", destination="2", category_name="Shopping"),
            transaction(4, "deposit", "200.00", source="9", destination="1"),
            transaction(5, "deposit", "12.01", source="9", destination="1", category_name="Royalty Income"),
            transaction(6, "transfer", "700", category_name="Salary"),
            transaction(7, "opening balance", "9000", category_name="Salary"),
            transaction(8, "withdrawal", "300", category_name="Shopping"),
        ]
        output = MODEL.transactions_payload([{"attributes": {"transactions": splits}},
                                             {"attributes": {"transactions": [splits[0]]}}], accounts)
        summary = MODEL.spending_payload(output, "2026-08")
        self.assertEqual(Decimal(summary["total_income"]), Decimal("1000"))
        self.assertEqual(Decimal(summary["total_other_credits"]), Decimal("387.76"))
        self.assertEqual(Decimal(summary["total_credits"]), Decimal("1387.76"))
        self.assertEqual(Decimal(summary["total_spend"]), Decimal("300"))
        self.assertEqual(len([t for t in output if t["transaction_type"] == "deposit"]), 5)
        extended = MODEL.spending_payload(output, "2026-08", ["salary", "Royalty Income"])
        self.assertEqual(Decimal(extended["total_income"]), Decimal("1012.01"))
        self.assertEqual(extended["total_credits"], summary["total_credits"])

    def test_preserves_firefly_category_names_even_when_named_like_a_transfer(self):
        accounts = MODEL.accounts_payload([account(1)], {})
        output = MODEL.transactions_payload([{"attributes": {"transactions": [
            transaction(1, "withdrawal", "25", category_name="debt")
        ]}}], accounts)
        self.assertEqual(MODEL.spending_payload(output, "2026-09")["total_spend"], "25")

    def test_paid_bill_and_skip_follow_firefly_schedule(self):
        records = [{"id": "1", "attributes": {
            "name": "Rent", "currency_code": "INR", "amount_min": "2000", "amount_max": "2000",
            "date": "2026-01-05T00:00:00+05:30", "repeat_freq": "monthly", "skip": 1,
            "active": True, "pay_dates": [],
            "paid_dates": [{"date": "2026-09-04T00:00:00+05:30", "currency_code": "INR", "amount": "2000"}],
        }}]
        result = MODEL.recurring_payload(records, "2026-09", date(2026, 9, 6))
        self.assertEqual(result["expected"], [])
        self.assertEqual(len(result["actuals"]), 1)
        self.assertEqual(Decimal(result["streams"][0]["monthly_amount"]), 1000)
        self.assertEqual(result["actuals"][0]["date"], "2026-09-04")
        records[0]["attributes"]["pay_dates"] = ["2026-09-15T00:00:00+05:30"]
        remaining = MODEL.recurring_payload(records, "2026-09", date(2026, 9, 6))
        self.assertEqual(remaining["expected"][0]["date"], "2026-09-15")

    def test_empty_bills_remain_empty_and_no_schedule_is_inferred(self):
        self.assertEqual(MODEL.recurring_payload([], "2026-09", date(2026, 9, 6))["streams"], [])

    def test_history_labels_closing_balance_without_future_points(self):
        now = datetime(2026, 9, 6, 12, tzinfo=MODEL.ZONE)
        result = MODEL.series_payload({"id": 1}, [{"currency_code": "INR", "entries": {
            "2026-09-05T00:00:00+05:30": "100.25", "2026-09-06T00:00:00+05:30": "110.25",
            "2026-09-07T00:00:00+05:30": "999",
        }}], now)
        self.assertEqual(len(result["points"]), 2)
        self.assertEqual(result["points"][0]["ts"], "2026-09-05T23:59:59+05:30")
        self.assertEqual(result["points"][-1]["ts"], now.isoformat())
        with self.assertRaises(MODEL.FinanceError):
            MODEL.series_payload({"id": 1}, [{}, {}], now)

    def test_calendar_validation_and_local_month_boundary(self):
        self.assertEqual(MODEL.local_date("2026-08-31T20:00:00Z"), date(2026, 9, 1))
        self.assertEqual(MODEL.month_window("2024-02", date(2026, 9, 6))[1], date(2024, 2, 29))
        for month in ["2026-13", "2027-01", "1800-01"]:
            with self.assertRaises(MODEL.FinanceError):
                MODEL.month_window(month, date(2026, 9, 6))
