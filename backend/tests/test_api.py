from app.models.audit import AuditLog
from app.models.payment import PaymentRequest
from sqlalchemy import select

from app.db.session import SessionLocal


def _login(client):
    response = client.post("/api/v1/auth/login", json={"email": "admin@example.com", "password": "test-admin-pass"})
    assert response.status_code == 200
    return response


def test_contact_is_stored_and_hidden_until_login(client):
    created = client.post(
        "/api/v1/contacts",
        json={
            "full_name": "Asha Mehta",
            "email": "asha@example.com",
            "phone": "+971501234567",
            "company": "Northwind",
            "country": "United Arab Emirates",
            "solution": "pay-in",
            "volume": "",
            "message": "We would like to discuss AED collections.",
        },
    )
    assert created.status_code == 201
    body = created.json()
    assert body["status"] == "new"
    assert body["created_at"]
    assert "password" not in body

    hidden = client.get("/api/v1/admin/contacts")
    assert hidden.status_code == 401

    _login(client)
    listed = client.get("/api/v1/admin/contacts", params={"q": "Asha"})
    assert listed.status_code == 200
    assert listed.json()["total"] == 1

    contact_id = body["id"]
    updated = client.patch(f"/api/v1/admin/contacts/{contact_id}", json={"status": "in_review"})
    assert updated.status_code == 200
    assert updated.json()["status"] == "in_review"

    db = SessionLocal()
    try:
        audit = db.scalar(select(AuditLog).where(AuditLog.action == "contact.status_changed"))
        assert audit is not None
        assert "in_review" in audit.detail
    finally:
        db.close()


def test_payment_rejects_card_data_and_does_not_move_money(client):
    rejected = client.post(
        "/api/v1/payments/pay-in",
        json={
            "amount": "25.00",
            "email": "payer@example.com",
            "reference": "Invoice 9",
            "method": "card",
            "card_number": "4242424242424242",
        },
    )
    assert rejected.status_code == 422

    created = client.post(
        "/api/v1/payments/pay-in",
        json={"amount": "25.00", "email": "payer@example.com", "reference": "Invoice 9", "method": "google_pay"},
        headers={"Idempotency-Key": "attempt-google-pay-0001"},
    )
    assert created.status_code == 201
    payment = created.json()
    assert payment["status"] == "recorded"
    assert payment["currency"] == "AED"
    assert "card" not in payment["message"].lower() or "no card number" in payment["message"].lower()
    assert "approve_url" not in payment or payment["approve_url"] is None

    payout = client.post(
        "/api/v1/payments/pay-out",
        json={
            "amount": "40.00",
            "beneficiary_name": "Marina Trading LLC",
            "reference": "Supplier",
            "destination": "uae_iban",
            "iban": "AE070331234567890123456",
        },
        headers={"Idempotency-Key": "attempt-payout-iban-0001"},
    )
    assert payout.status_code == 201
    saved = payout.json()
    assert saved["status"] == "recorded"
    assert "3456" in saved["destination_masked"]
    assert "1234567890123456" not in saved["destination_masked"]

    db = SessionLocal()
    try:
        row = db.get(PaymentRequest, saved["id"])
        assert row is not None
        assert row.destination_ciphertext
        assert "AE070331234567890123456" not in row.destination_ciphertext
    finally:
        db.close()

    _login(client)
    admin_view = client.get("/api/v1/admin/payments")
    assert admin_view.status_code == 200
    assert admin_view.json()["total"] >= 1
    assert "destination_ciphertext" not in admin_view.text


def test_repeating_a_payment_does_not_create_a_second_one(client):
    payload = {"amount": "25.00", "email": "payer@example.com", "reference": "Invoice 9", "method": "card"}
    headers = {"Idempotency-Key": "attempt-repeat-000001"}
    first = client.post("/api/v1/payments/pay-in", json=payload, headers=headers)
    second = client.post("/api/v1/payments/pay-in", json=payload, headers=headers)
    assert first.status_code == 201
    assert second.status_code == 200
    assert first.json()["id"] == second.json()["id"]

    changed = dict(payload)
    changed["amount"] = "30.00"
    conflict = client.post("/api/v1/payments/pay-in", json=changed, headers=headers)
    assert conflict.status_code == 409


def test_failed_login_is_rejected(client):
    response = client.post("/api/v1/auth/login", json={"email": "admin@example.com", "password": "wrong-password"})
    assert response.status_code == 401
    assert "password_hash" not in response.text
