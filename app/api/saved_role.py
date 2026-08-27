from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.security import get_current_user
from app.database.db import get_db
from app.models.user_model import User
from app.schemas.role_schema import RoleResponse
from app.services.saved_role_service import (
    save_role,
    get_saved_roles,
    remove_saved_role
)

router = APIRouter(
    tags=["Saved Roles"]
)


# Save a role
@router.post(
    "/saved-roles/{role_id}",
    status_code=status.HTTP_201_CREATED,
    summary="Save a role"
)
def save_role_api(
    role_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    save_role(
        current_user.id,
        role_id,
        db
    )

    return {
        "message": "Role saved successfully"
    }


# Get all saved roles
@router.get(
    "/saved-roles",
    response_model=list[RoleResponse],
    summary="Get all saved roles"
)
def read_saved_roles(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return get_saved_roles(
        current_user.id,
        db
    )


# Remove a saved role
@router.delete(
    "/saved-roles/{role_id}",
    summary="Remove saved role"
)
def delete_saved_role(
    role_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    remove_saved_role(
        current_user.id,
        role_id,
        db
    )

    return {
        "message": "Saved role removed successfully"
    }