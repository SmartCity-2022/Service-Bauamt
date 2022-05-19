
"""
Router object and all necessary routes
for account objects.
"""
from fastapi import *
from sqlalchemy.orm import Session

from src.models.appointment import Appointment
from src.schemas.appointment import RequestAppointment, RespondAppointment
from src.util.database import init_db


router = APIRouter()


@router.get("/")
def get_all(db: Session = Depends(init_db)):
    """
    Get all accounts registered in the database. \n
    :param db: Database to interact with \n
    :return: List of all accounts
    """
    return db.query(Appointment).all()


@router.get("/{id}")
def get_by_id(email: str, db: Session = Depends(init_db)):
    """
    Get a specific account. \n
    :param email: Email to identify account \n
    :param db: DB to browse \n
    :return: Account matching to email
    """
    if db.query(Appointment).filter(Appointment.appointmentID == id).first() is None:
        raise HTTPException(status_code=404, detail="Account not found.")
    return db.query(Appointment).filter(Appointment.appointmentID == id).first()


@router.post("/new", response_model=RespondAppointment)
def add_event(request: RequestAppointment, db: Session = Depends(init_db)):
    """
    Add an event to the DB. \n
    :param request: Request body to create event \n
    :param token: Token to identify logged in user \n
    :param db: DB to browse \n
    :return: OK if success
    """
    new_appointment = Appointment(
        eventname=request.eventname,
        location=request.location,
        appointment=request.appointment,
        maxAttendants=request.maxAttendants,
        description=request.description
    )
    db.add(new_appointment)
    db.commit()
    return new_appointment


@router.delete("/{id}/delete")
def delete_application(id: int, db: Session = Depends(init_db)):
    if db.query(Appointment).filter(Appointment.appointmentID == id).first() is None:
        raise HTTPException(status_code=404, detail="Account not found")
    db.execute(f"DELETE FROM Appointment WHERE appointmentID LIKE '{id}'")
    db.commit()
    return {
        "response": "ok"
    }
