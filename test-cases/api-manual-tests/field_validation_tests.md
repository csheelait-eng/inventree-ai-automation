# Field Validation — API Test Cases

---

## TC-VAL-001

| Field | Value |
|---|---|
| **Test Case ID** | TC-VAL-001 |
| **Endpoint** | `POST /api/part/` |
| **HTTP Method** | POST |
| **Title** | Missing required field `name` returns 400 |
| **Preconditions** | Valid auth token with create permission. |
| **Request Payload** | `{"description": "No name provided"}` |
| **Expected Status Code** | `400 Bad Request` |
| **Expected Response** | `{"name": ["This field is required."]}`. No part created. |
| **Type** | Negative |

---

## TC-VAL-002

| Field | Value |
|---|---|
| **Test Case ID** | TC-VAL-002 |
| **Endpoint** | `POST /api/part/` |
| **HTTP Method** | POST |
| **Title** | Blank `name` field returns 400 |
| **Preconditions** | Valid auth token. |
| **Request Payload** | `{"name": "", "description": "Blank name test"}` |
| **Expected Status Code** | `400 Bad Request` |
| **Expected Response** | `{"name": ["This field may not be blank."]}` |
| **Type** | Negative |

---

## TC-VAL-003

| Field | Value |
|---|---|
| **Test Case ID** | TC-VAL-003 |
| **Endpoint** | `POST /api/part/` |
| **HTTP Method** | POST |
| **Title** | Missing required field `description` returns 400 |
| **Preconditions** | Valid auth token. |
| **Request Payload** | `{"name": "Part Without Description"}` |
| **Expected Status Code** | `400 Bad Request` |
| **Expected Response** | `{"description": ["This field is required."]}`. No part created. |
| **Type** | Negative |

---

## TC-VAL-004

| Field | Value |
|---|---|
| **Test Case ID** | TC-VAL-004 |
| **Endpoint** | `POST /api/part/` |
| **HTTP Method** | POST |
| **Title** | `name` at exactly 100 characters is accepted (upper boundary) |
| **Preconditions** | Valid auth token. No part with this name exists. |
| **Request Payload** | `{"name": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", "description": "Boundary test"}` *(100 'A' characters)* |
| **Expected Status Code** | `201 Created` |
| **Expected Response** | `name.length = 100`. Part created successfully. |
| **Type** | Boundary |

---

## TC-VAL-005

| Field | Value |
|---|---|
| **Test Case ID** | TC-VAL-005 |
| **Endpoint** | `POST /api/part/` |
| **HTTP Method** | POST |
| **Title** | `name` at 101 characters is rejected |
| **Preconditions** | Valid auth token. |
| **Request Payload** | `{"name": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", "description": "Overlong name"}` *(101 'A' characters)* |
| **Expected Status Code** | `400 Bad Request` |
| **Expected Response** | `{"name": ["Ensure this field has no more than 100 characters."]}` |
| **Type** | Boundary |

---

## TC-VAL-006

| Field | Value |
|---|---|
| **Test Case ID** | TC-VAL-006 |
| **Endpoint** | `POST /api/part/` |
| **HTTP Method** | POST |
| **Title** | Duplicate IPN returns 400 when uniqueness is enforced |
| **Preconditions** | Part with `IPN = "RES-10K-0805"` already exists. `PART_ALLOW_DUPLICATE_IPN = false`. Valid auth token. |
| **Request Payload** | `{"name": "Another Resistor", "description": "Duplicate IPN test", "IPN": "RES-10K-0805"}` |
| **Expected Status Code** | `400 Bad Request` |
| **Expected Response** | `{"IPN": ["Part with this IPN already exists."]}` or equivalent uniqueness error. |
| **Type** | Negative |

---

## TC-VAL-007

| Field | Value |
|---|---|
| **Test Case ID** | TC-VAL-007 |
| **Endpoint** | `POST /api/part/` |
| **HTTP Method** | POST |
| **Title** | `IPN` at 101 characters is rejected |
| **Preconditions** | Valid auth token. |
| **Request Payload** | `{"name": "IPN Overlong", "description": "IPN too long", "IPN": "IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII"}` *(101 'I' characters)* |
| **Expected Status Code** | `400 Bad Request` |
| **Expected Response** | `{"IPN": ["Ensure this field has no more than 100 characters."]}` |
| **Type** | Boundary |

---

## TC-VAL-008

| Field | Value |
|---|---|
| **Test Case ID** | TC-VAL-008 |
| **Endpoint** | `POST /api/part/` |
| **HTTP Method** | POST |
| **Title** | Invalid URI in `link` field returns 400 |
| **Preconditions** | Valid auth token. |
| **Request Payload** | `{"name": "Bad Link Part", "description": "Invalid link test", "link": "not a url at all"}` |
| **Expected Status Code** | `400 Bad Request` |
| **Expected Response** | `{"link": ["Enter a valid URL."]}` |
| **Type** | Negative |

---

## TC-VAL-009

| Field | Value |
|---|---|
| **Test Case ID** | TC-VAL-009 |
| **Endpoint** | `POST /api/part/` |
| **HTTP Method** | POST |
| **Title** | Negative `minimum_stock` is rejected |
| **Preconditions** | Valid auth token. |
| **Request Payload** | `{"name": "Negative Stock Part", "description": "Invalid minimum stock", "minimum_stock": -1}` |
| **Expected Status Code** | `400 Bad Request` |
| **Expected Response** | `{"minimum_stock": ["Ensure this value is greater than or equal to 0."]}` |
| **Type** | Boundary |

---

## TC-VAL-010

| Field | Value |
|---|---|
| **Test Case ID** | TC-VAL-010 |
| **Endpoint** | `PUT /api/part/parameter/{id}/` |
| **HTTP Method** | PUT |
| **Title** | PUT on a part parameter returns 405 — use PATCH |
| **Preconditions** | A part parameter with `pk=5` exists. Valid auth token. |
| **Request Payload** | `{"part": 1, "template": 1, "data": "10k"}` |
| **Expected Status Code** | `405 Method Not Allowed` |
| **Expected Response** | `{"detail": "Method \"PUT\" not allowed."}`. Use `PATCH /api/part/parameter/5/` instead. |
| **Type** | Negative |
