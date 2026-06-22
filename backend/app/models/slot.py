from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.base import Base


class Slot(Base):
    __tablename__ = "slots"

    id = Column(Integer, primary_key=True, index=True)

    workspace_id = Column(Integer, ForeignKey("workspaces.id"), nullable=False)

    title = Column(String, nullable=False)

    time = Column(String, nullable=False)

    next_action_1 = Column(String, default="")

    next_action_2 = Column(String, default="")

    notes = Column(Text, default="")

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    updated_at = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    workspace = relationship("Workspace", back_populates="slots")

    checklist_items = relationship(
        "ChecklistItem", back_populates="slot", cascade="all, delete-orphan"
    )
