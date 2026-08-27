from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.security import get_current_user
from app.database.db import get_db
from app.models.user_model import User

from app.schemas.progress_schema import (
    ProgressCreate,
    ProgressResponse
)

from app.services.progress_service import (
    update_skill_progress,
    get_role_progress
)


router = APIRouter(
    tags=["Progress"]
)


# Update skill progress
@router.put(
    "/progress",
    response_model=ProgressResponse,
    summary="Update skill progress"
)
def update_progress(
    progress: ProgressCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    result = update_skill_progress(
        user_id=current_user.id,
        role_id=progress.role_id,
        skill_id=progress.skill_id,
        completed=progress.completed,
        db=db
    )

    if not result:
        raise HTTPException(
            status_code=404,
            detail="Role or skill not found"
        )

    return result


# Get progress for a role
@router.get(
    "/progress/{role_id}",
    response_model=list[ProgressResponse],
    summary="Get progress for a role"
)
def read_role_progress(
    role_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    return get_role_progress(
        user_id=current_user.id,
        role_id=role_id,
        db=db
    )