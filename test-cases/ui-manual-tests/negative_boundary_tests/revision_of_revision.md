# Negative & Boundary Tests — Revision-of-Revision Prevention Test Cases

## TC-ROR-001 · Setting "Revision Of" to a part that is itself a revision is rejected

| Field | Value |
|---|---|
| **Test Case ID** | TC-ROR-001 |
| **Title** | Chaining revisions (revision-of-a-revision) is blocked at the form level |
| **Priority** | High |
| **Type** | Negative |

**Preconditions**
- `Base Part` exists.
- `Base Part Rev A` exists as a revision of `Base Part` (Revision Of = Base Part).
- "Enable Part Revisions" is on.

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | Open the Create Part form | — |
| 2 | Fill Name, Description, Category | `Base Part Rev A Rev 1`, `Chained revision attempt`, `Any` |
| 3 | Set **Revision Of** to `Base Part Rev A` | — |
| 4 | Set a revision code | `1` |
| 5 | Click **Submit** | — |

**Expected Result**
- Form returns a validation error: the chosen "Revision Of" target is itself a revision and cannot be used as a base for further revisions.
- No new part is created.

---

## TC-ROR-002 · "Revision Of" dropdown excludes parts that are already revisions

| Field | Value |
|---|---|
| **Test Case ID** | TC-ROR-002 |
| **Title** | The "Revision Of" selector only offers parts that are not themselves revisions |
| **Priority** | High |
| **Type** | Negative |

**Preconditions**
- `Base Part` exists.
- `Base Part Rev A` exists (already a revision).

**Steps**

| # | Action |
|---|---|
| 1 | Open the Create Part form |
| 2 | Click on the **Revision Of** field |
| 3 | Search for `Base Part Rev A` in the selector |

**Expected Result**
- `Base Part Rev A` does not appear in the **Revision Of** dropdown.
- Only parts without a "Revision Of" value (i.e. non-revision parts) are listed as valid options.

---

## TC-ROR-003 · Setting "Revision Of" to a Template part is blocked

| Field | Value |
|---|---|
| **Test Case ID** | TC-ROR-003 |
| **Title** | Template parts cannot be the target of the "Revision Of" field |
| **Priority** | High |
| **Type** | Negative |

**Preconditions**
- A Template part `Widget Template` exists.

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | Open the Create Part form or Edit Part of an existing part | — |
| 2 | Set **Revision Of** to `Widget Template` | — |
| 3 | Set a revision code and submit | `A` |

**Expected Result**
- Validation error: Template parts cannot be the base for revisions.
- Part is not created / change is not saved.

---

## TC-ROR-004 · Existing revision cannot be re-assigned to a different base part

| Field | Value |
|---|---|
| **Test Case ID** | TC-ROR-004 |
| **Title** | Changing "Revision Of" on an existing revision to a different base part is blocked or warns |
| **Priority** | Medium |
| **Type** | Negative |

**Preconditions**
- `Part X Rev A` exists as a revision of `Part X`.
- `Part Y` exists as a separate base part.

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | Navigate to `Part X Rev A` and click **Edit Part** | — |
| 2 | Change **Revision Of** from `Part X` to `Part Y` | — |
| 3 | Click **Submit** | — |

**Expected Result**
- System either blocks the change with an error, or presents a strong warning requiring explicit confirmation.
- If blocked: `Part X Rev A` remains a revision of `Part X` only.
