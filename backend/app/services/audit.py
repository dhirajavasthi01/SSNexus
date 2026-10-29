import json
from datetime import UTC, datetime
from uuid import uuid4

from fastapi import Request
from sqlalchemy.orm import Session

from app.models.audit import AuditLog


def write_audit(
    db: Session,
    *,
    action: str,
    entity_type: str,
    entity_id: str | None = None,
    actor_id: str | None = None,
    request: Request | None = None,
    detail: dict[str, str] | None = None,
) -> None:
    ip_address = None
    if request is not None and request.client is not None:
        ip_address = request.client.host
    db.add(
        AuditLog(
            id=str(uuid4()),
            actor_id=actor_id,
            action=action,
            entity_type=entity_type,
            entity_id=entity_id,
            ip_address=ip_address,
            detail=json.dumps(detail or {}),
            created_at=datetime.now(UTC),
        )
    )
