# Part Categories — Parametric Tables Test Cases

## TC-PT-001 · Switch to parametric view within a category

| Field | Value |
|---|---|
| **Test Case ID** | TC-PT-001 |
| **Title** | Switch to parametric view and see parameter columns |
| **Priority** | High |
| **Type** | Positive |

**Preconditions**
- A category contains at least 3 parts, each with the same parameter template (e.g. `Resistance`).

**Steps**

| # | Action |
|---|---|
| 1 | Navigate to the `Resistors` category |
| 2 | Click the **Parameters** tab (or the Parametric View button above the table) |

**Expected Result**
- Table switches to parametric view showing one column per defined parameter (e.g. `Resistance`).
- Each part row displays its parameter values.

---

## TC-PT-002 · Sort parametric table by a parameter column

| Field | Value |
|---|---|
| **Test Case ID** | TC-PT-002 |
| **Title** | Clicking a parameter column header sorts parts by that parameter value |
| **Priority** | Medium |
| **Type** | Positive |

**Preconditions**
- Parametric view is active for a category with at least 3 parts having `Resistance` values (e.g. `10K`, `22K`, `100R`).

**Steps**

| # | Action |
|---|---|
| 1 | Click the `Resistance` column header once |
| 2 | Note the sort order |
| 3 | Click again to toggle sort direction |

**Expected Result**
- Parts sort by resistance value in ascending order on first click, descending on second.
- Unit conversion is respected (e.g. `100R < 10K < 22K`).

---

## TC-PT-003 · Filter parametric table by parameter value with range operator

| Field | Value |
|---|---|
| **Test Case ID** | TC-PT-003 |
| **Title** | Apply a numeric range filter to a parameter column |
| **Priority** | High |
| **Type** | Positive |

**Preconditions**
- Parametric view active for `Resistors` category with multiple parts.

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | In the parametric view, click the filter icon on the `Resistance` column | — |
| 2 | Add filter: Resistance `>` `10k` | — |
| 3 | Add second filter: Resistance `<` `100k` | — |
| 4 | Apply | — |

**Expected Result**
- Only parts with resistance between 10kΩ and 100kΩ (exclusive) are shown.
- Parts outside that range are hidden.
- Compatible unit input (e.g. entering `10000` instead of `10k`) produces identical results.

---

## TC-PT-004 · Parameter column absent when no parts in category have that parameter

| Field | Value |
|---|---|
| **Test Case ID** | TC-PT-004 |
| **Title** | A parameter column only appears if at least one part in the category has that parameter |
| **Priority** | Low |
| **Type** | Negative |

**Preconditions**
- A category contains parts none of which have a `Voltage` parameter set.

**Steps**

| # | Action |
|---|---|
| 1 | Navigate to the category and switch to parametric view |
| 2 | Observe whether a `Voltage` column appears |

**Expected Result**
- No `Voltage` column appears in the parametric table.
- Only parameters that exist on at least one part in the category are shown as columns.
