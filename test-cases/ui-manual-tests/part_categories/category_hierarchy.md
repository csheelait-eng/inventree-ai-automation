# Part Categories — Hierarchy Test Cases

## TC-CH-001 · Create a nested sub-category

| Field | Value |
|---|---|
| **Test Case ID** | TC-CH-001 |
| **Title** | Create a sub-category under an existing parent category |
| **Priority** | High |
| **Type** | Positive |

**Preconditions**
- At least one root-level category exists (e.g. `Electronics`).
- User has staff permissions.

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | Navigate to the parent category `Electronics` | — |
| 2 | Click **New Category** | — |
| 3 | Enter category name and confirm parent | Name: `Passive Components`, Parent: `Electronics` |
| 4 | Submit | — |

**Expected Result**
- `Passive Components` appears as a sub-category under `Electronics`.
- Breadcrumb in the category view reflects the hierarchy: `Electronics > Passive Components`.

---

## TC-CH-002 · Parts in sub-categories appear in parent category view

| Field | Value |
|---|---|
| **Test Case ID** | TC-CH-002 |
| **Title** | A part in a child category is visible when browsing the parent category |
| **Priority** | High |
| **Type** | Positive |

**Preconditions**
- Category hierarchy: `Electronics > Passive Components > Resistors`.
- A part exists in `Resistors`.

**Steps**

| # | Action |
|---|---|
| 1 | Navigate to the `Electronics` category |
| 2 | Observe the parts list |
| 3 | Navigate to `Passive Components` — observe parts list |
| 4 | Navigate to `Resistors` — observe parts list |

**Expected Result**
- The resistor part is visible at all three levels of the hierarchy.
- Sub-category list is shown at each level.

---

## TC-CH-003 · Delete a category containing parts is prevented or warned

| Field | Value |
|---|---|
| **Test Case ID** | TC-CH-003 |
| **Title** | Deleting a category that contains parts is blocked or requires confirmation |
| **Priority** | Medium |
| **Type** | Negative |

**Preconditions**
- A category with at least one part assigned to it exists.

**Steps**

| # | Action |
|---|---|
| 1 | Navigate to the category detail page |
| 2 | Click **Delete Category** |
| 3 | Confirm the deletion dialog if prompted |

**Expected Result**
- Deletion is either blocked with an error, or a strong warning is displayed.
- If blocked: category is not deleted and parts remain intact.
