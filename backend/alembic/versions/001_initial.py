"""Initial admin, contact, payment, and audit tables."""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

revision: str = "001_initial"
down_revision: str | None = None
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "users",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("email", sa.String(255), nullable=False),
        sa.Column("password_hash", sa.String(255), nullable=False),
        sa.Column("role", sa.String(32), nullable=False),
        sa.Column("is_active", sa.Boolean(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("last_login_at", sa.DateTime(timezone=True), nullable=True),
    )
    op.create_index("ix_users_email", "users", ["email"], unique=True)
    op.create_table(
        "contacts",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("full_name", sa.String(120), nullable=False),
        sa.Column("email", sa.String(255), nullable=False),
        sa.Column("phone", sa.String(32), nullable=False),
        sa.Column("company", sa.String(160), nullable=False),
        sa.Column("country", sa.String(80), nullable=False),
        sa.Column("solution", sa.String(32), nullable=False),
        sa.Column("volume", sa.String(80), nullable=True),
        sa.Column("message", sa.Text(), nullable=False),
        sa.Column("status", sa.String(32), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
    )
    op.create_index("ix_contacts_email", "contacts", ["email"])
    op.create_index("ix_contacts_status", "contacts", ["status"])
    op.create_index("ix_contacts_created_at", "contacts", ["created_at"])
    op.create_table(
        "payment_requests",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("kind", sa.String(16), nullable=False),
        sa.Column("amount_minor", sa.Integer(), nullable=False),
        sa.Column("currency", sa.String(3), nullable=False),
        sa.Column("method", sa.String(32), nullable=False),
        sa.Column("reference", sa.String(40), nullable=False),
        sa.Column("status", sa.String(32), nullable=False),
        sa.Column("message", sa.Text(), nullable=False),
        sa.Column("email", sa.String(255), nullable=True),
        sa.Column("beneficiary_name", sa.String(80), nullable=True),
        sa.Column("destination_masked", sa.String(80), nullable=True),
        sa.Column("destination_ciphertext", sa.Text(), nullable=True),
        sa.Column("provider", sa.String(32), nullable=False),
        sa.Column("provider_reference", sa.String(80), nullable=True),
        sa.Column("approve_url", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
    )
    op.create_index("ix_payment_requests_kind", "payment_requests", ["kind"])
    op.create_index("ix_payment_requests_status", "payment_requests", ["status"])
    op.create_index("ix_payment_requests_created_at", "payment_requests", ["created_at"])
    op.create_table(
        "audit_logs",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("actor_id", sa.String(36), nullable=True),
        sa.Column("action", sa.String(80), nullable=False),
        sa.Column("entity_type", sa.String(40), nullable=False),
        sa.Column("entity_id", sa.String(36), nullable=True),
        sa.Column("ip_address", sa.String(64), nullable=True),
        sa.Column("detail", sa.Text(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
    )
    op.create_index("ix_audit_logs_actor_id", "audit_logs", ["actor_id"])
    op.create_index("ix_audit_logs_action", "audit_logs", ["action"])
    op.create_index("ix_audit_logs_created_at", "audit_logs", ["created_at"])


def downgrade() -> None:
    op.drop_table("audit_logs")
    op.drop_table("payment_requests")
    op.drop_table("contacts")
    op.drop_table("users")
