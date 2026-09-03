from fastapi import APIRouter, HTTPException

from app.services.gemini_service import (
    generate_career_advice
)


router = APIRouter(
    tags=["AI Career Advisor"]
)


@router.post("/ai/career-advice")
def career_advice(
    role: str,
    skills: list[str]
):

    try:

        result = generate_career_advice(
            role=role,
            skills=skills
        )

        return {
            "role": role,
            "skills": skills,
            "advice": result
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Gemini API error: {str(e)}"
        )