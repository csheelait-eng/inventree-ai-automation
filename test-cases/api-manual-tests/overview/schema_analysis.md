# InvenTree Parts API — Schema Analysis

> **Source:** `https://docs.inventree.org/en/stable/api/schema/part/`
> **Auth:** All endpoints require `Authorization: Token <token>` or HTTP Basic.
> **Base URL:** `http://<host>/api/`
> **Content-Type:** `application/json`

---

## 1. Endpoints

### Parts

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/part/` | List parts (paginated, filterable) |
| `POST` | `/api/part/` | Create a new part |
| `PATCH` | `/api/part/` | Bulk partial-update (list-level) |
| `GET` | `/api/part/{id}/` | Retrieve a single part |
| `PUT` | `/api/part/{id}/` | Full replacement update |
| `PATCH` | `/api/part/{id}/` | Partial update |
| `DELETE` | `/api/part/{id}/` | Delete a part |
| `OPTIONS` | `/api/part/` | Retrieve field metadata |

### Part Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/part/category/` | List categories |
| `POST` | `/api/part/category/` | Create a category |
| `GET` | `/api/part/category/{id}/` | Retrieve a single category |
| `PUT` | `/api/part/category/{id}/` | Full update |
| `PATCH` | `/api/part/category/{id}/` | Partial update |
| `DELETE` | `/api/part/category/{id}/` | Delete a category |

### Part Parameters

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` / `POST` | `/api/part/parameter/` | List / create parameters |
| `GET` / `PATCH` / `DELETE` | `/api/part/parameter/{id}/` | Retrieve / update / delete |
| `PUT` | `/api/part/parameter/{id}/` | **Returns 405** — use PATCH |
| `GET` / `POST` | `/api/part/parameter/template/` | List / create parameter templates |

### BOM

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` / `POST` | `/api/bom/` | List / create BOM items |
| `GET` / `PUT` / `PATCH` / `DELETE` | `/api/bom/{id}/` | Retrieve / update / delete BOM item |

---

## 2. Part Serializer — Field Reference

### Required Fields

| Field | Type | Constraint |
|-------|------|------------|
| `name` | string | Required · non-blank · `maxLength: 100` |
| `description` | string | Required · non-blank · `maxLength: 250` |

### Optional Writable Fields

| Field | Type | Default | Constraint |
|-------|------|---------|------------|
| `IPN` | string | `""` | `maxLength: 100` · unique (when `PART_ALLOW_DUPLICATE_IPN=false`) |
| `category` | integer (FK) | `null` | References `PartCategory.pk` · nullable |
| `revision` | string | `""` | `maxLength: 100` |
| `revision_of` | integer (FK) | `null` | References `Part.pk` · see revision constraints |
| `keywords` | string | `""` | Free text; improves search |
| `link` | string | `""` | `format: uri` · `maxLength: 2000` |
| `units` | string | `""` | Physical unit of measure |
| `minimum_stock` | number (double) | `0` | `minimum: 0` |
| `default_expiry` | integer | `0` | Days; `0` = no expiry · `minimum: 0` |
| `default_location` | integer (FK) | `null` | References `StockLocation.pk` · nullable |
| `notes` | string | `""` | Markdown · `maxLength: 50000` |
| `responsible` | integer (FK) | `null` | References User/Group |
| `locked` | boolean | `false` | Locks BOM editing when true |
| `active` | boolean | `true` | Marks part as active/inactive |
| `assembly` | boolean | `false` | Can be built from sub-parts |
| `component` | boolean | `true` | Can be used as BOM sub-component |
| `trackable` | boolean | `false` | Requires serial/batch numbers |
| `purchaseable` | boolean | `true` | Can appear on purchase orders |
| `salable` | boolean | `false` | Can appear on sales orders |
| `virtual` | boolean | `false` | No physical stock |
| `is_template` | boolean | `false` | Acts as a variant template |

### Read-Only Fields (always ignored on write)

| Field | Type | Description |
|-------|------|-------------|
| `pk` | integer | Primary key, auto-assigned |
| `full_name` | string | Computed: name + IPN + revision |
| `in_stock` | number | Total on-hand quantity |
| `building` | number | Quantity in active build orders |
| `allocated_to_build_orders` | number | Allocated to builds |
| `allocated_to_sales_orders` | number | Allocated to sales |
| `total_in_stock` | number | Including sub-locations |
| `stock_item_count` | integer | Number of stock items |
| `suppliers` | integer | Number of linked suppliers |
| `creation_date` | date | ISO 8601; auto-set on create |
| `creation_user` | integer | FK to user; auto-set |
| `barcode_hash` | string | Computed from barcode data |
| `thumbnail` | string (URI) | Auto-generated thumbnail |
| `category_default_location` | integer | Inherited from category |

---

## 3. PartCategory Serializer — Field Reference

### Required Fields

| Field | Type | Constraint |
|-------|------|------------|
| `name` | string | Required · `maxLength: 100` |

### Optional Writable Fields

| Field | Type | Default | Constraint |
|-------|------|---------|------------|
| `description` | string | `""` | `maxLength: 250` |
| `parent` | integer (FK) | `null` | References `PartCategory.pk` · null = root |
| `default_location` | integer (FK) | `null` | References `StockLocation.pk` |
| `default_keywords` | string | `null` | `maxLength: 250` · applied to parts in category |
| `structural` | boolean | `false` | Structural categories cannot hold parts directly |
| `icon` | string | `""` | `maxLength: 100` |

### Read-Only Fields

| Field | Type | Description |
|-------|------|-------------|
| `pk` | integer | Primary key |
| `level` | integer | Tree depth (0 = root) |
| `pathstring` | string | Full path e.g. `Electronics/Passives/Resistors` |
| `part_count` | integer | Total parts in this category and descendants |
| `subcategories` | integer | Number of direct children |
| `parent_default_location` | integer | Inherited location FK |

---

## 4. Validation Rules

| Rule | Endpoint | Error |
|------|----------|-------|
| `name` must not be blank | `POST /api/part/` | 400 |
| `description` must not be blank | `POST /api/part/` | 400 |
| `name` max 100 chars | `POST /api/part/` | 400 |
| `IPN` max 100 chars | `POST /api/part/` | 400 |
| `IPN` must be unique | `POST /api/part/` | 400 (when setting enabled) |
| `link` must be valid URI | `POST /api/part/` | 400 |
| `minimum_stock` must be ≥ 0 | `POST /api/part/` | 400 |
| `category` FK must exist | `POST /api/part/` | 400 |
| `revision_of` cannot reference self | `PATCH /api/part/{id}/` | 400 |
| `revision_of` cannot chain revisions | `POST /api/part/` | 400 |
| `revision_of` cannot target a template | `POST /api/part/` | 400 |
| `PUT` on parameter returns 405 | `PUT /api/part/parameter/{id}/` | 405 |
| Read-only fields silently ignored | All write methods | Ignored |
| Unauthenticated request | Any | 401 |
| Insufficient permissions | Any | 403 |
| Non-existent resource | `GET/PATCH/DELETE /{id}/` | 404 |

---

## 5. Key Query Parameters — `GET /api/part/`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | integer | Filter by exact category PK |
| `cascade` | boolean | Include parts from sub-categories |
| `active` | boolean | Filter by active status |
| `assembly` | boolean | Filter assembly parts |
| `component` | boolean | Filter component parts |
| `trackable` | boolean | Filter trackable parts |
| `purchaseable` | boolean | Filter purchaseable parts |
| `salable` | boolean | Filter salable parts |
| `virtual` | boolean | Filter virtual parts |
| `is_template` | boolean | Filter template parts |
| `has_stock` | boolean | Filter parts with/without stock |
| `low_stock` | boolean | Parts below minimum stock |
| `IPN` | string | Exact IPN match |
| `IPN_regex` | string | Regex match on IPN |
| `name_regex` | string | Regex match on name |
| `search` | string | Full-text search: name, description, IPN, keywords |
| `ordering` | string | e.g. `name`, `-name`, `IPN`, `creation_date` |
| `limit` | integer | Page size |
| `offset` | integer | Pagination offset |

---

## 6. Relationships

| Relationship | Type | Description |
|---|---|---|
| Part → PartCategory | Many-to-one | `category` FK on Part; nullable |
| Part → Part (revision) | Many-to-one | `revision_of` FK; cannot chain; cannot target template |
| Part → StockLocation | Many-to-one | `default_location` FK; nullable |
| PartCategory → PartCategory | Many-to-one | `parent` FK; nullable = root |
| PartParameter → Part | Many-to-one | `part` FK |
| PartParameter → ParameterTemplate | Many-to-one | `template` FK; units must be compatible |
| BomItem → Part (assembly) | Many-to-one | `part` FK |
| BomItem → Part (sub-component) | Many-to-one | `sub_part` FK; must differ from `part` |
