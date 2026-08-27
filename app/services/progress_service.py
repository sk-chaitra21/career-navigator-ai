from sqlalchemy.orm import Session

from app.models.progress_model import SkillProgress
from app.models.roles_model import Role
from app.models.skill_model import Skill


def update_skill_progress(
    user_id: int,
    role_id: int,
    skill_id: int,
    completed: bool,
    db: Session
):

    # Check role exists
    role = (
        db.query(Role)
        .filter(Role.id == role_id)
        .first()
    )

    if not role:
        return None


    # Check skill exists
    skill = (
        db.query(Skill)
        .filter(Skill.id == skill_id)
        .first()
    )

    if not skill:
        return None


    # Check if progress already exists
    progress = (
        db.query(SkillProgress)
        .filter(
            SkillProgress.user_id == user_id,
            SkillProgress.role_id == role_id,
            SkillProgress.skill_id == skill_id
        )
        .first()
    )


    # Update existing progress
    if progress:

        progress.completed = completed

    # Create new progress
    else:

        progress = SkillProgress(
            user_id=user_id,
            role_id=role_id,
            skill_id=skill_id,
            completed=completed
        )

        db.add(progress)


    db.commit()
    db.refresh(progress)

    return progress


def get_role_progress(
    user_id: int,
    role_id: int,
    db: Session
):

    return (
        db.query(SkillProgress)
        .filter(
            SkillProgress.user_id == user_id,
            SkillProgress.role_id == role_id
        )
        .all()
    )