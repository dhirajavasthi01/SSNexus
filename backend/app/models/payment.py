from datetime import datetime

from sqlalchemy import DateTime, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class PaymentRequest(Base):
    __tablename__ = "payment_requests"

    id: Mapped[str] = mapped_column(String(36), primary_key=True)
    kind: Mapped[str] = mapped_column(String(16), index=True)
    amount_minor: Mapped[int] = mapped_column(Integer)
    currency: Mapped[str] = mapped_column(String(3), default="AED")
    method: Mapped[str] = mapped_column(String(32))
    reference: Mapped[str] = mapped_column(String(40))
    status: Mapped[str] = mapped_column(String(32), index=True)
    message: Mapped[str] = mapped_column(Text)
    email: Mapped[str | None] = mapped_column(String(255), nullable=True)
    beneficiary_name: Mapped[str | None] = mapped_column(String(80), nullable=True)
    destination_masked: Mapped[str | None] = mapped_column(String(80), nullable=True)
    destination_ciphertext: Mapped[str | None] = mapped_column(Text, nullable=True)
    provider: Mapped[str] = mapped_column(String(32), default="none")
    provider_reference: Mapped[str | None] = mapped_column(String(80), nullable=True)
    approve_url: Mapped[str | None] = mapped_column(Text, nullable=True)
    idempotency_key: Mapped[str | None] = mapped_column(String(80), unique=True, nullable=True)
    request_fingerprint: Mapped[str | None] = mapped_column(String(64), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), index=True)
