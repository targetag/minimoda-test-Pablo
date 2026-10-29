import { test, expect } from '../../fixtures/test';
import { caseDetails } from '../../utils/case-details';

for (const age of [12, 121]) {
  test(`REGISTER-AGE-${age} — reject age outside 13–120`, caseDetails(
    `REGISTER-AGE-${age}`, 'Fresh browser; all other registration fields valid.',
    'Age error appears and registration does not succeed.', 'QASE_CASE_REGISTER_AGE',
  ), async ({ page, registration }) => {
    await test.step(`Fill registration with age ${age} and submit`, async () => {
      await registration.open();
      await registration.fill({ age });
      await registration.submit();
    });
    await test.step('Verify age rejection and no success status', async () => {
      await expect(registration.form.getByRole('alert')).toHaveText('La edad debe estar entre 13 y 120.');
      await expect(page.getByTestId('registro-success')).toHaveCount(0);
    });
  });
}

for (const age of [13, 120]) {
  test(`REGISTER-VALID-${age} — accept boundary age with an eight-character password`, caseDetails(
    `REGISTER-VALID-${age}`, 'Fresh browser; fictitious registration data, accepted terms, matching eight-character password.',
    'Registration succeeds and a simulated welcome email is present.', 'QASE_CASE_REGISTER_SUCCESS',
  ), async ({ page, registration }) => {
    await test.step('Submit valid boundary registration', async () => {
      await registration.open();
      await registration.fill({ age, password: 'QaDemo12' });
      await registration.submit();
      await expect(page.getByTestId('registro-success')).toContainText('¡Registro exitoso!');
    });
    await test.step('Verify one simulated welcome email', async () => {
      await page.getByTestId('nav').getByRole('link', { name: 'Bandeja', exact: true }).click();
      await expect(page.getByTestId('email-item')).toHaveCount(1);
      await expect(page.getByTestId('email-item')).toContainText(/bienvenid/i);
    });
  });
}

test('REGISTER-PASSWORD — reject a seven-character password', caseDetails(
  'REGISTER-PASSWORD', 'Fresh browser; valid age and other registration fields; password and confirmation both seven characters.',
  'Password length error and no successful registration.', 'QASE_CASE_REGISTER_PASSWORD',
), async ({ page, registration }) => {
  await test.step('Submit a seven-character password', async () => {
    await registration.open();
    await registration.fill({ password: 'QaDemo1' });
    await registration.submit();
  });
  await test.step('Verify minimum password length enforcement', async () => {
    await expect(registration.form.getByRole('alert')).toHaveText('La contraseña debe tener al menos 8 caracteres.');
    await expect(page.getByTestId('registro-success')).toHaveCount(0);
  });
});

test('REGISTER-TERMS — require acceptance of terms', caseDetails(
  'REGISTER-TERMS', 'Fresh browser; valid registration data; terms unchecked.',
  'Terms are marked invalid and no successful registration.',
), async ({ page, registration }) => {
  await test.step('Submit valid registration without accepting terms', async () => {
    await registration.open();
    await registration.fill({ terms: false });
    await registration.submit();
  });
  await test.step('Verify terms rejection', async () => {
    await expect(registration.form.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.getByTestId('registro-success')).toHaveCount(0);
  });
});

test('LOGIN-REQUIRED — reject empty simulated login', caseDetails(
  'LOGIN-REQUIRED', 'Fresh browser; simulated login form empty.',
  'Required email and password messages appear; real authentication is outside this demo scope.',
), async ({ page, registration }) => {
  await test.step('Submit empty login form', async () => {
    await registration.open();
    await page.getByTestId('form-login').getByRole('button', { name: 'Ingresar' }).click();
  });
  await test.step('Verify both required-field messages', async () => {
    const login = page.getByTestId('form-login');
    await expect(login.getByRole('alert').filter({ hasText: 'El email es obligatorio.' })).toBeVisible();
    await expect(login.getByRole('alert').filter({ hasText: 'La contraseña es obligatoria.' })).toBeVisible();
  });
});
