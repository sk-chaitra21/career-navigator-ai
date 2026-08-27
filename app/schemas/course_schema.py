from pydantic import BaseModel, Field


class CourseCreate(BaseModel):
    title: str = Field(..., min_length=3)
    provider: str = Field(..., min_length=2)
    duration: str = Field(..., min_length=2)
    level: str = Field(..., min_length=2)
    role_id: int
    skill_id: int


class CourseResponse(BaseModel):
    id: int
    title: str
    provider: str
    duration: str
    level: str
    role_id: int
    skill_id: int

    class Config:
        from_attributes = True