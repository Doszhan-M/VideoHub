from fastapi.templating import Jinja2Templates
from fastapi import APIRouter, WebSocketDisconnect, Request, WebSocket, Depends

from dependencies import get_message_dal
from db.dals.message_dal import MessageDAL
from utils.utils import user_id_by_email
from managers.private_socket import ConnectionManager


router = APIRouter()
manager = ConnectionManager()
templates = Jinja2Templates(directory="templates")


@router.websocket("/ws/{my_email}/{avatar}/{companion_email}")
async def websocket_endpoint(
    websocket: WebSocket,
    my_email: str,
    companion_email: str,
    avatar: str,
    message_dal: MessageDAL = Depends(get_message_dal),
):
    companion_id = await user_id_by_email(companion_email)
    my_id = await user_id_by_email(my_email)
    chat_id = my_id + companion_id
    await manager.connect_private_chat(chat_id, websocket)
    await manager.history_load(chat_id, message_dal)
    try:
        while True:
            data = await websocket.receive_text()
            message = {"user": my_email, "message": data, "avatar": avatar}
            message_id = await manager.save_message_db(
                chat_id,
                my_email,
                data,
                avatar,
                message_dal,
            )
            message["id"] = message_id
            print("message", message)
            await manager.broadcast(chat_id, message)
    except WebSocketDisconnect:
        manager.disconnect(chat_id, websocket)


@router.get("/")
def test_page(request: Request):
    return templates.TemplateResponse("private_chat.html", {"request": request})
