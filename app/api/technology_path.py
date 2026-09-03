from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db

from app.models.technology_path_model import TechnologyPath
from app.models.skill_model import Skill
from app.models.path_skill_model import PathSkill


router = APIRouter(
    prefix="/technology-paths",
    tags=["Technology Paths"]
)


# ============================================================
# 1. GET TOP-LEVEL TECHNOLOGY PATHS FOR A ROLE
# ============================================================

@router.get("/role/{role_id}")
def get_technology_paths_by_role(
    role_id: int,
    db: Session = Depends(get_db)
):

    paths = (
        db.query(TechnologyPath)
        .filter(
            TechnologyPath.role_id == role_id,
            TechnologyPath.parent_id.is_(None)
        )
        .all()
    )

    return paths


# ============================================================
# 2. GET ONE TECHNOLOGY PATH
# ============================================================

@router.get("/{technology_path_id}")
def get_technology_path(
    technology_path_id: int,
    db: Session = Depends(get_db)
):

    path = (
        db.query(TechnologyPath)
        .filter(
            TechnologyPath.id == technology_path_id
        )
        .first()
    )

    if not path:
        raise HTTPException(
            status_code=404,
            detail="Technology path not found"
        )

    return path


# ============================================================
# 3. GET CHILD TECHNOLOGY VARIANTS
# ============================================================

@router.get("/{technology_path_id}/variants")
def get_technology_variants(
    technology_path_id: int,
    db: Session = Depends(get_db)
):

    path = (
        db.query(TechnologyPath)
        .filter(
            TechnologyPath.id == technology_path_id
        )
        .first()
    )

    if not path:
        raise HTTPException(
            status_code=404,
            detail="Technology path not found"
        )

    variants = (
        db.query(TechnologyPath)
        .filter(
            TechnologyPath.parent_id == technology_path_id
        )
        .all()
    )

    return variants


# ============================================================
# 4. GET SKILLS FOR A TECHNOLOGY PATH
# ============================================================

@router.get("/{technology_path_id}/skills")
def get_skills_by_technology_path(
    technology_path_id: int,
    db: Session = Depends(get_db)
):

    # Check that technology path exists
    path = (
        db.query(TechnologyPath)
        .filter(
            TechnologyPath.id == technology_path_id
        )
        .first()
    )

    if not path:
        raise HTTPException(
            status_code=404,
            detail="Technology path not found"
        )

    # Explicitly get skills through path_skills
    skills = (
        db.query(Skill)
        .join(
            PathSkill,
            PathSkill.skill_id == Skill.id
        )
        .filter(
            PathSkill.path_id == technology_path_id
        )
        .all()
    )

    return skills