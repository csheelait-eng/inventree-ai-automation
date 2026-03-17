# Units of Measure — Configuration Test Cases

## TC-UOM-001 · Physical quantity parameter stores value with correct unit

| Field | Value |
|---|---|
| **Test Case ID** | TC-UOM-001 |
| **Title** | A parameter template with a physical unit stores and converts values correctly |
| **Priority** | High |
| **Type** | Positive |

**Preconditions**
- A parameter template `Resistance` exists with base unit `Ω`.
- A part exists in the `Resistors` category.
- "Enable part parameter units" is enabled in InvenTree settings.

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | Navigate to Part Detail > **Parameters** tab | — |
| 2 | Click **Add Parameter**, select `Resistance` | — |
| 3 | Enter value using an SI prefix | `10k` |
| 4 | Submit | — |
| 5 | Observe the stored value in the table | — |

**Expected Result**
- Value is accepted and stored.
- System normalises and displays the value with the correct SI prefix (e.g. `10 kΩ`).
- Parametric table sorts and filters by converted numeric value correctly.

---

## TC-UOM-002 · Part units field is enforced when stock is created

| Field | Value |
|---|---|
| **Test Case ID** | TC-UOM-002 |
| **Title** | Part with a defined unit accepts stock quantities in compatible units |
| **Priority** | High |
| **Type** | Positive |

**Preconditions**
- "Enable part units" is enabled in settings.
- A part exists with **Units** set to `m` (metres).

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | Navigate to Part Detail > **Stock** tab | — |
| 2 | Click **Add Stock** | — |
| 3 | Enter quantity in a compatible unit | `100 cm` |
| 4 | Submit | — |

**Expected Result**
- Stock item is created with the quantity normalised to the part's base unit (e.g. displayed as `1 m`).

---

## TC-UOM-003 · Incompatible unit type rejected on parameter entry

| Field | Value |
|---|---|
| **Test Case ID** | TC-UOM-003 |
| **Title** | Entering a value in an incompatible unit type for a parameter template is rejected |
| **Priority** | High |
| **Type** | Negative |

**Preconditions**
- A parameter template `Resistance` with base unit `Ω` exists.
- A part in the `Resistors` category exists.

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | Navigate to Part Detail > **Parameters** tab | — |
| 2 | Click **Add Parameter**, select `Resistance` | — |
| 3 | Enter a value with an incompatible unit | `10V` (volts, not ohms) |
| 4 | Submit | — |

**Expected Result**
- Validation error is shown indicating the unit `V` is incompatible with base unit `Ω`.
- Parameter is not saved.

---

## TC-UOM-004 · Part units field is optional and defaults to no unit

| Field | Value |
|---|---|
| **Test Case ID** | TC-UOM-004 |
| **Title** | Creating a part without specifying units works without errors |
| **Priority** | Medium |
| **Type** | Positive |

**Preconditions**
- "Enable part units" setting is enabled.

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | Open Create Part form | — |
| 2 | Fill required fields (Name, Description, Category) | — |
| 3 | Leave the **Units** field blank | — |
| 4 | Submit | — |

**Expected Result**
- Part is created without error.
- Units field shows empty / no unit on the Part Detail page.
- Stock quantities are entered as dimensionless numbers.
