from pydantic import BaseModel


class ProgressCreate(BaseModel):
    role_id: int
    skill_id: int
    completed: bool = False


class ProgressResponse(BaseModel):
    id: int
    user_id: int
    role_id: int
    skill_id: int
    completed: bool

    class Config:
        from_attributes = True