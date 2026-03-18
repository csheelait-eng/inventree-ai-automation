# Phase 1 – Requirement Analysis and UI Test Case Generation Prompt

## AI Agent Used : Claude

### Reason for Choosing Claude

Claude was used for Phase 1 because of its strong ability to analyze large documentation contexts and generate structured outputs. Its long-context reasoning and Markdown-friendly responses make it effective for extracting requirements from the InvenTree documentation and converting them into organized UI test cases.

## Purpose:

Generate minimal UI/manual test cases from InvenTree Parts documentation.

### Prompt Usage

This prompt was used to analyze the InvenTree Parts documentation and directly generate UI/manual test cases. 
Requirement analysis and test design were performed in a single prompt to keep the workflow concise while ensuring the required documentation coverage.

## Prompt:

You are a Senior QA Engineer.

Analyze the InvenTree Parts documentation and generate a minimal but complete set of UI/manual test cases.

Documentation source:
[https://docs.inventree.org/en/stable/part/](https://docs.inventree.org/en/stable/part/)

Include sub-pages:

- Creating a Part
- Part Views
- Part Parameters
- Part Templates
- Part Revisions
- Part Categories
- Part Variants
- Part Attachments
- BOM
- Build Orders

Generate UI test cases covering the following features with minimal but meaningful coverage:

1. Part creation
  - Manual entry  
  - Import flow
2. Part detail view tabs
  - Stock  
  - BOM  
  - Allocated  
  - Build Orders  
  - Parameters  
  - Variants  
  - Revisions  
  - Attachments  
  - Related Parts  
  - Test Templates
3. Part categories
  - Category hierarchy  
  - Filtering  
  - Parametric tables
4. Part attributes
  - Virtual  
  - Template  
  - Assembly  
  - Component  
  - Trackable  
  - Purchaseable  
  - Salable  
  - Active / Inactive
5. Units of measure configuration
6. Part revisions
  - Revision creation  
  - Unique revision code validation  
  - Circular reference prevention  
  - Template restrictions
7. Negative and boundary scenarios
  - Duplicate IPN  
  - Inactive part restrictions  
  - Revision-of-revision prevention

Test Case Format:  
Test Case ID  
Title
Priority
Type (Positive / Negative / Boundary)  
Preconditions  
Steps  
Expected Result  

IMPORTANT:  
Generate only minimal coverage:  

- 3–4 test cases per feature  
- Focus on the main UI workflow  
- Include at least one negative test where applicable
- Ensure test steps reflect realistic UI interactions such as navigation, form entry, and validation messages.
- Avoid duplicate test cases across different files and ensure each test case focuses on the specific feature/module.

Organize the output under these file headings so the test cases can be copied into files.  

testcases/part_creation

- manual_part_creation.md
- import_part_creation.md

testcases/part_detail_view  

- stock_tests.md 
- bom_tests.md  
- allocated_tests.md  
- build_orders_tests.md  
- parameters_tests.md  
- variants_tests.md  
- revisions_tests.md
- attachments_tests.md  
- related_parts_tests.md  
- test_templates_tests.md

testcases/part_categories  

- category_hierarchy.md  
- category_filtering.md  
- parametric_tables.md

testcases/part_attributes  

- part_type_attributes.md
- active_inactive_states.md

testcases/units_of_measure  

- units_configuration.md

testcases/part_revisions  

- revision_creation.md
- revision_constraints.md

testcases/negative_boundary_tests  

- duplicate_ipn.md  
- inactive_part_restrictions.md 
- revision_of_revision.md

Use markdown tables for the test cases.