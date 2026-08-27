from pydantic import BaseModel, Field


class CompanyCreate(BaseModel):
    name: str = Field(..., min_length=2)
    location: str
    website: str
    role_id: int


class CompanyResponse(BaseModel):
    id: int
    name: str
    location: str
    website: str
    role_id: int

    class Config:
        from_attributes = True