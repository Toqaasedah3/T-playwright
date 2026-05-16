import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/SortPage';

test.describe('Search Feature', () => {
    let productsPage: ProductsPage;

    test.beforeEach(async ({ page }) => {
        productsPage = new ProductsPage(page);
        await productsPage.open();
    });

    test('Search for a product', async () => {
        await productsPage.searchProduct('hammer');
        const titles = await productsPage.productTitles.allTextContents();
        expect(titles.some(title => title.toLowerCase().includes('hammer'))).toBeTruthy();
    });
});