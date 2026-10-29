import { type Page } from '@playwright/test';
import { customer } from '../utils/test-data';

export class RegistrationPage {
  constructor(readonly page: Page) {}
  get form() { return this.page.getByTestId('form-registro'); }

  async open() { await this.page.goto('/registro'); }

  async fill(overrides: { age?: number; password?: string; confirm?: string; terms?: boolean } = {}) {
    const password = overrides.password ?? customer.password;
    await this.form.getByRole('textbox', { name: 'Nombre', exact: true }).fill(customer.name);
    await this.form.getByRole('textbox', { name: 'Email', exact: true }).fill(customer.email);
    await this.form.getByLabel('Contraseña', { exact: true }).fill(password);
    await this.form.getByLabel('Confirmar contraseña', { exact: true }).fill(overrides.confirm ?? password);
    await this.form.getByRole('spinbutton', { name: 'Edad' }).fill(String(overrides.age ?? 18));
    await this.form.getByRole('combobox', { name: 'País', exact: true }).selectOption({ label: 'Argentina' });
    await this.form.getByRole('checkbox').setChecked(overrides.terms ?? true);
  }

  async submit() { await this.form.getByRole('button', { name: 'Crear cuenta' }).click(); }
}
