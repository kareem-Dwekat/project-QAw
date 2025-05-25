import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly thankYouMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('input[data-test="firstName"]');
    this.lastNameInput = page.locator('input[data-test="lastName"]');
    this.postalCodeInput = page.locator('input[data-test="postalCode"]');
    this.continueButton = page.locator('input[data-test="continue"]');
    this.finishButton = page.locator('button[data-test="finish"]');
    this.thankYouMessage = page.locator('.complete-header');
  }

  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continue() {
    await this.continueButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }

  async getThankYouMessage() {
    return this.thankYouMessage.textContent();
  }
}