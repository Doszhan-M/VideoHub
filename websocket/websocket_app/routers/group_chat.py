
from pydantic import BaseModel
from fastapi.templating import Jinja2Templates
from fastapi import (
    APIRouter,  WebSocketDisconnect, 
    WebSocket, Request, Response)

from managers.socket import SocketManager


router = APIRouter()
manager = SocketManager()
templates = Jinja2Templates(directory="templates")


@router.websocket("/api/chat")
async def chat(websocket: WebSocket):
    sender = websocket.cookies.get("X-Authorization")
    print(sender)
    if sender:
        await manager.connect(websocket, sender)
        response = {
            "sender": sender,
            "message": "got connected"
        }
        await manager.broadcast(response)
        try:
            while True:
                data = await websocket.receive_json()
                await manager.broadcast(data)
        except WebSocketDisconnect:
            manager.disconnect(websocket, sender)
            response['message'] = "left"
            await manager.broadcast(response)
            
            

@router.get("/api/current_user")
def get_user(request: Request):
    return request.cookies.get("X-Authorization")

class RegisterValidator(BaseModel):
    username: str

@router.post("/api/register/{user}")
def register_user(user: str, response: Response):
    response.set_cookie(key="X-Authorization", value=user, httponly=True)
    

@router.get("/")
def get_home(request: Request):
    return templates.TemplateResponse("home.html", {"request": request})


@router.get("/chat")
def get_chat(request: Request):
    return templates.TemplateResponse("chat.html", {"request": request})
