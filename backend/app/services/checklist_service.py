from sqlalchemy.orm import Session

from app.models.checklist_item import (
    ChecklistItem
)

from app.schemas.checklist_item import (
    ChecklistItemCreate,
    ChecklistItemUpdate
)


def create_checklist_item(
    db: Session,
    payload: ChecklistItemCreate
):
    item = ChecklistItem(
        slot_id=payload.slot_id,
        text=payload.text
    )

    db.add(item)

    db.commit()

    db.refresh(item)

    return item


def get_slot_checklist(
    db: Session,
    slot_id: int
):
    return (
        db.query(
            ChecklistItem
        )
        .filter(
            ChecklistItem.slot_id
            == slot_id
        )
        .order_by(
            ChecklistItem.id
        )
        .all()
    )


def update_checklist_item(
    db: Session,
    item_id: int,
    payload: ChecklistItemUpdate
):
    item = (
        db.query(
            ChecklistItem
        )
        .filter(
            ChecklistItem.id
            == item_id
        )
        .first()
    )

    if not item:
        return None

    update_data = (
        payload.model_dump(
            exclude_unset=True
        )
    )

    for (
        field,
        value
    ) in update_data.items():
        setattr(
            item,
            field,
            value
        )

    db.commit()

    db.refresh(item)

    return item


def delete_checklist_item(
    db: Session,
    item_id: int
):
    item = (
        db.query(
            ChecklistItem
        )
        .filter(
            ChecklistItem.id
            == item_id
        )
        .first()
    )

    if not item:
        return False

    db.delete(item)

    db.commit()

    return True