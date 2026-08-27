from pydantic import BaseModel, Field


class RoadmapCreate(BaseModel):
    title: str = Field(..., min_length=3)
    description: str = Field(..., min_length=10)
    step_order: int
    role_id: int


class RoadmapResponse(BaseModel):
    id: int
    title: str
    description: str
    step_order: int
    role_id: int

    class Config:
        from_attributes = True