from sqlalchemy import Column, Integer, ForeignKey
from app.database.db import Base


class RoleSkill(Base):
    __tablename__ = "role_skills"

    role_id = Column(
        Integer,
        ForeignKey("roles.id"),
        primary_key=True
    )

    skill_id = Column(
        Integer,
        ForeignKey("skills.id"),
        primary_key=True
    )
