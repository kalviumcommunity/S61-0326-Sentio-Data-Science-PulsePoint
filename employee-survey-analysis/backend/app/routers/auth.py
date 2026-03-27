from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User
from app.schemas import AuthResponse, GoogleAuthRequest, LoginRequest, SignupRequest
from app.security import (
    create_access_token,
    generate_random_password_hash,
    hash_password,
    verify_google_credential,
    verify_password,
)


router = APIRouter(prefix="/auth", tags=["auth"])


def build_auth_response(user: User, message: str) -> AuthResponse:
    return AuthResponse(
        access_token=create_access_token(str(user.id)),
        message=message,
        user=user,
    )


@router.post("/signup", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
def signup(payload: SignupRequest, db: Session = Depends(get_db)):
    existing_user = db.scalar(select(User).where(User.email == payload.email.lower()))
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists.",
        )

    user = User(
        full_name=payload.full_name.strip(),
        email=payload.email.lower(),
        hashed_password=hash_password(payload.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    return build_auth_response(user, "Account created successfully.")


@router.post("/login", response_model=AuthResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = db.scalar(select(User).where(User.email == payload.email.lower()))
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )

    return build_auth_response(user, "Login successful.")


@router.post("/google", response_model=AuthResponse)
def google_auth(payload: GoogleAuthRequest, db: Session = Depends(get_db)):
    try:
        google_user = verify_google_credential(payload.credential)
    except ValueError as exc:
        status_code = (
            status.HTTP_503_SERVICE_UNAVAILABLE
            if "configured" in str(exc).lower()
            else status.HTTP_401_UNAUTHORIZED
        )
        raise HTTPException(status_code=status_code, detail=str(exc)) from exc

    google_sub = google_user.get("sub")
    email = google_user.get("email")
    email_verified = google_user.get("email_verified")

    if not google_sub or not email or not email_verified:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Google did not return a verified email address.",
        )

    user = db.scalar(select(User).where(User.google_sub == google_sub))
    created = False

    if not user:
        user = db.scalar(select(User).where(User.email == email.lower()))
        if user and not user.google_sub:
            user.google_sub = google_sub
        elif user and user.google_sub != google_sub:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="This email is already linked to a different Google account.",
            )
        elif not user:
            display_name = (google_user.get("name") or email.split("@")[0]).strip()
            user = User(
                full_name=display_name,
                email=email.lower(),
                google_sub=google_sub,
                hashed_password=generate_random_password_hash(),
            )
            db.add(user)
            created = True

        db.commit()
        db.refresh(user)

    message = (
        "Account created successfully with Google."
        if created
        else "Signed in with Google successfully."
    )
    return build_auth_response(user, message)
