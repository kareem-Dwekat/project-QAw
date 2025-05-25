import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ ProductsPage';

test.describe('Sort Feature', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(); // الذهاب إلى صفحة تسجيل الدخول
    await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!);
  });

  test('Sort products from A to Z', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // ✅ انتظر تحميل الصفحة
    await page.waitForLoadState('domcontentloaded');

    // ✅ تحقق أنك على صفحة المنتجات
    await expect(page).toHaveURL(/inventory/);

    await productsPage.sortBy('az');

    const names = await productsPage.getProductNames();
    const sorted = [...names].sort();

    expect(names).toEqual(sorted);
  });

  test('Sort products by Price: High to Low', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/inventory/);

    await productsPage.sortBy('price-high-low');

    const prices = await productsPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => b - a);

    expect(prices).toEqual(sorted);
  });
});