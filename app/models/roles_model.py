from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database.db import Base


class Role(Base):
    __tablename__ = "roles"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    title = Column(
        String(100),
        nullable=False
    )

    description = Column(
        String(500),
        nullable=False
    )

    salary = Column(
        String(50),
        nullable=False
    )

    domain_id = Column(
        Integer,
        ForeignKey("domains.id"),
        nullable=False
    )

    # Domain relationship
    domain = relationship(
        "Domain",
        back_populates="roles"
    )

    # Role ↔ Skills
    skills = relationship(
        "Skill",
        secondary="role_skills",
        back_populates="roles"
    )

    # Role ↔ Roadmaps
    roadmaps = relationship(
        "Roadmap",
        back_populates="role",
        cascade="all, delete"
    )

    # Role ↔ Technology Paths
    technology_paths = relationship(
        "TechnologyPath",
        back_populates="role",
        cascade="all, delete"
    )

    # Role ↔ Saved Roles ↔ Users
    saved_by_users = relationship(
        "User",
        secondary="saved_roles",
        back_populates="saved_roles"
    )