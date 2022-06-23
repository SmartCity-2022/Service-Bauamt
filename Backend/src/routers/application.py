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
def get_all(request: Request, db: Session = Depends(init_db)):
    """
    Get all accounts registered in the database by a user. \n
    :param request:
    :param db: Database to interact with \n
    :return: List of all accounts
    """
    return db.query(Application).filter(Application.email == request.state.__getattr__("email")).all()


@router.get("/{id}")
def get_by_id(id: int, db: Session = Depends(init_db)):
    """
    Get a specific account. \n
    :param id:
    :param db: DB to browse \n
    :return: Account matching to email
    """
    return db.query(Application).filter(Application.applicationID == id).first()


@router.put("/edit/{id}")
def update_appointment(id: int, ra: RequestApplication, db: Session = Depends(init_db)):
    """
    update a specific appointment. \n
    :param id:
    :param ra:
    :param db: DB to browse \n
    :return: Account matching to email
    """
    if db.query(Application).filter(Application.applicationID == id).first() is None:
        raise HTTPException(status_code=404, detail="Application not found.")

    if ra.plz and ra.location:
        new_location = Location(
            plz=ra.plz,
            location=ra.location
        )

        if db.query(Location).filter(Location.plz == ra.plz).first() is None:
            db.add(new_location)
            db.commit()

    application = db.query(Application).filter(Application.applicationID == id).first()
    if ra.plz and ra.location:
        application.plz = ra.plz,
    if ra.firstname:
        application.firstname = ra.firstname,
    if ra.lastname:
        application.lastname = ra.lastname,
    if ra.address:
        application.address = ra.address,
    if ra.houseNr:
        application.houseNr = ra.houseNr,
    if ra.construction_project:
        application.construction_project = ra.construction_project,
    if ra.prefabricated_house:
        application.prefabricated_house = ra.prefabricated_house,
    if ra.house_use:
        application.house_use = ra.house_use,
    if ra.footprint:
        application.footprint = ra.footprint,
    if ra.floor:
        application.floor = ra.floor,
    if ra.residential_units:
        application.residential_units = ra.residential_units,
    if ra.building_costs:
        application.building_costs = ra.building_costs,
    if ra.construction:
        application.construction = ra.construction,
    if ra.heating_system:
        application.heating_system = ra.heating_system,

    db.commit()

    return db.query(Application).filter(Application.applicationID == id).first()


@router.post("/new", response_model=RespondApplication)
def add_event(ra: RequestApplication, request: Request, db: Session = Depends(init_db)):
    """
    Add an event to the DB. \n
    :param ra:
    :param request: Request body to create Application \n
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

    new_application = Application(
        email=request.state.__getattr__("email"),
        plz=ra.plz,
        firstname=ra.firstname,
        lastname=ra.lastname,
        address=ra.address,
        houseNr=ra.houseNr,
        construction_project=ra.construction_project,
        prefabricated_house=ra.prefabricated_house,
        house_use=ra.house_use,
        footprint=ra.footprint,
        floor=ra.floor,
        residential_units=ra.residential_units,
        building_costs=ra.building_costs,
        construction=ra.construction,
        heating_system=ra.heating_system,
    )
    db.add(new_application)
    db.commit()
    return new_application


@router.delete("/{id}/delete")
def delete_application(id: int, db: Session = Depends(init_db)):
    if db.query(Application).filter(Application.applicationID == id).first() is None:
        raise HTTPException(status_code=404, detail="Account not found")
    db.execute(f"DELETE FROM application WHERE applicationID LIKE '{id}'")
    db.commit()
    return {
        "response": "ok"
    }
