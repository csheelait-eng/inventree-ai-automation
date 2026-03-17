# Negative & Boundary Tests — Inactive Part Restrictions Test Cases

## TC-INR-001 · Inactive part cannot be added to a Sales Order

| Field | Value |
|---|---|
| **Test Case ID** | TC-INR-001 |
| **Title** | An inactive part is excluded from the Sales Order line item part selection |
| **Priority** | High |
| **Type** | Negative |

**Preconditions**
- An inactive part exists that is marked as Salable.
- A Sales Order exists in pending state.

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | Navigate to the pending Sales Order | — |
| 2 | Click **Add Line Item** | — |
| 3 | Search for the inactive part by name | Inactive part name |

**Expected Result**
- The inactive part does not appear in the search results.
- Only active, salable parts are selectable.

---

## TC-INR-002 · Inactive part cannot be added to a Purchase Order

| Field | Value |
|---|---|
| **Test Case ID** | TC-INR-002 |
| **Title** | An inactive part is excluded from Purchase Order line item selection |
| **Priority** | High |
| **Type** | Negative |

**Preconditions**
- An inactive part exists that was previously purchaseable.
- A Purchase Order exists in pending state.

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | Navigate to the pending Purchase Order | — |
| 2 | Click **Add Line Item** | — |
| 3 | Search for the inactive part by name | Inactive part name |

**Expected Result**
- Inactive part does not appear in the part selection dropdown.
- User cannot place a purchase order line for the inactive part.

---

## TC-INR-003 · Inactive part cannot be used as a BOM component

| Field | Value |
|---|---|
| **Test Case ID** | TC-INR-003 |
| **Title** | An inactive part cannot be added as a BOM line item on an assembly |
| **Priority** | High |
| **Type** | Negative |

**Preconditions**
- An inactive Component part exists.
- An Assembly part with an editable BOM exists.

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | Navigate to Assembly Part > **BOM** tab | — |
| 2 | Click **Add BOM Item** | — |
| 3 | Search for the inactive component | Inactive part name |

**Expected Result**
- The inactive part does not appear in the component search results.
- Only active parts with the Component flag are selectable.

---

## TC-INR-004 · Inactive part detail page shows clear inactive status indicator

| Field | Value |
|---|---|
| **Test Case ID** | TC-INR-004 |
| **Title** | An inactive part's detail page displays a visible inactive badge or warning |
| **Priority** | Medium |
| **Type** | Positive |

**Preconditions**
- An inactive part exists.

**Steps**

| # | Action |
|---|---|
| 1 | Navigate directly to the inactive part's Detail page URL |
| 2 | Observe the part header and status indicators |

**Expected Result**
- A clear visual indicator (e.g. "Inactive" badge, greyed header, warning banner) is shown.
- The part is accessible for viewing but all create/order actions are disabled or absent.
