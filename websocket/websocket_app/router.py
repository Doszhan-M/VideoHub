from fastapi import APIRouter

from routers import (openapi, group_chat, private_chat)


router = APIRouter()


router.include_router(openapi.router, prefix="/websocket")
router.include_router(group_chat.router, prefix="/websocket")
router.include_router(private_chat.router, prefix="/websocket/private_chat")
