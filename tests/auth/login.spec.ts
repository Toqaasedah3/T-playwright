import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login Feature', () => {
  
  test('Valid login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.login('admin@practicesoftwaretesting.com', 'welcome01');

    await page.waitForTimeout(2000);
    
    await expect(page).not.toHaveURL(/\/auth\/login/);
  });

  test('Invalid login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.login('wrong@email.com', 'wrongpass');

    await expect(page.locator('[data-test="login-error"], .alert-danger').first()).toBeVisible();
  });
});