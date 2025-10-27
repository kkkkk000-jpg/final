import { test, expect } from '@playwright/test';
import { SignUpPage } from '../page-objects/signUp';

test.describe('sign up tests', () => {
  test.beforeEach(async ({ page }) => {
    const signUpPage = new SignUpPage(page);
    await signUpPage.goto();
  });

  test('sign up user', async ({ page }) => {
    const signUpPage = new SignUpPage(page);
    await expect(signUpPage.pageBar).toBeVisible();
    await signUpPage.signUpLink.click();
    await expect(
      page.getByRole('heading', { name: 'New User Signup!' })
    ).toBeVisible();
    await signUpPage.nameUser.click();
    await signUpPage.textboxByName('Name').fill('test testovich');
    await signUpPage.emailUser.click();
    const email = `test${Date.now()}@test.com`;
    await signUpPage.emailUser.fill(email);
    await page.getByRole('button', { name: 'Signup' }).click();
    await page.getByText('Mrs.').check();
    await signUpPage.passwordUser.click();
    const password = '123456789';
    await signUpPage.passwordUser.fill(password);
    await page.locator('#days').selectOption('3');
    await page.locator('#months').selectOption('January');
    await page.locator('#years').selectOption('1995');
    await page
      .getByRole('checkbox', { name: 'Receive special offers from' })
      .check();
    await signUpPage.firstName.click();
    await signUpPage.firstName.fill('Test');
    await signUpPage.lastName.click();
    await signUpPage.lastName.fill('Testovich');
    await signUpPage.address.click();
    const address = 'test street, 214 apt 5';
    await signUpPage.address.fill(address);
    await page.getByLabel('Country *').selectOption('Canada');
    await signUpPage.state.click();
    const state = 'NB';
    await signUpPage.state.fill(state);
    await signUpPage.city.click();
    await signUpPage.city.fill('test city');
    await page.locator('#zipcode').click();
    await page.locator('#zipcode').fill('123456');
    await signUpPage.mobileNumber.click();
    await signUpPage.mobileNumber.fill('555555555');
    await page.getByRole('button', { name: 'Create Account' }).click();
    await expect(page.locator('.title.text-center b')).toBeVisible();
    await expect(page.locator("[data-qa='continue-button']")).toBeVisible();
  });
});
