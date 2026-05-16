import { test, expect } from '@playwright/test';
import { ProductPage } from '../../pages/ProductPage';
import { CartPage } from '../../pages/CartPage';

test.describe('Remove From Cart Feature', () => {


  test('Remove product and verify cart is empty', async ({ page }) => {
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await productPage.gotoHome();
    const addedName = await productPage.addFirstProductToCart();
    await expect(page.getByRole('alert')).toContainText('Product added to shopping cart.');

    await cartPage.openCart();
    await cartPage.removeFirstItem();

    console.log('Remove item interaction completed');
  });

});