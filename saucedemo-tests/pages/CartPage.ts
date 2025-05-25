import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly removeButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('button[data-test="checkout"]');
    this.removeButtons = page.locator('button[data-test^="remove-"]');
  }

  async getCartItemCount() {
    return await this.cartItems.count();
  }

  async removeFirstItem() {
    await this.removeButtons.first().click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}