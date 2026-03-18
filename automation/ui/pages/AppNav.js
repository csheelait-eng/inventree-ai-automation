const { byTestIdOr, UI_TESTIDS } = require('../utils/selectors');

class AppNav {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.nav = page.locator('nav, [aria-label="navigation-menu"]').first();
  }

  async gotoHome() {
    // Demo instance uses /web/home as the authenticated landing page.
    await this.page.goto('/web/home').catch(async () => this.page.goto('/'));
    await this.page.waitForLoadState('domcontentloaded');
  }

  async gotoParts() {
    // Demo UI exposes "Parts" as a top tab linking to /web/part.
    // Other deployments may have a sidebar link or different route.
    const candidates = [
      // Prefer configured selector (can be css=..., text=..., or data-testid)
      byTestIdOr(this.page, UI_TESTIDS.navPartsLink, this.page.locator('')).first(),

      // Demo top navigation
      this.page.locator('a[href="/web/part"]').first(),
      this.page.locator('a[href="https://demo.inventree.org/web/part"]').first(),
      this.page.getByRole('link', { name: /^parts$/i }).first(),
      this.page.getByRole('tab', { name: /^parts$/i }).first(),

      // Generic link fallback
      this.page.locator('a[href*="/web/part"]').first(),
    ];

    for (const c of candidates) {
      if (await c.isVisible().catch(() => false)) {
        await c.click().catch(() => {});
        try {
          await this.page.waitForURL(/\/web\/part(\/|$)/i, { timeout: 10_000 });
          await this.page.waitForLoadState('networkidle');
          return;
        } catch {
          // Try next candidate
        }
      }
    }

    // Last resort: direct navigation
    await this.page.goto('/web/part').catch(async () => this.page.goto('/part/'));
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = { AppNav };

