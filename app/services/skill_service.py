from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.skill_model import Skill
from app.models.role_skill_model import RoleSkill
from app.schemas.skill_schema import SkillCreate


def get_all_skills(db: Session):
    return db.query(Skill).all()


def get_skill_by_id(skill_id: int, db: Session):
    skill = (
        db.query(Skill)
        .filter(Skill.id == skill_id)
        .first()
    )

    if not skill:
        raise HTTPException(
            status_code=404,
            detail="Skill not found"
        )

    return skill


# Get all skills required for a specific role
def get_skills_by_role(role_id: int, db: Session):
    skills = (
        db.query(Skill)
        .join(
            RoleSkill,
            Skill.id == RoleSkill.skill_id
        )
        .filter(
            RoleSkill.role_id == role_id
        )
        .all()
    )

    return skills


def create_skill(skill: SkillCreate, db: Session):
    existing_skill = (
        db.query(Skill)
        .filter(Skill.name == skill.name)
        .first()
    )

    if existing_skill:
        raise HTTPException(
            status_code=400,
            detail="Skill already exists"
        )

    new_skill = Skill(**skill.model_dump())

    db.add(new_skill)
    db.commit()
    db.refresh(new_skill)

    return new_skill


def update_skill(skill_id: int, skill: SkillCreate, db: Session):
    db_skill = get_skill_by_id(skill_id, db)

    for key, value in skill.model_dump().items():
        setattr(db_skill, key, value)

    db.commit()
    db.refresh(db_skill)

    return db_skill


def delete_skill(skill_id: int, db: Session):
    db_skill = get_skill_by_id(skill_id, db)

    db.delete(db_skill)
    db.commit()

    return {
        "message": "Skill deleted successfully"
    }