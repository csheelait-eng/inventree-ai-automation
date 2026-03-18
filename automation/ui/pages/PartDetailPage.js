const { byTestIdOr, UI_TESTIDS } = require('../utils/selectors');

class PartDetailPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.title = page.locator('h1, h2').first();

    // Left sidebar navigation within Part Detail (avoid top navbar "Parts/Stock" tabs)
    this.partSidebar = page.locator('aside').first();
    this.parametersTab = byTestIdOr(
      page,
      UI_TESTIDS.tabParameters,
      this.partSidebar
        .getByRole('link', { name: /^parameters$/i })
        .or(this.partSidebar.getByRole('button', { name: /^parameters$/i }))
        .or(this.partSidebar.getByText(/^parameters$/i))
        .first()
    );
    this.stockTab = byTestIdOr(
      page,
      UI_TESTIDS.tabStock,
      this.partSidebar
        .getByRole('link', { name: /^stock$/i })
        .or(this.partSidebar.getByRole('button', { name: /^stock$/i }))
        .or(this.partSidebar.getByText(/^stock$/i))
        .first()
    );

    // Actions
    this.actionsMenu = byTestIdOr(
      page,
      UI_TESTIDS.partActionsButton,
      page
        // Prefer the kebab menu (usually right-most in the page header toolbar)
        .locator('button:has(svg.tabler-icon-dots-vertical)')
        .last()
        .or(page.locator('button:has(svg.tabler-icon-dots)').last())
        .or(page.locator('button[aria-label*="action-menu" i]').last())
        .or(page.getByRole('button', { name: /actions|more/i }).last())
    ).first();

    this.editIconButton = page
      .locator('button:has(svg.tabler-icon-pencil), button:has(svg.tabler-icon-edit)')
      .filter({ hasNot: page.locator('[disabled],[aria-disabled="true"]') })
      .first();
    this.editButton = byTestIdOr(
      page,
      UI_TESTIDS.partEditButton,
      page
        .getByRole('menuitem', { name: /^edit$/i })
        .or(page.getByRole('button', { name: /^edit$/i }))
        .or(page.getByText(/^edit$/i))
    );
    this.deleteButton = byTestIdOr(
      page,
      UI_TESTIDS.partDeleteButton,
      page
        .getByRole('menuitem', { name: /delete part|delete/i })
        .or(page.getByRole('button', { name: /delete part|delete/i }))
        .or(page.getByText(/^delete part$/i))
        .or(page.getByText(/^delete$/i))
    );
    this.confirmDeleteButton = byTestIdOr(
      page,
      UI_TESTIDS.confirmDeleteButton,
      page
        .getByRole('button', { name: /^delete$/i })
        .or(page.getByRole('button', { name: /confirm delete|confirm|delete/i }))
        .or(page.getByText(/^delete$/i))
    );
  }

  async expectOnPart(name) {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page
      .getByText(new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
      .first()
      .waitFor({ state: 'visible', timeout: 30_000 });
  }

  async openParametersTab() {
    await this.parametersTab.first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async openStockTab() {
    await this.stockTab.first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async addParameter({ templateName, value }) {
    const disabledFilter = { hasNot: this.page.locator('[disabled],[aria-disabled="true"]') };

    const candidates = [
      byTestIdOr(this.page, UI_TESTIDS.addParameterButton, this.page.locator('')).first(),
      this.page.locator('button:has(svg.tabler-icon-plus), [role="button"]:has(svg.tabler-icon-plus)').filter(disabledFilter).first(),
      this.page.locator('button:has-text(\"+\")').filter(disabledFilter).first(),
      this.page.getByRole('button', { name: /^\+$/ }).filter(disabledFilter).first(),
      // Try direct button text matches (demo split-button often renders as plain '+')
      this.page.locator('xpath=//button[normalize-space(.)=\"+\"]').filter(disabledFilter).first(),
      this.page.locator('xpath=//button[.//*[normalize-space(text())=\"+\"]]').filter(disabledFilter).first(),
      this.page.locator('xpath=//*[normalize-space(text())=\"+\"]/ancestor::*[self::button or self::a or @role=\"button\"][1]').filter(disabledFilter).first(),
      this.page.getByRole('button', { name: /add parameter/i }).filter(disabledFilter).first(),
    ];

    let clicked = false;
    for (const c of candidates) {
      if (await c.isVisible().catch(() => false)) {
        await c.scrollIntoViewIfNeeded().catch(() => {});
        await c.click({ timeout: 30_000, force: true }).catch(() => {});
        clicked = true;
        break;
      }
    }
    if (!clicked) {
      throw new Error('Could not find Parameters "+" / Add Parameter control.');
    }

    // If "+" opened a dropdown, select "Add Parameter"
    const addParamItem = this.page
      .getByRole('menuitem', { name: /create parameter|add parameter/i })
      .or(this.page.getByRole('button', { name: /create parameter|add parameter/i }))
      .or(this.page.getByText(/^create parameter$/i))
      .or(this.page.getByText(/^add parameter$/i))
      .first();
    if (await addParamItem.isVisible().catch(() => false)) {
      await addParamItem.click().catch(() => {});
    }

    const dialog = this.page.locator('[role="dialog"]').filter({ hasText: /create parameter|add parameter/i }).first();
    await dialog.waitFor({ state: 'visible', timeout: 30_000 }).catch(() => {});

    const scope = (await dialog.isVisible().catch(() => false)) ? dialog : this.page;

    const templateCombo = scope
      .getByRole('combobox', { name: /template|parameter/i })
      .or(scope.getByLabel(/template|parameter/i))
      .or(scope.getByPlaceholder(/template|parameter/i))
      .or(scope.getByRole('combobox').first());
    await templateCombo.click({ timeout: 30_000 }).catch(() => {});
    await templateCombo.fill(templateName).catch(() => {});

    const option = this.page.getByRole('option', { name: new RegExp(templateName, 'i') }).first();
    if (await option.isVisible().catch(() => false)) {
      await option.click();
    } else {
      // Demo variance: template list may differ; pick first available option.
      const firstOption = this.page.getByRole('option').first();
      await firstOption.waitFor({ state: 'visible', timeout: 15_000 });
      await firstOption.click();
    }

    const valueInput = scope
      .getByLabel(/data|value/i)
      .or(scope.getByPlaceholder(/parameter value|value/i))
      .or(scope.locator('input[name="value"], textarea[name="value"], input#id_value, textarea#id_value, input[placeholder*="value" i], textarea[placeholder*="value" i]'))
      .first();
    await valueInput.fill(value);

    await scope.getByRole('button', { name: /submit|save|create/i }).first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async expectParameterRow({ templateName, value }) {
    const row = this.page.locator('tr', { hasText: templateName }).first();
    await row.waitFor({ state: 'visible', timeout: 30_000 });
    await row.getByText(new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))).first().waitFor({ state: 'visible' });
  }

  async addStock({ quantity, locationName }) {
    const addBtn = byTestIdOr(this.page, UI_TESTIDS.addStockButton, this.page.getByRole('button', { name: /add stock|new stock/i })).first();
    await addBtn.click();

    const qty = this.page.locator('input[name="quantity"], input#id_quantity').first();
    await qty.fill(String(quantity));

    const loc = this.page.getByRole('combobox', { name: /location/i }).or(this.page.locator('select[name="location"], select#id_location'));
    const select = this.page.locator('select[name="location"], select#id_location').first();
    if (await select.isVisible().catch(() => false)) {
      await select.selectOption({ label: locationName }).catch(async () => select.selectOption({ value: locationName }));
    } else {
      const combo = loc.first();
      await combo.click();
      await combo.fill(locationName).catch(() => {});
      const opt = this.page.getByRole('option', { name: new RegExp(locationName, 'i') }).first();
      if (await opt.isVisible().catch(() => false)) {
        await opt.click();
      } else {
        // Demo variance: location names differ; pick first available option.
        const firstOption = this.page.getByRole('option').first();
        await firstOption.waitFor({ state: 'visible', timeout: 15_000 });
        await firstOption.click();
      }
    }

    await this.page.getByRole('button', { name: /submit|save/i }).first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async expectStockRow({ quantity, locationName }) {
    const row = this.page.locator('tr', { hasText: locationName }).first();
    await row.waitFor({ state: 'visible', timeout: 30_000 });
    await row.getByText(new RegExp(String(quantity))).first().waitFor({ state: 'visible' });
  }

  async openEdit() {
    // Prefer direct edit icon if present (most stable on demo)
    if (await this.editIconButton.isVisible().catch(() => false)) {
      await this.editIconButton.click().catch(() => {});
      await this.page.waitForLoadState('domcontentloaded');
      return;
    }

    if (await this.actionsMenu.isVisible().catch(() => false)) {
      await this.actionsMenu.click().catch(() => {});
    }
    await this.editButton.first().waitFor({ state: 'visible', timeout: 10_000 });
    await this.editButton.first().click({ timeout: 15_000 });
    await this.page.waitForLoadState('domcontentloaded');
  }

  async deletePart() {
    // If the left navigation drawer is open, close it first (it can cover action menus).
    const navDrawer = this.page.getByText(/^Navigation$/).first();
    if (await navDrawer.isVisible().catch(() => false)) {
      await this.page.keyboard.press('Escape').catch(() => {});
      await navDrawer.waitFor({ state: 'hidden', timeout: 5_000 }).catch(() => {});
    }

    // Self-healing: open an action/overflow menu first (demo uses a kebab menu)
    for (let attempt = 1; attempt <= 3; attempt++) {
      if (await this.actionsMenu.isVisible().catch(() => false)) {
        await this.actionsMenu.click().catch(() => {});
      }

      await this.deleteButton.first().waitFor({ state: 'visible', timeout: 5_000 }).catch(() => {});
      if (await this.deleteButton.first().isVisible().catch(() => false)) {
        const isDisabled = await this.deleteButton.first().isDisabled().catch(() => false);
        if (isDisabled) {
          // Demo instance can disable deletes; treat cleanup as best-effort.
          await this.page.keyboard.press('Escape').catch(() => {});
          return;
        }

        await this.deleteButton.first().click({ timeout: 15_000 }).catch(() => {});
        break;
      }

      // If menu didn't open, try clicking the kebab/dots icon directly
      const kebab = this.page
        .locator('header button:has(svg.tabler-icon-dots-vertical), header button:has(svg.tabler-icon-dots)')
        .or(this.page.locator('button:has(svg.tabler-icon-dots-vertical), button:has(svg.tabler-icon-dots)'))
        .first();
      if (await kebab.isVisible().catch(() => false)) {
        await kebab.click().catch(() => {});
      }

      if (attempt === 3) {
        // Demo instance may not expose delete action reliably; cleanup is best-effort.
        return;
      }
    }

    await this.confirmDeleteButton.first().waitFor({ state: 'visible', timeout: 15_000 });
    await this.confirmDeleteButton.first().click({ timeout: 15_000 });
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = { PartDetailPage };

