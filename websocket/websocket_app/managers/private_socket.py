from typing import Dict, List

from fastapi import FastAPI, WebSocket, WebSocketDisconnect



class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, List[WebSocket]] = {}

    async def connect_private_chat(self, chat_id, websocket: WebSocket):
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
        # self.history_load(chat_id)
            

    def disconnect(self, chat_id, websocket):
        chat = self.active_connections[chat_id]
        chat.remove(websocket)

    async def broadcast(self, chat_id, message: dict):
        for websocket in self.active_connections[chat_id]:
            await websocket.send_json(message)
            
    async def history_load(self, chat_id: dict):
        has_history = True
        messages = [{'history' : 1}, {'history' : 2}, {'history' : 3}]
        if has_history:
            for message in messages:
                await self.broadcast(chat_id, message)
        