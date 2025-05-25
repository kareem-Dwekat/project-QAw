import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ ProductsPage';
import { CartPage } from '../pages/CartPage';

test.describe('Remove From Cart Feature', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!);
  });

  test('Remove product from cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.addFirstProductToCart();
    await productsPage.goToCart();

    const cartPage = new CartPage(page);
    const initialCount = await cartPage.getCartItemCount();
    expect(initialCount).toBeGreaterThan(0);

    await cartPage.removeFirstItem();
    const updatedCount = await cartPage.getCartItemCount();
    expect(updatedCount).toBeLessThan(initialCount);
  });
});