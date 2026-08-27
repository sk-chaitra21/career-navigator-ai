from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.skill_schema import (
    SkillCreate,
    SkillResponse
)
from app.services.skill_service import (
    get_all_skills,
    get_skill_by_id,
    get_skills_by_role,
    create_skill,
    update_skill,
    delete_skill
)

router = APIRouter(
    tags=["Skills"]
)


# Get all skills
@router.get(
    "/skills",
    response_model=list[SkillResponse],
    summary="Get all skills"
)
def read_skills(
    db: Session = Depends(get_db)
):
    return get_all_skills(db)


# Get skills by role
@router.get(
    "/skills/role/{role_id}",
    response_model=list[SkillResponse],
    summary="Get skills by role"
)
def read_skills_by_role(
    role_id: int,
    db: Session = Depends(get_db)
):
    return get_skills_by_role(role_id, db)


# Get skill by ID
@router.get(
    "/skills/{skill_id}",
    response_model=SkillResponse,
    summary="Get skill by ID"
)
def read_skill(
    skill_id: int,
    db: Session = Depends(get_db)
):
    return get_skill_by_id(skill_id, db)


# Create skill
@router.post(
    "/skills",
    response_model=SkillResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create skill"
)
def add_skill(
    skill: SkillCreate,
    db: Session = Depends(get_db)
):
    return create_skill(skill, db)


# Update skill
@router.put(
    "/skills/{skill_id}",
    response_model=SkillResponse,
    summary="Update skill"
)
def edit_skill(
    skill_id: int,
    skill: SkillCreate,
    db: Session = Depends(get_db)
):
    return update_skill(skill_id, skill, db)


# Delete skill
@router.delete(
    "/skills/{skill_id}",
    summary="Delete skill"
)
def remove_skill(
    skill_id: int,
    db: Session = Depends(get_db)
):
    return delete_skill(skill_id, db)