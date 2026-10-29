from functools import lru_cache

from pydantic import Field, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    environment: str = "development"
    database_url: str = Field(alias="DATABASE_URL")
    secret_key: str = Field(alias="SECRET_KEY", min_length=16)
    admin_email: str = Field(alias="ADMIN_EMAIL")
    admin_password: str = Field(alias="ADMIN_PASSWORD", min_length=8)
    cors_origins: str = Field(default="http://127.0.0.1:5173,http://127.0.0.1:5175", alias="CORS_ORIGINS")
    cookie_secure: bool = Field(default=False, alias="COOKIE_SECURE")
    cookie_name: str = "ssn_admin"
    token_hours: int = 8
    paypal_client_id: str = Field(default="", alias="PAYPAL_CLIENT_ID")
    paypal_client_secret: str = Field(default="", alias="PAYPAL_CLIENT_SECRET")
    paypal_api_base: str = Field(default="https://api-m.sandbox.paypal.com", alias="PAYPAL_API_BASE")
    acquirer_checkout_url: str = Field(default="", alias="ACQUIRER_CHECKOUT_URL")
    public_site_url: str = Field(default="http://127.0.0.1:5175", alias="PUBLIC_SITE_URL")
    settlement_encryption_key: str = Field(default="", alias="SETTLEMENT_ENCRYPTION_KEY")

    @model_validator(mode="after")
    def check_runtime(self) -> "Settings":
        if self.environment == "test":
            return self
        if not self.database_url.startswith("postgresql"):
            raise ValueError("DATABASE_URL must be a PostgreSQL URL outside tests.")
        if self.environment == "production":
            if len(self.secret_key) < 32:
                raise ValueError("SECRET_KEY must be at least 32 characters in production.")
            if len(self.admin_password) < 12 or self.admin_password == "change-this-admin-password":
                raise ValueError("Set a unique ADMIN_PASSWORD of at least 12 characters.")
            if not self.cookie_secure:
                raise ValueError("COOKIE_SECURE must be true in production.")
            if not self.settlement_encryption_key:
                raise ValueError("SETTLEMENT_ENCRYPTION_KEY is required in production.")
        return self

    @property
    def origins(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]

    @property
    def paypal_configured(self) -> bool:
        return bool(self.paypal_client_id and self.paypal_client_secret)


@lru_cache
def get_settings() -> Settings:
    return Settings()
