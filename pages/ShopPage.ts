import { Page } from '@playwright/test';

export class ShopPage {
  constructor(private page: Page) {}

  sortDropdown = '[data-testid="sort"]';
  sortNameOption = 'Name (A - Z)';
  sortPriceDescOption = 'Price (High - Low)';
  productNames = '';
  productPrices = '';

  async goto() {
    await this.page.goto('/');
  }

  async sortByNameAZ() {
    const combobox = this.page.getByRole('combobox', { name: 'sort' });
    await combobox.selectOption({ label: this.sortNameOption });
    await this.page.getByRole('heading', { level: 5 }).first().waitFor();
  }

  async sortByPriceHighToLow() {
    const combobox = this.page.getByRole('combobox', { name: 'sort' });
    await combobox.selectOption({ label: this.sortPriceDescOption });
    await this.page.getByRole('heading', { level: 5 }).first().waitFor();
  }

  async getProductNames() {
    const cards = this.page.locator('[data-test="product-card"]');
    const headings = cards.locator('h5');
    const texts = await headings.allTextContents();
    return texts.map(t => t.trim());
  }

  async getProductPrices() {
    const cards = this.page.locator('[data-test="product-card"]');
    const count = await cards.count();
    const prices: number[] = [];
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      const priceText = await card.locator('text=/\$\d+(?:\.\d{2})?/').first().textContent();
      if (priceText) {
        prices.push(parseFloat(priceText.replace(/[^0-9.]/g, '')));
      }
    }
    return prices;
  }
}