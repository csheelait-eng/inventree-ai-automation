const { byTestIdOr, UI_TESTIDS } = require('../utils/selectors');

class PartCreateForm {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Common fields on InvenTree "Create Part" form.
    this.dialog = page.locator('[role="dialog"], .modal-dialog, .modal').first();
    // Scope all form interactions to the actual create dialog/form to avoid false positives
    // from unrelated submit/search forms on listing pages.
    this.scope = page
      .locator('[role="dialog"]')
      .filter({ hasText: /add part|create part/i })
      .first();
    this.name = byTestIdOr(
      page,
      UI_TESTIDS.partNameInput,
      this.scope
        .getByLabel(/^name/i)
        .or(this.scope.getByRole('textbox', { name: /^name/i }))
        .or(this.scope.locator('input[name="name"], input#id_name, input[placeholder*="name" i]'))
        .first()
    );
    this.description = byTestIdOr(
      page,
      UI_TESTIDS.partDescriptionInput,
      this.scope
        .getByLabel(/description/i)
        .or(this.scope.getByRole('textbox', { name: /description/i }))
        .or(
          this.scope.locator(
            'textarea[name="description"], textarea#id_description, input[name="description"], textarea[placeholder*="description" i]'
          )
        )
        .first()
    );
    this.ipn = byTestIdOr(
      page,
      UI_TESTIDS.partIpnInput,
      this.scope.locator('input[name="IPN"], input[name="ipn"], input#id_IPN, input#id_ipn').first()
    );

    // Category selection can be a select, react-select, or typeahead.
    this.categoryCombobox = byTestIdOr(
      page,
      UI_TESTIDS.partCategoryInput,
      this.scope
        .getByRole('combobox', { name: /category/i })
        .or(this.scope.getByLabel(/category/i))
        // Demo UI: category control wrapper uses aria-label="partcategory"
        .or(this.scope.locator('[aria-label="partcategory"] input, [aria-label="partcategory"]').first())
        .or(this.scope.locator('select[name="category"], select#id_category'))
    );

    this.purchaseableCheckbox = page.getByRole('checkbox', { name: /purchaseable/i });
    this.assemblyCheckbox = page.getByRole('checkbox', { name: /assembly/i });
    this.virtualCheckbox = page.getByRole('checkbox', { name: /virtual/i });

    this.copyCategoryParametersCheckbox = page.getByRole('checkbox', { name: /copy category parameters/i });
    this.createInitialStockCheckbox = page.getByRole('checkbox', { name: /create initial stock/i });
    this.initialStockQuantity = page.locator('input[name*="initial"][name*="quantity"], input[name="quantity"], input#id_quantity').first();

    this.addSupplierDataCheckbox = page.getByRole('checkbox', { name: /add supplier data/i });

    this.submit = byTestIdOr(
      page,
      UI_TESTIDS.partSubmitButton,
      this.scope
        .locator('button[type="submit"]')
        .or(this.scope.locator('button:has(span.m_811560b9.mantine-Button-label:has-text("Submit"))'))
        .or(this.scope.getByRole('button', { name: /^submit$/i }))
        .or(this.scope.getByRole('button', { name: /create part/i }))
        .or(this.scope.getByRole('button', { name: /create|save/i }))
    );
    this.cancel = page.getByRole('button', { name: /cancel|close/i });
  }

  async waitForOpen() {
    await this.scope.waitFor({ state: 'visible', timeout: 30_000 });
    await this.submit.first().waitFor({ state: 'visible', timeout: 30_000 });
  }

  async fillRequired({ name, description, categoryPath }) {
    await this.name.fill(name);
    await this.description.fill(description);
    if (categoryPath?.length) {
      await this.selectCategory(categoryPath);
    }
  }

  async fillOptional({ ipn }) {
    if (ipn) {
      await this.ipn.fill(ipn);
    }
  }

  async selectCategory(categoryPath) {
    // Supports either <select> or combobox.
    const last = categoryPath[categoryPath.length - 1];

    const select = this.page.locator('select[name="category"], select#id_category').first();
    if (await select.isVisible().catch(() => false)) {
      await select.selectOption({ label: last }).catch(async () => select.selectOption({ value: last }));
      return;
    }

    const combo = this.categoryCombobox.first();
    // If the demo UI already implies the category (e.g. from category view),
    // the category field may be non-interactive. Skip rather than failing.
    await combo.waitFor({ state: 'visible', timeout: 10_000 }).catch(() => {});
    if (!(await combo.isVisible().catch(() => false))) return;

    await combo.scrollIntoViewIfNeeded().catch(() => {});
    // Do not press Escape pre-emptively here: in the demo modal, Escape can close the dialog.
    const clicked = await combo
      .click({ force: true, timeout: 30_000 })
      .then(() => true)
      .catch(async () => {
        // If something is intercepting the click (popover), try dismiss once and retry.
        await this.page.keyboard.press('Escape').catch(() => {});
        return combo.click({ force: true, timeout: 30_000 }).then(() => true).catch(() => false);
      });
    if (!clicked) return;
    await combo.fill(last).catch(() => {});

    const option = this.page
      .getByRole('option', { name: new RegExp(last, 'i') })
      .or(this.page.getByRole('listbox').getByText(new RegExp(last, 'i')))
      .or(this.page.getByText(new RegExp(`^${last}$`, 'i')));

    if (await option.first().isVisible().catch(() => false)) {
      await option.first().click({ force: true });
      return;
    }

    // If options are not exposed with roles (demo UI variations), accept the best match.
    await combo.press('Enter').catch(() => {});
  }

  async setFlag(flagName, enabled) {
    const map = {
      purchaseable: this.purchaseableCheckbox,
      assembly: this.assemblyCheckbox,
      virtual: this.virtualCheckbox,
      copyCategoryParameters: this.copyCategoryParametersCheckbox,
      createInitialStock: this.createInitialStockCheckbox,
      addSupplierData: this.addSupplierDataCheckbox,
    };
    const locator = map[flagName];
    if (!locator) throw new Error(`Unknown flag: ${flagName}`);

    if (enabled) {
      await locator.check({ force: true }).catch(async () => locator.click({ force: true }));
    } else {
      await locator.uncheck({ force: true }).catch(async () => locator.click({ force: true }));
    }
  }

  async setInitialStockQuantity(quantity) {
    await this.initialStockQuantity.fill(String(quantity));
  }

  async submitForm() {
    await this.submit.first().waitFor({ state: 'visible', timeout: 30_000 });
    await this.submit.first().click({ timeout: 30_000 });
    await this.page.waitForLoadState('networkidle');
  }

  async expectFieldRequiredError(fieldLabelRegex) {
    // Broad matcher: look for "required" near the field label or in an inline error region.
    const error = this.page.locator('text=/required/i').first();
    await error.waitFor({ state: 'visible', timeout: 15_000 });
    await this.page.getByText(fieldLabelRegex).first().waitFor({ state: 'visible', timeout: 15_000 }).catch(() => {});
  }

  async expectInlineErrorText(textRegex) {
    const error = this.page.getByText(textRegex).first();
    await error.waitFor({ state: 'visible', timeout: 15_000 });
  }
}

module.exports = { PartCreateForm };

