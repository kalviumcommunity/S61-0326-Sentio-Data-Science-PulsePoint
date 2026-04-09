# FastAPI + PostgreSQL Backend

This backend provides authentication and dashboard endpoints for the PulsePoint frontend and stores user records in PostgreSQL.

## Stack

- FastAPI
- SQLAlchemy
- Alembic
- PostgreSQL
- JWT access tokens
- Password hashing with Passlib

## Endpoints

- `POST /api/v1/auth/signup`
- `POST /api/v1/auth/login`
- `GET /api/v1/dashboard/overview`
- `GET /health`

## Local Setup

1. Create a project-level `.env` file from `employee-survey-analysis/.env.example` for Docker Compose.
2. Create a backend environment file from `backend/.env.example`.
3. From the `employee-survey-analysis` folder, start PostgreSQL:

   ```bash
   docker compose up -d postgres
   ```

4. From the `backend` folder, install Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

5. From the `backend` folder, run the API:

   ```bash
   uvicorn app.main:app --reload
   ```

The API will start on `http://127.0.0.1:8000`, and the `users` plus dashboard tables will be created automatically on startup.

## Database Migrations

The backend now uses Alembic instead of `Base.metadata.create_all(...)`.

- Apply the latest schema manually with `alembic upgrade head`
- Create a new revision with `alembic revision -m "describe the change"`

On startup, the API runs `upgrade head` automatically. If your local database was created before Alembic was added, the app will stamp the existing schema so local development keeps working.

## Required Environment Variables

Set these keys in `backend/.env`:

- `DATABASE_URL`
- `FRONTEND_ORIGIN`
- `SECRET_KEY`
- `ALGORITHM`
- `ACCESS_TOKEN_EXPIRE_MINUTES`

Set these keys in the project-level `employee-survey-analysis/.env` for Docker Compose:

- `POSTGRES_DB`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
