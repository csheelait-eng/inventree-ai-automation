import json
from typing import Dict

import pytest

from automation.api.conftest import build_url


@pytest.mark.parametrize(
    "test_id, payload, expected_status, expected_field, expected_message",
    [
        (
            "TC-VAL-001",
            {"description": "No name provided"},
            400,
            "name",
            "This field is required.",
        ),
        (
            "TC-VAL-002",
            {"name": "", "description": "Blank name test"},
            400,
            "name",
            "This field may not be blank.",
        ),
        (
            "TC-VAL-003",
            {"name": "Part Without Description"},
            400,
            "description",
            "This field is required.",
        ),
    ],
)
def test_required_field_validation_negative(
    api_client,
    base_url: str,
    auth_headers: Dict[str, str],
    test_id: str,
    payload: Dict,
    expected_status: int,
    expected_field: str,
    expected_message: str,
) -> None:
    """TC-VAL-001/002/003: Required field validations on POST /api/part/."""
    url = build_url(base_url, "/part/")
    response = api_client.post(url, headers=auth_headers, data=json.dumps(payload))

    assert response.status_code == expected_status
    body = response.json()
    assert expected_field in body
    assert any(expected_message in msg for msg in body[expected_field])


@pytest.mark.boundary
def test_TC_VAL_004_name_length_100_accepted(
    api_client, base_url: str, auth_headers: Dict[str, str]
) -> None:
    """TC-VAL-004: `name` at exactly 100 characters is accepted."""
    name_100 = "A" * 100
    payload = {"name": name_100, "description": "Boundary test"}
    url = build_url(base_url, "/part/")

    response = api_client.post(url, headers=auth_headers, data=json.dumps(payload))
    assert response.status_code == 201
    body = response.json()
    assert body["name"] == name_100


@pytest.mark.boundary
def test_TC_VAL_005_name_length_101_rejected(
    api_client, base_url: str, auth_headers: Dict[str, str]
) -> None:
    """TC-VAL-005: `name` at 101 characters is rejected."""
    name_101 = "A" * 101
    payload = {"name": name_101, "description": "Overlong name"}
    url = build_url(base_url, "/part/")

    response = api_client.post(url, headers=auth_headers, data=json.dumps(payload))
    assert response.status_code == 400
    body = response.json()
    assert "name" in body


@pytest.mark.negative
def test_TC_VAL_008_invalid_url_in_link_rejected(
    api_client, base_url: str, auth_headers: Dict[str, str]
) -> None:
    """TC-VAL-008: Invalid URI in `link` field returns 400."""
    url = build_url(base_url, "/part/")
    payload = {
        "name": "Bad Link Part",
        "description": "Invalid link test",
        "link": "not a url at all",
    }

    response = api_client.post(url, headers=auth_headers, data=json.dumps(payload))
    assert response.status_code == 400
    body = response.json()
    assert "link" in body

