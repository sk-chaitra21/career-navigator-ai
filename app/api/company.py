from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.security import get_current_admin
from app.database.db import get_db
from app.schemas.company_schema import (
    CompanyCreate,
    CompanyResponse
)
from app.services.company_service import (
    get_all_companies,
    get_company_by_id,
    get_companies_by_role,
    create_company,
    update_company,
    delete_company
)

router = APIRouter(
    tags=["Companies"]
)


# Get all companies
@router.get(
    "/companies",
    response_model=list[CompanyResponse]
)
def read_companies(
    db: Session = Depends(get_db)
):
    return get_all_companies(db)


# NEW API
@router.get(
    "/companies/role/{role_id}",
    response_model=list[CompanyResponse]
)
def read_companies_by_role(
    role_id: int,
    db: Session = Depends(get_db)
):
    return get_companies_by_role(role_id, db)


# Get company by ID
@router.get(
    "/companies/{company_id}",
    response_model=CompanyResponse
)
def read_company(
    company_id: int,
    db: Session = Depends(get_db)
):
    return get_company_by_id(db, company_id)


# Create company
@router.post(
    "/companies",
    response_model=CompanyResponse,
    status_code=status.HTTP_201_CREATED
)
def create_company_api(
    company: CompanyCreate,
    db: Session = Depends(get_db)
):
    return create_company(db, company)


# Update company
@router.put(
    "/companies/{company_id}",
    response_model=CompanyResponse
)
def update_company_api(
    company_id: int,
    company: CompanyCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_admin)
):
    return update_company(db, company_id, company)


# Delete company
@router.delete("/companies/{company_id}")
def delete_company_api(
    company_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_admin)
):
    return delete_company(db, company_id)