from os import getenv

from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession


# DATABASE_URL = "sqlite+aiosqlite:///./websocket.db"
DATABASE_URL = getenv("DATABASE_URL")


engine = create_async_engine(DATABASE_URL, future=True, echo=True)
async_session = sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)
Base = declarative_base()
