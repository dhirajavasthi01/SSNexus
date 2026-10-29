import base64
import hashlib

from cryptography.fernet import Fernet

from app.core.config import Settings


def _fernet(settings: Settings) -> Fernet:
    if settings.settlement_encryption_key:
        return Fernet(settings.settlement_encryption_key.encode())
    digest = hashlib.sha256(settings.secret_key.encode()).digest()
    return Fernet(base64.urlsafe_b64encode(digest))


def encrypt_secret(settings: Settings, value: str) -> str:
    return _fernet(settings).encrypt(value.encode()).decode()


def decrypt_secret(settings: Settings, value: str) -> str:
    return _fernet(settings).decrypt(value.encode()).decode()
