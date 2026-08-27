from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.course_schema import (
    CourseCreate,
    CourseResponse
)
from app.services.course_service import (
    get_all_courses,
    get_course_by_id,
    get_courses_by_skill,
    create_course,
    update_course,
    delete_course
)

router = APIRouter(
    tags=["Courses"]
)


# Get all courses
@router.get(
    "/courses",
    response_model=list[CourseResponse],
    summary="Get all courses"
)
def read_courses(
    db: Session = Depends(get_db)
):
    return get_all_courses(db)


# NEW API
@router.get(
    "/courses/skill/{skill_id}",
    response_model=list[CourseResponse],
    summary="Get courses by skill"
)
def read_courses_by_skill(
    skill_id: int,
    db: Session = Depends(get_db)
):
    return get_courses_by_skill(skill_id, db)


# Get course by ID
@router.get(
    "/courses/{course_id}",
    response_model=CourseResponse,
    summary="Get course by ID"
)
def read_course(
    course_id: int,
    db: Session = Depends(get_db)
):
    return get_course_by_id(course_id, db)


# Create course
@router.post(
    "/courses",
    response_model=CourseResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create course"
)
def add_course(
    course: CourseCreate,
    db: Session = Depends(get_db)
):
    return create_course(course, db)


# Update course
@router.put(
    "/courses/{course_id}",
    response_model=CourseResponse,
    summary="Update course"
)
def edit_course(
    course_id: int,
    course: CourseCreate,
    db: Session = Depends(get_db)
):
    return update_course(course_id, course, db)


# Delete course
@router.delete(
    "/courses/{course_id}",
    summary="Delete course"
)
def remove_course(
    course_id: int,
    db: Session = Depends(get_db)
):
    return delete_course(course_id, db)