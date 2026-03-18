/**
 * Selector helpers that prefer stable data-testid selectors when available.
 */
const { UI_TESTIDS } = require('./uiSelectors');

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} selectorOrTestId
 * @param {import('@playwright/test').Locator} fallback
 */
function byTestIdOr(page, selectorOrTestId, fallback) {
  const raw = (selectorOrTestId || '').trim();
  if (raw.length > 0) {
    // Support stable selector strings in addition to test ids:
    // - css=<selector>  -> page.locator(<selector>)
    // - xpath=<expr>    -> page.locator('xpath=<expr>')
    // - text=<text>     -> page.getByText(<text>)
    if (raw.toLowerCase().startsWith('css=')) {
      return page.locator(raw.slice(4));
    }
    if (raw.toLowerCase().startsWith('xpath=')) {
      return page.locator(raw);
    }
    if (raw.toLowerCase().startsWith('text=')) {
      return page.getByText(raw.slice(5));
    }

    // Default: interpret as data-testid value.
    return page.getByTestId(raw);
  }
  return fallback;
}

module.exports = {
  UI_TESTIDS,
  byTestIdOr,
};

