# Part Revisions — Revision Constraints Test Cases

## TC-RCN-001 · Duplicate revision code on the same base part is rejected

| Field | Value |
|---|---|
| **Test Case ID** | TC-RCN-001 |
| **Title** | Creating a revision with a code already used by another revision of the same part is blocked |
| **Priority** | High |
| **Type** | Negative |

**Preconditions**
- A base part `Motor Driver` already has a revision with code `A`.
- "Enable Part Revisions" is on.

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | Navigate to `Motor Driver` Revisions tab | — |
| 2 | Click **New Revision** | — |
| 3 | Set the revision code to the already-used value | `A` |
| 4 | Click **Submit** | — |

**Expected Result**
- Validation error is returned: revision code `A` is already in use for this part.
- No new revision part is created.

---

## TC-RCN-002 · Circular revision reference is prevented

| Field | Value |
|---|---|
| **Test Case ID** | TC-RCN-002 |
| **Title** | Setting "Revision Of" to the part itself creates a circular reference and is blocked |
| **Priority** | High |
| **Type** | Negative |

**Preconditions**
- A revision part `Sensor Rev A` exists with "Revision Of" pointing to `Sensor`.

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | Navigate to the **Edit Part** form of `Sensor` | — |
| 2 | Set the **Revision Of** field to itself | `Sensor` |
| 3 | Click **Submit** | — |

**Expected Result**
- Error is shown: a part cannot be a revision of itself.
- The change is not saved.

---

## TC-RCN-003 · Template parts cannot be assigned as revisions

| Field | Value |
|---|---|
| **Test Case ID** | TC-RCN-003 |
| **Title** | Attempting to create a revision of a Template part is blocked |
| **Priority** | High |
| **Type** | Negative |

**Preconditions**
- A Template part exists (e.g. `Widget Template`).
- "Enable Part Revisions" is on.

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | Navigate to `Widget Template` Part Detail | — |
| 2 | Open Revisions tab | — |
| 3 | Attempt to click **New Revision** or set "Revision Of" on another part to `Widget Template` | — |
| 4 | Submit | — |

**Expected Result**
- Operation is blocked: template parts cannot have formal revisions.
- An error or disabled state prevents the action.

---

## TC-RCN-004 · Revision-of-a-revision is prevented

| Field | Value |
|---|---|
| **Test Case ID** | TC-RCN-004 |
| **Title** | A part that is already a revision cannot itself be set as "Revision Of" for another part |
| **Priority** | High |
| **Type** | Negative |

**Preconditions**
- `Part A` exists as the base part.
- `Part A Rev 1` exists as a revision of `Part A` (Revision Of = Part A).

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | Open the Create Part form for a new part | — |
| 2 | Set the **Revision Of** field to `Part A Rev 1` (which is itself a revision) | — |
| 3 | Set a revision code and submit | Revision: `2` |

**Expected Result**
- Validation error: the selected part is already a revision and cannot be used as a base part for further revisions.
- New part is not created as a chained revision.
