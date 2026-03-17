import os
from typing import Dict, Generator

import pytest
import requests
from datetime import datetime
from . import config


@pytest.fixture(scope="session")
def base_url() -> str:
    """Base API URL for the InvenTree instance."""
    return config.BASE_API_URL.rstrip("/")


@pytest.fixture(scope="session")
def api_token() -> str:
    """API token used for authenticated requests."""
    return config.API_TOKEN


@pytest.fixture(scope="session")
def auth_headers(api_token: str) -> Dict[str, str]:
    """Default headers including auth token."""
    return {
        "Authorization": f"Token {api_token}",
        "Content-Type": "application/json",
    }


@pytest.fixture(scope="session")
def api_client() -> Generator[requests.Session, None, None]:
    """Reusable HTTP session for API calls."""
    session = requests.Session()
    yield session
    session.close()


def build_url(base_url: str, path: str) -> str:
    """Join base URL and relative path."""
    return f"{base_url}/{path.lstrip('/')}"

def pytest_configure(config):
   
   
    # 1. Create the 'reports' directory if it doesn't exist
    report_dir = "automation/api/reports"
    if not os.path.exists(report_dir):
        os.makedirs(report_dir)

    # 2. Define the report filename with a timestamp (optional)
    # Using a timestamp prevents overwriting previous reports
    timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    report_path = os.path.join(report_dir, f"report_{timestamp}.html")

    # 3. Inject the HTML report settings into the pytest config
    config.option.htmlpath = report_path
    config.option.self_contained_html = True

    # 4. (Optional) Register your custom markers here too
    config.addinivalue_line(
        "markers", "boundary: marks tests that verify boundary conditions"
    )
    config.addinivalue_line(
        "markers", "negative: marks tests that verify negative conditions"
    )
    config.addinivalue_line(
        "markers", "parts: marks tests that verify parts"
    )
    config.addinivalue_line(
        "markers", "search: marks tests that perform search validation"
    )
    config.addinivalue_line(
        "markers", "pagination: marks tests that perform pagination validation"
    )
    config.addinivalue_line(
        "markers", "categories: marks tests that verify categories"
    )