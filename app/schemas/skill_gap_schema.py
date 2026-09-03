from pydantic import BaseModel
from typing import List


class SkillGapResponse(BaseModel):

    role_id: int
    role: str

    completed_skills: List[str]
    missing_skills: List[str]

    match_percentage: int

    ai_analysis: str