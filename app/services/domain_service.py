from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.domain_model import Domain
from app.schemas.domain_schema import DomainCreate


def get_all_domains(db: Session):
    return db.query(Domain).all()


def get_domain_by_id(db: Session, domain_id: int):
    domain = (
        db.query(Domain)
        .filter(Domain.id == domain_id)
        .first()
    )

    if not domain:
        raise HTTPException(
            status_code=404,
            detail="Domain not found"
        )

    return domain


def create_domain(db: Session, domain: DomainCreate):
    existing_domain = (
        db.query(Domain)
        .filter(Domain.name == domain.name)
        .first()
    )

    if existing_domain:
        raise HTTPException(
            status_code=400,
            detail="Domain already exists"
        )

    new_domain = Domain(**domain.model_dump())

    db.add(new_domain)
    db.commit()
    db.refresh(new_domain)

    return new_domain


def update_domain(db: Session, domain_id: int, domain: DomainCreate):
    existing_domain = get_domain_by_id(db, domain_id)

    existing_domain.name = domain.name
    existing_domain.description = domain.description

    db.commit()
    db.refresh(existing_domain)

    return existing_domain


def delete_domain(db: Session, domain_id: int):
    existing_domain = get_domain_by_id(db, domain_id)

    db.delete(existing_domain)
    db.commit()

    return {
        "message": "Domain deleted successfully"
    }