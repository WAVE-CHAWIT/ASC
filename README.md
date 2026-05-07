# E-budget project FastAPI backend

Private FastAPI backend starter for the E-budget project.

## Security rules

- Keep this GitHub repository private.
- Never commit `.env`, API keys, passwords, tokens, database credentials, or private data.
- Use `.env.example` only to document required variable names with placeholder values.
- Work on feature branches and open pull requests. Do not merge directly into `main`.

## Project structure

```text
.
├── .env.example      # Placeholder-only environment variable names
├── .gitignore        # Prevents secrets, caches, builds, logs, and OS files from being committed
├── README.md         # Setup and development instructions
├── requirements.txt  # Python dependencies
└── app/
    ├── main.py       # FastAPI app and health check endpoint
    ├── api/          # API route modules
    ├── core/         # Core settings, configuration, and shared utilities
    ├── models/       # Data models and schemas
    └── services/     # Business logic and external service integrations
```

## Environment variables

Create a local `.env` file from the placeholder example when you need local values:

```bash
cp .env.example .env
```

Required variables documented in `.env.example`:

```env
DATABASE_URL=your_database_url_here
OPENAI_API_KEY=your_api_key_here
```

Replace placeholders only in your local `.env` file or in GitHub environment secrets. Do not commit real values.

## Local setup

1. Create and activate a Python virtual environment:

   ```bash
   python -m venv .venv
   source .venv/bin/activate
   ```

2. Install dependencies:

   ```bash
   python -m pip install -r requirements.txt
   ```

3. Start the development server:

   ```bash
   uvicorn app.main:app --reload
   ```

4. Open the health check endpoint:

   ```text
   http://127.0.0.1:8000/health
   ```

Expected response:

```json
{"status":"ok"}
```

## Basic checks

Run these before opening a pull request:

```bash
python -m compileall app
python - <<'PY'
from fastapi.testclient import TestClient
from app.main import app

response = TestClient(app).get('/health')
assert response.status_code == 200
assert response.json() == {'status': 'ok'}
PY
```
