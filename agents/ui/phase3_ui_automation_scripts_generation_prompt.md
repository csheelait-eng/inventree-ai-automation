# Phase 3 – UI Automation Script Generation Prompt

---

## AI Agent Used : Cursor

### Reason for Choosing Cursor

Cursor was selected for this phase because it is highly effective at:

- Translating manual UI test cases into executable automation scripts
- Generating end-to-end UI workflows with proper assertions
- Producing maintainable, reusable, and modular test code
- Integrating generated scripts directly into structured project folders

For the InvenTree UI automation, Cursor is ideal because it can:

- Convert structured manual test cases (from Claude) into UI automation scripts
- Implement complete user workflows (CRUD and cross-functional flows)
- Generate Playwright-based scripts with appropriate waits and assertions
- Ensure scalable, readable, and maintainable automation structure

---

## Purpose:

The purpose of this prompt is to:

- Generate UI automation scripts for InvenTree based on structured manual test cases
- Automate core UI workflows across the application
- Validate:
  - CRUD operations (Create, Read, Update, Delete)
  - UI elements, navigation, and page transitions
  - Form behavior, validations, and error handling
  - Cross-functional workflows (e.g., Part → Parameters → Stock → Category view)
  - Authentication and session handling
- Ensure robust handling of:
  - Dynamic elements
  - Asynchronous UI behavior
  - Page loading and synchronization
- Support environment-resilient execution by:
  - Prioritizing local InvenTree instance ([http://localhost:8000](http://localhost:8000))
  - Automatically falling back to demo environment ([https://demo.inventree.org](https://demo.inventree.org)) when local UI is unavailable
- Structure the automation framework for:
  - Reusability
  - Scalability
  - Maintainability

---

## Prompt:

You are a Senior UI Automation Engineer with expertise in Playwright and test framework design.

Your task is to implement a robust environment configuration for Playwright that supports automatic fallback from local to demo environment and to generate UI automation scripts for the InvenTree application using Playwright with JavaScript.

### Objective

Create or update automation/ui/playwright.config.js to:

- Use [http://localhost:8000](http://localhost:8000) as the primary base URL
- Automatically fallback to [https://demo.inventree.org](https://demo.inventree.org) if:
  - Local server is not running
  - Connection fails
  - UI is not accessible

### Input

Manual UI test cases are available at:

> test-cases/ui-manual-tests/

### Requirements

1. Fallback Logic

- Before tests run, check if:
  > [http://localhost:8000](http://localhost:8000)
  > is reachable
- If reachable → use local URL
- If NOT reachable → fallback to:
  > [https://demo.inventree.org](https://demo.inventree.org)

1. Implementation Details

- Use Node.js (fetch, axios, or http) to check server availability
- Implement a reusable async function:
  > async function getBaseURL()
- Perform:
  - HTTP GET request
  - Timeout handling (max 3–5 seconds)
  - Error handling

1. Config Integration

- Dynamically assign:
  > use: {
  > baseURL: resolvedURL
  > }
- Ensure:
  - Works with npx playwright test
  - No manual switching required

1. Logging (Important)

- Print clear logs in console:
- If local is used:
  > Using LOCAL environment: [http://localhost:8000](http://localhost:8000)
- If fallback happens:
  > Local not available. Falling back to DEMO: [https://demo.inventree.org](https://demo.inventree.org)

1. Cross-Browser Setup

Include projects for:

- Chromium
- Firefox
- WebKit

1. Additional Config

- Enable:
  - Screenshots on failure
  - Trace on retry
  - HTML reporting
- Store reports in:
  > automation/ui/reports/

1. Code Quality

- Use modern JavaScript (ES6+)
- Use async/await properly
- Add meaningful comments
- Handle all edge cases (timeouts, network failure)
- Keep code clean and production-ready

### Output Expected

- Complete playwright.config.js file
- Ready to run without modification
- Includes fallback logic, logging, and reporting

