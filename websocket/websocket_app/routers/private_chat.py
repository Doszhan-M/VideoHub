from fastapi import (
    APIRouter,  WebSocketDisconnect, Request, WebSocket,)
from fastapi.templating import Jinja2Templates

from utils.utils import user_id_by_email
from managers.private_socket import ConnectionManager


router = APIRouter()
manager = ConnectionManager()
templates = Jinja2Templates(directory="templates")


@router.websocket("/ws/{my_email}/{companion_email}")
async def websocket_endpoint(websocket: WebSocket, my_email: str,
                             companion_email: str):
    companion_id = await user_id_by_email(companion_email)
    my_id = await user_id_by_email(my_email)
    chat_id = my_id + companion_id
    await manager.connect_private_chat(chat_id, websocket)
    await manager.history_load(chat_id)
    try:
        while True:
            msg = await websocket.receive_text()
            await manager.broadcast(chat_id, {my_email: msg})
    except WebSocketDisconnect:
        manager.disconnect(chat_id, websocket)
        msg = f"Client #{my_id} left the chat"
        await manager.broadcast(chat_id, msg)


@router.get("/")
def test_page(request: Request):
    return templates.TemplateResponse(
        "private_chat.html", {"request": request})
