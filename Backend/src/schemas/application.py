"""
JSON Body formats for requests and responses.
"""
from pydantic import *


class RequestApplication(BaseModel):
    """
    Request body expected when attempting to send an application.
    """
    userID: int
    plz: int
    address: str
    houseNr: str
    prefabricated_house: bool
    use: str
    footprint: float
    floor: int
    residential_units: int
    building_costs: float
    construction: str
    heating_system: str

    class Config:
        orm_mode = True


class RespondApplication(BaseModel):
    """
    Respond body when an application is successful.
    """
    response: str

    class Config:
        orm_mode = True