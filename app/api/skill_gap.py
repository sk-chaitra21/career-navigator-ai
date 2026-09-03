from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session

from app.database.db import get_db

from app.core.security import get_current_user

from app.schemas.skill_gap_schema import (
    SkillGapResponse
)

from app.services.skill_gap_service import (
    get_skill_gap
)


router = APIRouter(
    tags=["AI Skill Gap"]
)


@router.get(
    "/ai/skill-gap/{role_id}",
    response_model=SkillGapResponse
)
def skill_gap(
    role_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    result = get_skill_gap(
        role_id=role_id,
        user_id=current_user.id,
        db=db
    )

    if not result:

        raise HTTPException(
            status_code=404,
            detail="Role not found"
        )

    return result