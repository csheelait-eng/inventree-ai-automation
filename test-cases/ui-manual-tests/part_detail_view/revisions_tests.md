# Part Detail — Revisions Tab Test Cases

## TC-RV-001 · Revisions tab shows all revisions of a part

| Field | Value |
|---|---|
| **Test Case ID** | TC-RV-001 |
| **Title** | Revisions tab lists all revision parts linked to the original |
| **Priority** | High |
| **Type** | Positive |

**Preconditions**
- A part exists with two revisions (e.g. Rev A and Rev B).
- "Enable Revisions" is enabled in InvenTree Settings.

**Steps**

| # | Action |
|---|---|
| 1 | Navigate to the original Part Detail page |
| 2 | Click the **Revisions** tab |

**Expected Result**
- Both revision entries (Rev A, Rev B) are listed in the table.
- Each row shows the revision code and a link to the revision part.

---

## TC-RV-002 · Create a revision from the Revisions tab

| Field | Value |
|---|---|
| **Test Case ID** | TC-RV-002 |
| **Title** | Create a new revision from the Revisions tab |
| **Priority** | High |
| **Type** | Positive |

**Preconditions**
- A part exists without any revisions.
- "Enable Revisions" is on.

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | Navigate to Part Detail > **Revisions** tab | — |
| 2 | Click **New Revision** (or duplicate + set Revision Of) | — |
| 3 | Set the revision code | `A` |
| 4 | Click **Submit** | — |

**Expected Result**
- A new part is created with Revision field = `A` and **Revision Of** pointing to the original.
- Browser redirects to the new revision's Part Detail page.
- Original part's Revisions tab lists Rev A.
