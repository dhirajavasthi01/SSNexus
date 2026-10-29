import os

os.environ["ENVIRONMENT"] = "test"
os.environ["DATABASE_URL"] = "sqlite+pysqlite:///:memory:"
os.environ["SECRET_KEY"] = "test-secret-key-with-32-characters"
os.environ["ADMIN_EMAIL"] = "admin@example.com"
os.environ["ADMIN_PASSWORD"] = "test-admin-pass"
os.environ["COOKIE_SECURE"] = "false"
os.environ["PAYPAL_CLIENT_ID"] = ""
os.environ["PAYPAL_CLIENT_SECRET"] = ""
os.environ["ACQUIRER_CHECKOUT_URL"] = ""

from collections.abc import Generator

import pytest
from fastapi.testclient import TestClient

from app.core.rate_limit import limiter
from app.main import app


@pytest.fixture
def client() -> Generator[TestClient, None, None]:
    limiter.reset()
    with TestClient(app) as test_client:
        yield test_client
