from datetime import UTC, datetime

from fastapi import APIRouter, Depends, HTTPException, Query, Request
from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session

from app.api.deps import get_current_admin
from app.db.session import get_db
from app.models.contact import Contact
from app.models.payment import PaymentRequest
from app.models.user import User
from app.schemas.records import ContactOut, ContactStatusUpdate, PageOut, PaymentOut, PaymentPage
from app.services.audit import write_audit
from app.services.payments import to_payment_out

router = APIRouter(prefix="/admin", tags=["admin"], dependencies=[Depends(get_current_admin)])


@router.get("/contacts", response_model=PageOut)
def list_contacts(
    db: Session = Depends(get_db),
    q: str = Query(default="", max_length=80),
    status: str = Query(default="", pattern="^(|new|in_review|closed)$"),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=50),
) -> PageOut:
    filters = []
    if status:
        filters.append(Contact.status == status)
    if q.strip():
        term = f"%{q.strip()}%"
        filters.append(or_(Contact.full_name.ilike(term), Contact.email.ilike(term), Contact.company.ilike(term)))
    count_stmt = select(func.count()).select_from(Contact)
    list_stmt = select(Contact).order_by(Contact.created_at.desc())
    if filters:
        count_stmt = count_stmt.where(*filters)
        list_stmt = list_stmt.where(*filters)
    total = db.scalar(count_stmt) or 0
    rows = db.scalars(list_stmt.offset((page - 1) * page_size).limit(page_size)).all()
    return PageOut(
        items=[ContactOut.model_validate(row, from_attributes=True) for row in rows],
        page=page,
        page_size=page_size,
        total=total,
    )


@router.get("/contacts/{contact_id}", response_model=ContactOut)
def get_contact(contact_id: str, db: Session = Depends(get_db)) -> Contact:
    contact = db.get(Contact, contact_id)
    if contact is None:
        raise HTTPException(status_code=404, detail="Enquiry was not found.")
    return contact


@router.patch("/contacts/{contact_id}", response_model=ContactOut)
def update_contact(
    contact_id: str,
    body: ContactStatusUpdate,
    request: Request,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin),
) -> Contact:
    contact = db.get(Contact, contact_id)
    if contact is None:
        raise HTTPException(status_code=404, detail="Enquiry was not found.")
    previous = contact.status
    contact.status = body.status
    contact.updated_at = datetime.now(UTC)
    write_audit(
        db,
        action="contact.status_changed",
        entity_type="contact",
        entity_id=contact.id,
        actor_id=admin.id,
        request=request,
        detail={"from": previous, "to": body.status},
    )
    db.commit()
    db.refresh(contact)
    return contact


@router.get("/payments", response_model=PaymentPage)
def list_payments(
    db: Session = Depends(get_db),
    kind: str = Query(default="", pattern="^(|pay-in|pay-out)$"),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=50),
) -> PaymentPage:
    filters = []
    if kind:
        filters.append(PaymentRequest.kind == kind)
    count_stmt = select(func.count()).select_from(PaymentRequest)
    list_stmt = select(PaymentRequest).order_by(PaymentRequest.created_at.desc())
    if filters:
        count_stmt = count_stmt.where(*filters)
        list_stmt = list_stmt.where(*filters)
    total = db.scalar(count_stmt) or 0
    rows = db.scalars(list_stmt.offset((page - 1) * page_size).limit(page_size)).all()
    return PaymentPage(items=[to_payment_out(row) for row in rows], page=page, page_size=page_size, total=total)
