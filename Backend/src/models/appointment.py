"""
Model of the user object
"""

from sqlalchemy import *
from sqlalchemy.orm import relationship

from ..util.database import Base


class Appointment(Base):
    __tablename__ = "appointment"

    appointmentID = Column(INT, unique=True, primary_key=True, index=True, autoincrement=True)
    email = Column(String(64), ForeignKey("citizen.email"), primary_key=True)
    plz = Column(INT, ForeignKey("location.plz"), primary_key=True)
    firstname = Column(String(64))
    lastname = Column(String(64))
    address = Column(String(64))
    houseNr = Column(String(6))
    # date = Column(DateTime, default=now())

    citizen_idx = relationship("Citizen", foreign_keys="Appointment.email")
    location_idx = relationship("Location", foreign_keys="Appointment.plz")

