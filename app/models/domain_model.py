from sqlalchemy import Column, Integer, String

from app.database.db import Base
from sqlalchemy.orm import relationship


class Domain(Base):
    __tablename__ = "domains"

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
    roles = relationship(
    "Role",
    back_populates="domain",
    cascade="all, delete"
    )