import { test, expect } from '@playwright/test';
import { ShopPage } from '../../pages/ShopPage';

test.describe('Sort Feature - POM', () => {

  let shopPage: ShopPage;

  test.beforeEach(async ({ page }) => {
    shopPage = new ShopPage(page);
    await shopPage.goto();
  });

  test('Sort by Name (A-Z)', async () => {
    await shopPage.sortByNameAZ();

    const names = await shopPage.getProductNames();
    const sortedNames = [...names].sort();

    expect(names).toEqual(sortedNames);
  });

  test('Sort by Price (High to Low)', async () => {
    await shopPage.sortByPriceHighToLow();

    const prices = await shopPage.getProductPrices();
    const sortedPrices = [...prices].sort((a, b) => b - a);

    expect(prices).toEqual(sortedPrices);
  });

});