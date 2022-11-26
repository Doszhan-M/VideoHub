from fastapi import APIRouter, Depends

from dependencies import get_message_dal
from db.dals.message_dal import MessageDAL


router = APIRouter()


@router.post("/message_create")
async def create_message(
    user: str,
    message: str,
    chat_id: int,
    message_dal: MessageDAL = Depends(get_message_dal),
):
    return await message_dal.create_message(user, message, chat_id)


@router.get("/message/{chat_id}")
async def create_message(
    chat_id: str, message_dal: MessageDAL = Depends(get_message_dal)
):
    return await message_dal.get_message_by_chat_id(chat_id)
