import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ ProductsPage'; // ✅ تم إزالة المسافة الزائدة
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout Feature', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!);
  });

  test('Complete checkout process', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await page.waitForLoadState('domcontentloaded'); // ✅ تأكد من تحميل الصفحة
    await productsPage.addFirstProductToCart();
    await productsPage.goToCart();

    const cartPage = new CartPage(page);
    await cartPage.proceedToCheckout();

    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
    await checkoutPage.continue();
    await checkoutPage.finish();

    const message = await checkoutPage.getThankYouMessage();
    // ✅ حل مشكلة التحقق الحرفي للرسالة
    expect((message ?? '').toLowerCase()).toContain('thank you for your order');
  });
});