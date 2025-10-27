import { expect, type Locator, type Page } from '@playwright/test';

export class SignUpPage {
  page: Page;
  readonly signUpLink: Locator;
  readonly pageBar: Locator;
  readonly nameUser: Locator;
  readonly emailUser: Locator;
  readonly passwordUser: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly address: Locator;
  readonly state: Locator;
  readonly city: Locator;

  readonly mobileNumber: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signUpLink = page.getByRole('link', { name: ' Signup / Login' });
    this.pageBar = page.getByText('AutomationExercise Full-').first();
    this.nameUser = page.getByRole('textbox', { name: 'Name' });
    this.emailUser = page
      .locator('form')
      .filter({ hasText: 'Signup' })
      .getByPlaceholder('Email Address');
    this.passwordUser = page.getByRole('textbox', { name: 'Password *' });
    this.firstName = page.getByRole('textbox', { name: 'First name *' });
    this.lastName = page.getByRole('textbox', { name: 'Last name *' });
    this.address = page.getByRole('textbox', {
      name: 'Address * (Street address, P.',
    });
    this.state = page.getByRole('textbox', { name: 'State *' });
    this.city = page.getByRole('textbox', { name: 'City * Zipcode *' });
    this.mobileNumber = page.getByRole('textbox', { name: 'Mobile Number *' });
  }
  async goto() {
    await this.page.goto('http://automationexercise.com');
  }

  textboxByName(name: string) {
    return this.page.getByRole('textbox', { name: name });
  }
}
