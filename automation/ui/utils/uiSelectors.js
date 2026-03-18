/**
 * Central place to define preferred, stable selectors (data-testid) for the app.
 *
 * If your InvenTree build exposes `data-testid` attributes, fill these in.
 * The POMs will prefer `page.getByTestId(...)` when provided, and fall back to
 * role/text/CSS locators otherwise.
 */
const UI_TESTIDS = {
  // Navigation
  // Demo DOM example:
  // <a ... href="https://demo.inventree.org/web/part/category/index/parts/parts">Parts</a>
  // Use a CSS selector (preferred) when no data-testid exists.
  navPartsLink: 'css=a[href="https://demo.inventree.org/web/part/category/index/parts/parts"]',

  // These fields are not used because the data-testid attributes or any stable selectors are not present in the DOM.
  // Parts list
  partsCreateButton: '',
  partsSearchBox: '',
  partsTable: '',

  // Create / Edit part forms
  partNameInput: '',
  partDescriptionInput: '',
  partIpnInput: '',
  partCategoryInput: '',
  partSubmitButton: '',

  // Part detail
  partActionsButton: '',
  partEditButton: '',
  partDeleteButton: '',
  confirmDeleteButton: '',

  // Tabs
  tabParameters: '',
  tabStock: '',

  // Parameters
  addParameterButton: '',

  // Stock
  addStockButton: '',
};

module.exports = { UI_TESTIDS };

