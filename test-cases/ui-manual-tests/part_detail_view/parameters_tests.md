# Part Detail — Parameters Tab Test Cases

## TC-PM-001 · Add a parameter to a part

| Field | Value |
|---|---|
| **Test Case ID** | TC-PM-001 |
| **Title** | Add a parameter using an existing parameter template |
| **Priority** | High |
| **Type** | Positive |

**Preconditions**
- A part exists.
- A parameter template (e.g. "Resistance" with unit `Ω`) exists.

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | Navigate to Part Detail > **Parameters** tab | — |
| 2 | Click **Add Parameter** | — |
| 3 | Select the template from the dropdown | `Resistance` |
| 4 | Enter a value | `10k` |
| 5 | Click **Submit** | — |

**Expected Result**
- Parameter appears in the Parameters table with template name `Resistance` and value `10k`.
- System stores and displays the value correctly (unit conversion applied if needed).

---

## TC-PM-002 · Parameter value with incompatible unit is rejected

| Field | Value |
|---|---|
| **Test Case ID** | TC-PM-002 |
| **Title** | Adding a parameter value in an incompatible unit type is rejected |
| **Priority** | High |
| **Type** | Negative |

**Preconditions**
- A parameter template exists with a base unit of `Ω` (electrical resistance).

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | Navigate to Part Detail > **Parameters** tab | — |
| 2 | Click **Add Parameter**, select the `Resistance` template | — |
| 3 | Enter a value with an incompatible unit | `10kg` |
| 4 | Click **Submit** | — |

**Expected Result**
- An error is shown indicating the unit is incompatible with the template's base unit.
- Parameter is not saved.

---

## TC-PM-003 · Parameters from category template are auto-populated on part creation

| Field | Value |
|---|---|
| **Test Case ID** | TC-PM-003 |
| **Title** | Category-level parameter templates are copied to a new part in that category |
| **Priority** | Medium |
| **Type** | Positive |

**Preconditions**
- A part category has parameter templates defined (e.g. `Footprint`, `Package`).
- "Copy Category Parameters" option is available on the Create Part form.

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | Create a new part in the category that has parameter templates | Category: `Resistors` |
| 2 | Ensure **Copy Category Parameters** is checked | — |
| 3 | Submit the form | — |
| 4 | Open Part Detail > **Parameters** tab | — |

**Expected Result**
- Parameters defined on the category (`Footprint`, `Package`) appear in the part's Parameters tab with empty values ready to fill.

---

## TC-PM-004 · Edit an existing parameter value

| Field | Value |
|---|---|
| **Test Case ID** | TC-PM-004 |
| **Title** | Update a parameter value and confirm it persists |
| **Priority** | Medium |
| **Type** | Positive |

**Preconditions**
- A part has at least one parameter already set.

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | Navigate to Part Detail > **Parameters** tab | — |
| 2 | Click the **Edit** icon next to the parameter | — |
| 3 | Change the value | `22k` |
| 4 | Click **Submit** | — |

**Expected Result**
- The parameter row updates to show the new value `22k`.
- Change is persisted after page refresh.
