from datetime import UTC, datetime, timedelta

import jwt
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError

from app.core.config import Settings

_hasher = PasswordHasher()
_dummy_hash = _hasher.hash("dummy-password-not-used")


def hash_password(password: str) -> str:
    return _hasher.hash(password)


def verify_password(password: str, password_hash: str) -> bool:
    try:
        return _hasher.verify(password_hash, password)
    except VerifyMismatchError:
        return False


def verify_password_dummy(password: str) -> None:
    verify_password(password, _dummy_hash)


def create_token(settings: Settings, user_id: str, role: str) -> str:
    expires = datetime.now(UTC) + timedelta(hours=settings.token_hours)
    return jwt.encode(
        {"sub": user_id, "role": role, "exp": expires},
        settings.secret_key,
        algorithm="HS256",
    )


def decode_token(settings: Settings, token: str) -> dict[str, str]:
    payload = jwt.decode(token, settings.secret_key, algorithms=["HS256"])
    subject = payload.get("sub")
    role = payload.get("role")
    if not isinstance(subject, str) or not isinstance(role, str):
        raise jwt.InvalidTokenError("Token is missing its subject.")
    return {"sub": subject, "role": role}
