# SS Nexus

Dubai / UAE payment site. The React app records AED collection and payout requests. Money moves only after PayPal or a licensed UAE acquirer is configured in `backend/.env`. Until those values are set, a payment stays **recorded** and no transfer is sent.

## Run the application

Use three terminals from the project root. On this machine the site is [http://127.0.0.1:5175](http://127.0.0.1:5175) and the API is [http://127.0.0.1:8001](http://127.0.0.1:8001). Port 5173 is a different application, and port 8000 is already taken.

### Database

PostgreSQL must be listening on port **5433**, database `ssnexus`, user `ssnexus`. The project cluster lives in `backend/.pgdata` (trust authentication, not committed).

```powershell
& "C:\Program Files\PostgreSQL\18\bin\pg_ctl.exe" -D "D:\project_py\SSNexus\SSNexus\backend\.pgdata" -o "-p 5433" start
```

The first time that folder does not exist:

```powershell
& "C:\Program Files\PostgreSQL\18\bin\initdb.exe" -D "D:\project_py\SSNexus\SSNexus\backend\.pgdata" -U ssnexus --auth=trust
& "C:\Program Files\PostgreSQL\18\bin\pg_ctl.exe" -D "D:\project_py\SSNexus\SSNexus\backend\.pgdata" -o "-p 5433" start
& "C:\Program Files\PostgreSQL\18\bin\createdb.exe" -p 5433 -U ssnexus ssnexus
```

### Backend

```powershell
cd D:\project_py\SSNexus\SSNexus\backend
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt -r requirements-dev.txt
Copy-Item .env.example .env
.\.venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8001
```

Skip `Copy-Item` when `backend/.env` already exists. Starting the API applies database migrations and creates the admin user from `ADMIN_EMAIL` and `ADMIN_PASSWORD`.

Admin sign-in: [http://127.0.0.1:5175/admin/login](http://127.0.0.1:5175/admin/login)

API checks:

```powershell
.\.venv\Scripts\python.exe -m pytest
```

### Frontend

```powershell
cd D:\project_py\SSNexus\SSNexus
npm install
npm run dev -- --host 127.0.0.1 --port 5175
```

Vite sends `/api` to `http://127.0.0.1:8001`. Collection and payout pages:

- [http://127.0.0.1:5175/pay/collect](http://127.0.0.1:5175/pay/collect)
- [http://127.0.0.1:5175/pay/disburse](http://127.0.0.1:5175/pay/disburse)

## Documents required before real credentials

A provider will not issue live keys from an empty form. Keep these off the website and out of git. They are the papers and account approvals behind the environment values.

| Document or approval | Who issues it | What it unlocks |
| --- | --- | --- |
| UAE trade license, legal company name, and registered address | Department of Economy and Tourism, or the relevant free zone | PayPal Business and acquirer onboarding |
| Company bank letter with an AED IBAN in that legal name | The company's UAE bank | Settlement account for collected funds. This app does not send a UAE bank transfer from the IBAN field |
| Acquirer merchant agreement, merchant ID, and hosted checkout URL | A CBUAE-licensed acquirer | Card and Google Pay checkout. Card numbers stay on the acquirer's page |
| CBUAE retail payment services approval, only if SS Nexus itself holds or moves customer funds | Central Bank of the UAE, licensing@cbuae.gov.ae | The alternative to contracting a licensed acquirer. A UAE lawyer should confirm the category |
| PayPal Business account with AED enabled, then a REST app | PayPal Developer | `PAYPAL_CLIENT_ID` and `PAYPAL_CLIENT_SECRET` |
| Public HTTPS site address | The hosting provider | PayPal return URL and the production cookie |

Create the PayPal REST app in the sandbox first. Move the same account to live only after a sandbox collection and payout succeed. PhonePe is not a UAE method on this site and has no environment value.

## Environment values for a real payment

Put these in `backend/.env`. Do not commit that file, and do not put card numbers, CVVs, or a full customer IBAN in it.

```powershell
.\.venv\Scripts\python.exe -c "import secrets; print(secrets.token_urlsafe(48))"
.\.venv\Scripts\python.exe -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"
```

Use the first result for `SECRET_KEY` and the second for `SETTLEMENT_ENCRYPTION_KEY`.

| Variable | Real value |
| --- | --- |
| `ENVIRONMENT` | `production` on the live server. Keep `development` on this PC |
| `DATABASE_URL` | `postgresql+psycopg://ssnexus@127.0.0.1:5433/ssnexus` for the local trust cluster. Add the password when Postgres requires one |
| `SECRET_KEY` | At least 32 random characters in production |
| `ADMIN_EMAIL` | A real inbox, not a `.local` address |
| `ADMIN_PASSWORD` | At least 12 characters. The placeholder `change-this-admin-password` is rejected in production |
| `COOKIE_SECURE` | `true` in production, and the site must be served over HTTPS |
| `CORS_ORIGINS` | The public site origin, for example `https://your-domain` |
| `PUBLIC_SITE_URL` | The same public HTTPS origin. PayPal uses it as the return address. Locally this is `http://127.0.0.1:5175` |
| `PAYPAL_CLIENT_ID` | REST app client id from the PayPal developer dashboard |
| `PAYPAL_CLIENT_SECRET` | REST app secret from that same app |
| `PAYPAL_API_BASE` | `https://api-m.sandbox.paypal.com` while testing. `https://api-m.paypal.com` only for live charges |
| `ACQUIRER_CHECKOUT_URL` | The acquirer's hosted checkout URL, starting with `https://` |
| `SETTLEMENT_ENCRYPTION_KEY` | The Fernet key generated above. It encrypts payout destinations. Production refuses to start without it |

After changing `backend/.env`, stop the API and start uvicorn again.

Filling these values does not by itself settle a UAE bank payout. PayPal collections are marked paid only after PayPal capture returns completed. PayPal payouts are marked submitted when PayPal accepts the batch, which is not the same as funds in the beneficiary account. Card and Google Pay open the acquirer page and stay unpaid until that provider confirms the payment. A UAE IBAN is checked and stored encrypted; this application does not transmit that transfer.
