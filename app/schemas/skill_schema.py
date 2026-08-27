from pydantic import BaseModel, Field


class SkillCreate(BaseModel):
    name: str = Field(..., min_length=2)
    description: str = Field(..., min_length=10)


class SkillResponse(BaseModel):
    id: int
    name: str = Field(
        ..., 
        min_length=2,
        max_length=100,
        examples=["Python"]
    )
    description: str = Field(
        ..., 
        min_length=10,
        max_length=500,
        examples=["Programming language used for backend development."]
    )

    class Config:
        from_attributes = True
