// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const path = require('path');

// Load env from automation/ui/.env (if present)
require('dotenv').config({ path: path.join(__dirname, '.env') });

/**
 * Enterprise-focused Playwright configuration (scoped to automation/ui):
 * - Cross-browser coverage (Chromium, Firefox, WebKit)
 * - HTML + JSON reporting under automation/ui/reports/
 * - Failure artifacts (screenshots/traces/videos) retained on failures
 */
module.exports = defineConfig({
  testDir: path.join(__dirname, 'tests'),
  outputDir: path.join(__dirname, 'reports', 'artifacts'),
  timeout: 60 * 1000,
  expect: {
    timeout: 15 * 1000,
  },
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['list'],
    [
      'html',
      {
        outputFolder: path.join(__dirname, 'reports', 'html'),
        open: 'never',
      },
    ],
    [
      'json',
      {
        outputFile: path.join(__dirname, 'reports', 'results.json'),
      },
    ],
  ],
  use: {
    baseURL: process.env.UI_BASE_URL || 'https://demo.inventree.org/',
    launchOptions: {
      slowMo: process.env.UI_SLOW_MO ? Number(process.env.UI_SLOW_MO) : 0,
    },
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15 * 1000,
    navigationTimeout: 30 * 1000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});

