import re
from datetime import UTC, datetime
from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session

from app.core.rate_limit import limiter
from app.db.session import get_db
from app.models.contact import Contact
from app.schemas.records import ContactCreate, ContactOut
from app.services.audit import write_audit

router = APIRouter(prefix="/contacts", tags=["contacts"])
_phone = re.compile(r"^\+?[0-9][0-9 \-]{6,20}$")


@router.post("", response_model=ContactOut, status_code=201)
def create_contact(
    body: ContactCreate,
    request: Request,
    db: Session = Depends(get_db),
) -> Contact:
    limiter.check(request, "contact", limit=10, window_seconds=60)
    if body.website:
        raise HTTPException(status_code=400, detail="Unable to submit this form.")
    phone = body.phone.strip()
    digits = re.sub(r"\D", "", phone)
    if not _phone.match(phone) or not 7 <= len(digits) <= 15:
        raise HTTPException(status_code=422, detail="Enter a valid phone number.")
    now = datetime.now(UTC)
    contact = Contact(
        id=str(uuid4()),
        full_name=body.full_name.strip(),
        email=str(body.email).lower(),
        phone=phone,
        company=body.company.strip(),
        country=body.country.strip(),
        solution=body.solution,
        volume=(body.volume or "").strip() or None,
        message=body.message.strip(),
        status="new",
        created_at=now,
        updated_at=now,
    )
    db.add(contact)
    write_audit(db, action="contact.created", entity_type="contact", entity_id=contact.id, request=request)
    db.commit()
    db.refresh(contact)
    return contact
