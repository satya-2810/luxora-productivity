from fastapi import APIRouter

from app.api.routes import health, workspace, slot, checklist, brain_dump

api_router = APIRouter()

api_router.include_router(health.router, prefix="/health", tags=["Health"])

api_router.include_router(workspace.router, prefix="/workspace", tags=["Workspace"])

api_router.include_router(slot.router, prefix="/slots", tags=["Slots"])

api_router.include_router(checklist.router, prefix="/checklist", tags=["Checklist"])

api_router.include_router(brain_dump.router, prefix="/brain-dump", tags=["Brain Dump"])
