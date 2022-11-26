from typing import List

from fastapi import WebSocket

from db.dals.message_dal import MessageDAL


class ConnectionManager:
    def __init__(self):
        self.chat_id = 0
        self.active_connections: List[(WebSocket, str)] = []

    async def connect(self, websocket: WebSocket, user: str):
        await websocket.accept()
        self.active_connections.append((websocket, user))

    def disconnect(self, websocket: WebSocket, user: str):
        self.active_connections.remove((websocket, user))

    async def broadcast(self, data):
        for connection in self.active_connections:
            await connection[0].send_json(data)

    async def history_load(self, message_dal: MessageDAL):
        has_history = False
        messages = await message_dal.get_message_by_chat_id(self.chat_id)
        if len(messages) > 0:
            has_history = True
        if has_history:
            for message in messages:
                msg = {
                    "user": message.user,
                    "message": message.message,
                    "avatar": message.avatar,
                }
                await self.broadcast(msg)

    async def save_message_db(
        self,
        user: str,
        message: str,
        avatar: str,
        message_dal: MessageDAL,
    ):
        await message_dal.create_message(user, message, avatar, self.chat_id)
