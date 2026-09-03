from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.database.db import Base


class Skill(Base):
    __tablename__ = "skills"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String(100),
        unique=True,
        nullable=False
    )

    description = Column(
        String(500),
        nullable=False
    )

    # Role ↔ Skill
    roles = relationship(
        "Role",
        secondary="role_skills",
        back_populates="skills"
    )

    # Skill → Courses
    courses = relationship(
        "Course",
        back_populates="skill",
        cascade="all, delete"
    )

    # Technology Path ↔ Skill
    technology_paths = relationship(
        "TechnologyPath",
        secondary="path_skills",
        back_populates="skills"
    )