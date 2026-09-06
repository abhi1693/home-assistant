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

    def test_all_external_credits_count_as_income_regardless_of_category(self):
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
        self.assertEqual(Decimal(summary["total_income"]), Decimal("1387.76"))
        self.assertEqual(summary["total_credits"], summary["total_income"])
        self.assertEqual(summary["total_other_credits"], "0")
        self.assertEqual(set(summary["income_categories"]), {"Salary", "Royalty Income", "Family Support", "Shopping", ""})
        self.assertEqual(Decimal(summary["total_spend"]), Decimal("300"))
        self.assertEqual(len([t for t in output if t["transaction_type"] == "deposit"]), 5)

    def test_reviewed_self_deposits_are_absent_from_totals_and_details(self):
        accounts = MODEL.accounts_payload([account(1), account(2)], {})
        splits = [
            transaction(1, "deposit", "1000", source="9", destination="1", category_name="Salary",
                        description="NEFT CR-BANK-EMPLOYER-ALICE EXAMPLE-REFERENCE"),
            transaction(2, "deposit", "14.04", source="9", destination="1", category_name="Royalty Income"),
            transaction(3, "deposit", "25000", source="9", destination="1", source_name="(no name)"),
            transaction(4, "deposit", "100000", source="9", destination="1", source_name="(no name)"),
            transaction(5, "deposit", "200000", source="1", destination="2", category_name="Salary"),
            transaction(6, "transfer", "500", source="1", destination="2", category_name="Salary"),
        ]
        output = MODEL.transactions_payload([{"attributes": {"transactions": splits}}], accounts, [4])
        self.assertEqual({t["id"] for t in output}, {1, 2, 3, 6})
        self.assertEqual(MODEL.spending_payload(output, "2026-08")["total_income"], "26014.04")
        self.assertEqual(len([t for t in output if t["transaction_type"] == "deposit"]), 3)
        self.assertEqual(len([t for t in output if t["transaction_type"] == "transfer"]), 2)

    def test_self_transfer_review_ids_do_not_hide_real_withdrawals(self):
        accounts = MODEL.accounts_payload([account(1)], {})
        splits = [transaction(4, "withdrawal", "50", source="1", destination="9", category_name="Food")]
        output = MODEL.transactions_payload([{"attributes": {"transactions": splits}}], accounts, [4])
        self.assertEqual(MODEL.spending_payload(output, "2026-08")["total_spend"], "50")

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

    def test_bill_total_uses_selected_occurrences_not_monthly_averages(self):
        def bill(identifier, value, anchor, dates, frequency="monthly", paid=None):
            return {"id": identifier, "attributes": {"name": "Sample subscription", "currency_code": "INR",
                "amount_min": value, "amount_max": value, "date": anchor, "repeat_freq": frequency,
                "active": True, "pay_dates": dates, "paid_dates": paid or []}}
        records = [bill("1", "2000", "2026-10-08", ["2026-10-08"]),
                   bill("2", "12000", "2026-09-06", ["2026-09-06"]),
                   bill("3", "6000", "2027-02-21", ["2027-02-21"], "yearly")]
        september = MODEL.recurring_payload(records, "2026-09", date(2027, 3, 1))
        self.assertEqual(Decimal(september["total_due"]), 12000)
        self.assertEqual(september["bill_count"], 1)
        records[1]["attributes"]["pay_dates"] = ["2026-10-06"]
        october = MODEL.recurring_payload(records, "2026-10", date(2027, 3, 1))
        self.assertEqual(Decimal(october["total_due"]), 14000)
        self.assertEqual(october["bill_count"], 2)
        records[0]["attributes"]["pay_dates"] = ["2027-02-08"]
        records[1]["attributes"]["pay_dates"] = []
        records[1]["attributes"]["paid_dates"] = [{"date": "2027-02-06", "currency_code": "INR", "amount": "12000"}]
        february = MODEL.recurring_payload(records, "2027-02", date(2027, 3, 1))
        self.assertEqual(Decimal(february["total_due"]), 20000)
        self.assertEqual(Decimal(february["total_remaining"]), 8000)
        self.assertEqual(february["bill_count"], 3)

    def test_investments_count_only_outgoing_funding_once(self):
        accounts = MODEL.accounts_payload([account(1), account(2), account(3), account(4, account_role="ccAsset")],
                                          {"2": {"kind": "investment"}, "3": {"kind": "investment"}})
        splits = [transaction(1, "transfer", "100", destination="2"),
                  transaction(2, "transfer", "20", source="2", destination="1"),
                  transaction(3, "transfer", "30", source="2", destination="3"),
                  transaction(4, "transfer", "40", destination="4"),
                  transaction(5, "deposit", "1000", source="9", destination="1")]
        rows = MODEL.transactions_payload([{"attributes": {"transactions": splits + [splits[0]]}}], accounts)
        result = MODEL.investments_payload(rows, [], "2026-09", date(2026, 9, 6))
        self.assertEqual(result["total_recorded"], "100")
        self.assertEqual([r["id"] for r in result["recorded"]], ["1"])
        summary = MODEL.spending_payload(rows, "2026-09")
        self.assertEqual(summary["total_spend"], "0")
        self.assertEqual(summary["total_income"], "1000")

    def test_explicit_investment_dates_and_matching_prevent_double_counting(self):
        plans = [{"id": "monthly", "name": "Sample fund", "amount": "2000", "source_account_id": 1,
                  "destination_account_id": 2, "start_date": "2026-09-01", "frequency": "monthly", "description_contains": "FUND"},
                 {"id": "weekly", "name": "Sample gold", "amount": "500", "source_account_id": 1,
                  "destination_account_id": 2, "start_date": "2026-09-01", "frequency": "weekly", "description_contains": "GOLD"}]
        accounts = MODEL.accounts_payload([account(1), account(2)], {"2": {"kind": "investment"}})
        splits = [transaction(1, "transfer", "2000", description="Fund purchase", date="2026-09-02"),
                  transaction(2, "transfer", "500", description="Gold purchase", date="2026-09-01")]
        rows = MODEL.transactions_payload([{"attributes": {"transactions": splits}}], accounts)
        result = MODEL.investments_payload(rows, plans, "2026-09", date(2026, 9, 6))
        self.assertEqual(result["total_recorded"], "2500")
        self.assertEqual(result["total_pending"], "2000")
        self.assertEqual(result["total_committed"], "4500")
        self.assertEqual([r["date"] for r in result["expected"]], ["2026-09-08", "2026-09-15", "2026-09-22", "2026-09-29"])
        self.assertEqual({r["name"] for r in result["recorded"]}, {"Sample fund", "Sample gold"})
        october = MODEL.investments_payload([], plans, "2026-10", date(2026, 10, 1))
        self.assertEqual(october["total_committed"], "4000")
        self.assertEqual(len(october["expected"]), 5)
        self.assertEqual(october["expected"][0]["status"], "awaiting_statement")
        self.assertEqual(MODEL.investments_payload([], plans, "2026-08", date(2026, 9, 6))["total_committed"], "0")

    def test_recorded_investment_names_do_not_depend_on_forecast_start(self):
        plan = {"id": "gold", "name": "Sample gold", "amount": "500", "source_account_id": 1,
                "destination_account_id": 2, "start_date": "2026-09-01", "frequency": "weekly",
                "description_contains": "GOLD"}
        accounts = MODEL.accounts_payload([account(1), account(2), account(3), account(4)],
                                          {"2": {"kind": "investment"}, "3": {"kind": "investment"}})
        splits = [transaction(1, "transfer", "500", description="Reference/gold purchase"),
                  transaction(2, "transfer", "500", description="Fund purchase"),
                  transaction(3, "transfer", "501", description="Gold purchase"),
                  transaction(4, "transfer", "500", source="4", description="Gold purchase"),
                  transaction(5, "transfer", "500", destination="3", description="Gold purchase")]
        for split in splits:
            split.update(date="2026-08-25", destination_name="Shared investment account")
        rows = MODEL.transactions_payload([{"attributes": {"transactions": splits}}], accounts)
        baseline = MODEL.investments_payload(rows, [], "2026-08", date(2026, 9, 6))
        result = MODEL.investments_payload(rows, [plan], "2026-08", date(2026, 9, 6))
        by_id = {r["id"]: r for r in result["recorded"]}
        self.assertEqual(by_id["1"]["name"], "Sample gold")
        self.assertTrue(all(by_id[str(i)]["name"] == "Shared investment account" for i in range(2, 6)))
        self.assertEqual(result["expected"], [])
        self.assertEqual(result["total_committed"], baseline["total_committed"])
        self.assertTrue(all("plan_id" not in r for r in result["recorded"]))
        for item in baseline["recorded"]:
            self.assertEqual({k: v for k, v in by_id[item["id"]].items() if k != "name"},
                             {k: v for k, v in item.items() if k != "name"})
        ambiguous = {**plan, "id": "other", "name": "Other provider"}
        for plans in [[{**plan, "description_contains": ""}], [plan, ambiguous]]:
            unchanged = MODEL.investments_payload(rows, plans, "2026-08", date(2026, 9, 6))
            self.assertEqual(unchanged["recorded"], baseline["recorded"])

    def test_recorded_provider_name_alone_does_not_settle_a_scheduled_payment(self):
        plan = {"id": "fund", "name": "Sample fund", "amount": "500", "source_account_id": 1,
                "destination_account_id": 2, "start_date": "2026-08-01", "frequency": "monthly",
                "description_contains": "FUND"}
        accounts = MODEL.accounts_payload([account(1), account(2)], {"2": {"kind": "investment"}})
        rows = MODEL.transactions_payload([{"attributes": {"transactions": [
            transaction(1, "transfer", "500", date="2026-08-20", description="Fund purchase")
        ]}}], accounts)
        result = MODEL.investments_payload(rows, [plan], "2026-08", date(2026, 9, 6))
        self.assertEqual(result["recorded"][0]["name"], "Sample fund")
        self.assertNotIn("plan_id", result["recorded"][0])
        self.assertEqual(result["expected"][0]["date"], "2026-08-01")
        self.assertEqual(result["total_pending"], "500")

    def test_investment_month_end_and_end_date(self):
        plan = {"id": "fund", "name": "Fund", "amount": "12.34", "source_account_id": 1,
                "destination_account_id": 2, "start_date": "2026-01-31", "frequency": "monthly", "end_date": "2026-03-15"}
        february = MODEL.investments_payload([], [plan], "2026-02", date(2026, 9, 6))
        self.assertEqual(february["expected"][0]["date"], "2026-02-28")
        self.assertEqual(february["total_committed"], "12.34")
        self.assertEqual(MODEL.investments_payload([], [plan], "2026-03", date(2026, 9, 6))["expected"], [])

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

    def test_reporting_windows_cover_calendar_financial_and_leap_boundaries(self):
        today = date(2026, 9, 6)
        for start, end in [("2025-01-01", "2025-12-31"), ("2025-04-01", "2026-03-31"),
                           ("2024-02-29", "2024-03-01"), ("2026-04-01", "2027-03-31")]:
            self.assertEqual(MODEL.reporting_window({"start": start, "end": end}, today),
                             (date.fromisoformat(start), date.fromisoformat(end)))
        for msg in [{"start": "2025-01-01"}, {"end": "2025-12-31"},
                    {"month": "2025-01", "start": "2025-01-01", "end": "2025-12-31"},
                    {"start": "2023-02-29", "end": "2023-03-01"},
                    {"start": "2026-10-01", "end": "2026-12-31"},
                    {"start": "2026-09-01", "end": "2026-08-31"},
                    {"start": "2017-01-01", "end": "2026-12-31"}]:
            with self.subTest(msg=msg), self.assertRaises(MODEL.FinanceError):
                MODEL.reporting_window(msg, today)

    def test_monthly_totals_use_local_dates_and_leave_future_months_unobserved(self):
        result = MODEL.monthly_totals([
            {"date": "2026-03-31T20:00:00Z", "amount": "0.10"},
            {"date": "2026-04-01", "amount": "0.20"},
            {"date": "2026-09-07", "amount": "99999"},
        ], date(2026, 4, 1), date(2027, 3, 31), date(2026, 9, 6))
        self.assertEqual(len(result), 12)
        self.assertEqual(result[0], {"month": "2026-04", "total": "0.30"})
        self.assertEqual(result[5], {"month": "2026-09", "total": "0"})
        self.assertIsNone(result[6]["total"])
        self.assertEqual(result[-1]["month"], "2027-03")

    def test_annual_investments_count_real_occurrences_across_months_once(self):
        plans = [
            {"id": "fund", "name": "Fund", "amount": "100", "source_account_id": 1,
             "destination_account_id": 2, "start_date": "2024-01-31", "frequency": "monthly", "description_contains": "fund"},
            {"id": "gold", "name": "Gold", "amount": "20", "source_account_id": 1,
             "destination_account_id": 2, "start_date": "2024-01-02", "frequency": "weekly", "description_contains": "gold"},
        ]
        rows = [{"id": 1, "posted_at": "2024-03-01", "amount": "100", "investment_account_id": 2,
                 "account_id": 1, "merchant": "Provider", "description": "fund"}]
        result = MODEL.investments_payload(rows, plans, "2024-01", date(2026, 9, 6),
                                          (date(2024, 1, 1), date(2024, 12, 31)))
        self.assertEqual(result["total_recorded"], "100")
        self.assertEqual(result["total_committed"], "2260")  # 12 monthly + 53 Tuesdays
        self.assertEqual(len(result["expected"]), 64)
        self.assertEqual(result["recorded"][0]["plan_id"], "fund")
        self.assertNotIn("fund-2024-02-29", {r["id"] for r in result["expected"]})
        custom = MODEL.investments_payload([], plans, "2024-02", date(2026, 9, 6),
                                          (date(2024, 2, 29), date(2024, 3, 1)))
        self.assertEqual([r["date"] for r in custom["expected"]], ["2024-02-29"])

    def test_financial_year_bills_include_due_dates_and_paid_dates_only(self):
        records = [{"id": "1", "attributes": {"name": "Annual subscription", "currency_code": "INR",
            "amount_min": "600", "amount_max": "600", "date": "2026-02-21", "repeat_freq": "yearly",
            "pay_dates": ["2027-02-21", "2028-02-21"], "paid_dates": [
                {"date": "2026-02-21", "amount": "600", "currency_code": "INR"}]}}]
        calendar = MODEL.recurring_payload(records, "2026-01", date(2026, 9, 6),
                                           (date(2026, 1, 1), date(2026, 12, 31)))
        financial = MODEL.recurring_payload(records, "2026-04", date(2026, 9, 6),
                                            (date(2026, 4, 1), date(2027, 3, 31)))
        self.assertEqual(calendar["total_due"], "600")
        self.assertEqual(calendar["total_remaining"], "0")
        self.assertEqual(Decimal(financial["total_due"]), Decimal("600"))
        self.assertEqual(Decimal(financial["total_remaining"]), Decimal("600"))
        self.assertEqual(financial["expected"][0]["date"], "2027-02-21")
