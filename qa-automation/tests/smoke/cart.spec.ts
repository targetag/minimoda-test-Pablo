import { test, expect } from '../../fixtures/test';
import { caseDetails } from '../../utils/case-details';

test('CART-ADD — add an in-stock product and verify totals', caseDetails(
  'CART-ADD', 'Fresh browser; demo product 3 is in stock.',
  'Product, quantity, price and total are correct; removing the final unit empties the cart.', 'QASE_CASE_CART_ADD',
), async ({ page, shop }) => {
  await test.step('Open the hat product, add one unit and follow the cart link', async () => {
    await shop.addHatAndOpenCart();
  });
  await test.step('Verify one unit costs $5,600', async () => {
    await expect(page.getByTestId('cart-qty-3')).toHaveText('1');
    await expect(page.getByTestId('cart-total')).toHaveText(/\$\s*5\.600/);
  });
  await test.step('Increase to two units; verify quantity and $11,200 total', async () => {
    await page.getByRole('button', { name: 'Sumar una unidad de Gorrito de Lana Osito' }).click();
    await expect(page.getByTestId('cart-qty-3')).toHaveText('2');
    await expect(page.getByTestId('cart-total')).toHaveText(/\$\s*11\.200/);
  });
  await test.step('Remove both units; verify empty cart and disabled checkout', async () => {
    await page.getByTestId('cart-decr-3').click();
    await page.getByTestId('cart-decr-3').click();
    await expect(page.getByTestId('cart')).toContainText('Tu carrito está vacío.');
    await expect(page.getByTestId('cart-total')).toHaveText(/\$\s*0/);
    await expect(page.getByTestId('checkout-btn')).toHaveAttribute('aria-disabled', 'true');
  });
});

test('CATALOG-SEARCH — search and clear product filters', caseDetails(
  'CATALOG-SEARCH', 'Fresh browser; catalog available.',
  'Searching the hat shows one matching product; clearing filters restores all 12 demo products.',
), async ({ page }) => {
  await test.step('Open the catalog and search for the hat', async () => {
    await page.goto('/tienda');
    await page.getByRole('searchbox', { name: 'Buscar' }).fill('Gorrito de Lana Osito');
    await expect(page.getByRole('article')).toHaveCount(1);
    await expect(page.getByRole('article').getByTestId('product-3')).toBeVisible();
  });
  await test.step('Clear filters and verify the complete demo catalog', async () => {
    await page.getByRole('button', { name: 'Limpiar filtros' }).click();
    await expect(page.getByRole('article')).toHaveCount(12);
  });
});

test('CATALOG-NO-STOCK — sold-out product cannot be added', caseDetails(
  'CATALOG-NO-STOCK', 'Product 2 is sold out in the inspected demo catalog.',
  'Sold-out action is disabled and the cart remains empty.',
), async ({ page }) => {
  await test.step('Open catalog and inspect sold-out product 2', async () => {
    await page.goto('/tienda');
    await expect(page.getByTestId('product-2').getByRole('button', { name: 'Sin stock' })).toBeDisabled();
    await expect(page.getByTestId('header-cart-count')).toHaveText('0');
  });
});
