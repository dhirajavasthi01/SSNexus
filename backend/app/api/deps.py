from fastapi import Cookie, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.config import Settings, get_settings
from app.core.security import decode_token
from app.db.session import get_db
from app.models.user import User


def get_current_admin(
    db: Session = Depends(get_db),
    settings: Settings = Depends(get_settings),
    ssn_admin: str | None = Cookie(default=None),
) -> User:
    if not ssn_admin:
        raise HTTPException(status_code=401, detail="Sign in is required.")
    try:
        payload = decode_token(settings, ssn_admin)
    except Exception as error:
        raise HTTPException(status_code=401, detail="Sign in is required.") from error
    user = db.get(User, payload["sub"])
    if user is None or not user.is_active or user.role != "admin" or payload["role"] != "admin":
        raise HTTPException(status_code=403, detail="This account cannot open the admin panel.")
    return user
