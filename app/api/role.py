from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.role_schema import (
    RoleCreate,
    RoleResponse
)
from app.services.role_service import (
    get_all_roles,
    get_role_by_id,
    get_roles_by_domain,
    create_role,
    update_role,
    delete_role
)

router = APIRouter(
    tags=["Roles"]
)


# Get all roles
@router.get(
    "/roles",
    response_model=list[RoleResponse],
    summary="Get all roles"
)
def read_roles(
    db: Session = Depends(get_db)
):
    return get_all_roles(db)


# NEW API
@router.get(
    "/roles/domain/{domain_id}",
    response_model=list[RoleResponse],
    summary="Get roles by domain"
)
def read_roles_by_domain(
    domain_id: int,
    db: Session = Depends(get_db)
):
    return get_roles_by_domain(domain_id, db)


# Get role by ID
@router.get(
    "/roles/{role_id}",
    response_model=RoleResponse,
    summary="Get role by ID"
)
def read_role(
    role_id: int,
    db: Session = Depends(get_db)
):
    return get_role_by_id(role_id, db)


# Create role
@router.post(
    "/roles",
    response_model=RoleResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create role"
)
def add_role(
    role: RoleCreate,
    db: Session = Depends(get_db)
):
    return create_role(role, db)


# Update role
@router.put(
    "/roles/{role_id}",
    response_model=RoleResponse,
    summary="Update role"
)
def edit_role(
    role_id: int,
    role: RoleCreate,
    db: Session = Depends(get_db)
):
    return update_role(role_id, role, db)


# Delete role
@router.delete(
    "/roles/{role_id}",
    summary="Delete role"
)
def remove_role(
    role_id: int,
    db: Session = Depends(get_db)
):
    return delete_role(role_id, db)