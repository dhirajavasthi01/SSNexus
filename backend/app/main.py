import logging
from contextlib import asynccontextmanager
from uuid import uuid4

from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.routes import admin, auth, contacts, health, payments
from app.core.config import get_settings
from app.core.security import hash_password, verify_password
from app.db.base import Base
from app.db.session import SessionLocal, engine
from app.models.user import User

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s %(message)s")
logger = logging.getLogger("ssnexus")

settings = get_settings()
@asynccontextmanager
async def lifespan(_app: FastAPI):
    try:
        if settings.environment == "test":
            Base.metadata.create_all(bind=engine)
        else:
            _upgrade()
        _seed_admin(SessionLocal())
    except BaseException:
        import traceback

        traceback.print_exc()
        raise
    yield


app = FastAPI(title="SS Nexus API", version="1.0.0", docs_url="/docs", redoc_url=None, lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PATCH", "DELETE"],
    allow_headers=["Content-Type"],
)


@app.middleware("http")
async def security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "no-referrer"
    response.headers["Cache-Control"] = "no-store"
    return response


@app.exception_handler(HTTPException)
async def http_error(_request: Request, exc: HTTPException) -> JSONResponse:
    message = exc.detail if isinstance(exc.detail, str) else "The request could not be completed."
    return JSONResponse(status_code=exc.status_code, content={"message": message})


@app.exception_handler(RequestValidationError)
async def validation_error(_request: Request, exc: RequestValidationError) -> JSONResponse:
    message = "Check the submitted details."
    errors = exc.errors()
    if errors:
        detail = errors[0].get("msg")
        if isinstance(detail, str):
            message = detail.removeprefix("Value error, ")
    return JSONResponse(status_code=422, content={"message": message})


@app.exception_handler(Exception)
async def unexpected_error(request: Request, exc: Exception) -> JSONResponse:
    logger.exception("Unhandled error on %s", request.url.path)
    return JSONResponse(status_code=500, content={"message": "The request could not be completed."})


for route in (health.router, contacts.router, auth.router, admin.router, payments.router):
    app.include_router(route, prefix="/api/v1")


def _upgrade() -> None:
    from alembic import command
    from alembic.config import Config

    config = Config("alembic.ini")
    config.set_main_option("sqlalchemy.url", settings.database_url)
    command.upgrade(config, "head")


def _seed_admin(db: Session) -> None:
    try:
        existing = db.scalar(select(User).where(User.email == settings.admin_email.lower()))
        if existing is not None:
            if settings.environment != "production" and not verify_password(settings.admin_password, existing.password_hash):
                existing.password_hash = hash_password(settings.admin_password)
                db.commit()
                logger.info("Updated the development admin password from the environment.")
            return
        from datetime import UTC, datetime

        db.add(
            User(
                id=str(uuid4()),
                email=settings.admin_email.lower(),
                password_hash=hash_password(settings.admin_password),
                role="admin",
                is_active=True,
                created_at=datetime.now(UTC),
            )
        )
        db.commit()
        logger.info("Seeded the initial admin account.")
    finally:
        db.close()
