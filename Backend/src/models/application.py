"""
Model of the application object.
"""
from sqlalchemy import *
from sqlalchemy.orm import relationship
from sqlalchemy.sql.functions import now
from ..util.database import Base


class Application(Base):
    """
    Abstraction of the database table "account"
    """
    __tablename__ = "application"

    applicationID = Column(Integer, unique=True, primary_key=True, index=True)
    userID = Column(Integer, ForeignKey("user.userID"))
    plz = Column(Integer, ForeignKey("location.plz"))
    address = Column(String(64))
    houseNr = Column(String(5))
    prefabricated_house = Column(Boolean)
    house_use = Column(String(32))
    footprint = Column(Float)
    floor = Column(Integer)
    residential_units = Column(Integer)
    building_costs = Column(Float)
    construction = Column(String(32))
    heating_system = Column(String(32))

    application_user = relationship("User", foreign_keys="Application.userID")
    application_plz = relationship("Location", foreign_keys="Application.plz")