from sqlalchemy.orm import Session

from app.models.course_model import Course
from app.models.roles_model import Role
from app.models.skill_model import Skill
from app.schemas.course_schema import CourseCreate


def get_all_courses(db: Session):
    return db.query(Course).all()


def get_course_by_id(course_id: int, db: Session):
    return db.query(Course).filter(Course.id == course_id).first()
def get_courses_by_skill(skill_id: int, db: Session):
    return (
        db.query(Course)
        .filter(Course.skill_id == skill_id)
        .all()
    )


def create_course(course: CourseCreate, db: Session):

    role = db.query(Role).filter(Role.id == course.role_id).first()
    skill = db.query(Skill).filter(Skill.id == course.skill_id).first()

    if not role or not skill:
        return None

    new_course = Course(
        title=course.title,
        provider=course.provider,
        duration=course.duration,
        level=course.level,
        role_id=course.role_id,
        skill_id=course.skill_id
    )

    db.add(new_course)
    db.commit()
    db.refresh(new_course)

    return new_course


def update_course(course_id: int, course: CourseCreate, db: Session):

    existing = db.query(Course).filter(Course.id == course_id).first()

    if not existing:
        return None

    existing.title = course.title
    existing.provider = course.provider
    existing.duration = course.duration
    existing.level = course.level
    existing.role_id = course.role_id
    existing.skill_id = course.skill_id

    db.commit()
    db.refresh(existing)

    return existing


def delete_course(course_id: int, db: Session):

    course = db.query(Course).filter(Course.id == course_id).first()

    if not course:
        return None

    db.delete(course)
    db.commit()

    return course