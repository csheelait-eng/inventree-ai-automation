const { byTestIdOr, UI_TESTIDS } = require('../utils/selectors');

class PartCategoriesPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.title = page.locator('h1, h2').first();
    this.searchBox = byTestIdOr(page, UI_TESTIDS.partsSearchBox, page.getByRole('searchbox').or(page.locator('input[type="search"]')));
  }

  async goto() {
    await this.page.goto('/part/category/');
    await this.page.waitForLoadState('networkidle');
  }

  async openCategoryByName(categoryName) {
    const link = this.page.getByRole('link', { name: new RegExp(categoryName, 'i') }).first();
    await link.click();
    await this.page.waitForLoadState('networkidle');
  }

  async expectPartVisible(partName) {
    await this.page.getByText(new RegExp(partName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))).first().waitFor({ state: 'visible', timeout: 30_000 });
  }
}

module.exports = { PartCategoriesPage };

