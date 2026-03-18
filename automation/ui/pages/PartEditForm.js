const { byTestIdOr, UI_TESTIDS } = require('../utils/selectors');

class PartEditForm {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.dialog = page.locator('[role="dialog"], .modal-dialog, .modal').first();

    this.description = byTestIdOr(
      page,
      UI_TESTIDS.partDescriptionInput,
      page.locator('textarea[name="description"], textarea#id_description, input[name="description"]').first()
    );
    this.submit = byTestIdOr(page, UI_TESTIDS.partSubmitButton, page.getByRole('button', { name: /submit|save|update/i }));
  }

  async waitForOpen() {
    await this.dialog.waitFor({ state: 'visible', timeout: 30_000 }).catch(async () => {
      await this.description.waitFor({ state: 'visible', timeout: 30_000 });
    });
  }

  async setDescription(text) {
    await this.description.fill(text);
  }

  async submitForm() {
    await this.submit.first().click();
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = { PartEditForm };

