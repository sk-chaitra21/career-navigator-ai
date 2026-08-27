from fastapi import HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.security import (
    get_password_hash,
    verify_password,
    create_access_token
)
from app.models.user_model import User
from app.schemas.user_schema import UserCreate


def get_user_by_email(
    db: Session,
    email: str
):
    return db.query(User).filter(
        User.email == email
    ).first()


def create_user(
    db: Session,
    user: UserCreate
):
    existing_user = get_user_by_email(
        db,
        user.email
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )
    new_user = User(
    name=user.name,
    email=user.email,
    hashed_password=get_password_hash(user.password),
    role="student"
)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


def login_user(
    db: Session,
    form_data: OAuth2PasswordRequestForm
):
    # Find user by email
    user = get_user_by_email(
        db,
        form_data.username
    )

    print("\n========== LOGIN DEBUG ==========")
    print("Email Entered :", form_data.username)
    print("User Found    :", user)

    if user:
        print("Stored Email  :", user.email)
        print("Stored Hash   :", user.hashed_password)

    if not user:
        print("❌ User not found")
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    password_match = verify_password(
        form_data.password,
        user.hashed_password
    )

    print("Entered Password :", form_data.password)
    print("Password Match   :", password_match)

    if not password_match:
        print("❌ Password verification failed")
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    access_token = create_access_token(
        data={
            "sub": user.email
        }
    )

    print("✅ Login Successful")
    print("================================\n")

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }