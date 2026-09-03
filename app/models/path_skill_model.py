from sqlalchemy import Column, Integer, ForeignKey

from app.database.db import Base


class PathSkill(Base):
    __tablename__ = "path_skills"

    path_id = Column(
        Integer,
        ForeignKey("technology_paths.id"),
        primary_key=True
    )

    skill_id = Column(
        Integer,
        ForeignKey("skills.id"),
        primary_key=True
    )