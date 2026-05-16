import { test as setup, expect } from '@playwright/test';

setup('authenticate', async ({ request }) => {

  const response = await request.post(
    'https://practicesoftwaretesting.com/api/users/login',
    {
      data: {
        email: process.env.VALID_EMAIL,
        password: process.env.VALID_PASSWORD
      }
    }
  );

  expect(response.ok()).toBeTruthy();

  await request.storageState({
    path: 'auth.json'
  });
});