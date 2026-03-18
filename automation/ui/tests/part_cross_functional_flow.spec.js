const { test, expect } = require('./_fixtures');
const { AppNav } = require('../pages/AppNav');
const { PartsPage } = require('../pages/PartsPage');
const { PartCreateForm } = require('../pages/PartCreateForm');
const { PartDetailPage } = require('../pages/PartDetailPage');
const { PartCategoriesPage } = require('../pages/PartCategoriesPage');
const { partFactory, uniqueSuffix } = require('../utils/testData');

test.describe('Parts - Cross-functional end-to-end flow', () => {
  test('Create part → add parameter → create stock → verify in category view', async ({ page }) => {
    // Manual references:
    // - part creation: test-cases/ui-manual-tests/part_creation/manual_part_creation.md (TC-MC-001)
    // - parameters:    test-cases/ui-manual-tests/part_detail_view/parameters_tests.md (TC-PM-001)
    // - stock:         test-cases/ui-manual-tests/part_detail_view/stock_tests.md (TC-ST-002)
    // - category view: test-cases/ui-manual-tests/part_categories/category_filtering.md (visibility expectation)

    const part = partFactory({ categoryPath: ['Mechanical'] });
    const parameterTemplate = process.env.UI_PARAMETER_TEMPLATE || 'Resistance';
    // Demo template "Resistance" expects a numeric value (ohms)
    const parameterValue = String(10_000 + Number(uniqueSuffix().slice(-3)));
    const stockLocation = process.env.UI_STOCK_LOCATION || 'Bin A1';
    const stockQty = 25;

    const nav = new AppNav(page);
    const partsPage = new PartsPage(page);
    const createForm = new PartCreateForm(page);
    const detail = new PartDetailPage(page);
    const categories = new PartCategoriesPage(page);

    await test.step('Create a new part', async () => {
      await nav.gotoHome();
      await nav.gotoParts();
      await partsPage.waitForReady();

      await partsPage.openCreatePart();
      await createForm.waitForOpen();
      await createForm.fillRequired(part);
      await createForm.fillOptional({ ipn: part.ipn });
      await createForm.submitForm();

      await detail.expectOnPart(part.name);
      await expect(page.getByText(part.description).first()).toBeVisible();
    });

    await test.step('Add a parameter on Parameters tab', async () => {
      await detail.openParametersTab();
      await detail.addParameter({ templateName: parameterTemplate, value: parameterValue });
      await detail.expectParameterRow({ templateName: parameterTemplate, value: parameterValue });
    });

    await test.step('Create stock item on Stock tab', async () => {
      await detail.openStockTab();
      await detail.addStock({ quantity: stockQty, locationName: stockLocation });
      await detail.expectStockRow({ quantity: stockQty, locationName: stockLocation });
    });

    await test.step('Verify part appears in its category view', async () => {
      await categories.goto();
      await categories.openCategoryByName(part.categoryPath[part.categoryPath.length - 1]);
      await categories.expectPartVisible(part.name);
    });

    await test.step('Cleanup: delete the created part', async () => {
      await nav.gotoParts();
      await partsPage.waitForReady();
      await partsPage.searchFor(part.name);
      await partsPage.openPartFromResults(part.name);
      await detail.expectOnPart(part.name);
      await detail.deletePart();
    });
  });
});

