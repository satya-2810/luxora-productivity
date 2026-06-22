from sqlalchemy import Column, Integer, String, ForeignKey

from sqlalchemy.orm import relationship

from app.db.base import Base


class BrainDump(Base):
    __tablename__ = "brain_dumps"

    id = Column(Integer, primary_key=True, index=True)

    workspace_id = Column(
        Integer, ForeignKey("workspaces.id", ondelete="CASCADE"), nullable=False
    )

    text = Column(String, nullable=False)

    workspace = relationship("Workspace")
