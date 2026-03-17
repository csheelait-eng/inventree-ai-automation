# InvenTree Parts API — Test Suite Index

> **Schema source:** `https://docs.inventree.org/en/stable/api/schema/part/`
> **Total test cases:** 40

---

## File Map

```
test-cases/api-manual-tests/
├── overview/
│   ├── test_index.md              ← this file
│   └── schema_analysis.md         ← endpoints, fields, validation rules, relationships
├── part_crud_tests.md             ← 10 tests: GET list, POST, PATCH, PUT, DELETE, 404, conflict
├── category_crud_tests.md         ← 7 tests: category tree CRUD, invalid parent, 404
├── filtering_pagination_tests.md  ← 10 tests: category, cascade, search, boolean flags, IPN, pagination, ordering
├── field_validation_tests.md      ← 10 tests: required fields, max lengths, IPN uniqueness, link format, PUT 405
└── relational_integrity_tests.md  ← 13 tests: FK resolution, revisions, BOM self-ref, param units, auth, 403, malformed JSON
```

---

## All Test Cases

### Part CRUD (`part_crud_tests.md`)

| ID | Title | Method | Type |
|---|---|---|---|
| TC-CRUD-P-001 | List all parts — returns paginated envelope | GET | Positive |
| TC-CRUD-P-002 | Create part — required fields only | POST | Positive |
| TC-CRUD-P-003 | Create part — all writable fields populated | POST | Positive |
| TC-CRUD-P-004 | Retrieve a single part by PK | GET | Positive |
| TC-CRUD-P-005 | Partial update — change active status only | PATCH | Positive |
| TC-CRUD-P-006 | Full update — replace all writable fields | PUT | Positive |
| TC-CRUD-P-007 | Delete a part with no dependencies | DELETE | Positive |
| TC-CRUD-P-008 | Read-only fields supplied in body are silently ignored | POST | Positive |
| TC-CRUD-P-009 | Retrieve non-existent part returns 404 | GET | Negative |
| TC-CRUD-P-010 | Delete a part with existing stock items — blocked | DELETE | Negative |

---

### Part Categories CRUD (`category_crud_tests.md`)

| ID | Title | Method | Type |
|---|---|---|---|
| TC-CRUD-CAT-001 | List all categories — returns paginated list with tree metadata | GET | Positive |
| TC-CRUD-CAT-002 | Create a root-level category | POST | Positive |
| TC-CRUD-CAT-003 | Create a child category with parent reference | POST | Positive |
| TC-CRUD-CAT-004 | Rename a category — pathstring updates accordingly | PATCH | Positive |
| TC-CRUD-CAT-005 | Delete an empty category with no parts or children | DELETE | Positive |
| TC-CRUD-CAT-006 | Create category with non-existent parent PK — returns 400 | POST | Negative |
| TC-CRUD-CAT-007 | Retrieve non-existent category returns 404 | GET | Negative |

---

### Filtering, Pagination & Search (`filtering_pagination_tests.md`)

| ID | Title | Method | Type |
|---|---|---|---|
| TC-FILTER-001 | Filter parts by exact category PK | GET | Positive |
| TC-FILTER-002 | Filter by category with cascade includes sub-category parts | GET | Positive |
| TC-FILTER-003 | Full-text search across name, description, IPN, keywords | GET | Positive |
| TC-FILTER-004 | Combined boolean filters apply as logical AND | GET | Positive |
| TC-FILTER-005 | Exact IPN filter returns only the matching part | GET | Positive |
| TC-FILTER-006 | Pagination — first page of 5 results | GET | Positive |
| TC-FILTER-007 | Ordering by name descending | GET | Positive |
| TC-FILTER-008 | Search term with no matches returns empty results — not 404 | GET | Negative |
| TC-FILTER-009 | Offset beyond total count returns empty page gracefully | GET | Boundary |
| TC-FILTER-010 | List only root-level categories using empty parent filter | GET | Positive |

---

### Field Validation (`field_validation_tests.md`)

| ID | Title | Method | Type |
|---|---|---|---|
| TC-VAL-001 | Missing required field `name` returns 400 | POST | Negative |
| TC-VAL-002 | Blank `name` field returns 400 | POST | Negative |
| TC-VAL-003 | Missing required field `description` returns 400 | POST | Negative |
| TC-VAL-004 | `name` at exactly 100 characters is accepted | POST | Boundary |
| TC-VAL-005 | `name` at 101 characters is rejected | POST | Boundary |
| TC-VAL-006 | Duplicate IPN returns 400 when uniqueness is enforced | POST | Negative |
| TC-VAL-007 | `IPN` at 101 characters is rejected | POST | Boundary |
| TC-VAL-008 | Invalid URI in `link` field returns 400 | POST | Negative |
| TC-VAL-009 | Negative `minimum_stock` is rejected | POST | Boundary |
| TC-VAL-010 | PUT on a part parameter returns 405 — use PATCH | PUT | Negative |

---

### Relational Integrity & Edge Cases (`relational_integrity_tests.md`)

| ID | Title | Method | Type |
|---|---|---|---|
| TC-REL-001 | Part with valid category FK shows nested detail in GET | POST / GET | Positive |
| TC-REL-002 | Part with `category = null` is stored uncategorized | POST | Positive |
| TC-REL-003 | Create revision pointing to a valid base part | POST | Positive |
| TC-REL-004 | `revision_of` pointing to non-existent PK returns 400 | POST | Negative |
| TC-REL-005 | Setting `revision_of` to own PK is rejected — circular | PATCH | Negative |
| TC-REL-006 | Revision-of-a-revision is prevented (chain restriction) | POST | Negative |
| TC-REL-007 | `revision_of` targeting a template part is rejected | POST | Negative |
| TC-REL-008 | BOM item added with valid assembly and component parts | POST | Positive |
| TC-REL-009 | BOM item where `sub_part` equals `part` is rejected | POST | Negative |
| TC-REL-010 | Parameter value with incompatible unit is rejected | POST | Negative |
| TC-REL-011 | Unauthenticated request returns 401 | GET | Negative |
| TC-REL-012 | View-only user cannot create a part — returns 403 | POST | Negative |
| TC-REL-013 | Malformed JSON body returns 400 — no 500 | POST | Negative |

---

## Coverage Matrix

| Area | Total | Positive | Negative | Boundary |
|---|---|---|---|---|
| Parts CRUD | 10 | 8 | 2 | 0 |
| Categories CRUD | 7 | 5 | 2 | 0 |
| Filtering & Pagination | 10 | 8 | 1 | 1 |
| Field Validation | 10 | 1 | 5 | 4 |
| Relational Integrity | 13 | 3 | 10 | 0 |
| **Total** | **40** | **25** | **20** | **5** |

---

## Key Validation Rules Covered

| Constraint | Test IDs |
|---|---|
| `name` required, non-blank | VAL-001, VAL-002 |
| `description` required | VAL-003 |
| `name` maxLength 100 | VAL-004 (pass), VAL-005 (fail) |
| `IPN` maxLength 100 | VAL-007 |
| `IPN` uniqueness | VAL-006 |
| `link` URI format | VAL-008 |
| `minimum_stock` ≥ 0 | VAL-009 |
| Read-only fields ignored | CRUD-P-008 |
| `PUT` on parameter → 405 | VAL-010 |
| `revision_of` circular reference | REL-005 |
| Revision-of-revision chain | REL-006 |
| Revision targeting template | REL-007 |
| BOM self-reference | REL-009 |
| Parameter unit compatibility | REL-010 |
| Unauthenticated → 401 | REL-011 |
| Insufficient permissions → 403 | REL-012 |
| Malformed JSON → 400 (not 500) | REL-013 |
