from sqlalchemy import Column, Integer, Boolean, ForeignKey
from sqlalchemy.orm import relationship

from app.database.db import Base


class SkillProgress(Base):
    __tablename__ = "skill_progress"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    role_id = Column(
        Integer,
        ForeignKey("roles.id"),
        nullable=False
    )

    skill_id = Column(
        Integer,
        ForeignKey("skills.id"),
        nullable=False
    )

    completed = Column(
        Boolean,
        default=False,
        nullable=False
    )

    user = relationship("User")

    role = relationship("Role")

    skill = relationship("Skill")