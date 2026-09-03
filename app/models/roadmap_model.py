from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database.db import Base


class Roadmap(Base):
    __tablename__ = "roadmaps"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    title = Column(
        String(255),
        nullable=False
    )

    description = Column(
        String(500),
        nullable=False
    )

    step_order = Column(
        Integer,
        nullable=False
    )

    # Role this roadmap belongs to
    role_id = Column(
        Integer,
        ForeignKey("roles.id"),
        nullable=False
    )

    role = relationship(
        "Role",
        back_populates="roadmaps"
    )

    # Technology path this roadmap belongs to
    technology_path_id = Column(
        Integer,
        ForeignKey("technology_paths.id"),
        nullable=True
    )

    technology_path = relationship(
        "TechnologyPath",
        back_populates="roadmaps"
    )