# Negative & Boundary Tests — Duplicate IPN Test Cases

## TC-IPN-001 · Create a part with a duplicate IPN is rejected


| Field            | Value                                                                       |
| ---------------- | --------------------------------------------------------------------------- |
| **Test Case ID** | TC-IPN-001                                                                  |
| **Title**        | Submitting a new part with an IPN already in use returns a validation error |
| **Priority**     | High                                                                        |
| **Type**         | Negative                                                                    |


**Preconditions**

- A part exists with IPN `RES-10K-0805`.

**Steps**


| #   | Action                           | Test Data                                                    |
| --- | -------------------------------- | ------------------------------------------------------------ |
| 1   | Open the Create Part form        | —                                                            |
| 2   | Enter a new name and description | `Resistor 10K Alternative`, `Same value, different supplier` |
| 3   | Enter the already-used IPN       | `RES-10K-0805`                                               |
| 4   | Click **Submit**                 | —                                                            |


**Expected Result**

- Form is not submitted.
- Validation error on the IPN field: *Part with this IPN already exists*.
- No new part is created.

---

## TC-IPN-002 · IPN uniqueness is enforced via the API


| Field            | Value                                                      |
| ---------------- | ---------------------------------------------------------- |
| **Test Case ID** | TC-IPN-002                                                 |
| **Title**        | A direct API POST with a duplicate IPN returns a 400 error |
| **Priority**     | High                                                       |
| **Type**         | Negative                                                   |


**Preconditions**

- A part with IPN `CAP-100N-0402` exists.
- API access with authentication token is available.

**Steps**


| #   | Action                                                        | Test Data                                                                    |
| --- | ------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| 1   | Send `POST /api/part/` with JSON body including duplicate IPN | `{"name":"Cap Alt","description":"test","IPN":"CAP-100N-0402","category":1}` |
| 2   | Observe the HTTP response                                     | —                                                                            |


**Expected Result**

- Response is `HTTP 400 Bad Request`.
- Response body contains a field-level error for `IPN` indicating uniqueness violation.

---

## TC-IPN-003 · IPN field accepts max length of 100 characters


| Field            | Value                                        |
| ---------------- | -------------------------------------------- |
| **Test Case ID** | TC-IPN-003                                   |
| **Title**        | An IPN of exactly 100 characters is accepted |
| **Priority**     | Medium                                       |
| **Type**         | Boundary                                     |


**Preconditions**

- No existing part has the 100-character IPN to be tested.

**Steps**


| #   | Action                                        | Test Data |
| --- | --------------------------------------------- | --------- |
| 1   | Open the Create Part form                     | —         |
| 2   | Enter a valid name, description, and category | —         |
| 3   | Enter an IPN of exactly 100 characters        | `A` × 100 |
| 4   | Submit                                        | —         |


**Expected Result**

- Part is created successfully.
- IPN is stored and displayed in full.

---

## TC-IPN-004 · IPN of 101 characters is rejected


| Field            | Value                                                   |
| ---------------- | ------------------------------------------------------- |
| **Test Case ID** | TC-IPN-004                                              |
| **Title**        | An IPN exceeding 100 characters is rejected by the form |
| **Priority**     | Medium                                                  |
| **Type**         | Boundary                                                |


**Preconditions**

- None.

**Steps**


| #   | Action                         | Test Data |
| --- | ------------------------------ | --------- |
| 1   | Open the Create Part form      | —         |
| 2   | Enter an IPN of 101 characters | `A` × 101 |
| 3   | Submit                         | —         |


**Expected Result**

- Validation error on the IPN field: exceeds maximum length of 100 characters.
- Part is not created.

