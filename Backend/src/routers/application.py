
"""
Router object and all necessary routes
for account objects.
"""
from fastapi import *
from sqlalchemy.orm import Session

from src.models.application import Application
from src.schemas.application import RequestApplication, RespondApplication
from src.util.database import init_db


router = APIRouter()


@router.get("/")
def get_all(db: Session = Depends(init_db)):
    """
    Get all accounts registered in the database. \n
    :param db: Database to interact with \n
    :return: List of all accounts
    """
    return db.query(Application).all()


@router.get("/{id}")
def get_by_id(email: str, db: Session = Depends(init_db)):
    """
    Get a specific account. \n
    :param email: Email to identify Application \n
    :param db: DB to browse \n
    :return: Account matching to email
    """
    if db.query(Application).filter(Application.applicationID == id).first() is None:
        raise HTTPException(status_code=404, detail="Application not found.")
    return db.query(Application).filter(Application.applicationID == id).first()


@router.post("/new", response_model=RespondApplication)
def add_event(request: RequestApplication, db: Session = Depends(init_db)):
    """
    Add an event to the DB. \n
    :param request: Request body to create Application \n
    :param db: DB to browse \n
    :return: OK if success
    """
    new_application = Application(
        eventname=request.eventname,
        location=request.location,
        appointment=request.appointment,
        maxAttendants=request.maxAttendants,
        description=request.description
    )
    db.add(new_application)
    db.commit()
    return new_application


@router.delete("/{id}/delete")
def delete_application(id: int, db: Session = Depends(init_db)):
    if db.query(Application).filter(Application.applicationID == id).first() is None:
        raise HTTPException(status_code=404, detail="Account not found")
    db.execute(f"DELETE FROM Application WHERE applicationID LIKE '{id}'")
    db.commit()
    return {
        "response": "ok"
    }
