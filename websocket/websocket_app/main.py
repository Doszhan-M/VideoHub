
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from router import router
from db.dbconf import engine, Base
from logger.log_config import CustomLogger


app = FastAPI(
    title="Websocket",
    version="1.0.0",
    docs_url=None,
    redoc_url=None,
    openapi_url=None,
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],)

app.logger = CustomLogger().set_logger()

app.include_router(router)


@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
        
        
@app.get("/websocket/healthcheck")
def health_check():
    return {"status": "Websocket is ok"}
