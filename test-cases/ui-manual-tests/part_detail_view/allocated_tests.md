# Part Detail — Allocated Tab Test Cases

## TC-AL-001 · Allocated tab shows parts allocated to build orders

| Field | Value |
|---|---|
| **Test Case ID** | TC-AL-001 |
| **Title** | Allocated tab displays stock allocated to active build orders |
| **Priority** | High |
| **Type** | Positive |

**Preconditions**
- A component part exists.
- An active Build Order exists that allocates stock from this part.

**Steps**

| # | Action |
|---|---|
| 1 | Navigate to the component Part Detail page |
| 2 | Click the **Allocated** tab (or "Used In" / allocation section) |

**Expected Result**
- The table shows the build order reference, allocated quantity, and remaining required quantity.
- Quantities match the allocation recorded in the Build Order.

---

## TC-AL-002 · Allocated tab shows zero allocation when no build orders exist

| Field | Value |
|---|---|
| **Test Case ID** | TC-AL-002 |
| **Title** | Allocated tab displays empty state when no allocations are present |
| **Priority** | Medium |
| **Type** | Positive |

**Preconditions**
- A part exists with no active build or sales order allocations.

**Steps**

| # | Action |
|---|---|
| 1 | Navigate to Part Detail page |
| 2 | Click the **Allocated** tab |

**Expected Result**
- Table is empty or shows a "no results" message.
- No errors are thrown.

---

## TC-AL-003 · Allocated quantity updates after build order allocation is removed

| Field | Value |
|---|---|
| **Test Case ID** | TC-AL-003 |
| **Title** | Allocated count decreases when a build order allocation is deallocated |
| **Priority** | Medium |
| **Type** | Positive |

**Preconditions**
- A component part has stock allocated to a build order.

**Steps**

| # | Action |
|---|---|
| 1 | Note the allocated quantity on the Allocated tab |
| 2 | Navigate to the associated Build Order and remove the allocation |
| 3 | Return to the Part Detail > Allocated tab |

**Expected Result**
- The removed allocation no longer appears in the table.
- Total allocated quantity is updated to reflect the removal.
