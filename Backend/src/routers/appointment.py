"""
Router object and all necessary routes
for account objects.
"""
from fastapi import *
from sqlalchemy.orm import Session

from src.models.appointment import Appointment
from src.models.location import Location
from src.models.citizen import Citizen
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
def add_event(ra: RequestAppointment, request: Request, db: Session = Depends(init_db)):
    """
    Add an event to the DB. \n
    :param ra:
    :param request: Request body to create event \n
    :param db: DB to browse \n
    :return: OK if success
    """

    new_location = Location(
        plz=ra.plz,
        location=ra.ort
    )

    new_citizen = Citizen(
        email=request.state.__getattr__("email")
    )

    if db.query(Location).filter(Location.plz == ra.plz).first() is None:
        db.add(new_location)
        db.commit()

    if db.query(Citizen).filter(Citizen.email == request.state.__getattr__("email")).first() is None:
        db.add(new_citizen)
        db.commit()

    new_appointment = Appointment(
        email=request.state.__getattr__("email"),
        plz=ra.plz,
        firstname=ra.vorname,
        lastname=ra.nachname,
        address=ra.straße,
        houseNr=ra.hausenummer,
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
