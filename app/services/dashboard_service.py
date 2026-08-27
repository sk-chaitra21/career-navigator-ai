from sqlalchemy.orm import Session

from app.models.domain_model import Domain
from app.models.roles_model import Role
from app.models.skill_model import Skill
from app.models.course_model import Course
from app.models.roadmap_model import Roadmap


def get_dashboard_data(db: Session):

    return {
        "total_domains": db.query(Domain).count(),
        "total_roles": db.query(Role).count(),
        "total_skills": db.query(Skill).count(),
        "total_courses": db.query(Course).count(),
        "total_roadmaps": db.query(Roadmap).count()
    }