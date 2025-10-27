import { expect, type Locator, type Page } from '@playwright/test';

export class SauceDemoPage {
  page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly swagLabsBar: Locator;
  readonly productsBar: Locator;
  readonly loginError: Locator;
  readonly bikeLight: Locator;
  readonly addToCartBikeLight: Locator;
  readonly removeFromCartBikeLight: Locator;
  readonly shoppingCart: Locator;
  readonly itemQuantity: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator('[data-test="username"]');
    this.password = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.swagLabsBar = page.getByText('Swag Labs');
    this.productsBar = page.locator('[data-test="title"]');
    this.loginError = page.locator('[data-test="error"]');
    this.bikeLight = page.locator('[data-test="item-0-title-link"]');
    this.addToCartBikeLight = page.locator(
      '[data-test="add-to-cart-sauce-labs-bike-light"]'
    );
    this.removeFromCartBikeLight = page.locator(
      '[data-test="remove-sauce-labs-bike-light"]'
    );
    this.shoppingCart = page.locator('[data-test="shopping-cart-link"]');
    this.itemQuantity = page.locator('[data-test="item-quantity"]');
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }
}
