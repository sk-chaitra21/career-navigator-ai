from fastapi import APIRouter, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.security import get_current_user
from app.database.db import get_db
from app.schemas.user_schema import UserCreate, UserResponse
from app.services.user_service import (
    create_user,
    login_user
)

router = APIRouter(
    tags=["Authentication"]
)


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user"
)
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    return create_user(db, user)


@router.post(
    "/login",
    summary="Login user"
)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    return login_user(db, form_data)


@router.get(
    "/me",
    response_model=UserResponse,
    summary="Get current user"
)
def get_me(
    current_user=Depends(get_current_user)
):
    return current_user