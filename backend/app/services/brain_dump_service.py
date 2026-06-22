from sqlalchemy.orm import Session

from app.models.brain_dump import BrainDump


def create_brain_dump(db: Session, workspace_id: int, text: str):
    item = BrainDump(workspace_id=workspace_id, text=text)

    db.add(item)

    db.commit()

    db.refresh(item)

    return item


def get_brain_dumps(db: Session, workspace_id: int):
    return (
        db.query(BrainDump)
        .filter(BrainDump.workspace_id == workspace_id)
        .order_by(BrainDump.id.desc())
        .all()
    )


def delete_brain_dump(db: Session, brain_dump_id: int):
    item = db.query(BrainDump).filter(BrainDump.id == brain_dump_id).first()

    if not item:
        return False

    db.delete(item)

    db.commit()

    return True
