from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.services.role_skill_service import (
    assign_skill_to_role,
    get_skills_by_role,
     get_roles_by_skill
)

router = APIRouter()


@router.post("/roles/{role_id}/skills/{skill_id}")
def assign_skill(
    role_id: int,
    skill_id: int,
    db: Session = Depends(get_db)
):

    assignment, error = assign_skill_to_role(
        role_id,
        skill_id,
        db
    )

    if error:
        raise HTTPException(
            status_code=400,
            detail=error
        )

    return {
        "message": "Skill assigned successfully"
    }
@router.get("/roles/{role_id}/skills")
def read_role_skills(
    role_id: int,
    db: Session = Depends(get_db)
):

    skills = get_skills_by_role(role_id, db)

    if skills is None:
        raise HTTPException(
            status_code=404,
            detail="Role not found"
        )

    return skills
@router.get("/skills/{skill_id}/roles")
def read_skill_roles(
    skill_id: int,
    db: Session = Depends(get_db)
):

    roles = get_roles_by_skill(skill_id, db)

    if roles is None:
        raise HTTPException(
            status_code=404,
            detail="Skill not found"
        )

    return roles