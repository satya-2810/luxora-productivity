from pydantic import BaseModel, Field


class SlotCreate(BaseModel):
    workspace_id: int

    title: str = Field(..., min_length=1, max_length=200)

    time: str = Field(..., min_length=1, max_length=20)


class SlotUpdate(BaseModel):
    title: str | None = Field(default=None, max_length=200)

    time: str | None = Field(default=None, max_length=20)

    next_action_1: str | None = None

    next_action_2: str | None = None

    notes: str | None = None


class SlotResponse(BaseModel):
    id: int

    workspace_id: int

    title: str

    time: str

    next_action_1: str

    next_action_2: str

    notes: str

    model_config = {"from_attributes": True}
