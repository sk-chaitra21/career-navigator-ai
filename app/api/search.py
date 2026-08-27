from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database.db import get_db

from app.schemas.search_schema import (
    SearchResponse
)

from app.services.search_service import (
    search_all
)


router = APIRouter(
    tags=["Search"]
)


@router.get(
    "/search",
    response_model=SearchResponse,
    summary="Search roles, skills and courses"
)
def search(
    q: str = Query(
        ...,
        min_length=1,
        description="Search keyword"
    ),
    db: Session = Depends(get_db)
):

    results = search_all(
        q,
        db
    )

    return {
        "results": results
    }