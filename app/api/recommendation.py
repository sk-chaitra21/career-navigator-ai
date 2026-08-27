from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db

from app.schemas.recommendation_schema import (
    RecommendationRequest,
    RecommendationResponse
)

from app.services.recommendation_service import (
    recommend_careers
)


router = APIRouter(
    tags=["AI Recommendation"]
)


@router.post(
    "/recommend",
    response_model=list[RecommendationResponse]
)
def recommend(
    request: RecommendationRequest,
    db: Session = Depends(get_db)
):

    return recommend_careers(
        request.skills,
        db
    )