import { test, expect } from '../../fixtures/test';
import { caseDetails } from '../../utils/case-details';

test('CART-STOCK — prevent quantities above displayed inventory', caseDetails(
  'CART-STOCK', 'Fresh browser; hat product displays available inventory.',
  'Cart quantity never exceeds the displayed stock when another unit is requested.', 'QASE_CASE_CART_STOCK',
), async ({ page, shop }) => {
  let stock = 0;
  await test.step('Read the displayed hat inventory and add one unit', async () => {
    await shop.openProduct();
    const stockText = await page.getByTestId('product-3').getByText(/^Stock: \d+$/).innerText();
    stock = Number(stockText.match(/\d+/)![0]);
    expect(stock).toBeGreaterThan(0);
    expect(stock, 'Guard against unexpectedly large live inventory loops').toBeLessThanOrEqual(100);
    await page.getByTestId('add-to-cart-3').click();
    await page.getByTestId('header-cart').click();
  });
  await test.step('Reach available stock and try to add one excess unit', async () => {
    const increase = page.getByTestId('cart-incr-3');
    for (let quantity = 1; quantity < stock; quantity++) await increase.click();
    await expect(page.getByTestId('cart-qty-3')).toHaveText(String(stock));
    if (await increase.isEnabled()) await increase.click();
    await expect(page.getByTestId('cart-qty-3')).toHaveText(String(stock));
  });
});
