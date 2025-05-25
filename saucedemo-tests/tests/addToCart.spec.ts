import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ ProductsPage';

test.describe('Add to Cart Feature', () => {
  let productsPage: ProductsPage;

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!);
    productsPage = new ProductsPage(page);
  });

  test('Add first product to cart', async () => {
    await productsPage.addFirstProductToCart();
    const count = await productsPage.getCartCount();
    expect(count).toBe(1);
  });
});