from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session

from app.db.session import get_db

from app.schemas.brain_dump import BrainDumpCreate, BrainDumpResponse

from app.services.brain_dump_service import (
    create_brain_dump,
    get_brain_dumps,
    delete_brain_dump,
)

router = APIRouter()


@router.post("/", response_model=BrainDumpResponse)
def create_brain_dump_route(payload: BrainDumpCreate, db: Session = Depends(get_db)):
    return create_brain_dump(db, payload.workspace_id, payload.text)


@router.get("/workspace/{workspace_id}", response_model=list[BrainDumpResponse])
def get_brain_dumps_route(workspace_id: int, db: Session = Depends(get_db)):
    return get_brain_dumps(db, workspace_id)


@router.delete("/{brain_dump_id}")
def delete_brain_dump_route(brain_dump_id: int, db: Session = Depends(get_db)):
    success = delete_brain_dump(db, brain_dump_id)

    if not success:
        raise HTTPException(status_code=404, detail="Brain dump not found")

    return {"message": "Deleted"}
