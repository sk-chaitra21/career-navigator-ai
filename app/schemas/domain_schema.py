from pydantic import BaseModel, Field


class DomainCreate(BaseModel):
    name: str = Field(
        ...,
        min_length=3,
        max_length=100,
        examples=["Software Development"]
    )

    description: str = Field(
        ...,
        min_length=10,
        examples=["Build software applications using programming languages."]
    )


class DomainResponse(BaseModel):
    id: int
    name: str
    description: str

    class Config:
        from_attributes = True