
"""
Router object and all necessary routes
for account objects.
"""
from fastapi import *
from sqlalchemy import *
from sqlalchemy.orm import Session

from src.models.citizen import Citizen
from src.schemas.citizen import RequestCitizen, RespondCitizen
from src.util.database import init_db


router = APIRouter()

@router.get("/")
def get_all(db: Session = Depends(init_db)):
    """
    Get all accounts registered in the database. \n
    :param db: Database to interact with \n
    :return: List of all accounts
    """

    return db.query(Citizen).all()


@router.post("/new", response_model=RespondCitizen)
def add_event(request: RequestCitizen, db: Session = Depends(init_db)):
    """
    Add an event to the DB. \n
    :param request: Request body to create event \n
    :param token: Token to identify logged in user \n
    :param db: DB to browse \n
    :return: OK if success
    """

    new_citizen = Citizen(
        email=request.email,
    )
    #db.add(new_citizen)
    #db.commit()
    return new_citizen



