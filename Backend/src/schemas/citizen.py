"""
JSON Body formats for requests and responses.
"""
from pydantic import *


class RespondCitizen(BaseModel):
    """
    Respond body when an application is successful.
    """
    response: str

    class Config:
        orm_mode = True


class RequestCitizen(BaseModel):
    """
    Request body expected when attempting to send an application.
    """

    email: str

    class Config:
        orm_mode = True
