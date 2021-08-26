/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

import request from "supertest";

import sqlite3 from "sqlite3";

import app from "../src/app";

import buildSchemas from "../src/schemas";

// get testing data
import {
  ride,
  errorRiderName,
  errorDriverName,
  errorDriverVehicle,
  errorStartLat,
  errorStartLong,
  errorEndLatitude,
} from "../data/rides";

sqlite3.verbose();

const db = new sqlite3.Database(":memory:");

app(db);

describe("API tests", () => {
  before((done) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    db.serialize((err) => {
      if (err) {
        return err;
      }

      buildSchemas(db);
      return done();
    });
  });

  describe("GET /rides", () => {
    it("throw an error when no value returned", (done) => {
      request(app).get("/rides").expect(500);
      return done();
    });
    it("should return records", (done) => {
      request(app)
        .post("/rides")
        .send(ride)
        .expect(200)
        .end((err) => {
          if (!err) request(app).get("/rides").expect(200);
        });
      return done();
    });
    it("should work with pagination", (done) => {
      request(app).post("/rides").send(ride).expect(200);
      request(app).post("/rides").send(ride).expect(200);
      request(app).get(`/rides?page=1&limit=1`).expect(200);
      request(app).get(`/rides?page=2&limit=1`).expect(200);

      return done();
    });
  });

  describe("POST /rides", () => {
    it("should return a created record", (done) => {
      request(app)
        .post("/rides")
        .send(ride)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(200);
      return done();
    });
    it("should throw an error when rider_name is missing", (done) => {
      request(app).post("/rides").send(errorRiderName).expect(400);
      return done();
    });

    it("should throw an error when driver_name is missing", (done) => {
      request(app).post("/rides").send(errorDriverName).expect(400);
      return done();
    });

    it("should throw an error when driver_vehicle is missing", (done) => {
      request(app).post("/rides").send(errorDriverVehicle).expect(400);
      return done();
    });

    it("should throw an error when startLatitude is not in the right range", (done) => {
      request(app).post("/rides").send(errorStartLat).expect(400);
      return done();
    });

    it("should throw an error when startLongitude is not in the right range", (done) => {
      request(app).post("/rides").send(errorStartLong).expect(400);
      return done();
    });

    it("should throw an error when endLatitude is not in the right range", (done) => {
      request(app).post("/rides").send(errorEndLatitude).expect(400);
      return done();
    });
  });

  describe("GET /rides/:id", () => {
    it("should return a record", (done) => {
      request(app)
        .post("/rides")
        .send(ride)
        .expect(200)
        .end((err) => {
          if (!err) request(app).get(`/rides/1`).expect(200);
        });
      return done();
    });
    it("should throw an error when no record found", (done) => {
      request(app).get("/rides/1231141321").expect(404);
      return done();
    });
  });

  describe("GET /health", () => {
    it("should return health", (done) => {
      request(app).get("/health").expect("Content-Type", /text/).expect(200);
      return done();
    });
  });
});
