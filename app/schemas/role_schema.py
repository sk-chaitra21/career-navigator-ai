from pydantic import BaseModel, Field


class RoleCreate(BaseModel):
    title: str = Field(..., min_length=3)
    description: str = Field(..., min_length=10)
    salary: str
    domain_id: int


class RoleResponse(BaseModel):
    id: int
    title: str
    description: str

    salary: str = Field(
        ...,
        min_length=3,
        examples=["8-12 LPA"]
    )

    domain_id: int = Field(
        ...,
        gt=0,
        description="Domain ID"
    )

    class Config:
        from_attributes = True