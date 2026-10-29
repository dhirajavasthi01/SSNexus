import hashlib
import json
from datetime import UTC, datetime
from decimal import Decimal, ROUND_HALF_UP
from uuid import uuid4

import httpx
from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.config import Settings
from app.core.crypto import encrypt_secret
from app.core.iban import is_uae_iban, mask_email, mask_iban
from app.models.payment import PaymentRequest
from app.schemas.records import PayInCreate, PayOutCreate, PaymentOut, ReadinessOut


def readiness(settings: Settings) -> ReadinessOut:
    acquirer = _https(settings.acquirer_checkout_url)
    paypal = settings.paypal_configured
    if paypal or acquirer:
        note = "A configured provider can be contacted. A payment is marked paid only after that provider confirms it."
    else:
        note = "PayPal and the UAE acquirer are not configured. Requests are saved and no money moves."
    return ReadinessOut(market="UAE", currency="AED", paypal=paypal, acquirer=acquirer, note=note)


def create_pay_in(
    db: Session,
    settings: Settings,
    body: PayInCreate,
    origin: str,
    idempotency_key: str,
) -> tuple[PaymentRequest, bool]:
    fingerprint = _fingerprint(
        {
            "kind": "pay-in",
            "amount": _cents(body.amount),
            "email": str(body.email).lower(),
            "reference": body.reference.strip(),
            "method": body.method,
        }
    )
    replay = _replay(db, idempotency_key, "pay-in", fingerprint)
    if replay is not None:
        return replay, True
    payment = _blank(
        kind="pay-in",
        amount=body.amount,
        method=body.method,
        reference=body.reference.strip(),
        email=str(body.email),
    )
    if body.method == "paypal" and settings.paypal_configured:
        try:
            created = _paypal_order(settings, payment, origin)
        except HTTPException as error:
            payment.provider = "paypal"
            payment.status = "provider_rejected"
            payment.message = str(error.detail)
        else:
            payment.provider = "paypal"
            payment.provider_reference = created["id"]
            payment.approve_url = created["approve_url"]
            payment.status = "awaiting_customer"
            payment.message = "PayPal created the order. The payment is not complete until PayPal capture succeeds."
    elif body.method in {"card", "google_pay"} and _https(settings.acquirer_checkout_url):
        payment.provider = "acquirer"
        payment.approve_url = (
            f"{settings.acquirer_checkout_url}?payment={payment.id}&amount={_amount(payment)}&currency=AED&method={body.method}"
        )
        payment.status = "awaiting_customer"
        payment.message = "The UAE acquirer checkout is ready. Card numbers stay on the acquirer page. This payment is not marked paid."
    else:
        payment.message = _unconfigured(body.method)
    payment.idempotency_key = idempotency_key
    payment.request_fingerprint = fingerprint
    saved = _save_new(db, payment, idempotency_key, "pay-in", fingerprint)
    return saved, saved.id != payment.id


def create_pay_out(
    db: Session,
    settings: Settings,
    body: PayOutCreate,
    idempotency_key: str,
) -> tuple[PaymentRequest, bool]:
    _cents(body.amount)
    if body.destination == "uae_iban":
        iban = "".join((body.iban or "").split()).upper()
        if not is_uae_iban(iban):
            raise HTTPException(status_code=422, detail="Enter a valid UAE IBAN.")
        masked = mask_iban(iban)
        secret = iban
        email = None
    else:
        email = str(body.paypal_email or "")
        if "@" not in email:
            raise HTTPException(status_code=422, detail="Enter the beneficiary PayPal email.")
        masked = mask_email(email)
        secret = email
    fingerprint = _fingerprint(
        {
            "kind": "pay-out",
            "amount": _cents(body.amount),
            "beneficiary": body.beneficiary_name.strip(),
            "reference": body.reference.strip(),
            "destination": body.destination,
            "target": secret,
        }
    )
    replay = _replay(db, idempotency_key, "pay-out", fingerprint)
    if replay is not None:
        return replay, True
    payment = _blank(
        kind="pay-out",
        amount=body.amount,
        method=body.destination,
        reference=body.reference.strip(),
        email=email,
        beneficiary_name=body.beneficiary_name.strip(),
        destination_masked=masked,
        destination_ciphertext=encrypt_secret(settings, secret),
    )
    if body.destination == "paypal" and settings.paypal_configured:
        try:
            payout = _paypal_payout(settings, payment, secret)
        except HTTPException as error:
            payment.provider = "paypal"
            payment.status = "provider_rejected"
            payment.message = str(error.detail)
        else:
            payment.provider = "paypal"
            payment.provider_reference = payout["batch_id"]
            payment.status = "payout_submitted"
            payment.message = (
                f"PayPal accepted the payout batch with status {payout['batch_status']}. "
                "That is not the same as funds settled in the beneficiary account."
            )
    elif body.destination == "uae_iban":
        payment.message = (
            "The UAE IBAN was checked and the payout was saved. "
            "No bank transfer was sent because a licensed UAE payout provider is not configured."
        )
    else:
        payment.message = "PayPal payout credentials are not configured. The request was saved and no payout was sent."
    payment.idempotency_key = idempotency_key
    payment.request_fingerprint = fingerprint
    saved = _save_new(db, payment, idempotency_key, "pay-out", fingerprint)
    return saved, saved.id != payment.id


def _require_key(key: str) -> None:
    if not 16 <= len(key) <= 80 or any(character not in "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-" for character in key):
        raise HTTPException(status_code=400, detail="A repeat-protection key is required.")


def _replay(db: Session, key: str, kind: str, fingerprint: str) -> PaymentRequest | None:
    _require_key(key)
    existing = db.scalar(select(PaymentRequest).where(PaymentRequest.idempotency_key == key))
    if existing is None:
        return None
    if existing.kind != kind or existing.request_fingerprint != fingerprint:
        raise HTTPException(
            status_code=409,
            detail="This attempt was already used for a different payment. Start again with a new attempt.",
        )
    return existing


def _save_new(db: Session, payment: PaymentRequest, key: str, kind: str, fingerprint: str) -> PaymentRequest:
    try:
        db.add(payment)
        db.commit()
    except IntegrityError:
        db.rollback()
        replay = _replay(db, key, kind, fingerprint)
        if replay is not None:
            return replay
        raise HTTPException(status_code=409, detail="This attempt could not be saved. Try again.")
    db.refresh(payment)
    return payment


def _fingerprint(payload: dict[str, object]) -> str:
    raw = json.dumps(payload, sort_keys=True, separators=(",", ":"))
    return hashlib.sha256(raw.encode()).hexdigest()


def capture_paypal(db: Session, settings: Settings, payment_id: str) -> PaymentRequest:
    payment = get_payment(db, payment_id, "pay-in")
    if payment.status in {"paid", "cancelled"}:
        return payment
    if payment.provider != "paypal" or not payment.provider_reference:
        raise HTTPException(status_code=409, detail="This payment has no PayPal order to capture.")
    if not settings.paypal_configured:
        raise HTTPException(status_code=409, detail="PayPal credentials are not configured.")
    body = _paypal_post(settings, f"/v2/checkout/orders/{payment.provider_reference}/capture", {})
    if body.get("status") == "COMPLETED":
        payment.status = "paid"
        payment.message = "PayPal captured the payment."
    else:
        payment.status = "provider_rejected"
        payment.message = f"PayPal returned status {body.get('status', 'unknown')}. The payment was not marked paid."
    db.commit()
    db.refresh(payment)
    return payment


def cancel_payment(db: Session, payment_id: str) -> PaymentRequest:
    payment = get_payment(db, payment_id, "pay-in")
    if payment.status in {"paid", "payout_submitted"}:
        raise HTTPException(status_code=409, detail="This payment can no longer be cancelled here.")
    payment.status = "cancelled"
    payment.approve_url = None
    payment.message = "The payment was cancelled before a provider confirmed it. No money moved."
    db.commit()
    db.refresh(payment)
    return payment


def get_payment(db: Session, payment_id: str, kind: str | None = None) -> PaymentRequest:
    payment = db.get(PaymentRequest, payment_id)
    if payment is None or (kind is not None and payment.kind != kind):
        raise HTTPException(status_code=404, detail="Payment was not found.")
    return payment


def to_payment_out(payment: PaymentRequest) -> PaymentOut:
    return PaymentOut(
        id=payment.id,
        kind=payment.kind,
        amount=_amount(payment),
        currency=payment.currency,
        reference=payment.reference,
        method=payment.method,
        status=payment.status,
        message=payment.message,
        created_at=payment.created_at,
        email=payment.email,
        beneficiary_name=payment.beneficiary_name,
        destination_masked=payment.destination_masked,
        provider=payment.provider,
        provider_reference=payment.provider_reference,
        approve_url=payment.approve_url,
    )


def _blank(**kwargs: object) -> PaymentRequest:
    amount = kwargs["amount"]
    assert isinstance(amount, Decimal)
    return PaymentRequest(
        id=str(uuid4()),
        kind=str(kwargs["kind"]),
        amount_minor=_cents(amount),
        currency="AED",
        method=str(kwargs["method"]),
        reference=str(kwargs["reference"]),
        status="recorded",
        message="",
        email=kwargs.get("email") if isinstance(kwargs.get("email"), str) else None,
        beneficiary_name=kwargs.get("beneficiary_name") if isinstance(kwargs.get("beneficiary_name"), str) else None,
        destination_masked=kwargs.get("destination_masked") if isinstance(kwargs.get("destination_masked"), str) else None,
        destination_ciphertext=kwargs.get("destination_ciphertext") if isinstance(kwargs.get("destination_ciphertext"), str) else None,
        provider="none",
        created_at=datetime.now(UTC),
    )


def _cents(amount: Decimal) -> int:
    quantized = amount.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
    if quantized != amount:
        raise HTTPException(status_code=422, detail="Use at most two decimal places.")
    return int(quantized * 100)


def _amount(payment: PaymentRequest) -> str:
    return f"{payment.amount_minor / 100:.2f}"


def _unconfigured(method: str) -> str:
    if method == "paypal":
        return "PayPal is not configured. The collection request was saved and no PayPal order was created."
    if method == "google_pay":
        return "Google Pay in the UAE opens from the acquirer checkout. No acquirer is configured, so no wallet sheet was opened and no money moved."
    return "Card collection needs the UAE acquirer hosted page. No card number was requested and no money moved."


def _https(value: str) -> bool:
    return value.startswith("https://")


def _paypal_order(settings: Settings, payment: PaymentRequest, origin: str) -> dict[str, str]:
    origin = origin.rstrip("/")
    body = _paypal_post(
        settings,
        "/v2/checkout/orders",
        {
            "intent": "CAPTURE",
            "purchase_units": [
                {
                    "custom_id": payment.id,
                    "invoice_id": payment.id,
                    "description": payment.reference,
                    "amount": {"currency_code": "AED", "value": _amount(payment)},
                }
            ],
            "payment_source": {
                "paypal": {
                    "experience_context": {
                        "return_url": f"{origin}/pay/collect/{payment.id}",
                        "cancel_url": f"{origin}/pay/collect/{payment.id}?result=cancel",
                        "shipping_preference": "NO_SHIPPING",
                        "user_action": "PAY_NOW",
                    }
                }
            },
        },
    )
    links = body.get("links")
    approve = ""
    if isinstance(links, list):
        for link in links:
            if isinstance(link, dict) and link.get("rel") in {"payer-action", "approve"}:
                approve = str(link.get("href") or "")
                break
    order_id = body.get("id")
    if not isinstance(order_id, str) or not approve:
        raise HTTPException(status_code=502, detail="PayPal did not return an approval link.")
    return {"id": order_id, "approve_url": approve}


def _paypal_payout(settings: Settings, payment: PaymentRequest, receiver: str) -> dict[str, str]:
    body = _paypal_post(
        settings,
        "/v1/payments/payouts",
        {
            "sender_batch_header": {"sender_batch_id": payment.id, "email_subject": "SS Nexus payout"},
            "items": [
                {
                    "recipient_type": "EMAIL",
                    "amount": {"value": _amount(payment), "currency": "AED"},
                    "receiver": receiver,
                    "sender_item_id": payment.id,
                    "note": payment.reference,
                }
            ],
        },
    )
    header = body.get("batch_header")
    if not isinstance(header, dict) or not header.get("payout_batch_id"):
        raise HTTPException(status_code=502, detail="PayPal did not accept the payout.")
    return {"batch_id": str(header["payout_batch_id"]), "batch_status": str(header.get("batch_status") or "unknown")}


def _paypal_post(settings: Settings, path: str, payload: dict[str, object]) -> dict[str, object]:
    token = _paypal_token(settings)
    try:
        response = httpx.post(
            f"{settings.paypal_api_base.rstrip('/')}{path}",
            headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
            json=payload,
            timeout=20,
        )
    except httpx.HTTPError as error:
        raise HTTPException(status_code=502, detail="The payment provider could not be reached.") from error
    body = response.json() if response.content else {}
    if response.status_code >= 400:
        message = body.get("message") if isinstance(body, dict) else None
        raise HTTPException(status_code=502, detail=str(message or f"PayPal returned {response.status_code}."))
    if not isinstance(body, dict):
        raise HTTPException(status_code=502, detail="PayPal returned an unexpected response.")
    return body


def _paypal_token(settings: Settings) -> str:
    try:
        response = httpx.post(
            f"{settings.paypal_api_base.rstrip('/')}/v1/oauth2/token",
            auth=(settings.paypal_client_id, settings.paypal_client_secret),
            data={"grant_type": "client_credentials"},
            timeout=20,
        )
    except httpx.HTTPError as error:
        raise HTTPException(status_code=502, detail="The payment provider could not be reached.") from error
    body = response.json() if response.content else {}
    token = body.get("access_token") if isinstance(body, dict) else None
    if response.status_code >= 400 or not isinstance(token, str):
        raise HTTPException(status_code=502, detail="PayPal did not issue an access token.")
    return token
