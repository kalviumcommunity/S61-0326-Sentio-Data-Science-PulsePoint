from datetime import datetime, timedelta, timezone
from secrets import token_urlsafe

from google.auth.transport import requests as google_requests
from google.oauth2 import id_token as google_id_token
from jose import jwt
from passlib.context import CryptContext

from app.config import get_settings


# Use pbkdf2_sha256 to avoid bcrypt backend incompatibilities on newer Python stacks.
pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")
settings = get_settings()


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def generate_random_password_hash() -> str:
    return hash_password(token_urlsafe(32))


def verify_google_credential(credential: str):
    if not settings.google_client_id:
        raise ValueError("Google authentication is not configured on the server.")

    return google_id_token.verify_oauth2_token(
        credential,
        google_requests.Request(),
        settings.google_client_id,
    )


def create_access_token(subject: str) -> str:
    expires_at = datetime.now(timezone.utc) + timedelta(
        minutes=settings.access_token_expire_minutes
    )
    payload = {"sub": subject, "exp": expires_at}
    return jwt.encode(payload, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)
