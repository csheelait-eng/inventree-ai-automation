# Part Attributes — Active / Inactive States Test Cases

## TC-AI-001 · Inactive part is excluded from default part list

| Field | Value |
|---|---|
| **Test Case ID** | TC-AI-001 |
| **Title** | An inactive part does not appear in the default part list view |
| **Priority** | High |
| **Type** | Positive |

**Preconditions**
- A part exists with the **Active** flag set to false (inactive).

**Steps**

| # | Action |
|---|---|
| 1 | Navigate to the main Part List view |
| 2 | Observe the default part list without any active/inactive filter |

**Expected Result**
- The inactive part is not shown in the default list.
- A filter or toggle (e.g. "Show Inactive") must be enabled explicitly to see it.

---

## TC-AI-002 · Inactive part is visible when the inactive filter is enabled

| Field | Value |
|---|---|
| **Test Case ID** | TC-AI-002 |
| **Title** | Inactive parts appear in the list when the filter includes inactive records |
| **Priority** | High |
| **Type** | Positive |

**Preconditions**
- At least one inactive part exists.

**Steps**

| # | Action |
|---|---|
| 1 | Navigate to the Part List view |
| 2 | Open the filter menu and set **Active** filter to `False` (or "Show Inactive") |
| 3 | Apply the filter |

**Expected Result**
- Inactive parts appear in the filtered table.
- Each inactive part row has a visual indicator (e.g. greyed out, badge) distinguishing it from active parts.

---

## TC-AI-003 · Inactive part cannot be added to a new Purchase Order

| Field | Value |
|---|---|
| **Test Case ID** | TC-AI-003 |
| **Title** | An inactive part is blocked from being added as a Purchase Order line item |
| **Priority** | High |
| **Type** | Negative |

**Preconditions**
- An inactive part exists that was previously purchaseable.
- A Purchase Order exists in pending state.

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | Navigate to the Purchase Order | — |
| 2 | Click **Add Line Item** | — |
| 3 | Search for the inactive part | Inactive part name |
| 4 | Attempt to select it | — |

**Expected Result**
- The inactive part does not appear in the search results for line item selection.
- A note or filter confirms only active parts are shown.

---

## TC-AI-004 · Deactivate an active part via Edit Part form

| Field | Value |
|---|---|
| **Test Case ID** | TC-AI-004 |
| **Title** | Setting the Active flag to false marks the part as inactive |
| **Priority** | Medium |
| **Type** | Positive |

**Preconditions**
- An active part exists.

**Steps**

| # | Action |
|---|---|
| 1 | Navigate to Part Detail and click **Edit Part** |
| 2 | Uncheck (disable) the **Active** toggle |
| 3 | Click **Submit** |
| 4 | Return to the Part Detail page |

**Expected Result**
- Part Detail page shows the Active status as inactive.
- Part disappears from the default Part List without the inactive filter enabled.
