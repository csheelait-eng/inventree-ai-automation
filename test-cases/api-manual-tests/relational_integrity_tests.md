# Relational Integrity & Edge Cases — API Test Cases

---

## TC-REL-001

| Field | Value |
|---|---|
| **Test Case ID** | TC-REL-001 |
| **Endpoint** | `POST /api/part/` → `GET /api/part/{id}/` |
| **HTTP Method** | POST / GET |
| **Title** | Part created with valid category FK shows nested category detail in GET |
| **Preconditions** | Category `pk=3` (`name = "Resistors"`) exists. Valid auth token. |
| **Request Payload** | `{"name": "Resistor 47K", "description": "47kΩ 0402", "category": 3}` |
| **Expected Status Code** | `201 Created` / `200 OK` |
| **Expected Response** | POST: `category = 3`. GET on new PK: `category = 3`, `category_detail.pk = 3`, `category_name = "Resistors"`, `category_default_location` reflects category's default. |
| **Type** | Positive |

---

## TC-REL-002

| Field | Value |
|---|---|
| **Test Case ID** | TC-REL-002 |
| **Endpoint** | `POST /api/part/` |
| **HTTP Method** | POST |
| **Title** | Part created with `category = null` is stored uncategorized |
| **Preconditions** | Valid auth token. |
| **Request Payload** | `{"name": "Uncategorized Part", "description": "No category set", "category": null}` |
| **Expected Status Code** | `201 Created` |
| **Expected Response** | `category = null`. GET response: `category_detail = null`. Part appears in root-level part list. |
| **Type** | Positive |

---

## TC-REL-003

| Field | Value |
|---|---|
| **Test Case ID** | TC-REL-003 |
| **Endpoint** | `POST /api/part/` |
| **HTTP Method** | POST |
| **Title** | Create revision pointing to a valid base part |
| **Preconditions** | Base part `pk=10` (`name = "Sensor Module"`, `is_template = false`, `revision_of = null`) exists. `ENABLE_PART_REVISIONS = true`. Valid auth token. |
| **Request Payload** | `{"name": "Sensor Module", "description": "Hardware revision A", "revision": "A", "revision_of": 10, "category": 1}` |
| **Expected Status Code** | `201 Created` |
| **Expected Response** | `revision = "A"`. `revision_of = 10`. `full_name` contains `"A"` (e.g. `"Sensor Module [A]"`). Base part's revision list updated. |
| **Type** | Positive |

---

## TC-REL-004

| Field | Value |
|---|---|
| **Test Case ID** | TC-REL-004 |
| **Endpoint** | `POST /api/part/` |
| **HTTP Method** | POST |
| **Title** | `revision_of` pointing to a non-existent PK returns 400 |
| **Preconditions** | No part with `pk=999999` exists. Valid auth token. |
| **Request Payload** | `{"name": "Ghost Revision", "description": "Bad revision_of FK", "revision": "A", "revision_of": 999999}` |
| **Expected Status Code** | `400 Bad Request` |
| **Expected Response** | `{"revision_of": ["Invalid pk \"999999\" - object does not exist."]}` |
| **Type** | Negative |

---

## TC-REL-005

| Field | Value |
|---|---|
| **Test Case ID** | TC-REL-005 |
| **Endpoint** | `PATCH /api/part/{id}/` |
| **HTTP Method** | PATCH |
| **Title** | Setting `revision_of` to the part's own PK is rejected — circular reference |
| **Preconditions** | Part `pk=20` exists. Valid auth token. |
| **Request Payload** | `{"revision_of": 20}` *(sent to `PATCH /api/part/20/`)* |
| **Expected Status Code** | `400 Bad Request` |
| **Expected Response** | Error indicating a part cannot be a revision of itself. `revision_of` is not updated. |
| **Type** | Negative |

---

## TC-REL-006

| Field | Value |
|---|---|
| **Test Case ID** | TC-REL-006 |
| **Endpoint** | `POST /api/part/` |
| **HTTP Method** | POST |
| **Title** | Revision-of-a-revision is prevented (chain restriction) |
| **Preconditions** | Base part `pk=1`. Part `pk=2` already has `revision_of = 1` (it is a revision). Valid auth token. |
| **Request Payload** | `{"name": "Chained Revision", "description": "Chaining attempt", "revision": "2", "revision_of": 2}` |
| **Expected Status Code** | `400 Bad Request` |
| **Expected Response** | Error: cannot create a revision of a part that is itself a revision. |
| **Type** | Negative |

---

## TC-REL-007

| Field | Value |
|---|---|
| **Test Case ID** | TC-REL-007 |
| **Endpoint** | `POST /api/part/` |
| **HTTP Method** | POST |
| **Title** | `revision_of` targeting a template part is rejected |
| **Preconditions** | Part `pk=30` exists with `is_template = true`. Valid auth token. |
| **Request Payload** | `{"name": "Template Revision Attempt", "description": "Cannot revise a template", "revision": "A", "revision_of": 30}` |
| **Expected Status Code** | `400 Bad Request` |
| **Expected Response** | Error: template parts cannot be used as a revision base. |
| **Type** | Negative |

---

## TC-REL-008

| Field | Value |
|---|---|
| **Test Case ID** | TC-REL-008 |
| **Endpoint** | `POST /api/bom/` |
| **HTTP Method** | POST |
| **Title** | BOM item added with valid assembly and component parts |
| **Preconditions** | Assembly part `pk=50` (`assembly = true`). Component part `pk=51` (`component = true`). Valid auth token. |
| **Request Payload** | `{"part": 50, "sub_part": 51, "quantity": 4}` |
| **Expected Status Code** | `201 Created` |
| **Expected Response** | `part = 50`. `sub_part = 51`. `quantity = 4.0`. BOM item `pk` assigned. |
| **Type** | Positive |

---

## TC-REL-009

| Field | Value |
|---|---|
| **Test Case ID** | TC-REL-009 |
| **Endpoint** | `POST /api/bom/` |
| **HTTP Method** | POST |
| **Title** | BOM item where `sub_part` equals `part` (self-referencing) is rejected |
| **Preconditions** | Assembly part `pk=50` exists. Valid auth token. |
| **Request Payload** | `{"part": 50, "sub_part": 50, "quantity": 1}` |
| **Expected Status Code** | `400 Bad Request` |
| **Expected Response** | Error: a part cannot be a sub-component of itself. |
| **Type** | Negative |

---

## TC-REL-010

| Field | Value |
|---|---|
| **Test Case ID** | TC-REL-010 |
| **Endpoint** | `POST /api/part/parameter/` |
| **HTTP Method** | POST |
| **Title** | Parameter value with unit incompatible with template is rejected |
| **Preconditions** | Parameter template `pk=1` has `units = "ohm"` (electrical resistance). Part `pk=10` exists. Valid auth token. |
| **Request Payload** | `{"part": 10, "template": 1, "data": "10V"}` |
| **Expected Status Code** | `400 Bad Request` |
| **Expected Response** | `{"data": ["...incompatible unit...V cannot be converted to ohm..."]}` or equivalent. |
| **Type** | Negative |

---

## TC-REL-011

| Field | Value |
|---|---|
| **Test Case ID** | TC-REL-011 |
| **Endpoint** | `GET /api/part/` |
| **HTTP Method** | GET |
| **Title** | Unauthenticated request is rejected with 401 |
| **Preconditions** | No `Authorization` header is sent. |
| **Request Payload** | *(none — no auth header)* |
| **Expected Status Code** | `401 Unauthorized` |
| **Expected Response** | `{"detail": "Authentication credentials were not provided."}` |
| **Type** | Negative |

---

## TC-REL-012

| Field | Value |
|---|---|
| **Test Case ID** | TC-REL-012 |
| **Endpoint** | `POST /api/part/` |
| **HTTP Method** | POST |
| **Title** | View-only user cannot create a part — returns 403 |
| **Preconditions** | Auth token belongs to a user with view-only role (no add/change permission on Part). |
| **Request Payload** | `{"name": "Permission Test Part", "description": "Should be blocked"}` |
| **Expected Status Code** | `403 Forbidden` |
| **Expected Response** | `{"detail": "You do not have permission to perform this action."}`. No part created. |
| **Type** | Negative |

---

## TC-REL-013

| Field | Value |
|---|---|
| **Test Case ID** | TC-REL-013 |
| **Endpoint** | `POST /api/part/` |
| **HTTP Method** | POST |
| **Title** | Malformed JSON body returns 400 parse error — no 500 |
| **Preconditions** | Valid auth token. `Content-Type: application/json`. |
| **Request Payload** | `{name: "Missing Quotes", description: "bad json body"}` *(intentionally invalid JSON)* |
| **Expected Status Code** | `400 Bad Request` |
| **Expected Response** | `{"detail": "JSON parse error — ..."}`. No 500 Internal Server Error. |
| **Type** | Negative |
