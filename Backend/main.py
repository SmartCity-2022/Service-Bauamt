"""
Starting file for uvicorn web server.
Containing an app object to start from.
"""
from fastapi import FastAPI
import asyncio
from fastapi.middleware.cors import CORSMiddleware
from src.routers import *
from src.util.receiver import *
from src.util.sender import *
from src.auth.jwt_handler import AuthorizeMiddleware

app = FastAPI()


@app.on_event('startup')
async def startup() -> None:
    threading.Thread(target=asyncio.run, args=(test(),)).start()
    send(key=configParser.get("rabbitMQ-routes", "HELLO"), payload="test")


async def test():
    receiver = Receiver()
    receiver.daemon = True
    receiver.run()


app.add_middleware(AuthorizeMiddleware)


origins = [
    "http://localhost:8080"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    router=application.router,
    prefix="/application",
    tags=["Application-Router"]
)

app.include_router(
    router=appointment.router,
    prefix="/appointment",
    tags=["Appointment-Router"]
)

app.include_router(
    router=citizen.router,
    prefix="/citizen",
    tags=["Citizen-Router"]
)
