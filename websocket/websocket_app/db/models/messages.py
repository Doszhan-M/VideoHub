from sqlalchemy import Column, Integer, String

from db.dbconf import Base


class Message(Base):
    __tablename__ = 'messages'

    id = Column(Integer, primary_key=True)
    user = Column(String, nullable=False)
    message = Column(String, nullable=False)
    chat_id = Column(Integer, nullable=False)