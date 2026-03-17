# Part Detail — Variants Tab Test Cases

## TC-VR-001 · Variants tab is only visible on Template parts

| Field | Value |
|---|---|
| **Test Case ID** | TC-VR-001 |
| **Title** | Variants tab appears on Template parts and is absent on regular parts |
| **Priority** | High |
| **Type** | Positive |

**Preconditions**
- One part with the **Template** flag enabled.
- One standard (non-template) part.

**Steps**

| # | Action |
|---|---|
| 1 | Navigate to the Template part's Detail page — observe tab bar |
| 2 | Navigate to the standard part's Detail page — observe tab bar |

**Expected Result**
- **Variants** tab is visible on the Template part.
- **Variants** tab is absent on the standard part.

---

## TC-VR-002 · Create a variant from the Variants tab

| Field | Value |
|---|---|
| **Test Case ID** | TC-VR-002 |
| **Title** | Successfully create a variant part from a template |
| **Priority** | High |
| **Type** | Positive |

**Preconditions**
- A Template part exists (e.g. `Widget`).

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | Navigate to Template Part Detail > **Variants** tab | — |
| 2 | Click **New Variant** | — |
| 3 | Fill in the Duplicate Part form; set a distinguishing name | `Widget-Red` |
| 4 | Click **Submit** | — |

**Expected Result**
- New variant part `Widget-Red` is created.
- The variant's detail page shows **Variant Of** pointing to the `Widget` template.
- The `Widget` Variants tab lists `Widget-Red`.

---

## TC-VR-003 · Serial numbers are unique across template and all variants

| Field | Value |
|---|---|
| **Test Case ID** | TC-VR-003 |
| **Title** | Serial number uniqueness is enforced across a template and its variants |
| **Priority** | High |
| **Type** | Negative |

**Preconditions**
- A Template part with two variants exists, all trackable.
- Serial number `SN-001` is already assigned to a stock item of Variant A.

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | Navigate to Variant B's Stock tab | — |
| 2 | Add a new serialized stock item | — |
| 3 | Enter a serial number already used by Variant A | `SN-001` |
| 4 | Click **Submit** | — |

**Expected Result**
- Error is shown: serial number `SN-001` is already in use within the template/variant group.
- Stock item is not created.
