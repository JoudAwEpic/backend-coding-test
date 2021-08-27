const request = require("supertest");

const sqlite3 = require("sqlite3").verbose();

const { expect } = require("chai");

const db = new sqlite3.Database(":memory:");
const app = require("../src/app")(db);

const buildSchemas = require("../src/schemas");

// get testing data
const {
  ride,
  errorRiderName,
  errorDriverName,
  errorDriverVehicle,
  errorStartLat,
  errorStartLong,
  errorEndLatitude,
} = require("../data/rides");

describe("API tests", () => {
  before((done) => {
    // eslint-disable-next-line consistent-return
    db.serialize((err) => {
      if (err) {
        return err;
      }

      buildSchemas(db);
      done();
    });
  });

  describe("GET /rides", () => {
    it("throw an error when no value returned", async () => {
      await request(app).get("/rides").expect(500);
    });
    it("should return records", async () => {
      const result = await request(app).post("/rides").send(ride).expect(200);
      expect(result.body).to.have.lengthOf(1);
    });
    it("should work with pagination", async () => {
      await request(app).post("/rides").send(ride).expect(200);
      await request(app).post("/rides").send(ride).expect(200);
      const firstPage = await request(app)
        .get(`/rides?page=1&limit=1`)
        .expect(200);

      expect(firstPage.body.next_page).to.equal(true);
    });
  });

  describe("POST /rides", () => {
    it("should return a created record", async () => {
      const result = await request(app)
        .post("/rides")
        .send(ride)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(200);

      expect(result.body).to.have.lengthOf(1);
    });
    it("should throw an error when rider_name is missing", async () => {
      await request(app).post("/rides").send(errorRiderName).expect(400);
    });

    it("should throw an error when driver_name is missing", async () => {
      await request(app).post("/rides").send(errorDriverName).expect(400);
    });

    it("should throw an error when driver_vehicle is missing", async () => {
      await request(app).post("/rides").send(errorDriverVehicle).expect(400);
    });

    it("should throw an error when startLatitude is not in the right range", async () => {
      await request(app).post("/rides").send(errorStartLat).expect(400);
    });

    it("should throw an error when startLongitude is not in the right range", async () => {
      await request(app).post("/rides").send(errorStartLong).expect(400);
    });

    it("should throw an error when endLatitude is not in the right range", async () => {
      await request(app).post("/rides").send(errorEndLatitude).expect(400);
    });
  });

  describe("GET /rides/:id", () => {
    it("should return a record", async () => {
      const result = await request(app).post("/rides").send(ride).expect(200);
      await request(app).get(`/rides/${result.body[0].rideID}`).expect(200);
    });
    it("should throw an error when no record found", async () => {
      await request(app).get("/rides/1231141321").expect(404);
    });
  });

  describe("GET /health", () => {
    it("should return health", async () => {
      await request(app)
        .get("/health")
        .expect("Content-Type", /text/)
        .expect(200);
    });
  });
});
