# Part Categories CRUD — API Test Cases

**Endpoint family:** `/api/part/category/`

---

## TC-CRUD-CAT-001


| Field                    | Value                                                                                                                                                                                              |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Test Case ID**         | TC-CRUD-CAT-001                                                                                                                                                                                    |
| **Endpoint**             | `GET /api/part/category/`                                                                                                                                                                          |
| **HTTP Method**          | GET                                                                                                                                                                                                |
| **Title**                | List all categories — returns paginated list with tree metadata                                                                                                                                    |
| **Preconditions**        | At least one root and one child category exist. Valid auth token.                                                                                                                                  |
| **Request Payload**      | *(none)*                                                                                                                                                                                           |
| **Expected Status Code** | `200 OK`                                                                                                                                                                                           |
| **Expected Response**    | `count` ≥ 2. Each result contains `pk`, `name`, `description`, `parent`, `pathstring`, `level`, `part_count`, `subcategories`, `structural`. Root categories have `parent = null` and `level = 0`. |
| **Type**                 | Positive                                                                                                                                                                                           |


---

## TC-CRUD-CAT-002


| Field                    | Value                                                                                                                                    |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Test Case ID**         | TC-CRUD-CAT-002                                                                                                                          |
| **Endpoint**             | `POST /api/part/category/`                                                                                                               |
| **HTTP Method**          | POST                                                                                                                                     |
| **Title**                | Create a root-level category                                                                                                             |
| **Preconditions**        | Valid auth token with create permission.                                                                                                 |
| **Request Payload**      | `{"name": "Electronic Components", "description": "All electronic parts"}`                                                               |
| **Expected Status Code** | `201 Created`                                                                                                                            |
| **Expected Response**    | `name = "Electronic Components"`. `parent = null`. `level = 0`. `pathstring = "Electronic Components"`. `part_count = 0`. `pk` assigned. |
| **Type**                 | Positive                                                                                                                                 |


---

## TC-CRUD-CAT-003


| Field                    | Value                                                                               |
| ------------------------ | ----------------------------------------------------------------------------------- |
| **Test Case ID**         | TC-CRUD-CAT-003                                                                     |
| **Endpoint**             | `POST /api/part/category/`                                                          |
| **HTTP Method**          | POST                                                                                |
| **Title**                | Create a child category with parent reference                                       |
| **Preconditions**        | Root category with `pk=5` (`"Electronic Components"`) exists. Valid auth token.     |
| **Request Payload**      | `{"name": "Resistors", "description": "Fixed and variable resistors", "parent": 5}` |
| **Expected Status Code** | `201 Created`                                                                       |
| **Expected Response**    | `parent = 5`. `level = 1`. `pathstring = "Electronic Components/Resistors"`.        |
| **Type**                 | Positive                                                                            |


---

## TC-CRUD-CAT-004


| Field                    | Value                                                                                                                                                              |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Test Case ID**         | TC-CRUD-CAT-004                                                                                                                                                    |
| **Endpoint**             | `PATCH /api/part/category/{id}/`                                                                                                                                   |
| **HTTP Method**          | PATCH                                                                                                                                                              |
| **Title**                | Rename a category — pathstring updates accordingly                                                                                                                 |
| **Preconditions**        | Category `pk=5` exists with name `"Electronic Components"` and child categories. Valid auth token.                                                                 |
| **Request Payload**      | `{"name": "Electronics"}`                                                                                                                                          |
| **Expected Status Code** | `200 OK`                                                                                                                                                           |
| **Expected Response**    | `name = "Electronics"`. `pathstring` updated to `"Electronics"`. Child category `pathstring` values updated in subsequent GET requests to reflect new parent name. |
| **Type**                 | Positive                                                                                                                                                           |


---

## TC-CRUD-CAT-005


| Field                    | Value                                                                                  |
| ------------------------ | -------------------------------------------------------------------------------------- |
| **Test Case ID**         | TC-CRUD-CAT-005                                                                        |
| **Endpoint**             | `DELETE /api/part/category/{id}/`                                                      |
| **HTTP Method**          | DELETE                                                                                 |
| **Title**                | Delete an empty category with no parts or children                                     |
| **Preconditions**        | Category `pk=99` exists with `part_count = 0` and no sub-categories. Valid auth token. |
| **Request Payload**      | *(none)*                                                                               |
| **Expected Status Code** | `204 No Content`                                                                       |
| **Expected Response**    | Empty body. Subsequent `GET /api/part/category/99/` returns `404 Not Found`.           |
| **Type**                 | Positive                                                                               |


---

## TC-CRUD-CAT-006


| Field                    | Value                                                            |
| ------------------------ | ---------------------------------------------------------------- |
| **Test Case ID**         | TC-CRUD-CAT-006                                                  |
| **Endpoint**             | `POST /api/part/category/`                                       |
| **HTTP Method**          | POST                                                             |
| **Title**                | Create category with non-existent parent PK — returns 400        |
| **Preconditions**        | No category with `pk=999999` exists. Valid auth token.           |
| **Request Payload**      | `{"name": "Orphan Category", "parent": 999999}`                  |
| **Expected Status Code** | `400 Bad Request`                                                |
| **Expected Response**    | `{"parent": ["Invalid pk \"999999\" - object does not exist."]}` |
| **Type**                 | Negative                                                         |


---

## TC-CRUD-CAT-007


| Field                    | Value                                                    |
| ------------------------ | -------------------------------------------------------- |
| **Test Case ID**         | TC-CRUD-CAT-007                                          |
| **Endpoint**             | `GET /api/part/category/{id}/`                           |
| **HTTP Method**          | GET                                                      |
| **Title**                | Retrieve non-existent category returns 404               |
| **Preconditions**        | No category with `pk=999999` exists. Valid auth token.   |
| **Request Payload**      | *(none)*                                                 |
| **Expected Status Code** | `404 Not Found`                                          |
| **Expected Response**    | `{"detail": "No PartCategory matches the given query."}` |
| **Type**                 | Negative                                                 |


