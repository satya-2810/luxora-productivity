from sqlalchemy.orm import Session

from app.models.slot import Slot
from app.schemas.slot import SlotCreate, SlotUpdate


def create_slot(db: Session, payload: SlotCreate):
    slot = Slot(
        workspace_id=payload.workspace_id, title=payload.title, time=payload.time
    )

    db.add(slot)

    db.commit()

    db.refresh(slot)

    return slot


def get_workspace_slots(db: Session, workspace_id: int):
    return (
        db.query(Slot).filter(Slot.workspace_id == workspace_id).order_by(Slot.id).all()
    )


def get_slot(db: Session, slot_id: int):
    return db.query(Slot).filter(Slot.id == slot_id).first()


def update_slot(db: Session, slot_id: int, payload: SlotUpdate):
    slot = get_slot(db, slot_id)

    if not slot:
        return None

    update_data = payload.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(slot, field, value)

    db.commit()

    db.refresh(slot)

    return slot


def delete_slot(db: Session, slot_id: int):
    slot = get_slot(db, slot_id)

    if not slot:
        return False

    db.delete(slot)

    db.commit()

    return True
