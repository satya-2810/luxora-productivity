from pydantic import BaseModel, Field


class ChecklistItemCreate(BaseModel):
    slot_id: int

    text: str = Field(..., min_length=1, max_length=300)


class ChecklistItemUpdate(BaseModel):
    text: str | None = None

    completed: bool | None = None


class ChecklistItemResponse(BaseModel):
    id: int

    slot_id: int

    text: str

    completed: bool

    model_config = {"from_attributes": True}
