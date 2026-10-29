from datetime import UTC, datetime

from fastapi import APIRouter, Depends, HTTPException, Request, Response
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.config import Settings, get_settings
from app.core.rate_limit import limiter
from app.core.security import create_token, verify_password, verify_password_dummy
from app.api.deps import get_current_admin
from app.db.session import get_db
from app.models.user import User
from app.schemas.records import AdminOut, LoginIn
from app.services.audit import write_audit

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=AdminOut)
def login(
    body: LoginIn,
    request: Request,
    response: Response,
    db: Session = Depends(get_db),
    settings: Settings = Depends(get_settings),
) -> User:
    limiter.check(request, "login", limit=5, window_seconds=60)
    email = str(body.email).lower()
    user = db.scalar(select(User).where(User.email == email))
    if user is None or not user.is_active or not verify_password(body.password, user.password_hash):
        verify_password_dummy(body.password)
        write_audit(db, action="auth.login.failure", entity_type="user", request=request, detail={"email": email})
        db.commit()
        raise HTTPException(status_code=401, detail="The email or password is not correct.")
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="This account cannot open the admin panel.")
    user.last_login_at = datetime.now(UTC)
    write_audit(db, action="auth.login.success", entity_type="user", entity_id=user.id, actor_id=user.id, request=request)
    db.commit()
    response.set_cookie(
        key=settings.cookie_name,
        value=create_token(settings, user.id, user.role),
        httponly=True,
        secure=settings.cookie_secure,
        samesite="lax",
        max_age=settings.token_hours * 60 * 60,
        path="/",
    )
    return user


@router.post("/logout", status_code=204)
def logout(response: Response, settings: Settings = Depends(get_settings)) -> None:
    response.delete_cookie(settings.cookie_name, path="/")


@router.get("/me", response_model=AdminOut)
def me(user: User = Depends(get_current_admin)) -> User:
    return user
