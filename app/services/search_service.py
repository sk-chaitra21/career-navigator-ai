from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.models.roles_model import Role
from app.models.skill_model import Skill
from app.models.course_model import Course


def search_all(query: str, db: Session):

    search_text = f"%{query}%"

    results = []

    # =========================
    # SEARCH ROLES
    # =========================

    roles = (
        db.query(Role)
        .filter(
            or_(
                Role.title.ilike(search_text),
                Role.description.ilike(search_text)
            )
        )
        .all()
    )

    for role in roles:

        results.append({
            "type": "role",
            "id": role.id,
            "title": role.title,
            "description": role.description
        })


    # =========================
    # SEARCH SKILLS
    # =========================

    skills = (
        db.query(Skill)
        .filter(
            or_(
                Skill.name.ilike(search_text),
                Skill.description.ilike(search_text)
            )
        )
        .all()
    )

    for skill in skills:

        results.append({
            "type": "skill",
            "id": skill.id,
            "title": skill.name,
            "description": skill.description
        })


    # =========================
    # SEARCH COURSES
    # =========================

    courses = (
        db.query(Course)
        .filter(
            or_(
                Course.title.ilike(search_text),
                Course.provider.ilike(search_text),
                Course.level.ilike(search_text)
            )
        )
        .all()
    )

    for course in courses:

        results.append({
            "type": "course",
            "id": course.id,
            "title": course.title,
            "description": (
                f"{course.provider} • "
                f"{course.duration} • "
                f"{course.level}"
            )
        })


    return results