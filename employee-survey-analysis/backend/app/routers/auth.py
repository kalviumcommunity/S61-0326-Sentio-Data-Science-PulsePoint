from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User
from app.schemas import AuthResponse, LoginRequest, SignupRequest
from app.security import (
    create_access_token,
    generate_random_password_hash,
    hash_password,
    verify_password,
)


router = APIRouter(prefix="/auth", tags=["auth"])


def build_auth_response(user: User, message: str) -> AuthResponse:
    from app.schemas import UserRead
    user_read = UserRead(
        id=user.id,
        email=user.email,
        full_name=user.full_name,
        is_active=True  # or set according to your model if you have an is_active field
    )
    return AuthResponse(
        access_token=create_access_token(str(user.id)),
        message=message,
        user=user_read,
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
