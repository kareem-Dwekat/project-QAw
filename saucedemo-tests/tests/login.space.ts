import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Feature', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Login with valid credentials', async ({ page }) => {
    await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!);
    // تحقق من الانتقال للصفحة الرئيسية (المنتجات)
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('Login with invalid credentials', async ({ page }) => {
    await loginPage.login('wrong_user', 'wrong_pass');
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Username and password do not match');
  });
});