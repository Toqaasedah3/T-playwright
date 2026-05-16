import { Page } from '@playwright/test';

export class ProductPage {
  constructor(private page: Page) {}

  async gotoHome() {
    await this.page.goto('/');
  }

  async addFirstProductToCart(): Promise<string> {
    await this.page.goto('/');

    const firstHeading = this.page.getByRole('heading', { level: 5 }).first();
    await firstHeading.waitFor({ state: 'visible', timeout: 10000 });
    const rawName = await firstHeading.textContent();
    const productName = rawName ? rawName.trim() : 'Unknown Product';

    await firstHeading.scrollIntoViewIfNeeded();
    await firstHeading.click();

    await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});

    const addButton = this.page.getByRole('button', { name: /Add to cart/i }).first();
    try {
      await addButton.waitFor({ state: 'visible', timeout: 10000 });
      await addButton.click();
    } catch (e) {
      const alt = this.page.locator('[data-test="add-to-cart"], #btn-add-to-cart').first();
      await alt.waitFor({ state: 'visible', timeout: 5000 });
      await alt.click();
    }

    await this.page.getByRole('alert').waitFor({ timeout: 7000 }).catch(() => {
      console.log('Add-to-cart alert not found after click');
    });

    return productName;
  }

  async search(productName: string) {
    await this.page.fill('[data-test="search-query"]', productName);
    await this.page.click('[data-test="search-submit"]');
  }

  async productsCount() {
    return this.page.locator('[data-test="product-card"]').count();
  }
}