from sqlalchemy.orm import Session

from app.models.progress_model import SkillProgress
from app.models.roles_model import Role

from app.services.gemini_service import (
    generate_skill_gap_analysis
)


def get_skill_gap(
    role_id: int,
    user_id: int,
    db: Session
):

    # Get role
    role = (
        db.query(Role)
        .filter(Role.id == role_id)
        .first()
    )

    if not role:
        return None

    # Get all skills required by this role
    required_skills = role.skills

    # Get completed skills for this user and role
    progress_records = (
        db.query(SkillProgress)
        .filter(
            SkillProgress.user_id == user_id,
            SkillProgress.role_id == role_id,
            SkillProgress.completed == True
        )
        .all()
    )

    completed_skill_ids = {
        progress.skill_id
        for progress in progress_records
    }

    completed_skills = []
    missing_skills = []

    for skill in required_skills:

        if skill.id in completed_skill_ids:
            completed_skills.append(skill.name)

        else:
            missing_skills.append(skill.name)

    # Calculate match percentage
    total_skills = len(required_skills)

    if total_skills == 0:
        match_percentage = 0
    else:
        match_percentage = int(
            len(completed_skills)
            / total_skills
            * 100
        )

    # Generate AI analysis
    ai_analysis = generate_skill_gap_analysis(
        role=role.title,
        completed_skills=completed_skills,
        missing_skills=missing_skills
    )

    return {
        "role_id": role.id,
        "role": role.title,
        "completed_skills": completed_skills,
        "missing_skills": missing_skills,
        "match_percentage": match_percentage,
        "ai_analysis": ai_analysis
    }