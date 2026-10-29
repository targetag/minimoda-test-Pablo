# Qase case specification and traceability

Student: Pablo Villeda GUA

The identifiers below (for example CART-ADD) are **local automation references**, not invented Qase case IDs. Each TypeScript test includes precondition, expected-result and cleanup annotations plus named executable steps. All tests use a fresh browser context; closing it discards demo cart, inbox and account/session state. Screenshots are kept on failure and traces on first retry.

## Existing evidence to verify in Qase

| Repository source | Existing reference | Intended automation coverage |
|---|---|---|
| `Evidencia QASE Tests` | MINIMODA-1 / TC-001; recorded manual cart case | CART-ADD and CART-STOCK |
| `Checkout Negative Testing QASE Test - QA Report Bug Evidencia` | Numeric case ID 3 / TC-003 | CHECKOUT-EMPTY, REQUIRED, EMAIL and DECLINE variants |
| `README_MiniModa_QA_Pablo_villeda_GUA.md` | TC-002 is proposed checkout coverage | CHECKOUT-SUCCESS; verify its actual numeric case ID |
| `clase-01/evidencias/` filenames | MM-4, MM-5 and MM-6 registration evidence labels | REGISTER-VALID, PASSWORD and AGE; verify actual contents and project identity |

The MM and MINIMODA prefixes must not be assumed to be the same Qase project. Existing repository narratives are evidence of previously recorded IDs, not a live API validation. No live case or run was created by this work.

## Import-ready case content

Review existing cases first to avoid duplicates. Copy the title, preconditions, numbered actions and expected outcomes into the appropriate existing Qase case, or create a new case only where none exists. Qase assigns numeric IDs. No ID is preassigned in this document.

Common preconditions: demo site reachable; new browser context; Spanish UI; no prior inbox messages. Common postcondition: context closed and all browser-local test data discarded. Expected results below are requirements, never claimed executions.

| Local reference and title | Additional preconditions | Numbered steps | Expected results | Script |
|---|---|---|---|---|
| CART-ADD — product and cart arithmetic | Product 3 in stock | 1. Open product 3 and add one. 2. Follow cart link. 3. Add another unit. 4. Remove both. | Name correct; qty 1 / total 5600; qty 2 / total 11200; finally empty with disabled checkout. | tests/smoke/cart.spec.ts |
| CATALOG-SEARCH — search and reset | Default 12-product catalog | 1. Open shop. 2. Search Gorrito de Lana Osito. 3. Clear filters. | One matching article; reset restores 12 products. | tests/smoke/cart.spec.ts |
| CATALOG-NO-STOCK — sold-out action disabled | Product 2 sold out | 1. Open shop. 2. Inspect product 2 action and cart count. | Sin stock button disabled; cart count 0. | tests/smoke/cart.spec.ts |
| CHECKOUT-SUCCESS — demo purchase | Hat in cart; demo approving card | 1. Open checkout through cart. 2. Verify subtotal. 3. Fill fictitious data and approval card. 4. Submit. 5. Open inbox. | Subtotal 5600; MM order reference; exactly one matching confirmation email. | tests/checkout/checkout.spec.ts |
| CHECKOUT-REQUIRED — missing fields | Hat in cart; empty form | 1. Submit empty checkout. 2. Inspect six fields. 3. Open inbox. | Six required errors; no success; no confirmation email. | tests/checkout/checkout.spec.ts |
| CHECKOUT-EMAIL — malformed email | Hat in cart; other fields valid | 1. Fill demo checkout. 2. Set email to invalid-email. 3. Submit. 4. Inspect inbox. | Email aria-invalid true; no success or confirmation email. | tests/checkout/checkout.spec.ts |
| CHECKOUT-DECLINE-0002 — card rejected | Hat in cart; other fields valid | 1. Fill with 4000000000000002. 2. Submit. 3. Inspect summary and inbox. | Tarjeta rechazada; cart retained; no success or email. | tests/checkout/checkout.spec.ts |
| CHECKOUT-DECLINE-9995 — insufficient funds | Hat in cart; other fields valid | 1. Fill with 4000000000009995. 2. Submit. 3. Inspect summary and inbox. | Fondos insuficientes; cart retained; no success or email. | tests/checkout/checkout.spec.ts |
| CHECKOUT-DECLINE-0069 — expired card | Hat in cart; other fields valid | 1. Fill with 4000000000000069. 2. Submit. 3. Inspect summary and inbox. | Tarjeta vencida; cart retained; no success or email. | tests/checkout/checkout.spec.ts |
| CHECKOUT-EMPTY — empty-cart prevention | Cart count 0; valid demo approval data | 1. Verify empty cart. 2. Open checkout directly. 3. Attempt available submission. 4. Inspect inbox. | No successful order confirmation or purchase email. | tests/checkout/checkout.spec.ts |
| CART-STOCK — stock enforcement | Read current product 3 stock | 1. Add hat. 2. Increment to displayed stock. 3. Attempt one additional unit. | Quantity stays at displayed inventory. | tests/regression/stock.spec.ts |
| REGISTER-AGE-12 — lower invalid age | Valid registration except age 12 | 1. Fill registration. 2. Submit. | Age range error; no registration success. | tests/regression/registration.spec.ts |
| REGISTER-AGE-121 — upper invalid age | Valid registration except age 121 | 1. Fill registration. 2. Submit. | Age range error; no registration success. | tests/regression/registration.spec.ts |
| REGISTER-VALID-13 — lower valid boundary | Age 13; password QaDemo12 | 1. Fill valid data and accept terms. 2. Submit. 3. Open inbox. | Registration success and one welcome message. | tests/regression/registration.spec.ts |
| REGISTER-VALID-120 — upper valid boundary | Age 120; password QaDemo12 | 1. Fill valid data and accept terms. 2. Submit. 3. Open inbox. | Registration success and one welcome message. | tests/regression/registration.spec.ts |
| REGISTER-PASSWORD — seven characters | Valid data except password QaDemo1 | 1. Fill matching seven-character password and confirmation. 2. Submit. | Minimum eight-character error; no success. | tests/regression/registration.spec.ts |
| REGISTER-TERMS — terms mandatory | Valid data; terms unchecked | 1. Fill data without accepting terms. 2. Submit. | Checkbox invalid; no success. | tests/regression/registration.spec.ts |
| LOGIN-REQUIRED — empty simulated login | Empty login fields | 1. Open registration route. 2. Submit login form. | Email/password required messages. No real authentication assertion is made. | tests/regression/registration.spec.ts |

## API configuration (optional)

The official `playwright-qase-reporter` is installed. Local reporting stays active even when Qase publishing is off. Copy `.env.example` to `.env`, activate the Playwright application in Qase, and obtain your own token. Never paste the token into Git or public evidence.

1. Verify your Qase project code and numeric case IDs in the UI.
2. Set `QASE_TESTOPS_PROJECT`, `QASE_TESTOPS_API_TOKEN` and the appropriate `QASE_CASE_*` values from `.env.example`.
3. A configured ID is emitted as Playwright's native `QaseID` annotation. IDs must be positive integers.
4. Set `QASE_MODE=testops` only when publishing is intended. Use `--grep` or a specific file to publish only cases whose mappings have been reviewed. Unmapped tests may be auto-created by the reporter; do not publish those unintentionally.
5. Run Playwright locally. Chromium/Chrome are reported as the Browser parameter. Confirm the actual run in Qase and record its real link. No new Qase run link is claimed here.

One legacy case may cover several separate automated assertions. Prefer splitting it into reviewed focused Qase cases and setting the corresponding mapping variables. Do not reuse an ID for a different meaning simply to populate the report.

## Manual import workflow

No CSV was requested for this implementation. This document is ready for manual entry into Qase; it is not itself a machine-importable file. For bulk import, use the current official Qase template, populate it with the fields above, leave new IDs blank, and preview a single case before importing the rest. In Qase Repository, choose the menu → Import Data → source format and destination suite. Verify expected results and steps before saving. Imports create case definitions, not test executions. Preserve the resulting IDs in `.env` and review mappings before API publication.

Sources: [Qase reporter](https://developers.qase.io/docs/playwright), [case import](https://docs.qase.io/en/articles/5563719-import-test-cases), [CSV step formats](https://docs.qase.io/en/articles/14441496-qase-csv-adding-test-steps).

## Historical public reports (existing repository evidence)

- [Cart/stock manual execution](https://app.qase.io/public/report/8fb05302a903294142a80b6d32855d4e357b47a1)
- [Negative checkout manual execution](https://app.qase.io/public/report/d1aa9f984a4c83377bc85943524577957b18649b/0dc2be4037771c5b2172123a14d590c88c06428c)

These are historical links supplied by repository documents, not new automated executions or independent verification of every claim in the old reports.
