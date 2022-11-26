from typing import List

from sqlalchemy.future import select
from sqlalchemy.orm import Session

from db.models.messages import Message


class MessageDAL:
    def __init__(self, db_session: Session):
        self.db_session = db_session

    async def create_message(self, user: str, message: str, avatar: str, chat_id: int):
        new_message = Message(
            user=user,
            message=message,
            chat_id=chat_id,
            avatar=avatar,
        )
        self.db_session.add(new_message)
        await self.db_session.flush()
        return new_message.id

    async def get_message_by_chat_id(self, chat_id: int) -> List[Message]:
        q = await self.db_session.execute(
            select(Message).filter_by(chat_id=chat_id).order_by(Message.id)
        )
        return q.scalars().all()
