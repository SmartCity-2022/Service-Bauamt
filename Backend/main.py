"""
Starting file for uvicorn web server.
Containing an app object to start from.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routers import *

app = FastAPI()


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

