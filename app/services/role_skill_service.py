from sqlalchemy.orm import Session

from app.models.roles_model import Role
from app.models.skill_model import Skill
from app.models.role_skill_model import RoleSkill


def assign_skill_to_role(role_id: int, skill_id: int, db: Session):

    role = db.query(Role).filter(Role.id == role_id).first()
    if not role:
        return None, "Role not found"

    skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if not skill:
        return None, "Skill not found"

    existing = (
        db.query(RoleSkill)
        .filter(
            RoleSkill.role_id == role_id,
            RoleSkill.skill_id == skill_id
        )
        .first()
    )

    if existing:
        return None, "Skill already assigned"

    assignment = RoleSkill(
        role_id=role_id,
        skill_id=skill_id
    )

    db.add(assignment)
    db.commit()

    return assignment, None
def get_skills_by_role(role_id: int, db: Session):

    role = db.query(Role).filter(Role.id == role_id).first()

    if not role:
        return None

    return role.skills
def get_roles_by_skill(skill_id: int, db: Session):

    skill = db.query(Skill).filter(Skill.id == skill_id).first()

    if not skill:
        return None

    return skill.roles