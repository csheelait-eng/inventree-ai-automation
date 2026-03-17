# Part Detail — Test Templates Tab Test Cases

## TC-TT-001 · Test Templates tab visible only on Testable parts

| Field | Value |
|---|---|
| **Test Case ID** | TC-TT-001 |
| **Title** | Test Templates tab is present only when a part has the Testable flag enabled |
| **Priority** | High |
| **Type** | Positive |

**Preconditions**
- One part with **Testable** flag enabled.
- One part with Testable flag disabled.

**Steps**

| # | Action |
|---|---|
| 1 | Open the Testable part's Detail page — observe tab bar |
| 2 | Open the non-Testable part's Detail page — observe tab bar |

**Expected Result**
- **Test Templates** tab is visible for the Testable part.
- Tab is absent for the non-Testable part.

---

## TC-TT-002 · Create a test template for a testable part

| Field | Value |
|---|---|
| **Test Case ID** | TC-TT-002 |
| **Title** | Add a test template definition to a testable part |
| **Priority** | High |
| **Type** | Positive |

**Preconditions**
- A part with the Testable flag exists.

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | Navigate to Part Detail > **Test Templates** tab | — |
| 2 | Click **Add Test Template** | — |
| 3 | Enter test name, description, and mark as required | Name: `Continuity Test`, Required: `Yes` |
| 4 | Submit | — |

**Expected Result**
- Test template appears in the table with name and required status.
- Test results can now be recorded against stock items of this part.

---

## TC-TT-003 · Test template without a name is rejected

| Field | Value |
|---|---|
| **Test Case ID** | TC-TT-003 |
| **Title** | Submitting a test template with a blank name shows a validation error |
| **Priority** | Medium |
| **Type** | Negative |

**Preconditions**
- A Testable part exists.

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | Navigate to Part Detail > **Test Templates** tab | — |
| 2 | Click **Add Test Template** | — |
| 3 | Leave the test name blank | — |
| 4 | Click **Submit** | — |

**Expected Result**
- Validation error shown on the name field.
- Template is not created.
