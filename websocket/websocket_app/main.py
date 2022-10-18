
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from router import router
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
    allow_headers=['*'],
)
app.logger = CustomLogger().set_logger()

app.include_router(router)


@app.get("/websocket/healthcheck")
def health_check():
    return {"status": "Websocket is ok"}
