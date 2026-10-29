import { expect, type Page } from '@playwright/test';
import { customer, demoCards, futureExpiry } from '../utils/test-data';

export class CheckoutPage {
  constructor(readonly page: Page) {}
  get form() { return this.page.getByTestId('form-checkout'); }
  get success() { return this.page.getByTestId('checkout-success'); }

  async fill(card = demoCards.approved) {
    await this.form.getByRole('textbox', { name: 'Nombre', exact: true }).fill(customer.name);
    await this.form.getByRole('textbox', { name: 'Dirección', exact: true }).fill(customer.address);
    await this.form.getByRole('textbox', { name: 'Email', exact: true }).fill(customer.email);
    await this.form.getByRole('combobox', { name: 'País de envío' }).selectOption({ label: 'Argentina' });
    await this.form.getByRole('textbox', { name: 'Número de tarjeta' }).fill(card);
    await this.form.getByRole('textbox', { name: 'Vencimiento (MM/AA)', exact: true }).fill(futureExpiry());
    await this.form.getByRole('textbox', { name: 'CVV', exact: true }).fill('123');
  }

  async submit() { await this.form.getByRole('button', { name: 'Confirmar compra' }).click(); }

  async expectNoConfirmationEmail() {
    await this.page.getByTestId('nav').getByRole('link', { name: 'Bandeja', exact: true }).click();
    await expect(this.page.getByRole('heading', { name: /Confirmación de compra/ })).toHaveCount(0);
  }
}
