# Limitations and Known Issues
---

## Overview

Due to time and environment constraints, the current automation implementation has the following limitations. These do not impact the overall framework design but may affect execution stability in certain scenarios.

---
## 1. Environment Constraints

- Local InvenTree backend was successfully set up using Docker; however, the frontend was not available after pulling the latest image (`INVE-E1: No frontend included`).

- Due to this limitation, UI automation was executed against the demo environment.

- The demo environment may have:
    - Dynamic or inconsistent data
    - Uncontrolled state changes

---

## 2. UI Automation Limitations

- The demo environment does not consistently provide stable or test-friendly selectors (e.g., absence of `data-testid`, meaningful `id`, or `name` attributes).

- As a result, XPath and other less stable locators were used in some scenarios to ensure script execution.
- This may lead to:
    - Increased maintenance effort
    - Potential flakiness if the UI structure changes

---

## 3. Failing Test Cases

**UI Tests**

- Some UI tests may intermittently fail due to:
    - Dynamic DOM structure
    - Timing/rendering delays
    - Dependency on non-stable selectors

**API Tests**

- A few API test cases are currently failing.
- Due to time constraints, detailed root cause analysis and fixes could not be completed.
- These failures may be related to:
    - Data dependencies
    - Environment-specific responses
    - Incomplete validation handling

---

## 4. Framework Gaps

- Retry mechanism for flaky tests is not implemented
- Limited handling for dynamic test data
- Reporting setup is minimal and can be enhanced

---

## 5. Future Improvements

- Introduce stable selector strategy (prefer data-testid or accessibility-based locators)
- Replace XPath locators with robust Playwright selectors where possible
- Implement retry logic for flaky tests
- Add test data management and isolation
- Enhance API validation and error handling
- Integrate with CI/CD pipelines
- Improve reporting (e.g., Allure dashboards)

---

## 6. Repository Handling

- Runtime artifacts such as reports are intentionally included for evaluation purposes
- In a real-world setup, these would be excluded using `.gitignore` and managed via CI/CD pipelines

---

## Conclusion

The current implementation focuses on **core functionality, framework structure, and end-to-end flow coverage**. Identified limitations are primarily due to **environment constraints and time boundaries**, and can be addressed with further enhancements.

---
