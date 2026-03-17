# Part Detail — Stock Tab Test Cases

## TC-ST-001 · Stock tab displays stock items and total quantity

| Field | Value |
|---|---|
| **Test Case ID** | TC-ST-001 |
| **Title** | Stock tab shows all stock items with location and status |
| **Priority** | High |
| **Type** | Positive |

**Preconditions**
- A part exists with at least two stock items in different locations.

**Steps**

| # | Action |
|---|---|
| 1 | Navigate to the Part Detail page |
| 2 | Click the **Stock** tab |
| 3 | Observe the stock table |

**Expected Result**
- Each stock item row shows: quantity, location, status, and batch/serial number if trackable.
- The total in-stock quantity displayed at the top matches the sum of all stock item quantities.

---

## TC-ST-002 · Add new stock item from Stock tab

| Field | Value |
|---|---|
| **Test Case ID** | TC-ST-002 |
| **Title** | Create a new stock item directly from the Stock tab |
| **Priority** | High |
| **Type** | Positive |

**Preconditions**
- Part exists and is active.
- At least one stock location exists.

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | Navigate to the Part Detail > **Stock** tab | — |
| 2 | Click the **Add Stock** (new stock item) button | — |
| 3 | Enter quantity and select a location | Quantity: `25`, Location: `Bin A1` |
| 4 | Click **Submit** | — |

**Expected Result**
- New stock item appears in the table with quantity 25 at Bin A1.
- Total in-stock count updates accordingly.

---

## TC-ST-003 · Stock tab is visible for all part types

| Field | Value |
|---|---|
| **Test Case ID** | TC-ST-003 |
| **Title** | Stock tab is always present regardless of part flags |
| **Priority** | Medium |
| **Type** | Positive |

**Preconditions**
- Parts exist with varying flags: Assembly, Virtual, Component.

**Steps**

| # | Action |
|---|---|
| 1 | Open a standard Component part — check for Stock tab |
| 2 | Open an Assembly part — check for Stock tab |
| 3 | Open a Virtual part — check for Stock tab |

**Expected Result**
- The Stock tab is visible on all three Part Detail pages.

---

## TC-ST-004 · Export stocktake data from Stock tab

| Field | Value |
|---|---|
| **Test Case ID** | TC-ST-004 |
| **Title** | Export stock data from the Stock tab download action |
| **Priority** | Low |
| **Type** | Positive |

**Preconditions**
- Part has at least one stock item.

**Steps**

| # | Action |
|---|---|
| 1 | Navigate to Part Detail > **Stock** tab |
| 2 | Click the **Export** (stocktake) button |
| 3 | Select CSV format and confirm |

**Expected Result**
- A CSV file is downloaded containing stock item data for this part.
- File contains at least columns for quantity, location, and status.
