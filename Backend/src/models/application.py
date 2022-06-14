"""
Model of the application object.
"""
from sqlalchemy import *
from sqlalchemy.orm import relationship

from ..util.database import Base


class Application(Base):
    """
    Abstraction of the database table "account"
    """
    __tablename__ = "application"

    applicationID = Column(Integer, unique=True, primary_key=True, index=True,autoincrement=True)
    email = Column(String(64), ForeignKey("citizen.email"), primary_key=True)
    plz = Column(INT, ForeignKey("location.plz"), primary_key=True)
    firstname = Column(String(64))
    lastname = Column(String(64))
    address = Column(String(64))
    houseNr = Column(String(6))
    prefabricated_house = Column(Boolean)
    house_use = Column(String(32))
    footprint = Column(Float)
    floor = Column(Integer)
    residential_units = Column(Integer)
    building_costs = Column(Float)
    construction = Column(String(32))
    heating_system = Column(String(32))

    citizen_idx = relationship("Citizen", foreign_keys="Application.email")
    location_idx = relationship("Location", foreign_keys="Application.plz")
