import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async openCart() {
    await this.page.goto('/checkout');
  }

  async cartItemsCount() {
    const tbody = this.page.locator('table tbody').first();
    return tbody.locator('tr').count();
  }

  async cartContains(productName: string) {
    const row = this.page.locator('table tbody tr').filter({ hasText: productName });
    return await row.count().then(c => c > 0);
  }

  async removeFirstItem() {
    const itemRows = this.page.locator('table tbody tr');
    const firstRow = itemRows.first();
    await firstRow.waitFor();

    await firstRow.locator('a.btn-danger').click();

    await firstRow.waitFor({ state: 'detached' });
  }

  async emptyCartMessage() {
    return this.page.getByText(/cart is empty|no items in cart/i);
  }
}