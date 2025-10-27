import { test, expect } from '@playwright/test';
import { SauceDemoPage } from '../page-objects/SauceDemoPage';
import { log } from 'console';

test.describe('sign up tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new SauceDemoPage(page);
    await loginPage.goto();
  });

  test('positive: login user', async ({ page }) => {
    const loginPage = new SauceDemoPage(page);
    await expect(page.getByText('Swag Labs')).toBeVisible();
    await loginPage.username.click();
    await loginPage.username.fill('standard_user');
    await loginPage.password.click();
    await loginPage.password.fill('secret_sauce');
    await loginPage.loginButton.click();
    await expect(loginPage.productsBar).toBeVisible();
  });

  test('negative: user login with incorrect login', async ({ page }) => {
    const loginPage = new SauceDemoPage(page);
    await expect(page.getByText('Swag Labs')).toBeVisible();
    await loginPage.username.click();
    await loginPage.username.fill('noName_user');
    await loginPage.password.click();
    await loginPage.password.fill('secret_sauce');
    await loginPage.loginButton.click();
    await expect(loginPage.loginError).toContainText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  test('negative: user login with incorrect password', async ({ page }) => {
    const loginPage = new SauceDemoPage(page);
    await expect(page.getByText('Swag Labs')).toBeVisible();
    await loginPage.username.click();
    await loginPage.username.fill('standard_user');
    await loginPage.password.click();
    await loginPage.password.fill('not_secret_sauce');
    await loginPage.loginButton.click();
    await expect(loginPage.loginError).toContainText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  test('positive: add product to the cart', async ({ page }) => {
    const loginPage = new SauceDemoPage(page);
    await expect(page.getByText('Swag Labs')).toBeVisible();
    await loginPage.username.click();
    const username = 'standard_user';
    await loginPage.username.fill(username);
    await loginPage.password.click();
    const password = 'secret_sauce';
    await loginPage.password.fill(password);
    await loginPage.loginButton.click();
    await expect(loginPage.bikeLight).toBeVisible();
    await loginPage.addToCartBikeLight.click();
    await expect(loginPage.removeFromCartBikeLight).toBeVisible;
    await expect(loginPage.shoppingCart).toContainText('1');
    await loginPage.shoppingCart.click();
    await expect(loginPage.bikeLight).toBeVisible();
    await expect(loginPage.itemQuantity).toContainText('1');
  });
});
