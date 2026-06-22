from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)
from sqlalchemy.orm import Session

from app.db.session import get_db

from app.schemas.checklist_item import (
    ChecklistItemCreate,
    ChecklistItemUpdate,
    ChecklistItemResponse
)

from app.services.checklist_service import (
    create_checklist_item,
    get_slot_checklist,
    update_checklist_item,
    delete_checklist_item
)

router = APIRouter()


@router.post(
    "/",
    response_model=
    ChecklistItemResponse
)
def create_item_route(
    payload:
    ChecklistItemCreate,
    db: Session = Depends(get_db)
):
    return create_checklist_item(
        db,
        payload
    )


@router.get(
    "/slot/{slot_id}",
    response_model=list[
        ChecklistItemResponse
    ]
)
def get_checklist_route(
    slot_id: int,
    db: Session = Depends(get_db)
):
    return get_slot_checklist(
        db,
        slot_id
    )


@router.patch(
    "/{item_id}",
    response_model=
    ChecklistItemResponse
)
def update_item_route(
    item_id: int,
    payload:
    ChecklistItemUpdate,
    db: Session = Depends(get_db)
):
    item = (
        update_checklist_item(
            db,
            item_id,
            payload
        )
    )

    if not item:
        raise HTTPException(
            status_code=404,
            detail=
            "Checklist item not found"
        )

    return item


@router.delete(
    "/{item_id}"
)
def delete_item_route(
    item_id: int,
    db: Session = Depends(get_db)
):
    success = (
        delete_checklist_item(
            db,
            item_id
        )
    )

    if not success:
        raise HTTPException(
            status_code=404,
            detail=
            "Checklist item not found"
        )

    return {
        "message":
        "Checklist item deleted"
    }