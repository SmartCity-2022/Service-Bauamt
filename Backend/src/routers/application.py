"""
Router object and all necessary routes
for account objects.
"""
from fastapi import *
from sqlalchemy.orm import Session

from src.models.application import Application
from src.models.location import Location
from src.models.citizen import Citizen
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
def add_event(ra: RequestApplication, request: Request, db: Session = Depends(init_db)):
    """
    Add an event to the DB. \n
    :param request: Request body to create Application \n
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

    new_application = Application(
        email=request.state.__getattr__("email"),
        plz=ra.plz,
        firstname=ra.vorname,
        lastname=ra.nachname,
        address=ra.straße,
        houseNr=ra.hausenummer,
        prefabricated_house=ra.fertighaus,
        house_use=ra.nutzung,
        footprint=ra.grundflaeche,
        floor=ra.geschosse,
        residential_units=ra.wohneinheiten,
        building_costs=ra.baukosten,
        construction=ra.bauweise,
        heating_system=ra.heizungsanlage,
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
