from pydantic import BaseModel


class WorkspaceCreate(
    BaseModel
):
    workspace_key: str