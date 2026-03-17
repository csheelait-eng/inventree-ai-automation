# Import Part Creation — Test Cases

## TC-IC-001 · Import parts from CSV with valid mapped fields

| Field | Value |
|---|---|
| **Test Case ID** | TC-IC-001 |
| **Title** | Import parts from a valid CSV file using the import wizard |
| **Priority** | High |
| **Type** | Positive |

**Preconditions**
- User is logged in with staff permissions.
- Part import is enabled in Part Settings.
- A valid CSV file is prepared with columns: `name`, `description`, `category`.

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | Navigate to the Part List view | — |
| 2 | Click the **Import from File** button | — |
| 3 | Upload the prepared CSV file | `parts_import.csv` (10 rows) |
| 4 | On the field mapping step, map columns to InvenTree fields | `name → Name`, `description → Description`, `category → Category` |
| 5 | Confirm mappings and proceed | — |
| 6 | Process the import | — |

**Expected Result**
- Import session reports 10 parts created.
- All 10 parts appear in the Part List under the specified categories.
- No error rows are reported.

---

## TC-IC-002 · Auto-mapping of matching column headers

| Field | Value |
|---|---|
| **Test Case ID** | TC-IC-002 |
| **Title** | Verify auto-mapping when CSV headers match InvenTree field names exactly |
| **Priority** | Medium |
| **Type** | Positive |

**Preconditions**
- User has staff permissions.
- Part import is enabled.
- CSV file uses column headers: `name`, `description`, `IPN`, `keywords`.

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | Navigate to Part List and click **Import from File** | — |
| 2 | Upload CSV with exact InvenTree field-name headers | `exact_headers.csv` |
| 3 | Observe the field mapping step | — |
| 4 | Submit without altering mappings | — |

**Expected Result**
- Import wizard pre-fills all recognised column mappings automatically.
- After processing, each part is created with correct Name, Description, IPN, and Keywords.

---

## TC-IC-003 · Import CSV referencing a non-existent category

| Field | Value |
|---|---|
| **Test Case ID** | TC-IC-003 |
| **Title** | Import fails gracefully when category does not exist |
| **Priority** | High |
| **Type** | Negative |

**Preconditions**
- User has staff permissions.
- CSV contains a `category` column with a category name that does not exist in InvenTree.

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | Prepare CSV with a non-existent category value | `category = "NonExistentCategory"` |
| 2 | Upload via Import wizard and map fields | — |
| 3 | Process the import | — |

**Expected Result**
- Affected rows produce a row-level error: *PartCategory matching query does not exist*.
- No parts are created for those rows.
- Valid rows (if any) are imported successfully.

---

## TC-IC-004 · Non-staff user cannot access the import feature

| Field | Value |
|---|---|
| **Test Case ID** | TC-IC-004 |
| **Title** | Import button is not available to non-staff users |
| **Priority** | Medium |
| **Type** | Negative |

**Preconditions**
- A user account without staff status exists.

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | Log in as a non-staff user | — |
| 2 | Navigate to the Part List view | — |
| 3 | Observe the toolbar for the Import button | — |

**Expected Result**
- The **Import from File** button is not visible or is disabled.
- Navigating directly to the import URL returns an access-denied response.
