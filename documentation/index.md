# Documentation for backend-coding-test

---

The backend-coding-test is a home assessment that is meant to be used for testing developer's skills.
The project is focusing on software engineering skills starting with simple GitHub management, creating documentation of the project, implementing tooling, code refactoring, and ending up with security and load testing.

the project can be defined in 6 main points:

1. [Documentation]
2. [Implement Tooling]
3. [Implement Pagination]
4. [Refactoring]
5. [Security]
6. [Load Testing]

project is meant to be handling a single SQL table that is called "_Rides_" that represent as the name suggests a ride that starts from one point and ends at another point, with some metadata about the rider and the vehicle that is the ridding.

here is a brief about the database **Schema** :

```sql
CREATE TABLE Rides (
    rideID INTEGER PRIMARY KEY AUTOINCREMENT,
    startLat DECIMAL NOT NULL,
    startLong DECIMAL NOT NULL,
    endLat DECIMAL NOT NULL,
    endLong DECIMAL NOT NULL,
    riderName TEXT NOT NULL,
    driverName TEXT NOT NULL,
    driverVehicle TEXT NOT NULL,
    created DATETIME default CURRENT_TIMESTAMP
)
```

## Server Endpoints:

the server contains from three main endpoint that are used to fetch:

- all rides
- single ride
- create a new ride

### get all rides:

action: return a list of records **"rides"**

```json
curl GET '${{server.url}}/rides?page=number&limit=number'
```

where:

**page** is the number of page we are in

**limit** is the number of records you want to show per page

expected returned data:

request can contain two return data types:

#### success:

return **rows** that contains all data of the rides in the database in the following formats

```json
rows: [
    {
        rideID: 1,
        startLat: 38.8951,
        startLong: -77.0364,
        endLat: 45.2310,
        endLong: -73.034,
        riderName: "Emma Smith",
        driverName: "michael schumacher",
        driverVehicle: "Ferrari",
        created: 1629891080
    },
    {...},
],
total_items: 10,
next_page: true,
page: 1
```

#### error:

return data in the following format:

```json
{
  "error_code": "SERVER_ERROR_CODE",
  "message": "DETAILS ABOUT THE ERROR THAT HAPPENS"
}
```

expected **error_code**:

SERVER_ERROR: something went wrong while trying to connect or fetching data from database

RIDES_NOT_FOUND_ERROR: no record has been found when fetching data from database

### get single ride:

```curl
curl --request GET '${{server.url}}/rides/:id'
```

action: return a single item from the **"rides"** list, where **:id** is a unique identity that

represents the **rideID** columns in the database.

expected returned data:

request can contain two return data types:

#### success:

return **rows** that contains matching record where the "rideID" equal the ":id" in the following

format:

```json
[
  {
    "rideID": 1,
    "startLat": 38.8951,
    "startLong": -77.0364,
    "endLat": 45.231,
    "endLong": -73.034,
    "riderName": "Emma Smith",
    "driverName": "michael schumacher",
    "driverVehicle": "Ferrari",
    "created": 1629891080
  }
]
```

#### error:

return data in the following format:

```json
{
  "error_code": "SERVER_ERROR_CODE",
  "message": "DETAILS ABOUT THE ERROR THAT HAPPENS"
}
```

expected **error_code**:

SERVER_ERROR: something went wrong while trying to connect or fetching data from database

RIDES_NOT_FOUND_ERROR: no record has been found when fetching data from database

### create new ride:

action: create a new ride record in the database

```curl
curl -X POST -H "Content-Type: application/json"
-d '{"start_lat": "38.8951", "start_long": "-77.0364",
"end_lat": "45.2310", "end_long": "-73.034",
"rider_name": "Emma Smith",
"driver_name": "michael schumacher",
"driver_vehicle": "Ferrari"}'
'${{server.url}}/rides'
```

required data to be sent to the server:

start_lat: a number that holds a value between **-90 and 90**

start_long: a number that holds a value between **-180 and 180**

end_lat: a number that holds a value between **-90 and 90**

end_long: a number that holds a value between **-180 and 180**

rider_name: a string value that contains at least 1 char

driver_name: a string value that contains at least 1 char

driver_vehicle: a string value that contains at least 1 char

expected returned data:

request can contain two return data types:

#### success:

return **rows** that contains the created record, in the following format:

```json
{
  "rideID": 1,
  "startLat": 38.8951,
  "startLong": -77.0364,
  "endLat": 45.231,
  "endLong": -73.034,
  "riderName": "Emma Smith",
  "driverName": "michael schumacher",
  "driverVehicle": "Ferrari",
  "created": 1629891080
}
```

#### error:

return data in the following format:

```json
{
  "error_code": "SERVER_ERROR_CODE",
  "message": "DETAILS ABOUT THE ERROR THAT HAPPENS"
}
```

expected **error_code**:

SERVER_ERROR: something went wrong while trying to connect or fetching data from database

VALIDATION_ERROR: one of the provided data is missing or has an invalid value

## Creating Documentation and rendering it in webview:

in order to make sure that the docuementation is displayed in web view so any user can access it we used a package called **express-md** that allows us to use **.md** files to render them into a web page

plugins required some options:

```javascript
var mdRouter = expressMd({
  dir: "directory where the .md files are holded at",
  url: "url to serve those files",
});
```

after that we initial that variable into an express middleware

```javascript
app.use(mdRouter);
```

now any user who wants to modify the documentation can just go to the path

`documentation/index.md`

and start editing the content in it, and see it reflected into the browser
