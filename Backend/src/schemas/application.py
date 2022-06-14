"""
JSON Body formats for requests and responses.
"""
from pydantic import *


class RequestApplication(BaseModel):
    """
    Request body expected when attempting to send an application.
    """
    vorname: str
    nachname: str
    straße: str
    hausenummer: str
    plz: int
    ort: str
    fertighaus: bool
    nutzung: str
    grundflaeche: float
    geschosse: int
    wohneinheiten: int
    baukosten: float
    bauweise: str
    heizungsanlage: str

    class Config:
        orm_mode = True


class RespondApplication(BaseModel):
    """
    Respond body when an application is successful.
    """
    email: str
    firstname: str
    lastname: str
    address: str
    houseNr: str
    plz: int
    prefabricated_house: bool
    house_use: str
    footprint: float
    floor: int
    residential_units: int
    building_costs: float
    construction: str
    heating_system: str

    class Config:
        orm_mode = True