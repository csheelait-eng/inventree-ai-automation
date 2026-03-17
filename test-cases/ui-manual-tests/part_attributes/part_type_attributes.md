# Part Attributes — Part Type Attributes Test Cases

## TC-PA-001 · Virtual flag hides stock-related actions

| Field | Value |
|---|---|
| **Test Case ID** | TC-PA-001 |
| **Title** | A Virtual part does not allow stock items to be created |
| **Priority** | High |
| **Type** | Negative |

**Preconditions**
- A part exists with the **Virtual** flag enabled.

**Steps**

| # | Action |
|---|---|
| 1 | Navigate to the Virtual part's Detail page |
| 2 | Open the **Stock** tab |
| 3 | Attempt to click **Add Stock** |

**Expected Result**
- The **Add Stock** button is absent or disabled.
- No stock items can be created for a Virtual part.

---

## TC-PA-002 · Assembly flag enables BOM and Build Orders tabs

| Field | Value |
|---|---|
| **Test Case ID** | TC-PA-002 |
| **Title** | Enabling Assembly flag makes BOM and Build Orders tabs appear |
| **Priority** | High |
| **Type** | Positive |

**Preconditions**
- A part exists with Assembly flag disabled.

**Steps**

| # | Action |
|---|---|
| 1 | Navigate to Part Detail and click **Edit Part** |
| 2 | Enable the **Assembly** flag and save |
| 3 | Return to the Part Detail page and inspect tabs |

**Expected Result**
- **BOM** and **Build Orders** tabs are now visible.
- Previously absent tabs appear without page reload required beyond the save redirect.

---

## TC-PA-003 · Component flag controls BOM usage

| Field | Value |
|---|---|
| **Test Case ID** | TC-PA-003 |
| **Title** | A part with Component disabled cannot be added as a BOM line item |
| **Priority** | High |
| **Type** | Negative |

**Preconditions**
- A part exists with the **Component** flag disabled.
- An Assembly part with an editable BOM exists.

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | Navigate to Assembly Part > **BOM** tab | — |
| 2 | Click **Add BOM Item** | — |
| 3 | Search for the non-component part | Part name of non-component part |
| 4 | Attempt to select it | — |

**Expected Result**
- The non-component part does not appear in the BOM part selection dropdown.
- Only parts with the Component flag are selectable.

---

## TC-PA-004 · Trackable part requires serial numbers for stock operations

| Field | Value |
|---|---|
| **Test Case ID** | TC-PA-004 |
| **Title** | Adding stock to a Trackable part requires serial number entry |
| **Priority** | High |
| **Type** | Positive |

**Preconditions**
- A part exists with the **Trackable** flag enabled.

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | Navigate to Trackable Part Detail > **Stock** tab | — |
| 2 | Click **Add Stock** | — |
| 3 | Enter quantity | `3` |
| 4 | Observe whether serial number input is required | — |
| 5 | Enter serial numbers and submit | `SN-001, SN-002, SN-003` |

**Expected Result**
- Serial number input is required (form does not submit without serial numbers).
- Three individual serialized stock items are created, one per serial number.

---

## TC-PA-005 · Purchaseable flag controls supplier part link availability

| Field | Value |
|---|---|
| **Test Case ID** | TC-PA-005 |
| **Title** | A non-purchaseable part cannot have supplier parts added |
| **Priority** | Medium |
| **Type** | Negative |

**Preconditions**
- A part exists with **Purchaseable** flag disabled.

**Steps**

| # | Action |
|---|---|
| 1 | Navigate to the Part Detail page |
| 2 | Check for the **Suppliers** tab or section |

**Expected Result**
- The **Suppliers** tab is absent or the **Add Supplier Part** action is disabled/hidden.

---

## TC-PA-006 · Salable flag controls sales order line item availability

| Field | Value |
|---|---|
| **Test Case ID** | TC-PA-006 |
| **Title** | A non-salable part cannot be added to a Sales Order |
| **Priority** | Medium |
| **Type** | Negative |

**Preconditions**
- A part exists with **Salable** flag disabled.
- A Sales Order exists in pending state.

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | Navigate to the Sales Order line items | — |
| 2 | Click **Add Line Item** | — |
| 3 | Search for the non-salable part | Non-salable part name |
| 4 | Attempt to select it | — |

**Expected Result**
- The non-salable part does not appear in the part selection for sales order line items.

---

## TC-PA-007 · Template flag makes Variants tab visible and disables stock creation directly

| Field | Value |
|---|---|
| **Test Case ID** | TC-PA-007 |
| **Title** | Template part shows Variants tab; stock is managed through variants not the template |
| **Priority** | High |
| **Type** | Positive |

**Preconditions**
- A part with the **Template** flag enabled exists.

**Steps**

| # | Action |
|---|---|
| 1 | Navigate to the Template part's Detail page |
| 2 | Observe the tab bar |
| 3 | Check whether stock can be added directly to the template part |

**Expected Result**
- **Variants** tab is visible.
- Stock management is handled through variant parts, not the template itself (Add Stock is absent or blocked on the template).
