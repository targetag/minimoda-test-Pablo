import { test as base, expect } from '@playwright/test';
import { ShopPage } from '../pages/shop-page';
import { CheckoutPage } from '../pages/checkout-page';
import { RegistrationPage } from '../pages/registration-page';

// Built-in page/context fixtures provide clean storage and teardown for every test.
export const test = base.extend<{
  shop: ShopPage;
  checkout: CheckoutPage;
  registration: RegistrationPage;
}>({
  shop: async ({ page }, use) => { await use(new ShopPage(page)); },
  checkout: async ({ page }, use) => { await use(new CheckoutPage(page)); },
  registration: async ({ page }, use) => { await use(new RegistrationPage(page)); },
});
export { expect };
