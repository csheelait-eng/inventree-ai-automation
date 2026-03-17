# Part Revisions — Revision Creation Test Cases

## TC-RC-001 · Create a revision from an existing part

| Field | Value |
|---|---|
| **Test Case ID** | TC-RC-001 |
| **Title** | Duplicate a part and assign a revision code to create a formal revision |
| **Priority** | High |
| **Type** | Positive |

**Preconditions**
- "Enable Part Revisions" is enabled in InvenTree Part Settings.
- A base part exists (e.g. `Control PCB`).

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | Navigate to the base Part Detail page | `Control PCB` |
| 2 | Click **Revisions** tab | — |
| 3 | Click **New Revision** | — |
| 4 | Set the revision code | `A` |
| 5 | Click **Submit** | — |

**Expected Result**
- A new part `Control PCB` (Rev A) is created.
- The **Revision Of** field on the new part points to `Control PCB`.
- The original part's Revisions tab lists Rev A.
- The revision code `A` is displayed in the part header.

---

## TC-RC-002 · Revision inherits original part's name and category

| Field | Value |
|---|---|
| **Test Case ID** | TC-RC-002 |
| **Title** | A newly created revision shares the name and category of the original part |
| **Priority** | Medium |
| **Type** | Positive |

**Preconditions**
- A base part `Sensor Module` in category `PCBs` exists.
- "Enable Part Revisions" is on.

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | From `Sensor Module` Revisions tab, click **New Revision** | — |
| 2 | Set revision code | `B` |
| 3 | Do not change name or category | — |
| 4 | Submit | — |
| 5 | Open the new revision's Part Detail | — |

**Expected Result**
- Name is `Sensor Module`, category is `PCBs`.
- Revision field shows `B`.
- **Revision Of** links to the original `Sensor Module`.

---

## TC-RC-003 · Latest revision indicator is shown on part list

| Field | Value |
|---|---|
| **Test Case ID** | TC-RC-003 |
| **Title** | The most recent revision is visually distinguished in the revisions list |
| **Priority** | Low |
| **Type** | Positive |

**Preconditions**
- A base part has two revisions: Rev A and Rev B.

**Steps**

| # | Action |
|---|---|
| 1 | Navigate to the base part's Revisions tab |
| 2 | Observe the listed revisions |

**Expected Result**
- Rev B (the latest) is shown with an indicator marking it as the most recent revision.

---

## TC-RC-004 · Revision creation is blocked when revisions setting is disabled

| Field | Value |
|---|---|
| **Test Case ID** | TC-RC-004 |
| **Title** | The Revisions tab and New Revision action are not available when the setting is off |
| **Priority** | Medium |
| **Type** | Negative |

**Preconditions**
- "Enable Part Revisions" is **disabled** in Part Settings.

**Steps**

| # | Action |
|---|---|
| 1 | Navigate to any Part Detail page |
| 2 | Observe the tab bar |

**Expected Result**
- The **Revisions** tab is not visible.
- No revision-related actions are available.
