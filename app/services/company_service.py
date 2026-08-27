from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.company_model import Company
from app.schemas.company_schema import CompanyCreate


def get_all_companies(db: Session):
    return db.query(Company).all()


def get_company_by_id(db: Session, company_id: int):
    company = db.query(Company).filter(Company.id == company_id).first()

    if not company:
        raise HTTPException(
            status_code=404,
            detail="Company not found"
        )

    return company


# NEW
def get_companies_by_role(role_id: int, db: Session):
    return (
        db.query(Company)
        .filter(Company.role_id == role_id)
        .all()
    )


def create_company(db: Session, company: CompanyCreate):
    existing_company = (
        db.query(Company)
        .filter(Company.name == company.name)
        .first()
    )

    if existing_company:
        raise HTTPException(
            status_code=400,
            detail="Company already exists"
        )

    new_company = Company(**company.model_dump())

    db.add(new_company)
    db.commit()
    db.refresh(new_company)

    return new_company


def update_company(db: Session, company_id: int, company: CompanyCreate):
    existing_company = get_company_by_id(db, company_id)

    existing_company.name = company.name
    existing_company.location = company.location
    existing_company.website = company.website
    existing_company.role_id = company.role_id

    db.commit()
    db.refresh(existing_company)

    return existing_company


def delete_company(db: Session, company_id: int):
    existing_company = get_company_by_id(db, company_id)

    db.delete(existing_company)
    db.commit()

    return {
        "message": "Company deleted successfully"
    }