from sqlalchemy.orm import Session

from app.models.roadmap_model import Roadmap
from app.models.roles_model import Role
from app.schemas.roadmap_schema import RoadmapCreate


def get_all_roadmaps(db: Session):
    return db.query(Roadmap).order_by(Roadmap.step_order).all()


def get_roadmap_by_id(roadmap_id: int, db: Session):
    return (
        db.query(Roadmap)
        .filter(Roadmap.id == roadmap_id)
        .first()
    )
def get_roadmaps_by_role(role_id: int, db: Session):
    return (
        db.query(Roadmap)
        .filter(Roadmap.role_id == role_id)
        .order_by(Roadmap.step_order)
        .all()
    )


def create_roadmap(roadmap: RoadmapCreate, db: Session):

    role = (
        db.query(Role)
        .filter(Role.id == roadmap.role_id)
        .first()
    )

    if not role:
        return None

    new_roadmap = Roadmap(
    title=roadmap.title,
    description=roadmap.description,
    step_order=roadmap.step_order,
    role_id=roadmap.role_id
)

    db.add(new_roadmap)
    db.commit()
    db.refresh(new_roadmap)

    return new_roadmap


def update_roadmap(
    roadmap_id: int,
    roadmap: RoadmapCreate,
    db: Session
):

    existing = (
        db.query(Roadmap)
        .filter(Roadmap.id == roadmap_id)
        .first()
    )

    if not existing:
        return None

    existing.title = roadmap.title
    existing.description = roadmap.description
    existing.step_order = roadmap.step_order
    existing.role_id = roadmap.role_id

    db.commit()
    db.refresh(existing)

    return existing


def delete_roadmap(roadmap_id: int, db: Session):

    roadmap = (
        db.query(Roadmap)
        .filter(Roadmap.id == roadmap_id)
        .first()
    )

    if not roadmap:
        return None

    db.delete(roadmap)
    db.commit()

    return roadmap