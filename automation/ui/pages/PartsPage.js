const { byTestIdOr, UI_TESTIDS } = require('../utils/selectors');

class PartsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // These selectors are intentionally broad to tolerate UI variations.
    this.createPartButton = byTestIdOr(
      page,
      UI_TESTIDS.partsCreateButton,
      page
        .getByRole('button', { name: /create part|new part|add part/i })
        .or(
          page.locator(
            [
              // Typical icon buttons in the demo UI
              'button[aria-label*="create" i]:not([disabled])',
              'button[title*="create" i]:not([disabled])',
              'button[aria-label*="add" i]:not([disabled])',
              'button[title*="add" i]:not([disabled])',
              // Avoid action-menu buttons
              'button[aria-label*="action-menu" i]',
            ].join(', ')
          ).filter({ hasNot: page.locator('[aria-label*="action-menu" i]') })
        )
    );
    this.searchBox = byTestIdOr(
      page,
      UI_TESTIDS.partsSearchBox,
      page
        .getByRole('searchbox')
        .or(page.getByPlaceholder(/search/i))
        .or(page.locator('input[placeholder*="search" i]'))
        .or(page.locator('input[type="search"]'))
        .or(page.locator('input[aria-label*="search" i]'))
    );
    this.partsTable = byTestIdOr(page, UI_TESTIDS.partsTable, page.locator('table').first());

    // Demo instance often lands on a Part Category "details" panel first.
    // This link switches the inner panel to the actual Parts list.
    this.partCategoryPanel = page.locator('[aria-label="partcategory"]').first();
    this.categoryPanelPartsLink = page
      .locator('a[href*="/web/part/category/index/details/parts"]')
      .or(this.partCategoryPanel.locator('a[href*="/web/part/category/index/details/parts"]'))
      .or(this.partCategoryPanel.getByRole('link', { name: /^parts$/i }))
      .or(this.partCategoryPanel.getByRole('button', { name: /^parts$/i }))
      .or(this.partCategoryPanel.getByText(/^parts$/i))
      .first();

    this.partsGridReady = page.getByText(/^IPN$/).or(page.getByText(/^Revision$/)).or(page.locator('table')).first();

    // Demo breadcrumb action menu contains create actions.
    this.breadcrumbActionButton = page.locator('button[aria-label="nav-breadcrumb-action"]').first();
  }

  async waitForReady() {
    // Self-healing "ready": switch to Parts list panel and validate by grid presence.
    await this.page.waitForLoadState('domcontentloaded');

    // Attempt #1: click inner "Parts" panel link if visible.
    if (await this.categoryPanelPartsLink.isVisible().catch(() => false)) {
      await this.categoryPanelPartsLink.click({ force: true }).catch(() => {});
      await this.page.waitForLoadState('networkidle');
    } else {
      // Attempt #2: click the left-panel "Parts" entry by text (exclude the top nav by picking later match).
      const leftPanelParts = this.page.getByText(/^Parts$/).nth(1);
      if (await leftPanelParts.isVisible().catch(() => false)) {
        await leftPanelParts.click().catch(() => {});
        await this.page.waitForLoadState('networkidle');
      }
    }

    // Attempt #3: direct navigation (some builds ignore it, but it's cheap)
    if (!(await this.partsTable.isVisible().catch(() => false))) {
      await this.page.goto('/web/part/category/index/details/parts').catch(() => {});
      await this.page.waitForLoadState('networkidle');
    }

    await this.partsGridReady.waitFor({ state: 'visible', timeout: 30_000 });
  }

  async openCreatePart() {
    const createPartMenuItem = this.page
      .locator('button[aria-label="action-menu-add-parts-create-part"]')
      .or(this.page.getByRole('menuitem', { name: /create part/i }))
      .or(this.page.getByRole('button', { name: /create part/i }))
      .or(this.page.getByText(/^create part$/i))
      .first();
    const createDialog = this.page
      .getByRole('dialog')
      .filter({ hasText: /create part|add part|new part/i })
      .first();
    const addPartsMenuTrigger = this.page
      .locator('button[aria-label="action-menu-add-parts"], button[aria-label*="add-parts" i]')
      // Demo UI: "+" dropdown button
      .or(
        this.page
          .locator('button:has(svg.tabler-icon-plus), [role="button"]:has(svg.tabler-icon-plus)')
          .filter({ hasNot: this.page.locator('[disabled],[aria-disabled="true"]') })
      )
      .first();
    const createFormNameField = this.page
      .getByLabel(/^name/i)
      .or(this.page.getByRole('textbox', { name: /^name/i }))
      .or(this.page.getByPlaceholder(/name/i))
      .or(this.page.locator('input[name="name"], input#id_name, input[placeholder*="name" i]'))
      .first();
    const isCreateFormOpen = async () =>
      (await createDialog.isVisible().catch(() => false)) ||
      (await createFormNameField.isVisible().catch(() => false));

    for (let attempt = 1; attempt <= 3; attempt++) {
      // 1) Go to a stable Parts listing URL (avoid "/web/part" redirecting to last visited part)
      await this.page.goto('/web/part/category/index/parts/parts').catch(async () => this.page.goto('/web/part'));
      await this.page.waitForLoadState('networkidle');

      // 2) Switch to inner "Parts" panel (table view)
      if (await this.categoryPanelPartsLink.isVisible().catch(() => false)) {
        await this.categoryPanelPartsLink.click({ force: true }).catch(() => {});
        await this.page.waitForLoadState('networkidle');
      }

      // 3) Open "+" menu and click "Create Part"
      // Wait for the "+" trigger (SVG provided: tabler-icon-plus) to appear on the parts table view
      await addPartsMenuTrigger.waitFor({ state: 'visible', timeout: 15_000 }).catch(() => {});
      if (await addPartsMenuTrigger.isVisible().catch(() => false)) {
        await addPartsMenuTrigger.click().catch(() => {});
      }

      // Some builds render the menu item only after opening the dropdown
      await createPartMenuItem.waitFor({ state: 'visible', timeout: 15_000 }).catch(() => {});
      if (await createPartMenuItem.isVisible().catch(() => false)) {
        await createPartMenuItem.click().catch(() => {});
      }

      await this.page.waitForLoadState('networkidle');

      // Success condition: Create form is open
      if (await isCreateFormOpen()) {
        return;
      }
    }

    // If a modal is already open, don't try to click anything behind it.
    if (await isCreateFormOpen()) {
      return;
    }

    // Fallback A: try a generic enabled create/add/new button.
    const createAnyEnabled = this.page.getByRole('button', { name: /create|add|new/i }).filter({ hasNot: this.page.locator('[disabled]') }).first();
    if (await createAnyEnabled.isVisible().catch(() => false)) {
      await createAnyEnabled.click({ force: true });
      // If this opened a dropdown, select the actual "Create Part" entry.
      const createPartItem = this.page
        // Demo DOM (deterministic)
        .locator('button[aria-label="action-menu-add-parts-create-part"]')
        .or(this.page.getByRole('menuitem', { name: /create part/i }))
        .or(this.page.getByRole('button', { name: /create part/i }))
        .or(this.page.getByText(/^create part$/i));

      if (await createPartItem.first().isVisible().catch(() => false)) {
        await createPartItem.first().click({ timeout: 15_000 });
        await this.page.waitForLoadState('networkidle');
        await createDialog.waitFor({ state: 'visible', timeout: 30_000 }).catch(() => {});
        await createFormNameField.waitFor({ state: 'visible', timeout: 30_000 }).catch(() => {});
        return;
      }
    }

    // Fallback B: open breadcrumb action menu then click "Create Part"
    if (await this.breadcrumbActionButton.isVisible().catch(() => false)) {
      await this.breadcrumbActionButton.click();
      // Popovers/menus in the demo UI are not always exposed as role=menuitem,
      // so prefer a text-based click with broad fallbacks.
      const createItem = this.page
        .locator('button[aria-label="action-menu-add-parts-create-part"]')
        .or(this.page.locator('button[aria-label*="create-part" i]'))
        .or(this.page.getByText(/create part|new part|add part/i, { exact: false }))
        .or(this.page.getByRole('menuitem', { name: /create part|new part|add part/i }))
        .or(this.page.getByRole('button', { name: /create part|new part|add part/i }))
        .or(this.page.getByRole('link', { name: /create part|new part|add part/i }));

      await createItem.first().waitFor({ state: 'visible', timeout: 15_000 });
      await createItem.first().click({ timeout: 15_000 });
      await this.page.waitForLoadState('networkidle');
      await createDialog.waitFor({ state: 'visible', timeout: 30_000 }).catch(() => {});
      await createFormNameField.waitFor({ state: 'visible', timeout: 30_000 }).catch(() => {});
      return;
    }

    throw new Error('Could not open Create Part form after retries (demo navigation/locators).');
  }

  async searchFor(text) {
    const box = this.searchBox.first();
    await box.waitFor({ state: 'visible' });
    await box.fill(text);
    await box.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  async openPartFromResults(partName) {
    const safe = partName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Demo table often renders the part name as plain text inside a row, not an ARIA link.
    const row = this.partsTable.locator('tr', { hasText: partName }).first();
    await row.waitFor({ state: 'visible', timeout: 30_000 });

    const linkInRow = row.getByRole('link', { name: new RegExp(safe) }).first();
    if (await linkInRow.isVisible().catch(() => false)) {
      await linkInRow.click();
    } else {
      await row.getByText(new RegExp(safe)).first().click();
    }
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = { PartsPage };

