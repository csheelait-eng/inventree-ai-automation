# Filtering, Pagination & Search — API Test Cases

**Endpoint:** `GET /api/part/` (unless noted)

---

## TC-FILTER-001

| Field | Value |
|---|---|
| **Test Case ID** | TC-FILTER-001 |
| **Endpoint** | `GET /api/part/?category=3` |
| **HTTP Method** | GET |
| **Title** | Filter parts by exact category PK |
| **Preconditions** | Category `pk=3` contains 5 parts. Category `pk=4` contains 2 unrelated parts. Valid auth token. |
| **Request Payload** | *(none)* |
| **Expected Status Code** | `200 OK` |
| **Expected Response** | `count = 5`. All results have `category = 3`. No results from category `pk=4`. |
| **Type** | Positive |

---

## TC-FILTER-002

| Field | Value |
|---|---|
| **Test Case ID** | TC-FILTER-002 |
| **Endpoint** | `GET /api/part/?category=1&cascade=true` |
| **HTTP Method** | GET |
| **Title** | Filter by category with cascade includes sub-category parts |
| **Preconditions** | Parent category `pk=1` has 2 direct parts. It has two child categories (`pk=2`, `pk=3`) containing 3 and 4 parts respectively. Valid auth token. |
| **Request Payload** | *(none)* |
| **Expected Status Code** | `200 OK` |
| **Expected Response** | `count = 9` (2 + 3 + 4). Contrast: `GET /api/part/?category=1` without `cascade=true` returns `count = 2`. |
| **Type** | Positive |

---

## TC-FILTER-003

| Field | Value |
|---|---|
| **Test Case ID** | TC-FILTER-003 |
| **Endpoint** | `GET /api/part/?search=capacitor` |
| **HTTP Method** | GET |
| **Title** | Full-text search returns parts matching across name, description, IPN, keywords |
| **Preconditions** | Parts exist with "capacitor" in their name or description. Valid auth token. |
| **Request Payload** | *(none)* |
| **Expected Status Code** | `200 OK` |
| **Expected Response** | `count ≥ 1`. Every result contains `"capacitor"` (case-insensitive) in at least one of: `name`, `description`, `IPN`, `keywords`. |
| **Type** | Positive |

---

## TC-FILTER-004

| Field | Value |
|---|---|
| **Test Case ID** | TC-FILTER-004 |
| **Endpoint** | `GET /api/part/?active=true&assembly=true` |
| **HTTP Method** | GET |
| **Title** | Combined boolean filters apply as logical AND |
| **Preconditions** | Parts exist with various combinations of active/assembly flags. Valid auth token. |
| **Request Payload** | *(none)* |
| **Expected Status Code** | `200 OK` |
| **Expected Response** | Every result has `active = true` AND `assembly = true`. Parts that are inactive or non-assembly are absent. |
| **Type** | Positive |

---

## TC-FILTER-005

| Field | Value |
|---|---|
| **Test Case ID** | TC-FILTER-005 |
| **Endpoint** | `GET /api/part/?IPN=RES-10K-0805` |
| **HTTP Method** | GET |
| **Title** | Exact IPN filter returns only the matching part |
| **Preconditions** | Exactly one part with `IPN = "RES-10K-0805"` exists. Valid auth token. |
| **Request Payload** | *(none)* |
| **Expected Status Code** | `200 OK` |
| **Expected Response** | `count = 1`. Result `IPN = "RES-10K-0805"`. |
| **Type** | Positive |

---

## TC-FILTER-006

| Field | Value |
|---|---|
| **Test Case ID** | TC-FILTER-006 |
| **Endpoint** | `GET /api/part/?limit=5&offset=0` |
| **HTTP Method** | GET |
| **Title** | Pagination — first page of 5 results |
| **Preconditions** | More than 5 parts exist. Valid auth token. |
| **Request Payload** | *(none)* |
| **Expected Status Code** | `200 OK` |
| **Expected Response** | `results` array length = 5. `next` URL contains `offset=5`. `previous = null`. `count` = total number of parts (integer > 5). |
| **Type** | Positive |

---

## TC-FILTER-007

| Field | Value |
|---|---|
| **Test Case ID** | TC-FILTER-007 |
| **Endpoint** | `GET /api/part/?ordering=-name` |
| **HTTP Method** | GET |
| **Title** | Ordering by name descending |
| **Preconditions** | At least 3 parts with different names exist. Valid auth token. |
| **Request Payload** | *(none)* |
| **Expected Status Code** | `200 OK` |
| **Expected Response** | Results are sorted reverse-alphabetically by `name` (Z → A). |
| **Type** | Positive |

---

## TC-FILTER-008

| Field | Value |
|---|---|
| **Test Case ID** | TC-FILTER-008 |
| **Endpoint** | `GET /api/part/?search=xyznonexistentpart123` |
| **HTTP Method** | GET |
| **Title** | Search term with no matches returns empty results — not 404 |
| **Preconditions** | No part has this string in any searchable field. Valid auth token. |
| **Request Payload** | *(none)* |
| **Expected Status Code** | `200 OK` |
| **Expected Response** | `count = 0`. `results = []`. `next = null`. `previous = null`. |
| **Type** | Negative |

---

## TC-FILTER-009

| Field | Value |
|---|---|
| **Test Case ID** | TC-FILTER-009 |
| **Endpoint** | `GET /api/part/?limit=10&offset=99999` |
| **HTTP Method** | GET |
| **Title** | Offset beyond total count returns empty page gracefully |
| **Preconditions** | Fewer than 99999 parts exist. Valid auth token. |
| **Request Payload** | *(none)* |
| **Expected Status Code** | `200 OK` |
| **Expected Response** | `results = []`. `next = null`. `previous` is non-null (points back to a valid page). `count` = total part count (not 0). |
| **Type** | Boundary |

---

## TC-FILTER-010

| Field | Value |
|---|---|
| **Test Case ID** | TC-FILTER-010 |
| **Endpoint** | `GET /api/part/category/?parent=` |
| **HTTP Method** | GET |
| **Title** | List only root-level categories using empty parent filter |
| **Preconditions** | Mix of root and child categories exists. Valid auth token. |
| **Request Payload** | *(none)* |
| **Expected Status Code** | `200 OK` |
| **Expected Response** | All results have `parent = null` and `level = 0`. Child categories are absent. |
| **Type** | Positive |
