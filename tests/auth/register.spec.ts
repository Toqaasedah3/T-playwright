import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/RegisterPage';

test.describe('Register Feature', () => {
  test.beforeEach(async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
  });

  test('Valid registration', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const randomEmail = `user${Date.now()}@test.com`;

    await registerPage.register({
      firstName: 'Test',
      lastName: 'User',
      dob: '2000-01-15',
      street: 'Main Street 1',
      postalCode: '10000',
      city: 'Nablus',
      state: 'Nablus',
      phone: '0599000000',
      email: randomEmail,
      password: 'Qa!Sd29xL@7Pz#4'
    });

    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('Invalid registration (empty fields)', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await page.click('[data-test="register-submit"]');

    await expect(registerPage.error('first-name-error')).toBeVisible();
    await expect(registerPage.error('last-name-error')).toBeVisible();
    await expect(registerPage.error('email-error')).toBeVisible();
  });
});