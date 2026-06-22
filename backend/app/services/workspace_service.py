from sqlalchemy.orm import Session

from app.models.workspace import Workspace
from app.core.security import (
    hash_workspace_key
)


def create_workspace(
    db: Session,
    workspace_key: str
):
    workspace_hash = hash_workspace_key(
        workspace_key
    )

    existing = db.query(
        Workspace
    ).filter(
        Workspace.workspace_hash
        == workspace_hash
    ).first()

    if existing:
        return existing

    workspace = Workspace(
        workspace_hash=workspace_hash
    )

    db.add(workspace)
    db.commit()
    db.refresh(workspace)

    return workspace