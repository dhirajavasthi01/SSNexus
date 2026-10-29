from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator


class ContactCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    full_name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str = Field(min_length=7, max_length=32)
    company: str = Field(min_length=2, max_length=160)
    country: str = Field(min_length=2, max_length=80)
    solution: str = Field(pattern="^(pay-in|pay-out|both|integration|other)$")
    volume: str | None = Field(default=None, max_length=80)
    message: str = Field(min_length=10, max_length=2000)
    website: str | None = Field(default=None, max_length=0)


class ContactStatusUpdate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    status: str = Field(pattern="^(new|in_review|closed)$")


class ContactOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    full_name: str
    email: EmailStr
    phone: str
    company: str
    country: str
    solution: str
    volume: str | None
    message: str
    status: str
    created_at: datetime
    updated_at: datetime


class PageOut(BaseModel):
    items: list[ContactOut]
    page: int
    page_size: int
    total: int


class LoginIn(BaseModel):
    model_config = ConfigDict(extra="forbid")

    email: EmailStr
    password: str = Field(min_length=8, max_length=200)


class AdminOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    email: EmailStr
    role: str


class PayInCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    amount: Decimal = Field(gt=0, le=1_000_000)
    email: EmailStr
    reference: str = Field(min_length=2, max_length=40)
    method: str = Field(pattern="^(paypal|card|google_pay)$")

    @field_validator("amount", mode="before")
    @classmethod
    def money(cls, value: object) -> Decimal:
        if isinstance(value, float):
            return Decimal(f"{value:.2f}")
        return Decimal(str(value))


class PayOutCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    amount: Decimal = Field(gt=0, le=1_000_000)
    beneficiary_name: str = Field(min_length=2, max_length=80)
    reference: str = Field(min_length=2, max_length=40)
    destination: str = Field(pattern="^(uae_iban|paypal)$")
    iban: str | None = None
    paypal_email: EmailStr | None = None

    @field_validator("amount", mode="before")
    @classmethod
    def money(cls, value: object) -> Decimal:
        if isinstance(value, float):
            return Decimal(f"{value:.2f}")
        return Decimal(str(value))


class PaymentOut(BaseModel):
    id: str
    kind: str
    amount: str
    currency: str
    reference: str
    method: str
    status: str
    message: str
    created_at: datetime
    email: str | None = None
    beneficiary_name: str | None = None
    destination_masked: str | None = None
    provider: str
    provider_reference: str | None = None
    approve_url: str | None = None


class PaymentPage(BaseModel):
    items: list[PaymentOut]
    page: int
    page_size: int
    total: int


class ReadinessOut(BaseModel):
    market: str
    currency: str
    paypal: bool
    acquirer: bool
    note: str
