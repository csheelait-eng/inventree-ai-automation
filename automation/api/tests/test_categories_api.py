from typing import Dict

import pytest

from automation.api.conftest import build_url


@pytest.mark.categories
def test_TC_CRUD_CAT_001_list_categories(
    api_client, base_url: str, auth_headers: Dict[str, str]
) -> None:
    """TC-CRUD-CAT-001: List all categories — paginated list with tree metadata."""
    url = build_url(base_url, "/part/category/")
    response = api_client.get(url, headers=auth_headers)

    assert response.status_code == 200
    body = response.json()

    assert isinstance(body.get("count"), int)
    assert body["count"] >= 1
    assert isinstance(body.get("results"), list)

    if body["results"]:
        item = body["results"][0]
        for field in [
            "pk",
            "name",
            "description",
            "parent",
            "pathstring",
            "level",
            "part_count",
        ]:
            assert field in item


@pytest.mark.categories
def test_TC_CRUD_CAT_007_get_nonexistent_category_404(
    api_client, base_url: str, auth_headers: Dict[str, str]
) -> None:
    """TC-CRUD-CAT-007: Retrieve non-existent category returns 404."""
    url = build_url(base_url, "/part/category/999999/")
    response = api_client.get(url, headers=auth_headers)

    assert response.status_code == 404
    body = response.json()
    assert body.get("detail") == "No PartCategory matches the given query."

