from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database.db import Base


class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100), unique=True, nullable=False)

    location = Column(String(100), nullable=False)

    website = Column(String(255), nullable=False)

    role_id = Column(Integer, ForeignKey("roles.id"))

    role = relationship("Role")