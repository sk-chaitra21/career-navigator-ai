from pydantic import BaseModel
from typing import List


class RecommendationRequest(BaseModel):
    skills: List[str]


class RecommendationResponse(BaseModel):
    role_id: int
    role: str
    match_percentage: int
    matched_skills: List[str]