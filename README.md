# AI-Assisted Test Automation Framework – InvenTree
--- 

## Overview

This repository contains an AI-assisted test automation solution for the InvenTree platform, covering both:
- API Automation (pytest + requests)
- UI Automation (Playwright with JavaScript)

The solution demonstrates a scalable, maintainable, and enterprise-grade automation framework, generated and refined using AI agents.

---

## Project Structure

inventree-test-automation/
│
├── agents/
│   ├── api/                          # Prompts for API test case & automation generation
│   ├── ui/                           # Prompts for UI test case & automation generation
│   └── agent-configuration.md        # AI agent setup and orchestration strategy
│
├── automation/
│   │
│   ├── docs/
│   │   ├── limitations.md            # Known limitations and constraints
│   │   └── tool-selection-justification.md  # Framework and tool selection rationale
│   │
│   ├── api/
│   │   ├── tests/                   # API test scripts
│   │   ├── conftest.py              # Fixtures (auth, setup, reporting)
│   │   ├── config.py                # Base URL, token, environment config
│   │   ├── requirements.txt         # Python dependencies
│   │   ├── change_history.md        # API automation changes and enhancements
│   │   └── reports/                 # API execution reports (HTML)
│   │
│   ├── ui/
│   │   ├── tests/                   # Playwright test scripts
│   │   ├── pages/                   # Page Object Model (POM)
│   │   ├── utils/                   # Reusable helpers and utilities
│   │   ├── reports/                 # UI execution reports and screenshots
│   │   ├── playwright.config.js     # Playwright configuration (includes env fallback)
│   │   ├── package.json             # Node dependencies
│   │   ├── .env                     # Environment variables (credentials/config)
│   │   └── change_history.md        # UI automation changes and enhancements
│
├── test-cases/
│   ├── api-manual-tests/            # API manual test cases
│   │   └── overview/                # API schema analysis and test index
│   │
│   └── ui-manual-tests/             # UI manual test cases
│
├── video/                           # End-to-end execution demo recordings
│
├── docker-compose.yaml              # InvenTree service setup
├── start-inventree.ps1              # Optional setup script for local execution
├── README.md
│
└──

--- 

## Docs Folder (Key Highlight)

The **automation/docs/** folder contains supporting documentation that ensures transparency, traceability, and clarity of the automation solution:

- Limitations
    - Documents known issues such as:
        - Unstable UI selectors
        - Failing automation scenarios
        - Environment constraints

- Tool Selection Justification
    - Explains the rationale behind:
        - API framework choice (pytest + requests)
        - UI framework choice (Playwright)
    - Covers scalability, maintainability, and industry relevance

--- 

## Key Features

- AI-assisted automation using Cursor and Claude
- Modular and scalable framework design
- Support for both API and UI automation
- Cross-functional workflow coverage
- HTML reporting with execution insights
- Reusable components (fixtures, utilities, configs)

--- 

## Environment Handling

UI automation supports dynamic environment execution:

- Local: http://localhost:8000
- Fallback: https://demo.inventree.org

If the local UI is unavailable, tests automatically run against the demo environment.

--- 

## How to Run

### API Tests
> cd automation/api
pip install -r requirements.txt

#### Start InvenTree (if running locally):
>./start-inventree.ps1  # Optional setup script
docker compose up   # Start InvenTree server

#### Run tests:
> pytest

### UI Tests
#### Prerequisites
- Node.js 18+

#### Run 
> cd automation/ui
npm install
npx playwright test

--- 

## Reporting

- **API**: HTML reports via pytest-html
- **UI**: Playwright HTML reports

Reports are generated under:
> automation/api/reports/
> automation/ui/reports/

--- 

## AI Agent Usage

Automation scripts were generated using:
- Claude → Manual test case generation
- Cursor → Automation script generation

Detailed configuration is available in:
> agents/agent-configuration.md

---

## Limitations

- Some test cases may fail due to:
    - Dynamic UI behavior
    - Lack of stable selectors (`data-testid`, meaningful IDs)
    - Environment inconsistencies
- Certain API/UI scenarios were not fully stabilized due to time constraints
Refer:
> automation/docs/limitations.md

--- 

## Design Highlights
- Multi-agent AI approach (Claude + Cursor)
- Environment-resilient UI automation (local → demo fallback)
- Modular and scalable framework design
- Clear separation of concerns (tests, pages, utils, configs)
- Transparent handling of limitations and constraints

---

## Conclusion

This project demonstrates a **practical implementation of AI-assisted automation**, combining:

- Strong test design
- Scalable framework architecture
- Real-world constraint handling

The solution is **execution-ready**, with clear areas identified for further stabilization and enhancement.

--- 