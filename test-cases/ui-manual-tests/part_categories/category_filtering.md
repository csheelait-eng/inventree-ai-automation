# Part Categories — Filtering Test Cases

## TC-CF-001 · Filter parts list within a category

| Field | Value |
|---|---|
| **Test Case ID** | TC-CF-001 |
| **Title** | Apply a text filter to the part list within a category |
| **Priority** | High |
| **Type** | Positive |

**Preconditions**
- A category contains at least 5 parts with varying names (e.g. `Resistor 10K`, `Resistor 22K`, `Capacitor 100nF`).

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | Navigate to the category containing the parts | `Passives` |
| 2 | Open the table filter menu | — |
| 3 | Enter a text filter on the Name column | `Resistor` |
| 4 | Apply the filter | — |

**Expected Result**
- Only parts whose names contain "Resistor" are shown.
- `Capacitor 100nF` is excluded from the results.
- Filter indicator is visible on the column header.

---

## TC-CF-002 · Filter persists across browser sessions

| Field | Value |
|---|---|
| **Test Case ID** | TC-CF-002 |
| **Title** | Table filter settings are saved and restored on next visit |
| **Priority** | Medium |
| **Type** | Positive |

**Preconditions**
- A category with multiple parts exists.

**Steps**

| # | Action |
|---|---|
| 1 | Navigate to a category and apply a filter (e.g. Active = true) |
| 2 | Navigate away to another page |
| 3 | Return to the same category page |

**Expected Result**
- The previously applied filter is still active.
- Filtered results are re-applied automatically.

---

## TC-CF-003 · Filter with no matching results shows empty state

| Field | Value |
|---|---|
| **Test Case ID** | TC-CF-003 |
| **Title** | Filtering by a value that matches no parts shows an empty table |
| **Priority** | Medium |
| **Type** | Negative |

**Preconditions**
- A category with several parts exists.

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | Navigate to the category | — |
| 2 | Apply a filter with a value that no part matches | Name contains: `xyznonexistent` |

**Expected Result**
- Table shows a "no results" / empty state message.
- No error is thrown.
