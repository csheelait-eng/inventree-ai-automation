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
│ ├── api/ # Prompts for API test case & automation generation  
│ ├── ui/ # Prompts for UI test case & automation generation  
│ └── [agent-configuration.md](https://github.com/csheelait-eng/inventree-ai-automation/blob/main/agents/agent_configuration.md) # AI agent setup and orchestration strategy  
│  
├── automation/  
│ ├── docs/  
│ │ ├── [limitations.md](https://github.com/csheelait-eng/inventree-ai-automation/blob/main/automation/docs/limitations.md) # Known limitations and constraints  
│ │ └── [tool-selection-justification.md](https://github.com/csheelait-eng/inventree-ai-automation/blob/main/automation/docs/tool-selection-justification.md) # Framework and tool selection rationale  
│ │  
│ ├── api/  
│ │ ├── tests/ # API test scripts  
│ │ ├── [conftest.py](https://github.com/csheelait-eng/inventree-ai-automation/blob/main/automation/api/conftest.py) # Fixtures (auth, setup, reporting)  
│ │ ├── [config.py](https://github.com/csheelait-eng/inventree-ai-automation/blob/main/automation/api/config.py) # Base URL, token, environment config  
│ │ ├── requirements.txt # Python dependencies  
│ │ ├── [change_history.md](https://github.com/csheelait-eng/inventree-ai-automation/blob/main/automation/api/change_history.md) # API automation changes and enhancements  
│ │ └── reports/ # API execution reports (HTML)  
│ │  
│ ├── ui/  
│ │ ├── tests/ # Playwright test scripts  
│ │ ├── pages/ # Page Object Model (POM)  
│ │ ├── utils/ # Reusable helpers and utilities  
│ │ ├── reports/ # UI execution reports and screenshots  
│ │ ├── playwright.config.js # Playwright configuration (env fallback enabled)  
│ │ ├── package.json # Node dependencies  
│ │ ├── .env # Environment variables (credentials/config)  
│ │ └── [change_history.md](https://github.com/csheelait-eng/inventree-ai-automation/blob/main/automation/ui/change_history.md) # UI automation changes and enhancements  
│  
├── test-cases/  
│ ├── api-manual-tests/ # API manual test cases  
│ │ └── overview/ # API schema analysis and test index  
│ │  
│ └── ui-manual-tests/ # UI manual test cases  
│  
├── video/ # Demo video links (cloud-hosted)  
│  
├── docker-compose.yaml  # InvenTree service setup  
├── start-inventree.ps1 # Optional setup script  
├── [README.md](https://github.com/csheelait-eng/inventree-ai-automation/blob/main/README.md)

---

## Docs Folder (Key Highlight)

The `automation/docs/` folder provides **supporting documentation** to ensure transparency and traceability:

- **Limitations**
  - Unstable UI selectors  
  - Failing scenarios  
  - Environment constraints
- **Tool Selection Justification**
  - Rationale for pytest + requests (API)  
  - Rationale for Playwright (UI)  
  - Focus on scalability and maintainability

---

## Key Features

- AI-assisted automation using Cursor and Claude  
- Modular and scalable framework design  
- Coverage for both API and UI layers  
- Cross-functional workflow validation  
- HTML reporting with execution insights  
- Reusable components (fixtures, utilities, configs)

---

## Environment Handling

UI automation includes **dynamic environment fallback**:

- **Primary:** [http://localhost:8000](http://localhost:8000)  
- **Fallback:** [https://demo.inventree.org](https://demo.inventree.org)

If the local environment is unavailable, tests automatically run against the demo environment.

---

## How to Run

### API Tests

```bash
cd automation/api
pip install -r requirements.txt
```

#### Start InvenTree (if running locally):

```bash
./start-inventree.ps1  # Optional setup script
docker compose up   # Start InvenTree server
```

#### Run tests:

```bash
pytest
```

---

### UI Tests

#### Prerequisites

- Node.js 18+

#### Run

```bash
cd automation/ui
npm install
npx playwright test
```

---

## Reporting

- **API**: HTML reports via pytest-html
- **UI**: Playwright HTML reports

Reports are generated under:

automation/api/reports/  
automation/ui/reports/

---

## 🎥 Demo Videos

All phase-wise execution videos are hosted externally:

👉 [https://drive.google.com/drive/folders/1V5KzVZaBr-a2oaQ7TflOPvQZpggWFznI?usp=drive_link](https://drive.google.com/drive/folders/1V5KzVZaBr-a2oaQ7TflOPvQZpggWFznI?usp=drive_link).

---

## AI Agent Usage

Automation scripts were generated using:

- Claude → Manual test case generation
- Cursor → Automation script generation

Detailed configuration is available in:

> agents/agent-configuration.md

---

## Key Engineering Decisions

- Environment fallback ensures execution resilience
- Manual → Automation traceability via `test-cases/`
- Modular framework design (POM, fixtures, utils)
- Transparent documentation of limitations

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

```

```

