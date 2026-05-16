import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/SortPage';

test.describe('Category Filter', () => {
    let productsPage: ProductsPage;

    test.beforeEach(async ({ page }) => {
        productsPage = new ProductsPage(page);
        await productsPage.open();
    });

    test('Filter products by category', async () => {
        await productsPage.filterByCategory('Hand Tools');

        const titles = await productsPage.productTitles.allTextContents();
        expect(titles.length).toBeGreaterThan(0);
    });
});