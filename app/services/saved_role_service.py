from sqlalchemy.orm import Session

from app.models.saved_role_model import SavedRole
from app.models.roles_model import Role


def save_role(user_id: int, role_id: int, db: Session):

    role = db.query(Role).filter(Role.id == role_id).first()

    if not role:
        return None

    existing = (
        db.query(SavedRole)
        .filter(
            SavedRole.user_id == user_id,
            SavedRole.role_id == role_id
        )
        .first()
    )

    if existing:
        return existing

    saved = SavedRole(
        user_id=user_id,
        role_id=role_id
    )

    db.add(saved)
    db.commit()

    return saved


def get_saved_roles(user_id: int, db: Session):

    return (
        db.query(Role)
        .join(SavedRole)
        .filter(SavedRole.user_id == user_id)
        .all()
    )


def remove_saved_role(user_id: int, role_id: int, db: Session):

    saved = (
        db.query(SavedRole)
        .filter(
            SavedRole.user_id == user_id,
            SavedRole.role_id == role_id
        )
        .first()
    )

    if not saved:
        return None

    db.delete(saved)
    db.commit()

    return saved