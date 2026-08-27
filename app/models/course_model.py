from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database.db import Base


class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(255), nullable=False)
    provider = Column(String(100), nullable=False)
    duration = Column(String(50), nullable=False)
    level = Column(String(50), nullable=False)

    role_id = Column(Integer, ForeignKey("roles.id"))
    skill_id = Column(Integer, ForeignKey("skills.id"))

    role = relationship("Role")

    skill = relationship(
        "Skill",
        back_populates="courses"
    )