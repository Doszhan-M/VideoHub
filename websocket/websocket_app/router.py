from fastapi import APIRouter

from routers import (
    openapi, group_chat, private_chat, messages)


router = APIRouter()


router.include_router(openapi.router, prefix="/websocket", tags=["openapi"])
router.include_router(group_chat.router, prefix="/websocket", tags=["group_chat"])
router.include_router(private_chat.router, prefix="/websocket/private_chat", tags=["private_chat"])
router.include_router(messages.router, prefix="/websocket/private_chat", tags=["messages"])
