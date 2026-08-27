from sqlalchemy import Column, Integer, ForeignKey

from app.database.db import Base


class SavedRole(Base):
    __tablename__ = "saved_roles"

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        primary_key=True
    )

    role_id = Column(
        Integer,
        ForeignKey("roles.id"),
        primary_key=True
    )