const { byTestIdOr } = require('../utils/selectors');

class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // Demo UI (Mantine) uses accessible textbox names like "login-username" / "login-password"
    // and a "Log In" button. Keep fallbacks for other deployments.
    this.username = byTestIdOr(
      page,
      '',
      page
        .getByLabel(/^username/i)
        .getByRole('textbox', { name: /login-username|username/i })
        .or(
          page.locator(
            [
              // Prefer visible inputs (some pages render hidden duplicates for autofill)
              'input[name="username"]:visible',
              'input#id_username:visible',
              'input[data-path="username"]:visible',
              'input[placeholder*="your username" i]:visible',
              'input[placeholder*="username" i]:visible',
              'input[autocomplete="username"]:visible',
              // Fallbacks (in case :visible is not supported in a given build)
              'input[name="username"]',
              'input#id_username',
              'input[autocomplete="username"]',
            ].join(', ')
          )
        )
    );
    this.password = byTestIdOr(
      page,
      '',
      page
        .getByLabel(/^password/i)
        .getByRole('textbox', { name: /login-password|password/i })
        .or(
          page.locator(
            [
              'input[name="password"]:visible',
              'input#id_password:visible',
              'input[data-path="password"]:visible',
              'input[type="password"]:visible',
              'input[placeholder*="password" i]:visible',
              'input[autocomplete="current-password"]:visible',
              'input[name="password"]',
              'input#id_password',
              'input[type="password"]',
            ].join(', ')
          )
        )
    );
    this.submit = byTestIdOr(
      page,
      '',
      page
        .getByRole('button', { name: /^log in$/i })
        .or(page.getByRole('button', { name: /log in|sign in/i }))
        .or(page.locator('button[type="submit"]:visible'))
        .or(page.locator('button[type="submit"]'))
    );
  }

  async goto() {
    // Demo instance uses /web/login. Other deployments might serve /login/.
    await this.page.goto('/web/login').catch(() => {});
    if (await this.username.first().isVisible().catch(() => false)) return;
    await this.page.goto('/login/');
  }

  async login(username, password) {
    await this.username.first().waitFor({ state: 'visible', timeout: 30_000 });
    await this.username.first().fill(username);
    await this.password.first().waitFor({ state: 'visible', timeout: 30_000 });
    await this.password.first().fill(password);

    // Guard against filling a hidden/duplicate input: ensure the visible field has a value.
    const userValue = await this.username.first().inputValue().catch(() => '');
    if (!userValue || userValue.trim().length === 0) {
      // Try the most reliable demo selectors.
      const user = this.page.getByLabel(/^username/i).or(this.page.locator('input[placeholder*="your username" i]:visible')).first();
      await user.fill(username);
    }
    await this.submit.first().click();

    // Wait for a successful redirect away from the login page.
    // Demo instance uses /web/login; other deployments may use /login/.
    const postLoginNav = this.page.getByRole('tab', { name: /dashboard|parts|stock/i }).first();

    await Promise.race([
      this.page.waitForURL((url) => !/\/(web\/)?login\/?$/i.test(url.pathname), { timeout: 60_000 }),
      this.page.getByRole('button', { name: /administrator|admin|logout/i }).first().waitFor({ state: 'visible', timeout: 60_000 }),
      postLoginNav.waitFor({ state: 'visible', timeout: 60_000 }),
    ]).catch(async () => {
      // If we are still on the login page, surface a clear error for debugging.
      const url = this.page.url();
      if (/\/(web\/)?login\/?$/i.test(new URL(url).pathname)) {
        throw new Error(`Login did not complete (still on ${url}). Check credentials and login UI.`);
      }
      throw new Error(`Login did not complete within timeout (last URL: ${url}).`);
    });

    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = { LoginPage };

