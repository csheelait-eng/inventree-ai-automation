import json
from typing import Dict

import pytest

from automation.api.conftest import build_url


@pytest.mark.parts
def test_TC_CRUD_P_001_list_parts_paginated(
    api_client, base_url: str, auth_headers: Dict[str, str]
) -> None:
    """TC-CRUD-P-001: List all parts — returns paginated envelope."""
    url = build_url(base_url, "/part/")
    response = api_client.get(url, headers=auth_headers)

    assert response.status_code == 200
    body = response.json()

    assert isinstance(body.get("count"), int)
    assert body["count"] >= 3
    assert "results" in body and isinstance(body["results"], list)

    if body["results"]:
        item = body["results"][0]
        for field in [
            "pk",
            "name",
            "description",
            "IPN",
            "active",
            "category",
            "assembly",
            "in_stock",
        ]:
            assert field in item


@pytest.mark.parts
def test_TC_CRUD_P_002_create_part_required_fields(
    api_client, base_url: str, auth_headers: Dict[str, str]
) -> None:
    """TC-CRUD-P-002: Create part — required fields only."""
    url = build_url(base_url, "/part/")
    payload = {
        "name": "Resistor 10K",
        "description": "10kΩ 0805 resistor",
    }

    response = api_client.post(url, headers=auth_headers, data=json.dumps(payload))
    assert response.status_code == 201
    body = response.json()

    assert isinstance(body.get("pk"), int)
    assert body["name"] == payload["name"]
    assert body["description"] == payload["description"]
    assert body.get("active") is True
    assert body.get("component") is True
    assert body.get("purchaseable") is True
    assert body.get("assembly") is False
    assert body.get("virtual") is False
    assert "creation_date" in body


@pytest.mark.parts
def test_TC_CRUD_P_003_create_part_all_fields(
    api_client, base_url: str, auth_headers: Dict[str, str]
) -> None:
    """TC-CRUD-P-003: Create part — all writable fields populated."""
    url = build_url(base_url, "/part/")
    payload = {
        "name": "NPN Transistor BC547",
        "description": "General purpose NPN BJT",
        "IPN": "TRANS-NPN-BC547",
        "category": 1,
        "assembly": False,
        "component": True,
        "trackable": False,
        "purchaseable": True,
        "salable": False,
        "virtual": False,
        "is_template": False,
        "keywords": "transistor NPN BJT",
        "link": "https://www.onsemi.com/pdf/datasheet/bc547-d.pdf",
        "units": "pcs",
        "minimum_stock": 50,
        "default_expiry": 0,
        "notes": "Keep in antistatic storage.",
    }

    response = api_client.post(url, headers=auth_headers, data=json.dumps(payload))
    assert response.status_code == 201
    body = response.json()

    assert isinstance(body.get("pk"), int)
    for key, value in payload.items():
        assert body.get(key) == value or key in ("minimum_stock",)

    assert body["IPN"] == payload["IPN"]
    assert float(body["minimum_stock"]) == 50.0
    assert body["link"] == payload["link"]


@pytest.mark.parts
def test_TC_CRUD_P_009_get_nonexistent_part_returns_404(
    api_client, base_url: str, auth_headers: Dict[str, str]
) -> None:
    """TC-CRUD-P-009: Retrieve non-existent part returns 404."""
    url = build_url(base_url, "/part/999999/")
    response = api_client.get(url, headers=auth_headers)

    assert response.status_code == 404
    body = response.json()
    assert body.get("detail") == "No Part matches the given query."


@pytest.mark.parts
def test_TC_CRUD_P_008_readonly_fields_ignored_on_create(
    api_client, base_url: str, auth_headers: Dict[str, str]
) -> None:
    """TC-CRUD-P-008: Read-only fields supplied in body are ignored."""
    url = build_url(base_url, "/part/")
    payload = {
        "name": "RO Field Test",
        "description": "Read-only injection test",
        "pk": 99999,
        "in_stock": 500,
        "creation_date": "2000-01-01",
        "barcode_hash": "injected_hash",
    }

    response = api_client.post(url, headers=auth_headers, data=json.dumps(payload))
    assert response.status_code == 201
    body = response.json()

    assert body["pk"] != 99999
    assert body.get("in_stock", 0) in (0, 0.0)
    assert body.get("barcode_hash") != "injected_hash"

