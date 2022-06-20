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

    firstname: str
    lastname: str
    address: str
    houseNr: str
    plz: int
    location: str

    class Config:
        orm_mode = True


class RespondAppointment(BaseModel):
    """
    Respond body when an application is successful.
    """
    email: str
    firstname: str
    lastname: str
    address: str
    houseNr: str

    class Config:
        orm_mode = True
