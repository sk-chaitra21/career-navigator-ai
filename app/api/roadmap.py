from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database.db import get_db

from app.models.roadmap_model import Roadmap

from app.schemas.roadmap_schema import (
    RoadmapCreate,
    RoadmapResponse
)

from app.services.roadmap_service import (
    get_all_roadmaps,
    get_roadmap_by_id,
    get_roadmaps_by_role,
    create_roadmap,
    update_roadmap,
    delete_roadmap
)


router = APIRouter(
    tags=["Roadmaps"]
)


# =========================================================
# GET ALL ROADMAPS
# =========================================================

@router.get(
    "/roadmaps",
    response_model=list[RoadmapResponse],
    summary="Get all roadmaps"
)
def read_roadmaps(
    db: Session = Depends(get_db)
):
    return get_all_roadmaps(db)


# =========================================================
# GET ROADMAPS BY ROLE
# =========================================================

@router.get(
    "/roadmaps/role/{role_id}",
    response_model=list[RoadmapResponse],
    summary="Get roadmaps by role"
)
def read_roadmaps_by_role(
    role_id: int,
    db: Session = Depends(get_db)
):
    return get_roadmaps_by_role(role_id, db)


# =========================================================
# GET ROADMAPS BY TECHNOLOGY PATH
# =========================================================

@router.get(
    "/roadmaps/technology-path/{technology_path_id}",
    response_model=list[RoadmapResponse],
    summary="Get roadmaps by technology path"
)
def read_roadmaps_by_technology_path(
    technology_path_id: int,
    db: Session = Depends(get_db)
):
    return (
        db.query(Roadmap)
        .filter(
            Roadmap.technology_path_id == technology_path_id
        )
        .order_by(Roadmap.step_order)
        .all()
    )


# =========================================================
# GET ROADMAP BY ID
# =========================================================

@router.get(
    "/roadmaps/{roadmap_id}",
    response_model=RoadmapResponse,
    summary="Get roadmap by ID"
)
def read_roadmap(
    roadmap_id: int,
    db: Session = Depends(get_db)
):
    return get_roadmap_by_id(roadmap_id, db)


# =========================================================
# CREATE ROADMAP
# =========================================================

@router.post(
    "/roadmaps",
    response_model=RoadmapResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create roadmap"
)
def add_roadmap(
    roadmap: RoadmapCreate,
    db: Session = Depends(get_db)
):
    return create_roadmap(roadmap, db)


# =========================================================
# UPDATE ROADMAP
# =========================================================

@router.put(
    "/roadmaps/{roadmap_id}",
    response_model=RoadmapResponse,
    summary="Update roadmap"
)
def edit_roadmap(
    roadmap_id: int,
    roadmap: RoadmapCreate,
    db: Session = Depends(get_db)
):
    return update_roadmap(
        roadmap_id,
        roadmap,
        db
    )


# =========================================================
# DELETE ROADMAP
# =========================================================

@router.delete(
    "/roadmaps/{roadmap_id}",
    summary="Delete roadmap"
)
def remove_roadmap(
    roadmap_id: int,
    db: Session = Depends(get_db)
):
    return delete_roadmap(
        roadmap_id,
        db
    )