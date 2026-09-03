from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database.db import Base


class TechnologyPath(Base):
    __tablename__ = "technology_paths"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String(100),
        nullable=False
    )

    description = Column(
        String(500),
        nullable=False
    )

    role_id = Column(
        Integer,
        ForeignKey("roles.id"),
        nullable=False
    )

    parent_id = Column(
        Integer,
        ForeignKey("technology_paths.id"),
        nullable=True
    )

    role = relationship(
        "Role",
        back_populates="technology_paths"
    )

    # Parent technology path
    parent = relationship(
        "TechnologyPath",
        remote_side=[id],
        back_populates="children"
    )

    # Child technology paths
    children = relationship(
        "TechnologyPath",
        back_populates="parent"
    )

    skills = relationship(
        "Skill",
        secondary="path_skills",
        back_populates="technology_paths"
    )

    roadmaps = relationship(
        "Roadmap",
        back_populates="technology_path"
    )