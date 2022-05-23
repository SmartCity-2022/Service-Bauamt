"""
Model of the user object
"""

from sqlalchemy import *
from sqlalchemy.orm import relationship
from sqlalchemy.sql.functions import now
from ..util.database import Base


class Appointment(Base):
    __tablename__ = "appointment"

    appointmentID = Column(INT, unique=True, primary_key=True, index=True)
    citizen = Column(String(128)), ForeignKey("citizen.email")
    plz = Column(INT), ForeignKey("location.plz")
    date = Column(DateTime, default=now())
