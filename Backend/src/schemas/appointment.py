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

    vorname: str
    nachname: str
    straße: str
    hausenummer: str
    plz: int
    ort: str

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
