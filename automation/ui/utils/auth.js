const fs = require('fs');
const path = require('path');
const { LoginPage } = require('../pages/LoginPage');
const { optionalEnv } = require('./env');
const { storageStatePath } = require('./paths');

async function ensureDir(dirPath) {
  await fs.promises.mkdir(dirPath, { recursive: true });
}

/**
 * Logs in once and persists storageState for re-use.
 * @param {import('@playwright/test').Browser} browser
 * @param {string} baseURL
 */
async function createStorageState(browser, baseURL) {
  // Defaults allow running locally without a .env, while still supporting secure overrides.
  const username = optionalEnv('UI_USERNAME', 'admin');
  const password = optionalEnv('UI_PASSWORD', 'inventree');

  const statePath = storageStatePath();
  await ensureDir(path.dirname(statePath));

  const context = await browser.newContext({ baseURL });
  const page = await context.newPage();

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(username, password);

  // Optional: validate we're actually logged in (best-effort selector).
  const postLoginSelector = optionalEnv('UI_POST_LOGIN_SELECTOR', '[aria-label="navigation-menu"], [aria-label="User"], text=/Logout/i');
  await page.locator(postLoginSelector).first().waitFor({ state: 'visible', timeout: 30_000 }).catch(() => {});

  await context.storageState({ path: statePath });
  await context.close();
}

module.exports = {
  createStorageState,
};

