from fastapi import APIRouter

from routers import (openapi, )


router = APIRouter()


router.include_router(openapi.router, prefix="/websocket")
