# Part Detail — Attachments Tab Test Cases

## TC-AT-001 · Upload a file attachment to a part

| Field | Value |
|---|---|
| **Test Case ID** | TC-AT-001 |
| **Title** | Attach a PDF datasheet to a part |
| **Priority** | High |
| **Type** | Positive |

**Preconditions**
- A part exists.
- User has staff permissions.

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | Navigate to Part Detail > **Attachments** tab | — |
| 2 | Click **Add Attachment** | — |
| 3 | Upload a PDF file and enter a comment | File: `datasheet.pdf`, Comment: `Official datasheet` |
| 4 | Click **Submit** | — |

**Expected Result**
- Attachment appears in the table with filename, comment, and upload date.
- Clicking the filename link opens or downloads the file.

---

## TC-AT-002 · Delete an attachment

| Field | Value |
|---|---|
| **Test Case ID** | TC-AT-002 |
| **Title** | Remove an existing attachment from a part |
| **Priority** | Medium |
| **Type** | Positive |

**Preconditions**
- A part has at least one existing attachment.

**Steps**

| # | Action |
|---|---|
| 1 | Navigate to Part Detail > **Attachments** tab |
| 2 | Click the **Delete** icon for the attachment |
| 3 | Confirm the deletion dialog |

**Expected Result**
- Attachment is removed from the table.
- File is no longer accessible.

---

## TC-AT-003 · Attach a URL link instead of a file

| Field | Value |
|---|---|
| **Test Case ID** | TC-AT-003 |
| **Title** | Add an external URL as an attachment |
| **Priority** | Low |
| **Type** | Positive |

**Preconditions**
- A part exists.

**Steps**

| # | Action | Test Data |
|---|---|---|
| 1 | Navigate to Part Detail > **Attachments** tab | — |
| 2 | Click **Add Attachment** | — |
| 3 | Enter a URL and comment instead of uploading a file | URL: `https://example.com/spec`, Comment: `Spec sheet link` |
| 4 | Submit | — |

**Expected Result**
- URL attachment appears in the table.
- Clicking it navigates to the external URL.
