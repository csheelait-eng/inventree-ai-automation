# Part Detail — Related Parts Tab Test Cases

## TC-RP-001 · Add a related part link

| Field | Value |
|---|---|
| **Test Case ID** | TC-RP-001 |
| **Title** | Link two parts as related using the Related Parts section |
| **Priority** | Medium |
| **Type** | Positive |

**Preconditions**
- At least two parts exist.
- Related Parts feature is enabled in global Part Settings.

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | Navigate to Part Detail > **Part** tab (Related Parts section) | — |
| 2 | Click **Add Related Part** | — |
| 3 | Search for and select the related part | `Capacitor 100nF` |
| 4 | Submit | — |

**Expected Result**
- The related part appears in the Related Parts table on both parts' detail pages (relationship is bidirectional).

---

## TC-RP-002 · Related Parts section hidden when feature is disabled

| Field | Value |
|---|---|
| **Test Case ID** | TC-RP-002 |
| **Title** | Related Parts section is not shown when disabled in settings |
| **Priority** | Medium |
| **Type** | Negative |

**Preconditions**
- Related Parts feature is **disabled** in global Part Settings.

**Steps**

| # | Action |
|---|---|
| 1 | Navigate to any Part Detail page |
| 2 | Look for the Related Parts table in the Part tab |

**Expected Result**
- The Related Parts section/table is not visible on the Part Detail page.

---

## TC-RP-003 · Remove a related part link

| Field | Value |
|---|---|
| **Test Case ID** | TC-RP-003 |
| **Title** | Delete an existing related part link |
| **Priority** | Low |
| **Type** | Positive |

**Preconditions**
- A part has at least one related part already linked.

**Steps**

| # | Action |
|---|---|
| 1 | Navigate to Part Detail > Related Parts section |
| 2 | Click the **Delete** icon next to the related part |
| 3 | Confirm deletion |

**Expected Result**
- The related part is removed from the table on both parts.
