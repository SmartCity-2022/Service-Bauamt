"""
Model of the user object
"""

from sqlalchemy import *
from ..util.database import Base


class Citizen(Base):
    __tablename__ = "citizen"

    email = Column(String(128), unique=True, primary_key=True, index=True)