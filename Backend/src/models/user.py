"""
Model of the user object
"""

from sqlalchemy import *
from sqlalchemy.orm import relationship
from sqlalchemy.sql.functions import now
from ..util.database import Base


class User(Base):
    __tablename__ = "user"

    userID = Column(Integer, unique=True, primary_key=True, index=True)
    plz = Column(Integer,ForeignKey("Location.plz"))
    first_name = Column(String(30))
    last_name = Column(String(50))
    email = Column(String(128))
    address = Column(String(64))
    houseNr = Column(String(5))

    user_plz = relationship("Location", foreign_keys="User.plz")