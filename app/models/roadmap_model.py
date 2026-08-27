from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database.db import Base


class Roadmap(Base):
    __tablename__ = "roadmaps"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(255), nullable=False)
    description = Column(String(500), nullable=False)
    step_order = Column(Integer, nullable=False)

    role_id = Column(Integer, ForeignKey("roles.id"))

    role = relationship(
        "Role",
        back_populates="roadmaps"
    )