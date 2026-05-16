import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',

  fullyParallel: false,

  use: {
    baseURL: 'https://practicesoftwaretesting.com'
   
  },

  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/
    },
    {
      name: 'Chromium',
      testMatch: /.*\.spec\.ts/,
      dependencies: ['setup'],
      use: {
        browserName: 'chromium',
        storageState: 'auth.json',
        headless: false,
        launchOptions: { slowMo: 800 }
      }
    },
    {
      name: 'Firefox',
      testMatch: /.*\.spec\.ts/,
      dependencies: ['setup'],
      use: {
        browserName: 'firefox',
        storageState: 'auth.json',
        headless: false,
        launchOptions: { slowMo: 300 }
      }
    },
   
  ]
  
});
