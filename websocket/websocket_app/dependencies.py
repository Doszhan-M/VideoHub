from db.dbconf import async_session
from db.dals.message_dal import MessageDAL
          
            
async def get_message_dal():
    async with async_session() as session:
        async with session.begin():
            yield MessageDAL(session)