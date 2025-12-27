// @ts-check
const { devices } = require('@playwright/test');

/** @type {import('@playwright/test').PlaywrightTestConfig} */
module.exports = {
  timeout: 60000,
  testDir: 'tests',
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'mobile-iphone12',
      use: { ...devices['iPhone 12'] },
    },
    {
      name: 'mobile-pixel2',
      use: { viewport: { width: 411, height: 731 }, userAgent: 'Pixel 2' },
    },
  ],
};
