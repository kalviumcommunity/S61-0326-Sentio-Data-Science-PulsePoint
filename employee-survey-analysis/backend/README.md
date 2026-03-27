# FastAPI + PostgreSQL Backend

This backend provides authentication endpoints for the PulsePoint frontend and stores user records in PostgreSQL.

## Stack

- FastAPI
- SQLAlchemy
- PostgreSQL
- JWT access tokens
- Password hashing with bcrypt

## Endpoints

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /health`

## Local Setup

1. Create a backend environment file from `.env.example`.
2. From the `employee-survey-analysis` folder, start PostgreSQL:

   ```bash
   docker compose up -d postgres
   ```

3. From the `backend` folder, install Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. From the `backend` folder, run the API:

   ```bash
   uvicorn app.main:app --reload
   ```

The API will start on `http://127.0.0.1:8000`, and the `users` table will be created automatically on startup.
