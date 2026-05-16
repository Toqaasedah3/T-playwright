import { Page } from '@playwright/test';

export type RegisterData = {
  firstName: string;
  lastName: string;
  dob: string;
  street: string;
  postalCode: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  password: string;
};

export class RegisterPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/auth/register');
  }

  async register(data: RegisterData) {
    await this.page.fill('[data-test="first-name"]', data.firstName);
    await this.page.fill('[data-test="last-name"]', data.lastName);

    await this.page.fill('[data-test="dob"]', data.dob);
    await this.page.fill('[data-test="street"]', data.street);
    await this.page.fill('[data-test="postal_code"]', data.postalCode);
    await this.page.fill('[data-test="city"]', data.city);
    await this.page.fill('[data-test="state"]', data.state);

    await this.page.selectOption('[data-test="country"]', {
      label: 'Palestine, State of'
    });

    await this.page.fill('[data-test="phone"]', data.phone);
    await this.page.fill('[data-test="email"]', data.email);
    await this.page.fill('[data-test="password"]', data.password);

    await this.page.click('[data-test="register-submit"]');
  }

  error(dataTest: string) {
    return this.page.locator(`[data-test="${dataTest}"]`);
  }
}