from sqlalchemy.orm import Session

from app.models.roles_model import Role
from app.schemas.recommendation_schema import (
    RecommendationResponse
)


CAREER_RULES = {
    "Backend Developer": [
        "Python",
        "SQL",
        "FastAPI",
        "Git"
    ],

    "Frontend Developer": [
        "HTML",
        "CSS",
        "JavaScript",
        "React"
    ],

    "Data Scientist": [
        "Python",
        "SQL",
        "Machine Learning",
        "Pandas"
    ],

    "DevOps Engineer": [
        "Linux",
        "Docker",
        "Git",
        "AWS"
    ],

    "Cyber Security Engineer": [
        "Networking",
        "Linux",
        "Python",
        "Ethical Hacking"
    ]
}


def recommend_careers(
    user_skills: list[str],
    db: Session
):

    recommendations = []

    user_skill_names = [
        skill.lower()
        for skill in user_skills
    ]

    for role_title, required_skills in CAREER_RULES.items():

        role = (
            db.query(Role)
            .filter(Role.title == role_title)
            .first()
        )

        if not role:
            continue

        matched = []

        for skill in required_skills:

            if skill.lower() in user_skill_names:
                matched.append(skill)

        percentage = int(
            len(matched)
            / len(required_skills)
            * 100
        )

        if percentage > 0:

            recommendations.append(
                RecommendationResponse(
                    role_id=role.id,
                    role=role.title,
                    match_percentage=percentage,
                    matched_skills=matched
                )
            )

    recommendations.sort(
        key=lambda x: x.match_percentage,
        reverse=True
    )

    return recommendations