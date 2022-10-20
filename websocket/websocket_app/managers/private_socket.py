import time
from typing import Dict, List

from fastapi import WebSocket, Depends
from db.dals.message_dal import MessageDAL


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

    def disconnect(self, chat_id, websocket):
        chat = self.active_connections[chat_id]
        chat.remove(websocket)

    async def broadcast(self, chat_id, message: dict):
        for websocket in self.active_connections[chat_id]:
            await websocket.send_json(message)

    async def history_load(self, chat_id: int, message_dal: MessageDAL):
        has_history = False
        messages = await message_dal.get_message_by_chat_id(chat_id)
        if len(messages) > 0:
            has_history = True
        if has_history:
            for message in messages:
                msg = {message.user: message.message}
                await self.broadcast(chat_id, msg)

    async def save_message_db(self,  chat_id: int, user: str,
                              message: str, message_dal: MessageDAL):
        await message_dal.create_message(user, message, chat_id)
