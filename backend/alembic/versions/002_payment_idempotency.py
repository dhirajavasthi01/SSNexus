"""Remember a payment attempt so a repeat does not create a second one."""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

revision: str = "002_payment_idempotency"
down_revision: str | None = "001_initial"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.add_column("payment_requests", sa.Column("idempotency_key", sa.String(80), nullable=True))
    op.add_column("payment_requests", sa.Column("request_fingerprint", sa.String(64), nullable=True))
    op.create_index("ix_payment_requests_idempotency_key", "payment_requests", ["idempotency_key"], unique=True)


def downgrade() -> None:
    op.drop_index("ix_payment_requests_idempotency_key", table_name="payment_requests")
    op.drop_column("payment_requests", "request_fingerprint")
    op.drop_column("payment_requests", "idempotency_key")
