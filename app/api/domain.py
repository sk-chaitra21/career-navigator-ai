from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.security import get_current_admin
from app.database.db import get_db
from app.schemas.domain_schema import (
    DomainCreate,
    DomainResponse
)
from app.services.domain_service import (
    get_all_domains,
    get_domain_by_id,
    create_domain,
    update_domain,
    delete_domain
)

router = APIRouter(
    tags=["Domains"]
)


# Get all domains
@router.get(
    "/domains",
    response_model=list[DomainResponse],
    summary="Get all domains"
)
def read_domains(
    db: Session = Depends(get_db)
):
    return get_all_domains(db)


# Get domain by ID
@router.get(
    "/domains/{domain_id}",
    response_model=DomainResponse,
    summary="Get domain by ID"
)
def read_domain(
    domain_id: int,
    db: Session = Depends(get_db)
):
    return get_domain_by_id(db, domain_id)


# Create domain (Admin Only)
@router.post(
    "/domains",
    response_model=DomainResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create domain"
)
def create_domain_api(
    domain: DomainCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_admin)
):
    return create_domain(db, domain)


# Update domain (Admin Only)
@router.put(
    "/domains/{domain_id}",
    response_model=DomainResponse,
    summary="Update domain"
)
def update_domain_api(
    domain_id: int,
    domain: DomainCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_admin)
):
    return update_domain(db, domain_id, domain)


# Delete domain (Admin Only)
@router.delete(
    "/domains/{domain_id}",
    summary="Delete domain"
)
def delete_domain_api(
    domain_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_admin)
):
    return delete_domain(db, domain_id)