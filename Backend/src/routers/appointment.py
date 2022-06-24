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
def get_all(request: Request, db: Session = Depends(init_db)):
    """
    Get all accounts registered in the database by a user. \n
    :param request:
    :param db: Database to interact with \n
    :return: List of all accounts
    """
    return db.query(Appointment).filter(Appointment.email == request.state.__getattr__("email")).all()


@router.get("/dateandtime")
def date_time(db: Session = Depends(init_db)):
    """
    Get all dates and times. \n
    :param db: DB to browse \n
    """
    return db.query(Appointment.date, Appointment.time).order_by(Appointment.date.asc(), Appointment.time.asc()).all()


@router.get("/{id}")
def get_by_id(id: int, db: Session = Depends(init_db)):
    """
    Get a specific account. \n
    :param id:
    :param db: DB to browse \n
    :return: Account matching to email
    """
    if db.query(Appointment).filter(Appointment.appointmentID == id).first() is None:
        raise HTTPException(status_code=404, detail="Account not found.")
    return db.query(Appointment).filter(Appointment.appointmentID == id).first()


@router.put("/edit/{id}")
def update_appointment(id: int, ra: RequestAppointment, db: Session = Depends(init_db)):
    """
    update a specific appointment. \n
    :param id:
    :param ra:
    :param db: DB to browse \n
    :return: Account matching to email
    """
    if db.query(Appointment).filter(Appointment.appointmentID == id).first() is None:
        raise HTTPException(status_code=404, detail="Appointment not found.")

    if ra.plz and ra.location:
        new_location = Location(
            plz=ra.plz,
            location=ra.location
        )

        if db.query(Location).filter(Location.plz == ra.plz).first() is None:
            db.add(new_location)
            db.commit()

    appointment = db.query(Appointment).filter(Appointment.appointmentID == id).first()
    if ra.plz and ra.location:
        appointment.plz = ra.plz,
    if ra.firstname:
        appointment.firstname = ra.firstname,
    if ra.lastname:
        appointment.lastname = ra.lastname,
    if ra.address:
        appointment.address = ra.address,
    if ra.houseNr:
        appointment.houseNr = ra.houseNr,
    if ra.date:
        appointment.date = ra.date,
    if ra.time:
        appointment.time = ra.time,

    db.commit()

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
        location=ra.location
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
        firstname=ra.firstname,
        lastname=ra.lastname,
        address=ra.address,
        houseNr=ra.houseNr,
        reason=ra.reason,
        date=ra.date,
        time=ra.time
    )

    db.add(new_appointment)
    db.commit()
    return new_appointment


@router.delete("/{id}/delete")
def delete_appointment(id: int, db: Session = Depends(init_db)):
    if db.query(Appointment).filter(Appointment.appointmentID == id).first() is None:
        raise HTTPException(status_code=404, detail="Account not found")
    db.execute(f"DELETE FROM appointment WHERE appointmentID LIKE '{id}'")
    db.commit()
    return {
        "response": "ok"
    }
