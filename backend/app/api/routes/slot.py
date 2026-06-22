from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db

from app.schemas.slot import SlotCreate, SlotUpdate, SlotResponse

from app.services.slot_service import (
    create_slot,
    get_workspace_slots,
    get_slot,
    update_slot,
    delete_slot,
)

router = APIRouter()


@router.post("/", response_model=SlotResponse)
def create_slot_route(payload: SlotCreate, db: Session = Depends(get_db)):
    return create_slot(db, payload)


@router.get("/workspace/{workspace_id}", response_model=list[SlotResponse])
def get_workspace_slots_route(workspace_id: int, db: Session = Depends(get_db)):
    return get_workspace_slots(db, workspace_id)


@router.get("/{slot_id}", response_model=SlotResponse)
def get_slot_route(slot_id: int, db: Session = Depends(get_db)):
    slot = get_slot(db, slot_id)

    if not slot:
        raise HTTPException(status_code=404, detail="Slot not found")

    return slot


@router.patch("/{slot_id}", response_model=SlotResponse)
def update_slot_route(slot_id: int, payload: SlotUpdate, db: Session = Depends(get_db)):
    slot = update_slot(db, slot_id, payload)

    if not slot:
        raise HTTPException(status_code=404, detail="Slot not found")

    return slot


@router.delete("/{slot_id}")
def delete_slot_route(slot_id: int, db: Session = Depends(get_db)):
    success = delete_slot(db, slot_id)

    if not success:
        raise HTTPException(status_code=404, detail="Slot not found")

    return {"message": "Slot deleted"}
