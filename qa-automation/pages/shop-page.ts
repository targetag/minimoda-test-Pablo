import { expect, type Page } from '@playwright/test';

export class ShopPage {
  constructor(readonly page: Page) {}

  async openProduct(id = 3) {
    await this.page.goto(`/producto/${id}`);
    await expect(this.page.getByTestId('product-detail')).toBeVisible();
  }

  async addHatAndOpenCart() {
    await this.openProduct(3);
    await this.page.getByTestId('add-to-cart-3').click();
    await expect(this.page.getByTestId('header-cart-count')).toHaveText('1');
    // Follow the app's link: full-page navigation currently loses in-memory cart state.
    await this.page.getByTestId('header-cart').click();
    await expect(this.page.getByTestId('cart-item-3')).toContainText('Gorrito de Lana Osito');
  }

  async openCheckoutWithHat() {
    await this.addHatAndOpenCart();
    await this.page.getByTestId('checkout-btn').click();
    await expect(this.page.getByTestId('checkout-resumen')).toContainText('Gorrito de Lana Osito × 1');
  }
}
