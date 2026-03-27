# FastAPI + PostgreSQL Backend

This backend provides authentication endpoints for the PulsePoint frontend and stores user records in PostgreSQL.

## Stack

- FastAPI
- SQLAlchemy
- PostgreSQL
- JWT access tokens
- Password hashing with Passlib
- Google Identity Services + verified Google ID tokens

## Endpoints

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/google`
- `GET /health`

## Google Sign-In Setup

1. Create a Google OAuth 2.0 Web Client in Google Cloud.
2. Add `http://localhost:5173` as an Authorized JavaScript origin.
3. Copy the same client ID into:
   - `backend/.env` as `GOOGLE_CLIENT_ID`
   - `frontend/.env` as `VITE_GOOGLE_CLIENT_ID`
4. Restart both servers after updating the env files.

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
