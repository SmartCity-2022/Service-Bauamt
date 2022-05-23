"""
JSON Body formats for requests and responses.
"""
from pydantic import *
from typing import Optional
from datetime import datetime


class RequestAppointment(BaseModel):
    """
    Request body expected when attempting to send an application.
    """

    email: str
    plz: int
    date: datetime


    class Config:
        orm_mode = True


class RespondAppointment(BaseModel):
    """
    Respond body when an application is successful.
    """
    response: str

    class Config:
        orm_mode = True