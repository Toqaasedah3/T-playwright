import { test } from '@playwright/test';
import { ProductsPage } from '../../pages/SortPage';

test.describe('Price Range Filter', () => {
    let productsPage: ProductsPage;

    test.beforeEach(async ({ page }) => {
        productsPage = new ProductsPage(page);
        await productsPage.open();
    });

  test('Filter products by price range', async () => {
    await productsPage.filterByPriceRange();
    await productsPage.validatePricesInSliderRange();
  });
});