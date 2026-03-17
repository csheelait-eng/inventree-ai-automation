# Part Detail — Build Orders Tab Test Cases

## TC-BO-001 · Build Orders tab visible only on Assembly parts

| Field | Value |
|---|---|
| **Test Case ID** | TC-BO-001 |
| **Title** | Build Orders tab is present on Assembly parts and absent on non-assembly parts |
| **Priority** | High |
| **Type** | Positive |

**Preconditions**
- One Assembly part and one standard Component part exist.

**Steps**

| # | Action |
|---|---|
| 1 | Open Assembly Part Detail — observe tab bar |
| 2 | Open Component Part Detail — observe tab bar |

**Expected Result**
- Build Orders tab is visible on the Assembly part.
- Build Orders tab is absent on the Component part.

---

## TC-BO-002 · Build Orders tab lists all builds for the assembly

| Field | Value |
|---|---|
| **Test Case ID** | TC-BO-002 |
| **Title** | Build Orders tab shows quantity, status, and dates for each build |
| **Priority** | High |
| **Type** | Positive |

**Preconditions**
- An Assembly part has at least two build orders (one pending, one complete).

**Steps**

| # | Action |
|---|---|
| 1 | Navigate to Assembly Part Detail > **Build Orders** tab |
| 2 | Observe the table contents |

**Expected Result**
- Each row shows build reference, quantity, status, creation date, and completion date.
- Both pending and completed builds are listed.

---

## TC-BO-003 · Create a new Build Order from the Build Orders tab

| Field | Value |
|---|---|
| **Test Case ID** | TC-BO-003 |
| **Title** | Initiate a new build order directly from the part's Build Orders tab |
| **Priority** | Medium |
| **Type** | Positive |

**Preconditions**
- An Assembly part exists with a validated BOM.

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | Navigate to Assembly Part Detail > **Build Orders** tab | — |
| 2 | Click **New Build Order** | — |
| 3 | Enter quantity and reference | Quantity: `10`, Ref: `BO-TEST-001` |
| 4 | Click **Submit** | — |

**Expected Result**
- New build order appears in the Build Orders tab table.
- Build status is set to **Pending**.
