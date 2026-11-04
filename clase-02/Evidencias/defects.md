# Confirmed demo application defects

Student: Pablo Villeda GUA

Target: https://minimoda-navy.vercel.app/

Verification date: October 28, 2026 (America/Guatemala).

These are local report labels, not newly created GitHub issues or Qase defect IDs. Both reproduce in isolated Chromium and Google Chrome contexts, including the configured retry. The store states that orders, cards and emails are simulated; no real charge or backend settlement was verified.

## Empty-cart demo purchase accepted

Related local test: CHECKOUT-EMPTY (`tests/checkout/checkout.spec.ts`). Existing repository evidence: numeric Qase case 3 / TC-003; verify the live project before publishing.

Preconditions: fresh browser with cart count 0. Use only the demo bypass card shown by the site.

1. Open `/carrito`; verify no merchandise and count 0.
2. Open `/checkout` directly.
3. Enter name `QA Automation`, address `123 Demo Street`, email `qa.automation@example.test`, country Argentina.
4. Use demo card `4111111111111111`, a future MM/YY expiry and CVV `123`.
5. Click Confirmar compra.

Expected: reject empty-cart checkout; no order confirmation and no purchase email.

Actual: the UI displays `Compra confirmada` and an MM order reference while merchandise subtotal is $0 and shipping is $3,500. MCP reproduced this with reference MM-436755. Local browser runs also reproduced success in both browsers, on initial attempt and retry. Google Chrome also reproduced a matching simulated purchase inbox message. Absence/presence of an inbox message in every Chromium attempt is not a backend order assertion.

Impact: invalid demo order acceptance and shipping-only checkout. Suggested priority: high, subject to product-owner triage. The original manual report labels the issue critical; this implementation does not claim a real monetary loss.

Evidence: HTML report → CHECKOUT-EMPTY → failed assertions; retry trace and failure screenshot. Confirmation screenshot attachments are captured before navigating to inbox when the defect is reproduced. Reports/results are ignored by Git and archived under `qa-runs/`.

## Cart quantity exceeds displayed stock

Related local test: CART-STOCK (`tests/regression/stock.spec.ts`). Existing repository evidence: MINIMODA-1 / TC-001 (cart case); verify the live project before publishing.

1. In a fresh browser, open `/producto/3` (Gorrito de Lana Osito).
2. Read stock: 25 at baseline.
3. Add one hat and follow the cart link.
4. Increase the cart quantity to 25.
5. Click the increase control once more.

Expected: quantity stays at 25; an excess unit is rejected or the increment control is disabled.

Actual: quantity becomes 26. The test assertion expects 25 and receives 26 in both Chromium and Google Chrome, on the initial attempt and retry.

Impact: frontend inventory enforcement is missing. Suggested priority: high, subject to product-owner triage. No oversold backend order or incorrect settled charge was demonstrated.

Evidence: HTML report → CART-STOCK → screenshot showing quantity 26; retry trace records the full increment sequence. Reproduce without Codex using `npx playwright test tests/regression/stock.spec.ts --project=chromium`.

## Automation and environment issues distinguished from these defects

- The first implementation of CHECKOUT-EMPTY checked the route before navigation completed and could falsely pass without submission. It was corrected to await a direct navigation and a visible submission outcome before checking for success. Do not use the initial audit's empty-cart pass as evidence of correct behavior.
- A first-run catalog assertion matched a transient duplicate test ID. Scoping the product to its article resolved it; the corrected full run had no flaky outcomes.
- A custom reporter lifecycle method required a Promise return type. TypeScript checking detected it and the method was corrected to async.
- Git credential/cache warnings are environment limitations. They do not establish storefront defects.
- Cart state disappearing after full-page navigation is an observation pending persistence requirements, not an additional confirmed contractual defect.
