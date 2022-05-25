"""
Database connection setup.
"""
from sqlalchemy import *
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from src.util.config import *


def read_config():
    configParser = init_config()
    server = configParser.get("database-configuration", "server")
    user = configParser.get("database-configuration", "user")
    pw = configParser.get("database-configuration", "password")
    host = configParser.get("database-configuration", "host")
    port = configParser.get("database-configuration", "port")
    db = configParser.get("database-configuration", "database")

    return server+"://"+user+":"+pw+"@"+host+":"+port+"/"+db


engine = create_engine(read_config())
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def init_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


