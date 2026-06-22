from fastapi import (
    APIRouter,
    Depends
)
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.workspace import (
    WorkspaceCreate
)
from app.services.workspace_service import (
    create_workspace
)

router = APIRouter()


@router.post("/")
def create_workspace_route(
    payload: WorkspaceCreate,
    db: Session = Depends(get_db)
):
    workspace = create_workspace(
        db,
        payload.workspace_key
    )

    return {
        "workspace_id":
        workspace.id
    }