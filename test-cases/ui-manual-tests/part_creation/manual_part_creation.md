# Manual Part Creation — Test Cases

## TC-MC-001 · Create a part with required fields only


| Field            | Value                                                            |
| ---------------- | ---------------------------------------------------------------- |
| **Test Case ID** | TC-MC-001                                                        |
| **Title**        | Create a part with required fields (Name, Description, Category) |
| **Priority**     | High                                                             |
| **Type**         | Positive                                                         |


**Preconditions**

- User is logged in with staff permissions.
- At least one part category exists.

**Steps**


| #   | Action                                      | Test Data              |
| --- | ------------------------------------------- | ---------------------- |
| 1   | Navigate to Parts and click **Create Part** | —                      |
| 2   | Enter a part name                           | `Resistor 10K`         |
| 3   | Enter a description                         | `10 kΩ resistor 0805`  |
| 4   | Select an existing category                 | `Passives > Resistors` |
| 5   | Click **Submit**                            | —                      |


**Expected Result**

- Browser redirects to the new Part Detail page.
- Part name, description, and category are displayed correctly.
- Default flags (Active = true, Component = true, Purchaseable = true) are set.

---

## TC-MC-002 · Create a part with initial stock and supplier data


| Field            | Value                                                                |
| ---------------- | -------------------------------------------------------------------- |
| **Test Case ID** | TC-MC-002                                                            |
| **Title**        | Create purchaseable part with initial stock and supplier information |
| **Priority**     | High                                                                 |
| **Type**         | Positive                                                             |


**Preconditions**

- "Create Initial Stock" setting is enabled in Part Settings.
- User has staff permissions.

**Steps**


| #   | Action                                                                   | Test Data                                                    |
| --- | ------------------------------------------------------------------------ | ------------------------------------------------------------ |
| 1   | Open the Create Part form                                                | —                                                            |
| 2   | Fill in Name, Description, Category                                      | `Capacitor 100nF`, `Decoupling cap`, `Passives > Capacitors` |
| 3   | Check the **Purchaseable** flag                                          | —                                                            |
| 4   | Check **Create Initial Stock**; set quantity                             | `50`                                                         |
| 5   | Check **Add Supplier Data**; enter manufacturer name, MPN, supplier name | `Murata`, `GRM188R71H104KA93D`, `Digi-Key`                   |
| 6   | Click **Submit**                                                         | —                                                            |


**Expected Result**

- Part is created and redirect to Part Detail occurs.
- Stock tab shows one stock item with quantity 50.
- Suppliers tab shows the linked supplier part and manufacturer part.

---

## TC-MC-003 · Create a part as an Assembly with Virtual flag


| Field            | Value                                                 |
| ---------------- | ----------------------------------------------------- |
| **Test Case ID** | TC-MC-003                                             |
| **Title**        | Create an assembly part and verify BOM tab visibility |
| **Priority**     | Medium                                                |
| **Type**         | Positive                                              |


**Preconditions**

- User is logged in with staff permissions.

**Steps**


| #   | Action                               | Test Data                                           |
| --- | ------------------------------------ | --------------------------------------------------- |
| 1   | Open the Create Part form            | —                                                   |
| 2   | Enter Name, Description, Category    | `Control PCB Rev1`, `Main controller board`, `PCBs` |
| 3   | Check the **Assembly** flag          | —                                                   |
| 4   | Click **Submit**                     | —                                                   |
| 5   | Observe tabs on the Part Detail page | —                                                   |


**Expected Result**

- Part is created with Assembly flag enabled.
- **BOM** tab is visible on the Part Detail page.
- **Build Orders** tab is visible.

---

## TC-MC-004 · Submit create form with blank Name (required field)


| Field            | Value                                   |
| ---------------- | --------------------------------------- |
| **Test Case ID** | TC-MC-004                               |
| **Title**        | Attempt to create a part without a name |
| **Priority**     | High                                    |
| **Type**         | Negative                                |


**Preconditions**

- User is logged in with staff permissions.

**Steps**


| #   | Action                                | Test Data               |
| --- | ------------------------------------- | ----------------------- |
| 1   | Open the Create Part form             | —                       |
| 2   | Leave Name field blank                | —                       |
| 3   | Enter Description and select Category | `Some desc`, `Passives` |
| 4   | Click **Submit**                      | —                       |


**Expected Result**

- Form is not submitted.
- Inline validation error appears on the Name field indicating it is required.
- No part record is created.

