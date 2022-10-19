from fastapi import (
    APIRouter,  WebSocketDisconnect, Depends,
    WebSocket, Query, status, Cookie)

from typing import Dict, List, Union

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse


router = APIRouter()


html = """
<!DOCTYPE html>
<html>
    <head>
        <title>Chat</title>
    </head>
    <body>
        <h1>WebSocket Chat</h1>
        <h2>Your ID: <span id="ws-id"></span></h2>
        <form action="" onsubmit="sendMessage(event)">
            <input type="text" id="messageText" autocomplete="off"/>
            <button>Send</button>
        </form>
        <ul id='messages'>
        </ul>
        <script>
            var email = Date.now()
            document.querySelector("#ws-id").textContent = email;
            my_email = "doszhan.work@gmail.com"
            companion_email = "admin@admin.kz"
            var ws = new WebSocket(`wss://video.localhost/websocket/private_chat/ws/${my_email}/${companion_email}`);
            ws.onmessage = function(event) {
                var messages = document.getElementById('messages')
                var message = document.createElement('li')
                var content = document.createTextNode(event.data)
                console.log(content)
                message.appendChild(content)
                messages.appendChild(message)
            };
            function sendMessage(event) {
                var input = document.getElementById("messageText")
                ws.send(input.value)
                input.value = ''
                event.preventDefault()
            }
        </script>
    </body>
</html>
"""


@router.get("/")
async def get():
    return HTMLResponse(html)


async def get_cookie_or_token(websocket: WebSocket,
                              session: Union[str, None] = Cookie(default=None),
                              token: Union[str, None] = Query(default=None),):
    if session is None and token is None:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
    return session or token


class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, List[WebSocket]] = {}

    async def create_or_get_private_connect(self, chat_id, websocket: WebSocket):
        chat_already_exist = False
        for connection_id in self.active_connections.keys():
            if connection_id == chat_id:
                chat_already_exist = True
                break
        if chat_already_exist:
            chat = self.active_connections[chat_id]
            chat.append(websocket)
        else:
            self.active_connections.update({chat_id: [websocket]})
        await websocket.accept()

    def disconnect(self, chat_id, websocket):
        chat = self.active_connections[chat_id]
        chat.remove(websocket)

    async def broadcast(self, chat_id, message: dict):
        for websocket in self.active_connections[chat_id]:
            await websocket.send_json(message)


manager = ConnectionManager()


@router.websocket("/ws/{my_email}/{companion_email}")
async def websocket_endpoint(websocket: WebSocket, my_email: str, 
                             companion_email: str):
    # client_id = get api by email
    print(my_email, companion_email)
    client_id = 3
    my_id = 5
    my_email = 'dddd@dgdrggg.com'
    chat_id = my_id + client_id
    await manager.create_or_get_private_connect(chat_id, websocket)
    try:
        while True:
            msg = await websocket.receive_text()
            await manager.broadcast(chat_id, {my_email: msg})
    except WebSocketDisconnect:
        manager.disconnect(chat_id, websocket)
        msg = f"Client #{my_id} left the chat"
        await manager.broadcast(chat_id, msg)
