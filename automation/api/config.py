import os


BASE_API_URL = os.getenv("INVENTREE_API_BASE_URL", "http://localhost:8000/api")
API_TOKEN = os.getenv("INVENTREE_API_TOKEN", "inv-7c253238cd0ecbc5e6a8727494cc06c73612cb04-20260316")

# Default pagination size used in some assertions
DEFAULT_PAGE_LIMIT = 10

