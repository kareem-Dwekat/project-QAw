import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly inventoryItems: Locator;
  readonly cartBadge: Locator;
  readonly addToCartButtons: Locator;
  readonly removeButtons: Locator;
  readonly sortSelect: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItems = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.addToCartButtons = page.locator('button[data-test^="add-to-cart-"]');
    this.removeButtons = page.locator('button[data-test^="remove-"]');
    this.sortSelect = page.locator('select[data-test="product_sort_container"]');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async addFirstProductToCart() {
    await this.addToCartButtons.first().click();
  }

  async removeFirstProductFromCart() {
    await this.removeButtons.first().click();
  }

  async getCartCount() {
    if (await this.cartBadge.count() === 0) return 0;
    return parseInt(await this.cartBadge.textContent() || '0', 10);
  }

  async sortBy(option: 'az' | 'price-high-low') {
    let value = '';
    if (option === 'az') value = 'az';
    else if (option === 'price-high-low') value = 'hilo';
  
    // انتظر تحميل الصفحة بالكامل أو العنصر الأب أولاً
    await this.page.waitForLoadState('domcontentloaded');
  
    // يمكن إضافة انتظار ظهور العنصر مع timeout مخصص
    await this.sortSelect.waitFor({ state: 'visible', timeout: 5000 });
  
    await this.sortSelect.selectOption(value);
  }

  async getProductNames() {
    return this.page.locator('.inventory_item_name').allTextContents();
  }

  async getProductPrices() {
    const pricesText = await this.page.locator('.inventory_item_price').allTextContents();
    return pricesText.map(p => parseFloat(p.replace('$', '')));
  }

  async goToCart() {
    await this.cartLink.click();
  }
}