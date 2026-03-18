const fs = require('fs');
const path = require('path');
const { test: base, expect } = require('@playwright/test');
const { optionalEnv } = require('../utils/env');
const { LoginPage } = require('../pages/LoginPage');

/**
 * Shared fixtures for UI tests.
 *
 * Adds:
 * - Authenticated browser context once per worker (no storageState persistence)
 * - Reuses in-memory session across tests in the worker
 * - Per-test screenshot attachment on failure (in addition to config)
 */
const test = base.extend({
  authContext: [
    async ({ browser }, use) => {
      const username = optionalEnv('UI_USERNAME', 'admin');
      const password = optionalEnv('UI_PASSWORD', 'inventree');
      const baseURL = optionalEnv('UI_BASE_URL', 'https://demo.inventree.org/');

      const context = await browser.newContext({ baseURL });
      const page = await context.newPage();

      // Best-effort: if already logged in, skip.
      const loggedInIndicator = optionalEnv('UI_POST_LOGIN_SELECTOR', '[data-testid="user-menu"], [aria-label="User"], text=/Logout/i');

      await page.goto('/web/home').catch(async () => page.goto(baseURL || '/'));

      if (!(await page.locator(loggedInIndicator).first().isVisible().catch(() => false))) {
        const loginPage = new LoginPage(page);
        const currentPath = new URL(page.url()).pathname;
        if (!/\/(web\/)?login\/?$/i.test(currentPath)) {
          await loginPage.goto();
        }
        await loginPage.login(username, password);
      }

      await page.close().catch(() => {});
      await use(context);
      await context.close();
    },
    { scope: 'worker' },
  ],

  page: async ({ authContext }, use) => {
    if (!authContext) {
      throw new Error('Auth context was not created (login likely failed).');
    }
    const page = await authContext.newPage();
    await use(page);
    await page.close().catch(() => {});
  },
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    // When running from automation/ui, keep screenshots under reports/.
    const screenshotsDir = path.join(process.cwd(), 'reports', 'screenshots');
    await fs.promises.mkdir(screenshotsDir, { recursive: true });
    const fileName = `${testInfo.title.replace(/[^\w.-]+/g, '_')}-${Date.now()}.png`;
    const filePath = path.join(screenshotsDir, fileName);

    await page.screenshot({ path: filePath, fullPage: true }).catch(() => {});
    await testInfo.attach('failure-screenshot', {
      path: filePath,
      contentType: 'image/png',
    });
  }
});

module.exports = {
  test,
  expect,
};

