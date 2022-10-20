from fastapi.templating import Jinja2Templates
from fastapi import (
    APIRouter,  WebSocketDisconnect, Request, 
    WebSocket, Depends)

from dependencies import get_message_dal
from db.dals.message_dal import MessageDAL
from utils.utils import user_id_by_email
from managers.private_socket import ConnectionManager


router = APIRouter()
manager = ConnectionManager()
templates = Jinja2Templates(directory="templates")
        



@router.websocket("/ws/{my_email}/{companion_email}")
async def websocket_endpoint(websocket: WebSocket, my_email: str,
                             companion_email: str, message_dal: MessageDAL = Depends(get_message_dal)):
    companion_id = await user_id_by_email(companion_email)
    my_id = await user_id_by_email(my_email)
    chat_id = my_id + companion_id
    print(chat_id)
    await manager.connect_private_chat(chat_id, websocket)
    await manager.history_load(chat_id, message_dal)
    try:
        while True:
            msg = await websocket.receive_text()
            await manager.broadcast(chat_id, {my_email: msg})
            await manager.save_message_db(chat_id, my_email, msg, message_dal)
    except WebSocketDisconnect:
        manager.disconnect(chat_id, websocket)
        msg = f"Client #{my_id} left the chat"
        await manager.broadcast(chat_id, msg)


@router.get("/")
def test_page(request: Request):
    return templates.TemplateResponse(
        "private_chat.html", {"request": request})
