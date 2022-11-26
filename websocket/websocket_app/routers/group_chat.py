from fastapi.templating import Jinja2Templates
from fastapi import (
    WebSocketDisconnect,
    APIRouter,
    WebSocket,
    Request,
    Depends,
)

from dependencies import get_message_dal
from db.dals.message_dal import MessageDAL
from managers.group_socket import ConnectionManager


router = APIRouter()
manager = ConnectionManager()
templates = Jinja2Templates(directory="templates")


@router.websocket("/api/chat/{sender}/{avatar}")
async def chat(
    websocket: WebSocket,
    sender: str,
    avatar: str,
    message_dal: MessageDAL = Depends(get_message_dal),
):
    await manager.connect(websocket, sender)
    await manager.history_load(message_dal)
    try:
        while True:
            data = await websocket.receive_json()
            message = {"user": sender, "message": data["message"], "avatar": avatar}
            await manager.broadcast(message)
            await manager.save_message_db(sender, data["message"], avatar, message_dal)
    except WebSocketDisconnect:
        manager.disconnect(websocket, sender)


@router.get("/")
def get_home(request: Request):
    return templates.TemplateResponse("home.html", {"request": request})


@router.get("/chat")
def get_chat(request: Request):
    return templates.TemplateResponse("chat.html", {"request": request})
