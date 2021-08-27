const request = require("supertest");

const sqlite3 = require("sqlite3").verbose();

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
    it("throw an error when no value returned", (done) => {
      request(app).get("/rides").expect(500, done);
    });
    it("should return records", (done) => {
      request(app)
        .post("/rides")
        .send(ride)
        .expect(200)
        .end((err) => {
          if (!err) request(app).get("/rides").expect(200, done);
        });
    });
    it("should work with pagination", (done) => {
      request(app)
        .post("/rides")
        .send(ride)
        .expect(200)
        .then(() => {
          request(app)
            .post("/rides")
            .send(ride)
            .expect(200)
            .then(() => {
              request(app)
                .get(`/rides?page=1&limit=1`)
                .expect(200)
                .then(() => {
                  request(app).get(`/rides?page=2&limit=1`).expect(200);

                  done();
                });
            });
        });
    });
  });

  describe("POST /rides", () => {
    it("should return a created record", (done) => {
      request(app)
        .post("/rides")
        .send(ride)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(200, done);
    });
    it("should throw an error when rider_name is missing", (done) => {
      request(app).post("/rides").send(errorRiderName).expect(400, done);
    });

    it("should throw an error when driver_name is missing", (done) => {
      request(app).post("/rides").send(errorDriverName).expect(400, done);
    });

    it("should throw an error when driver_vehicle is missing", (done) => {
      request(app).post("/rides").send(errorDriverVehicle).expect(400, done);
    });

    it("should throw an error when startLatitude is not in the right range", (done) => {
      request(app).post("/rides").send(errorStartLat).expect(400);
      done();
    });

    it("should throw an error when startLongitude is not in the right range", (done) => {
      request(app).post("/rides").send(errorStartLong).expect(400, done);
    });

    it("should throw an error when endLatitude is not in the right range", (done) => {
      request(app).post("/rides").send(errorEndLatitude).expect(400, done);
    });
  });

  describe("GET /rides/:id", () => {
    it("should return a record", (done) => {
      request(app)
        .post("/rides")
        .send(ride)
        .expect(200)
        .end((err) => {
          if (!err) request(app).get(`/rides/1`).expect(200, done);
        });
    });
    it("should throw an error when no record found", (done) => {
      request(app).get("/rides/1231141321").expect(404, done);
    });
  });

  describe("GET /health", () => {
    it("should return health", (done) => {
      request(app)
        .get("/health")
        .expect("Content-Type", /text/)
        .expect(200, done);
    });
  });
});
