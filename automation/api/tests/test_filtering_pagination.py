from typing import Dict

import pytest

from automation.api.conftest import build_url


@pytest.mark.parametrize(
    "query, expected_status, min_count, assertion_id",
    [
        ("?category=3", 200, 1, "TC-FILTER-001"),
        ("?search=capacitor", 200, 1, "TC-FILTER-003"),
        ("?active=true&assembly=true", 200, 0, "TC-FILTER-004"),
        ("?IPN=RES-10K-0805", 200, 0, "TC-FILTER-005"),
    ],
)
def test_TC_FILTER_filters_on_parts_endpoint(
    api_client,
    base_url: str,
    auth_headers: Dict[str, str],
    query: str,
    expected_status: int,
    min_count: int,
    assertion_id: str,
) -> None:
    """Parameterized: TC-FILTER-001/003/004/005."""
    url = build_url(base_url, f"/part/{query}")
    response = api_client.get(url, headers=auth_headers)

    assert response.status_code == expected_status
    body = response.json()
    assert "results" in body
    assert body["count"] >= min_count


@pytest.mark.pagination
def test_TC_FILTER_006_pagination_first_page(
    api_client, base_url: str, auth_headers: Dict[str, str]
) -> None:
    """TC-FILTER-006: Pagination — first page of 5 results."""
    url = build_url(base_url, "/part/?limit=5&offset=0")
    response = api_client.get(url, headers=auth_headers)

    assert response.status_code == 200
    body = response.json()

    assert len(body["results"]) <= 5
    assert "next" in body
    assert "previous" in body
    assert isinstance(body["count"], int)


@pytest.mark.pagination
def test_TC_FILTER_009_offset_beyond_total_returns_empty_page(
    api_client, base_url: str, auth_headers: Dict[str, str]
) -> None:
    """TC-FILTER-009: Offset beyond total count returns empty page gracefully."""
    url = build_url(base_url, "/part/?limit=10&offset=99999")
    response = api_client.get(url, headers=auth_headers)

    assert response.status_code == 200
    body = response.json()

    assert body["results"] == []
    assert body["next"] is None
    assert isinstance(body["previous"], (str, type(None)))
    assert isinstance(body["count"], int)
    assert body["count"] != 0


@pytest.mark.search
def test_TC_FILTER_008_search_no_matches_returns_empty_results(
    api_client, base_url: str, auth_headers: Dict[str, str]
) -> None:
    """TC-FILTER-008: Search with no matches returns empty results."""
    url = build_url(base_url, "/part/?search=xyznonexistentpart123")
    response = api_client.get(url, headers=auth_headers)

    assert response.status_code == 200
    body = response.json()

    assert body["count"] == 0
    assert body["results"] == []
    assert body["next"] is None
    assert body["previous"] is None

