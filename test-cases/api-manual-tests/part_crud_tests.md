# Parts CRUD — API Test Cases

**Base URL:** `http://<host>/api/`
**Auth header:** `Authorization: Token <token>`
**Content-Type:** `application/json`

---

## TC-CRUD-P-001

| Field | Value |
|---|---|
| **Test Case ID** | TC-CRUD-P-001 |
| **Endpoint** | `GET /api/part/` |
| **HTTP Method** | GET |
| **Title** | List all parts — returns paginated envelope |
| **Preconditions** | At least 3 parts exist. Valid auth token. |
| **Request Payload** | *(none)* |
| **Expected Status Code** | `200 OK` |
| **Expected Response** | JSON envelope: `count` (integer ≥ 3), `next`, `previous`, `results` (array). Each item contains `pk`, `name`, `description`, `IPN`, `active`, `category`, `assembly`, `in_stock`. |
| **Type** | Positive |

---

## TC-CRUD-P-002

| Field | Value |
|---|---|
| **Test Case ID** | TC-CRUD-P-002 |
| **Endpoint** | `POST /api/part/` |
| **HTTP Method** | POST |
| **Title** | Create part — required fields only |
| **Preconditions** | Valid auth token with create permission. |
| **Request Payload** | `{"name": "Resistor 10K", "description": "10kΩ 0805 resistor"}` |
| **Expected Status Code** | `201 Created` |
| **Expected Response** | `pk` assigned (integer). `name = "Resistor 10K"`. `description = "10kΩ 0805 resistor"`. Defaults applied: `active = true`, `component = true`, `purchaseable = true`, `assembly = false`, `virtual = false`. `creation_date` = today. |
| **Type** | Positive |

---

## TC-CRUD-P-003

| Field | Value |
|---|---|
| **Test Case ID** | TC-CRUD-P-003 |
| **Endpoint** | `POST /api/part/` |
| **HTTP Method** | POST |
| **Title** | Create part — all writable fields populated |
| **Preconditions** | Category with `pk=1` exists. Valid auth token. |
| **Request Payload** | `{"name": "NPN Transistor BC547", "description": "General purpose NPN BJT", "IPN": "TRANS-NPN-BC547", "category": 1, "assembly": false, "component": true, "trackable": false, "purchaseable": true, "salable": false, "virtual": false, "is_template": false, "keywords": "transistor NPN BJT", "link": "https://www.onsemi.com/pdf/datasheet/bc547-d.pdf", "units": "pcs", "minimum_stock": 50, "default_expiry": 0, "notes": "Keep in antistatic storage."}` |
| **Expected Status Code** | `201 Created` |
| **Expected Response** | All supplied writable fields persisted. `pk` assigned. `IPN = "TRANS-NPN-BC547"`. `minimum_stock = 50.0`. `link` matches supplied URI. |
| **Type** | Positive |

---

## TC-CRUD-P-004

| Field | Value |
|---|---|
| **Test Case ID** | TC-CRUD-P-004 |
| **Endpoint** | `GET /api/part/{id}/` |
| **HTTP Method** | GET |
| **Title** | Retrieve a single part by PK |
| **Preconditions** | Part with `pk=42` exists. Valid auth token. |
| **Request Payload** | *(none)* |
| **Expected Status Code** | `200 OK` |
| **Expected Response** | `pk = 42`. Read-only computed fields present: `full_name`, `in_stock`, `allocated_to_build_orders`, `building`, `barcode_hash`, `creation_date`. Writable fields match previously stored values. |
| **Type** | Positive |

---

## TC-CRUD-P-005

| Field | Value |
|---|---|
| **Test Case ID** | TC-CRUD-P-005 |
| **Endpoint** | `PATCH /api/part/{id}/` |
| **HTTP Method** | PATCH |
| **Title** | Partial update — change active status only |
| **Preconditions** | Part with `pk=42` exists and `active = true`. Valid auth token. |
| **Request Payload** | `{"active": false}` |
| **Expected Status Code** | `200 OK` |
| **Expected Response** | `active = false`. All other fields unchanged from before the request (name, IPN, category, etc.). |
| **Type** | Positive |

---

## TC-CRUD-P-006

| Field | Value |
|---|---|
| **Test Case ID** | TC-CRUD-P-006 |
| **Endpoint** | `PUT /api/part/{id}/` |
| **HTTP Method** | PUT |
| **Title** | Full update — replace all writable fields |
| **Preconditions** | Part with `pk=42` exists. Category `pk=2` exists. Valid auth token. |
| **Request Payload** | `{"name": "Updated Resistor", "description": "Updated description", "IPN": "RES-UPD-001", "category": 2, "active": true, "assembly": false, "component": true, "trackable": false, "purchaseable": true, "salable": true, "virtual": false, "is_template": false}` |
| **Expected Status Code** | `200 OK` |
| **Expected Response** | `name = "Updated Resistor"`. `salable = true`. `category = 2`. `pk` unchanged (42). |
| **Type** | Positive |

---

## TC-CRUD-P-007

| Field | Value |
|---|---|
| **Test Case ID** | TC-CRUD-P-007 |
| **Endpoint** | `DELETE /api/part/{id}/` |
| **HTTP Method** | DELETE |
| **Title** | Delete a part with no dependencies |
| **Preconditions** | Part with `pk=99` exists with no stock items, no BOM references, no purchase/sales order lines. Valid auth token. |
| **Request Payload** | *(none)* |
| **Expected Status Code** | `204 No Content` |
| **Expected Response** | Empty body. Subsequent `GET /api/part/99/` returns `404 Not Found`. |
| **Type** | Positive |

---

## TC-CRUD-P-008

| Field | Value |
|---|---|
| **Test Case ID** | TC-CRUD-P-008 |
| **Endpoint** | `POST /api/part/` |
| **HTTP Method** | POST |
| **Title** | Read-only fields supplied in body are silently ignored |
| **Preconditions** | Valid auth token. |
| **Request Payload** | `{"name": "RO Field Test", "description": "Read-only injection test", "pk": 99999, "in_stock": 500, "creation_date": "2000-01-01", "barcode_hash": "injected_hash"}` |
| **Expected Status Code** | `201 Created` |
| **Expected Response** | `pk` is server-assigned (not `99999`). `in_stock = 0`. `creation_date` = today's date. `barcode_hash` computed by server. |
| **Type** | Positive |

---

## TC-CRUD-P-009

| Field | Value |
|---|---|
| **Test Case ID** | TC-CRUD-P-009 |
| **Endpoint** | `GET /api/part/{id}/` |
| **HTTP Method** | GET |
| **Title** | Retrieve non-existent part returns 404 |
| **Preconditions** | No part exists with `pk=999999`. Valid auth token. |
| **Request Payload** | *(none)* |
| **Expected Status Code** | `404 Not Found` |
| **Expected Response** | `{"detail": "No Part matches the given query."}` |
| **Type** | Negative |

---

## TC-CRUD-P-010

| Field | Value |
|---|---|
| **Test Case ID** | TC-CRUD-P-010 |
| **Endpoint** | `DELETE /api/part/{id}/` |
| **HTTP Method** | DELETE |
| **Title** | Delete a part with existing stock items — blocked |
| **Preconditions** | Part `pk=60` has 2 active stock items. Valid auth token. |
| **Request Payload** | *(none)* |
| **Expected Status Code** | `400 Bad Request` or `409 Conflict` |
| **Expected Response** | Error body describes that part cannot be deleted while stock items exist. Part is not deleted — verify with `GET /api/part/60/` returning `200`. |
| **Type** | Negative |
