from fastapi import APIRouter, Depends, Header, Request, Response
from sqlalchemy.orm import Session

from app.core.config import Settings, get_settings
from app.core.rate_limit import limiter
from app.db.session import get_db
from app.schemas.records import PayInCreate, PayOutCreate, PaymentOut, ReadinessOut
from app.services.audit import write_audit
from app.services.payments import (
    cancel_payment,
    capture_paypal,
    create_pay_in,
    create_pay_out,
    get_payment,
    readiness,
    to_payment_out,
)

router = APIRouter(prefix="/payments", tags=["payments"])


@router.get("/readiness", response_model=ReadinessOut)
def payment_readiness(settings: Settings = Depends(get_settings)) -> ReadinessOut:
    return readiness(settings)


@router.post("/pay-in", response_model=PaymentOut)
def pay_in(
    body: PayInCreate,
    request: Request,
    response: Response,
    db: Session = Depends(get_db),
    settings: Settings = Depends(get_settings),
    idempotency_key: str = Header(alias="Idempotency-Key"),
) -> PaymentOut:
    limiter.check(request, "pay-in", limit=20, window_seconds=60)
    origin = settings.public_site_url or str(request.base_url).rstrip("/")
    payment, replayed = create_pay_in(db, settings, body, origin, idempotency_key)
    if replayed:
        response.status_code = 200
        return to_payment_out(payment)
    write_audit(db, action="payment.created", entity_type="payment", entity_id=payment.id, request=request, detail={"kind": "pay-in"})
    db.commit()
    response.status_code = 201
    return to_payment_out(payment)


@router.get("/pay-in/{payment_id}", response_model=PaymentOut)
def read_pay_in(payment_id: str, db: Session = Depends(get_db)) -> PaymentOut:
    return to_payment_out(get_payment(db, payment_id, "pay-in"))


@router.post("/pay-in/{payment_id}/capture", response_model=PaymentOut)
def capture(payment_id: str, db: Session = Depends(get_db), settings: Settings = Depends(get_settings)) -> PaymentOut:
    return to_payment_out(capture_paypal(db, settings, payment_id))


@router.post("/pay-in/{payment_id}/cancel", response_model=PaymentOut)
def cancel(payment_id: str, db: Session = Depends(get_db)) -> PaymentOut:
    return to_payment_out(cancel_payment(db, payment_id))


@router.post("/pay-out", response_model=PaymentOut)
def pay_out(
    body: PayOutCreate,
    request: Request,
    response: Response,
    db: Session = Depends(get_db),
    settings: Settings = Depends(get_settings),
    idempotency_key: str = Header(alias="Idempotency-Key"),
) -> PaymentOut:
    limiter.check(request, "pay-out", limit=20, window_seconds=60)
    payment, replayed = create_pay_out(db, settings, body, idempotency_key)
    if replayed:
        response.status_code = 200
        return to_payment_out(payment)
    write_audit(db, action="payment.created", entity_type="payment", entity_id=payment.id, request=request, detail={"kind": "pay-out"})
    db.commit()
    response.status_code = 201
    return to_payment_out(payment)


@router.get("/pay-out/{payment_id}", response_model=PaymentOut)
def read_pay_out(payment_id: str, db: Session = Depends(get_db)) -> PaymentOut:
    return to_payment_out(get_payment(db, payment_id, "pay-out"))
