# MiniModa — Checkout Negative Testing QA Report

**Project:** MiniModa  
**Test management:** Qase  
**Tested by:** Pablo Villeda GUA (Student)  
**Test date:** October 28, 2026  
**Source:** `MINIMODA-Checkout+Negative+Testing+-+Test+run+2026_10_28.csv`

## Qase Public Test Report

[View the Qase Test Execution Report](https://app.qase.io/public/report/d1aa9f984a4c83377bc85943524577957b18649b/0dc2be4037771c5b2172123a14d590c88c06428c)

## Test Case Summary

| Field | Value |
| --- | --- |
| Test case | TC-003 — Verify Checkout Rejects Invalid Transactions |
| Case ID | 3 |
| Result | **Failed** |
| Priority | High |
| Severity | **Critical** |
| Type | Functional |
| Automation | To be automated |
| Assignee | Pablo Villeda |
| Completion timestamp (CSV; timezone unspecified) | 2026-10-28 14:34:28 |
| Time spent | 5 minutes 12 seconds |
| Tags | `MiniModa`, `critical-flow` |

## Objective

Verify that checkout prevents invalid transactions, including checkout with an empty cart, missing required customer or shipping information, invalid email addresses, and declined payments. Confirm that rejected transactions do not create successful charges or paid orders.

## Execution Steps and Results

| # | Test action | Expected result | Qase step status |
| --- | --- | --- | --- |
| 1 | Clear the shopping cart. | Cart contains no products and merchandise subtotal is zero. | Passed |
| 2 | Navigate directly to checkout. | Checkout redirects to cart or shows a blocked empty-cart state. | Passed |
| 3 | Attempt to confirm a purchase with an empty cart, if possible. | Submission is blocked; no order or payment is created. | **Failed** |
| 4 | Add an in-stock product and return to checkout. | Product and order summary display correctly. | Untested |
| 5 | Leave required customer and shipping fields empty. | Required fields remain empty for validation. | Untested |
| 6 | Click Confirm Purchase. | Submission is blocked and missing fields are identified. | Untested |
| 7 | Enter `invalid-email`, fill other required fields validly, and validate. | Invalid email is rejected with a clear error. | Untested |
| 8 | Correct email and other required details. | All customer and shipping fields pass validation. | Untested |
| 9 | Enter a sandbox card configured for payment decline. | Decline scenario is ready for processing. | Untested |
| 10 | Click Confirm Purchase. | Payment is declined with a clear error and no paid order is created. | Untested |
| 11 | Review cart after payment decline. | Products remain available for retry according to requirements. | Untested |
| 12 | Inspect order and payment records, if accessible. | No successful charge or paid order exists for rejected attempts. | Untested |

**Execution breakdown:** 2 passed, 1 failed, 9 untested (12 total).

## Bug Report — Empty-Cart Checkout Allowed

**Observed behavior (Qase run comment):**

> Bug allows to complete purchase without any items in the cart. Charging for shipping with no items in the cart

**Expected behavior:** Checkout should block purchase submission when the cart is empty and must not create an order or charge shipping for an empty-cart purchase.

**Reproduction path recorded in the CSV:**

1. Clear the shopping cart.
2. Navigate directly to checkout.
3. Attempt to confirm purchase with no items in the cart.
4. Observe whether the purchase can be completed and shipping is charged.

**Impact:** Potential invalid orders and shipping charges without merchandise. This is a critical checkout-integrity concern.

**Evidence limitations:** The CSV records the defect in the tester's comment and marks step 3 failed. It does not include screenshots, a stack trace, transaction IDs, or backend payment/order records; successful payment settlement is therefore not independently verified by this export.

## Recommended Fix and Retest

- Enforce a nonempty-cart requirement on both the checkout UI and the server-side order-creation endpoint.
- Recalculate cart totals and shipping charges server-side before accepting an order.
- Prevent payment attempts and order creation when there are no purchasable items.
- Retest the empty-cart path and execute the nine remaining negative-test steps.
- Add automated regression coverage (for example, with Playwright) for empty-cart checkout and invalid-payment scenarios.

## Test Artifacts

- [Public Qase execution report](https://app.qase.io/public/report/d1aa9f984a4c83377bc85943524577957b18649b/0dc2be4037771c5b2172123a14d590c88c06428c)
- Qase CSV export: `MINIMODA-Checkout+Negative+Testing+-+Test+run+2026_10_28.csv` (source of this summary; include the CSV in the repository if you want it available to collaborators).

## Author

**Pablo Villeda GUA** — Student / QA Testing Documentation
