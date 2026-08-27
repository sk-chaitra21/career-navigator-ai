from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database.db import get_db
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


# Get all roadmaps
@router.get(
    "/roadmaps",
    response_model=list[RoadmapResponse]
)
def read_roadmaps(
    db: Session = Depends(get_db)
):
    return get_all_roadmaps(db)


# NEW API
@router.get(
    "/roadmaps/role/{role_id}",
    response_model=list[RoadmapResponse]
)
def read_roadmaps_by_role(
    role_id: int,
    db: Session = Depends(get_db)
):
    return get_roadmaps_by_role(role_id, db)


# Get roadmap by ID
@router.get(
    "/roadmaps/{roadmap_id}",
    response_model=RoadmapResponse
)
def read_roadmap(
    roadmap_id: int,
    db: Session = Depends(get_db)
):
    return get_roadmap_by_id(roadmap_id, db)


# Create roadmap
@router.post(
    "/roadmaps",
    response_model=RoadmapResponse,
    status_code=status.HTTP_201_CREATED
)
def add_roadmap(
    roadmap: RoadmapCreate,
    db: Session = Depends(get_db)
):
    return create_roadmap(roadmap, db)


# Update roadmap
@router.put(
    "/roadmaps/{roadmap_id}",
    response_model=RoadmapResponse
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


# Delete roadmap
@router.delete("/roadmaps/{roadmap_id}")
def remove_roadmap(
    roadmap_id: int,
    db: Session = Depends(get_db)
):
    return delete_roadmap(
        roadmap_id,
        db
    )