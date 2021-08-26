"use strict";
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
exports.__esModule = true;
var supertest_1 = require("supertest");
var sqlite3_1 = require("sqlite3");
var app_1 = require("../src/app");
var schemas_1 = require("../src/schemas");
// get testing data
var rides_1 = require("../data/rides");
sqlite3_1["default"].verbose();
var db = new sqlite3_1["default"].Database(":memory:");
app_1["default"](db);
describe("API tests", function () {
    before(function (done) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        db.serialize(function (err) {
            if (err) {
                return err;
            }
            schemas_1["default"](db);
            return done();
        });
    });
    describe("GET /rides", function () {
        it("throw an error when no value returned", function (done) {
            supertest_1["default"](app_1["default"]).get("/rides").expect(500);
            return done();
        });
        it("should return all records", function (done) {
            supertest_1["default"](app_1["default"])
                .post("/rides")
                .send(rides_1.ride)
                .expect(200)
                .end(function (err) {
                if (!err)
                    supertest_1["default"](app_1["default"]).get("/rides").expect(200);
            });
            return done();
        });
    });
    describe("POST /rides", function () {
        it("should return a created record", function (done) {
            supertest_1["default"](app_1["default"])
                .post("/rides")
                .send(rides_1.ride)
                .expect("Content-Type", "application/json; charset=utf-8")
                .expect(200);
            return done();
        });
        it("should throw an error when rider_name is missing", function (done) {
            supertest_1["default"](app_1["default"]).post("/rides").send(rides_1.errorRiderName).expect(400);
            return done();
        });
        it("should throw an error when driver_name is missing", function (done) {
            supertest_1["default"](app_1["default"]).post("/rides").send(rides_1.errorDriverName).expect(400);
            return done();
        });
        it("should throw an error when driver_vehicle is missing", function (done) {
            supertest_1["default"](app_1["default"]).post("/rides").send(rides_1.errorDriverVehicle).expect(400);
            return done();
        });
        it("should throw an error when startLatitude is not in the right range", function (done) {
            supertest_1["default"](app_1["default"]).post("/rides").send(rides_1.errorStartLat).expect(400);
            return done();
        });
        it("should throw an error when startLongitude is not in the right range", function (done) {
            supertest_1["default"](app_1["default"]).post("/rides").send(rides_1.errorStartLong).expect(400);
            return done();
        });
        it("should throw an error when endLatitude is not in the right range", function (done) {
            supertest_1["default"](app_1["default"]).post("/rides").send(rides_1.errorEndLatitude).expect(400);
            return done();
        });
    });
    describe("GET /rides/:id", function () {
        it("should return a record", function (done) {
            supertest_1["default"](app_1["default"])
                .post("/rides")
                .send(rides_1.ride)
                .expect(200)
                .end(function (err) {
                if (!err)
                    supertest_1["default"](app_1["default"]).get("/rides/1").expect(200);
            });
            return done();
        });
        it("should throw an error when no record found", function (done) {
            supertest_1["default"](app_1["default"]).get("/rides/1231141321").expect(404);
            return done();
        });
    });
    describe("GET /health", function () {
        it("should return health", function (done) {
            supertest_1["default"](app_1["default"]).get("/health").expect("Content-Type", /text/).expect(200);
            return done();
        });
    });
});
