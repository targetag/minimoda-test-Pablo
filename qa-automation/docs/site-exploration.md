# MiniModa exploration notes

Target: https://minimoda-navy.vercel.app/

Observed: October 28, 2026 (America/Guatemala), through Microsoft Playwright MCP.

The footer explicitly identifies the store as a demonstration using fictitious data with no real payments. The inbox states that emails are simulated and stored in the browser. These tests verify frontend demo behavior; they do not establish payment settlement, backend order integrity, or real authentication security.

| Route | Workflow and inspected controls | Reliable locators |
|---|---|---|
| `/` | Home, shop, age navigation, registration, checkout, inbox | `nav`, `header-cart`, role-based navigation links |
| `/tienda` | Twelve products; search; age/color/price filters; sorting; stock badges; side cart | searchbox Buscar; button Limpiar filtros; article-scoped `product-3`; sold-out button Sin stock |
| `/producto/3` | Gorrito de Lana Osito; price $5,600; stock 25; add-to-cart | `product-detail`, `product-3`, `add-to-cart-3` |
| `/carrito` | Increment/decrement; per-product quantity; total; empty-cart checkout link | `cart-item-3`, `cart-qty-3`, `cart-incr-3`, `cart-decr-3`, `cart-total`, `checkout-btn` |
| `/checkout` | Customer name/address/email/country; card/expiry/CVV; subtotal and shipping; confirmation | `form-checkout`, labeled fields, `checkout-subtotal`, `checkout-resumen`, `submit-checkout`, `checkout-success` |
| `/registro` | Register name/email/password/confirmation/age/country/terms; simulated login | `form-registro`, `form-login`, scoped labels, `registro-success` |
| `/bandeja` | Simulated confirmation and welcome messages; refresh and empty actions | `email-item`, heading Confirmación de compra |

## Observed validation and expected behavior

- Registration displays minimum password length 8 and integer age range 13–120. Age 12 and password length 7 produced their corresponding error messages through MCP. Age 13 with a valid password produced registration success.
- Empty checkout fields display six explicit required-field errors. Malformed email must prevent confirmation.
- The displayed demo card 4111111111111111 approves. 4000000000000002 declines with `Tarjeta rechazada`; 4000000000009995 and 4000000000000069 are documented by the page for insufficient-funds and expired-card scenarios.
- A valid demo purchase displays an MM-prefixed order reference and a corresponding simulated inbox message.
- Empty-cart checkout should be blocked and quantities should not exceed displayed stock, consistent with the repository's existing manual QA cases. Both controls have regression tests that fail while the defects persist.
- Internal navigation preserves in-memory cart contents. Full-page navigation after adding a product was observed to lose the cart. Persistence requirements are not established by this repository, so this is an exploratory observation, not a confirmed contractual defect.
- Registration and login share Email/Contraseña labels. Page objects scope locators to the relevant form to avoid ambiguity.

## Limits and next coverage

The initial suite prioritizes checkout, cart, registration boundaries and required login fields. Country-specific shipping calculations, coupon behavior, session security, credit workflows, responsive layout and backend payment/order validation remain outside the implemented scope. No unseen element or backend endpoint is assumed to exist.

Additional useful cases: mismatched confirmation, fractional/negative ages, invalid CVV and expiry formats, double submission, cart refresh persistence once requirements are established, and combined catalog filters.
