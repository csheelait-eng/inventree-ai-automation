# Part Detail — BOM Tab Test Cases

## TC-BOM-001 · BOM tab visible only on Assembly parts

| Field | Value |
|---|---|
| **Test Case ID** | TC-BOM-001 |
| **Title** | BOM tab is shown for Assembly parts and hidden for non-Assembly parts |
| **Priority** | High |
| **Type** | Positive |

**Preconditions**
- One part exists with the Assembly flag enabled.
- One part exists without the Assembly flag.

**Steps**

| # | Action |
|---|---|
| 1 | Navigate to the Assembly part's Detail page |
| 2 | Observe the tab bar |
| 3 | Navigate to the non-Assembly part's Detail page |
| 4 | Observe the tab bar |

**Expected Result**
- **BOM** tab is visible on the Assembly part.
- **BOM** tab is absent on the non-Assembly part.

---

## TC-BOM-002 · Add a BOM line item manually

| Field | Value |
|---|---|
| **Test Case ID** | TC-BOM-002 |
| **Title** | Manually add a component to an assembly's BOM |
| **Priority** | High |
| **Type** | Positive |

**Preconditions**
- An Assembly part exists.
- At least one other part (component) exists.

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | Navigate to Assembly Part Detail > **BOM** tab | — |
| 2 | Click the **Edit BOM** icon, then **Add BOM Item** | — |
| 3 | Select the component part | `Resistor 10K` |
| 4 | Set quantity | `4` |
| 5 | Click **Submit** | — |

**Expected Result**
- The new BOM line item appears in the BOM table showing part name and quantity 4.
- BOM validation status changes to **Not Validated** (checksum recalculated).

---

## TC-BOM-003 · Validate BOM after editing

| Field | Value |
|---|---|
| **Test Case ID** | TC-BOM-003 |
| **Title** | BOM can be validated after changes are made |
| **Priority** | Medium |
| **Type** | Positive |

**Preconditions**
- An Assembly part with at least one BOM line item in an unvalidated state.

**Steps**

| # | Action |
|---|---|
| 1 | Navigate to Assembly Part Detail > **BOM** tab |
| 2 | Confirm status shows **Not Validated** |
| 3 | Click the **Validate BOM** button and confirm |

**Expected Result**
- BOM status changes to **Validated**.
- Validation timestamp or indicator is updated.

---

## TC-BOM-004 · Import BOM from CSV file

| Field | Value |
|---|---|
| **Test Case ID** | TC-BOM-004 |
| **Title** | Upload a BOM file to populate an assembly's BOM |
| **Priority** | Medium |
| **Type** | Positive |

**Preconditions**
- An Assembly part with an empty BOM.
- A CSV BOM file prepared with columns: `part`, `quantity`.

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | Navigate to Assembly Part Detail > **BOM** tab | — |
| 2 | Click the **Import BOM Data** icon | — |
| 3 | Upload the CSV file | `bom_import.csv` |
| 4 | Map fields and process | — |

**Expected Result**
- BOM line items from the CSV appear in the BOM table.
- BOM is marked as Not Validated (pending re-validation).
