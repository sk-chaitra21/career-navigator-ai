from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.roles_model import Role
from app.schemas.role_schema import RoleCreate


def get_all_roles(db: Session):
    return db.query(Role).all()


def get_role_by_id(role_id: int, db: Session):
    role = (
        db.query(Role)
        .filter(Role.id == role_id)
        .first()
    )

    if not role:
        raise HTTPException(
            status_code=404,
            detail="Role not found"
        )

    return role


# NEW FUNCTION
def get_roles_by_domain(domain_id: int, db: Session):
    roles = (
        db.query(Role)
        .filter(Role.domain_id == domain_id)
        .all()
    )

    return roles


def create_role(role: RoleCreate, db: Session):
    new_role = Role(**role.model_dump())

    db.add(new_role)
    db.commit()
    db.refresh(new_role)

    return new_role


def update_role(role_id: int, role: RoleCreate, db: Session):
    db_role = get_role_by_id(role_id, db)

    for key, value in role.model_dump().items():
        setattr(db_role, key, value)

    db.commit()
    db.refresh(db_role)

    return db_role


def delete_role(role_id: int, db: Session):
    db_role = get_role_by_id(role_id, db)

    db.delete(db_role)
    db.commit()

    return {
        "message": "Role deleted successfully"
    }