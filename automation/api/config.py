import os


BASE_API_URL = os.getenv("INVENTREE_API_BASE_URL", "http://localhost:8000/api")
API_TOKEN = os.getenv("INVENTREE_API_TOKEN", "inv-3f73fef709b4b212a2fcb1c8db2301a7de684c4e-20260317")

# Default pagination size used in some assertions
DEFAULT_PAGE_LIMIT = 10

