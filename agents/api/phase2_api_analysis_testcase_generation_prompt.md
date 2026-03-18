# Phase 2 –  API Specification Analysis and API Testcase Generation Prompt

## AI Agent Used : Claude

### Reason for Choosing Claude

Claude was selected for this phase because it performs well in structured document analysis and schema interpretation.

The InvenTree API documentation contains detailed endpoint definitions, request fields, and validation rules. 

Claude is effective at:

- Extracting structured information from API documentation
- Understanding relationships between API entities
- Generating clear and organized API test cases
- Producing well-formatted markdown outputs suitable for documentation

This makes it suitable for analyzing the API schema and generating meaningful API test scenarios.

## Purpose:

The purpose of this prompt is to:

- Analyze the InvenTree Parts API schema.
- Identify key endpoints and request parameters.
- Generate a schema analysis document summarizing the API structure.
- Generate manual API test cases covering important API behaviors.
- Generate a test suite index file to track traceability of test cases.

## Prompt Usage:

The generated test cases should validate the following areas:

- CRUD operations for Parts and Part Categories
- Filtering, pagination, and search functionality
- Field-level validation rules
- Relational integrity between entities
- Negative and edge scenarios such as invalid payloads and unauthorized access

The output is organized into separate sections so the generated artifacts can be easily copied into the project folder structure.

## Prompt:

You are a Senior QA Engineer specializing in API testing.

Analyze the InvenTree Parts API schema and generate structured manual API test cases based on the identified endpoints, request parameters, validations, and relationships.

Schema source:
[https://docs.inventree.org/en/stable/api/schema/part/](https://docs.inventree.org/en/stable/api/schema/part/)

First identify:

- API endpoints
- HTTP methods
- Request fields
- Required fields
- Optional fields
- Read-only fields
- Response structure
- Validation rules
- Relationships (category, supplier, location)

Then generate API test cases covering:

- CRUD operations for Parts
- CRUD operations for Part Categories
- Filtering, pagination, and search on the Parts endpoint
- Field-level validation (required fields, max length, nullable fields, read-only fields)
- Relational integrity (category assignment and related entities)
- Edge cases such as invalid payloads, unauthorized access, and resource conflicts

Test Case Format:

Each test case must include the following fields:


| Field                | Description                    |
| -------------------- | ------------------------------ |
| Test Case ID         | Unique identifier              |
| Endpoint             | API endpoint                   |
| HTTP Method          | GET / POST / PATCH / DELETE    |
| Title                | Short description              |
| Preconditions        | Required setup                 |
| Request Payload      | Example request body           |
| Expected Status Code | HTTP status                    |
| Expected Response    | Validation of response         |
| Type                 | Positive / Negative / Boundary |


IMPORTANT:

Ensure the test cases reflect realistic API usage.
Include both positive and negative scenarios.
Use realistic API payload examples consistent with the API schema.
Keep the total number of test cases around 30–40 across all files.

### Output Structure

Organize the output under the following file headings so the test index, schema analysis, and test cases can be directly copied into the project folder.

test-cases/api-manual-tests/overview/test_index.md
test-cases/api-manual-tests/overview/schema_analysis.md 
test-cases/api-manual-tests/part_crud_tests.md
test-cases/api-manual-tests/category_crud_tests.md
test-cases/api-manual-tests/filtering_pagination_tests.md
test-cases/api-manual-tests/field_validation_tests.md
test-cases/api-manual-tests/relational_integrity_tests.md

Use markdown tables for the test cases.