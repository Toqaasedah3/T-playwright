import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchBtn: Locator;
  readonly priceMin: Locator;
  readonly priceMax: Locator;
  readonly minSlider: Locator;
  readonly maxSlider: Locator;
  readonly productPrices: Locator;
  readonly productTitles: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('[data-test="search-query"]');
    this.searchBtn = page.locator('[data-test="search-submit"]');
    this.priceMin = page.getByRole('slider', { name: 'ngx-slider', exact: true });
    this.priceMax = page.getByRole('slider', { name: 'ngx-slider-max' });
    this.minSlider = page.locator('.ngx-slider-pointer-min');
    this.maxSlider = page.locator('.ngx-slider-pointer-max');
    this.productPrices = page.locator('[data-test="product-price"]');
    this.productTitles = page.locator('[data-test="product-name"]');
  }

  async open() {
    await this.page.goto('/');
  }

  async searchProduct(text: string) {
    await this.searchInput.fill(text);
    await this.searchBtn.click();
  }

  async filterByCategory(category: string) {
    const categoryOption = this.page.locator('#filters').getByText(category, { exact: true });
    await categoryOption.click();
  }

  async filterByBrand(brand: string) {
    const brandOption = this.page
      .locator('#filters')
      .getByText(brand, { exact: true });

    await brandOption.scrollIntoViewIfNeeded();
    await brandOption.click();
  }

  async getSliderValues() {
    const min = Number(await this.minSlider.getAttribute('aria-valuenow'));
    const max = Number(await this.maxSlider.getAttribute('aria-valuenow'));

    return { min, max };
  }

  async filterByPriceRange() {
    await this.minSlider.focus();
    for (let i = 0; i < 10; i++) {
      await this.page.keyboard.press('ArrowRight');
    }

    await this.maxSlider.focus();
    for (let i = 0; i < 10; i++) {
      await this.page.keyboard.press('ArrowLeft');
    }
  }

  async validatePricesInSliderRange() {
    const { min, max } = await this.getSliderValues();
    const prices = await this.productPrices.allTextContents();

    for (const priceText of prices) {
      const cleaned = priceText.replace(/[^0-9.]/g, '');
      const price = Number(cleaned);

      console.log('Parsed price:', price, 'Min:', min, 'Max:', max);

      expect(Number.isNaN(price)).toBeFalsy();
      expect(price).toBeGreaterThanOrEqual(min);
      expect(price).toBeLessThanOrEqual(max);
    }
  }
}