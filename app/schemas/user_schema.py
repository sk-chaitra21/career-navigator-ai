from pydantic import BaseModel, EmailStr, Field


# Schema for User Registration
class UserCreate(BaseModel):
    name: str = Field(
        ...,
        min_length=3,
        max_length=100,
        description="User's full name",
        examples=["Chaitra"]
    )

    email: EmailStr

    password: str = Field(
        ...,
        min_length=8,
        max_length=30,
        description="User password",
        examples=["Chaitra@123"]
    )


# Schema for User Login
class UserLogin(BaseModel):
    email: EmailStr

    password: str = Field(
        ...,
        min_length=8,
        max_length=30
    )


# Schema for API Response
class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str

    class Config:
        from_attributes = True