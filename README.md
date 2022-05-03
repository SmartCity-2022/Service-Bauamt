# Backend-Bauamt

FastApi Python

MySQL

```
Create database bauamt;
use bauamt;
Create table Location(plz int not null, location varchar(64) not null, primary key(plz));
CREATE table User(userID int not null,first_name varchar(32),last_name varchar(32),email varchar(64),address varchar(64),plz int not null,houseNr varchar(6),primary key(userID),FOREIGN KEY (plz) REFERENCES Location(plz));
Create table Appointment(appointmentID int not null,userID int, plz int not null, primary key(plz),FOREIGN KEY (userID) REFERENCES User(userID),FOREIGN KEY (plz) REFERENCES Location(plz));
Create table Application(applicationID int not null,userID int not null, plz int not null,address varchar(64),houseNr varchar(6),prefabricated_house boolean,house_use varchar(32),footprint float, floor int, residential_units int, building_costs float, construction varchar(32),heating_system varchar(32),primary key(applicationID),FOREIGN KEY (userID) REFERENCES User(userID),FOREIGN KEY (plz) REFERENCES Location(plz));
```
