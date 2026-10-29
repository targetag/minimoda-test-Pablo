import { test, expect } from '../../fixtures/test';
import { caseDetails } from '../../utils/case-details';
import { customer, demoCards } from '../../utils/test-data';

test('CHECKOUT-SUCCESS — complete a demo purchase and receive one confirmation', caseDetails(
  'CHECKOUT-SUCCESS', 'Fresh browser; one in-stock hat; public demo approval card.',
  'Correct subtotal, one order reference and one matching simulated confirmation email.', 'QASE_CASE_CHECKOUT_SUCCESS',
), async ({ page, shop, checkout }) => {
  await test.step('Add a hat and verify checkout subtotal', async () => {
    await shop.openCheckoutWithHat();
    await expect(page.getByTestId('checkout-subtotal')).toHaveText(/\$\s*5\.600/);
  });
  await test.step('Submit valid fictitious customer data and demo approval card', async () => {
    await checkout.fill();
    await checkout.submit();
    await expect(checkout.success).toContainText('Compra confirmada.');
  });
  await test.step('Verify the matching order in the simulated inbox', async () => {
    const order = await checkout.success.locator('strong').innerText();
    expect(order).toMatch(/^MM-\d+$/);
    await checkout.success.getByRole('link', { name: 'Bandeja' }).click();
    await expect(page.getByTestId('email-item')).toHaveCount(1);
    await expect(page.getByTestId('email-item')).toContainText(order);
    await expect(page.getByTestId('email-item')).toContainText(customer.email);
  });
});

test('CHECKOUT-REQUIRED — reject missing required fields', caseDetails(
  'CHECKOUT-REQUIRED', 'Fresh browser; one hat in cart; checkout form empty.',
  'All six required-field messages appear; no confirmation or simulated order email.', 'QASE_CASE_CHECKOUT_REQUIRED',
), async ({ page, shop, checkout }) => {
  await test.step('Open populated-cart checkout and submit blank fields', async () => {
    await shop.openCheckoutWithHat();
    await checkout.submit();
  });
  await test.step('Verify all missing-field errors and absence of an order', async () => {
    for (const message of [
      'El nombre es obligatorio.', 'La dirección es obligatoria.', 'El email es obligatorio.',
      'El número de tarjeta es obligatorio.', 'El vencimiento es obligatorio.', 'El CVV es obligatorio.',
    ]) await expect(page.getByRole('alert').filter({ hasText: message })).toBeVisible();
    await expect(checkout.success).toHaveCount(0);
    await checkout.expectNoConfirmationEmail();
  });
});

test('CHECKOUT-EMAIL — reject malformed customer email', caseDetails(
  'CHECKOUT-EMAIL', 'One hat in cart; other customer and demo payment fields valid.',
  'Email marked invalid and no confirmation or simulated order email.', 'QASE_CASE_CHECKOUT_EMAIL',
), async ({ shop, checkout }) => {
  await test.step('Fill checkout with invalid-email and submit', async () => {
    await shop.openCheckoutWithHat();
    await checkout.fill();
    await checkout.form.getByRole('textbox', { name: 'Email', exact: true }).fill('invalid-email');
    await checkout.submit();
  });
  await test.step('Verify rejection without any order confirmation', async () => {
    await expect(checkout.form.getByRole('textbox', { name: 'Email', exact: true })).toHaveAttribute('aria-invalid', 'true');
    await expect(checkout.success).toHaveCount(0);
    await checkout.expectNoConfirmationEmail();
  });
});

for (const [card, error] of [
  [demoCards.declined, 'Tarjeta rechazada'],
  [demoCards.insufficientFunds, 'Fondos insuficientes'],
  [demoCards.expired, 'Tarjeta vencida'],
]) {
  test(`CHECKOUT-DECLINE-${card.slice(-4)} — ${error}`, caseDetails(
    `CHECKOUT-DECLINE-${card.slice(-4)}`, 'Fresh browser; one hat; public demo decline card.',
    `Show ${error}; keep merchandise for retry and create no confirmation email.`, 'QASE_CASE_CHECKOUT_DECLINE',
  ), async ({ page, shop, checkout }) => {
    await test.step('Submit a valid checkout with the documented demo decline card', async () => {
      await shop.openCheckoutWithHat();
      await checkout.fill(card);
      await checkout.submit();
    });
    await test.step('Verify payment error, retained cart and no order confirmation', async () => {
      await expect(page.getByRole('alert').filter({ hasText: error })).toBeVisible();
      await expect(checkout.success).toHaveCount(0);
      await expect(page.getByTestId('checkout-resumen')).toContainText('Gorrito de Lana Osito × 1');
      await checkout.expectNoConfirmationEmail();
    });
  });
}

test('CHECKOUT-EMPTY — block demo purchases without merchandise', caseDetails(
  'CHECKOUT-EMPTY', 'Fresh browser; cart empty; valid fictitious data and demo approval card.',
  'Checkout blocks the purchase; no order confirmation or email.', 'QASE_CASE_CHECKOUT_EMPTY',
), async ({ page, checkout }) => {
  await test.step('Verify empty cart and navigate directly to checkout', async () => {
    await page.goto('/carrito');
    await expect(page.getByTestId('cart-count')).toHaveText('0');
    await page.goto('/checkout');
  });
  await test.step('Wait for checkout readiness and attempt valid demo submission', async () => {
    // Assert readiness: an immediate count() can be zero before hydration and falsely skip the test.
    await expect(checkout.form).toBeVisible();
    await expect(page.getByTestId('checkout-subtotal')).toHaveText(/\$\s*0/);
    const submit = page.getByTestId('submit-checkout');
    if (await submit.isEnabled()) {
      await checkout.fill();
      await checkout.submit();
      await expect(checkout.success.or(page.getByRole('alert').filter({ hasText: /carrito|prendas|vacío/i })).first()).toBeVisible();
    } else {
      await expect(submit).toBeDisabled();
    }
  });
  await test.step('Verify that no order confirmation was created', async () => {
    // Soft assertion preserves inbox evidence even while the known defect exists.
    if (await checkout.success.isVisible()) {
      await test.info().attach('empty-cart-checkout-confirmation', {
        body: await page.screenshot({ fullPage: true }), contentType: 'image/png',
      });
    }
    await expect.soft(checkout.success).toHaveCount(0);
    await checkout.expectNoConfirmationEmail();
  });
});
