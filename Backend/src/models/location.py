"""
Model of the location object
"""

from sqlalchemy import *
from sqlalchemy.sql.functions import now
from ..util.database import Base


class Location(Base):
    __tablename__ = "location"

    plz = Column(INT, unique=True, primary_key=True, index=True)
    location = Column(String(64))