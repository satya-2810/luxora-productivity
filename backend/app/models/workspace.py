from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.base import Base


class Workspace(Base):
    __tablename__ = "workspaces"

    id = Column(Integer, primary_key=True, index=True)

    workspace_hash = Column(String, unique=True, nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    slots = relationship(
        "Slot", back_populates="workspace", cascade="all, delete-orphan"
    )

    brain_dumps = relationship("BrainDump", cascade="all, delete-orphan")
