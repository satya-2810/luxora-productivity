from pydantic import BaseModel, Field


class BrainDumpCreate(BaseModel):
    workspace_id: int

    text: str = Field(..., min_length=1, max_length=1000)


class BrainDumpResponse(BaseModel):
    id: int

    workspace_id: int

    text: str

    model_config = {"from_attributes": True}
