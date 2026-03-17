# API Automation Scripts – Change History

---

## Purpose

This document tracks changes, enhancements, and fixes applied to the AI-generated API automation scripts in this folder. It helps maintain traceability and maintainability.

---

## Change History


| Date       | Script/File Name | Change Description                                                  | Reason for Change / Notes                                                                                     |
| ---------- | ---------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| 16/03/2026 | requirements.txt | Added missing dependencies for `pytest-html`                        | To enable generation of HTML test reports                                                                     |
| 16/03/2026 | `__init__.py`    | Added this file inside automation/api and tests folder              | To resolve error "from . import config E ImportError: attempted relative import with no known parent package" |
| 16/03/2026 | conftest.py      | Added fixture to generate authentication token for all API requests | AI-generated version lacked global auth fixture                                                               |
| 16/03/2026 | conftest.py      | Added fixture to generate html report                               | To include reporting structure                                                                                |
| 16/03/2026 | conftest.py      | Added custom markers                                                | AI generated scripts had custom markers which caused warnings during execution                                |
| 16/03/2026 | config.py        | Updated BASE_URL and API Token                                      | Aligning scripts with local environment and making them executable                                            |


---

## Notes / Remarks

- Scripts are based on AI-generated templates from Cursor.  
- Modifications were mainly for:  
  - Improving code readability and reuse  
  - Integrating authentication and environment configurations  
  - Making the scripts executable in the local environment

---

## Limitations
- Some AI-generated automation scripts are still failing and have not been fixed due to time constraints.  
- These failing scripts may require further debugging and adjustment to align with the actual API behavior.  
- Certain edge cases or negative test scenarios may not be fully covered yet.  
- This change history does not track minor cosmetic or non-critical improvements made to the scripts.

