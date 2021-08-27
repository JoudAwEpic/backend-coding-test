const express = require("express");

const bodyParser = require("body-parser");

// import winston logger
const logger = require("../utils/winston");

const app = express();

const jsonParser = bodyParser.json();

module.exports = (db) => {
  // function to allow us to run sqllite3 in async mode
  async function dbAll(query, values = []) {
    return new Promise((resolve, reject) => {
      db.all(query, values, (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows);
      });
    });
  }

  app.get("/health", (req, res) => res.status(200).send("Healthy"));

  app.post("/rides", jsonParser, async (req, res) => {
    const startLatitude = Number(req.body.start_lat);
    const startLongitude = Number(req.body.start_long);
    const endLatitude = Number(req.body.end_lat);
    const endLongitude = Number(req.body.end_long);
    const riderName = req.body.rider_name;
    const driverName = req.body.driver_name;
    const driverVehicle = req.body.driver_vehicle;

    if (
      !startLatitude ||
      !startLongitude ||
      startLatitude < -90 ||
      startLatitude > 90 ||
      startLongitude < -180 ||
      startLongitude > 180
    ) {
      const message =
        "Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively";
      logger.error(message);
      return res.status(400).send({
        error_code: "VALIDATION_ERROR",
        message,
      });
    }

    if (
      !endLatitude ||
      !endLongitude ||
      endLatitude < -90 ||
      endLatitude > 90 ||
      endLongitude < -180 ||
      endLongitude > 180
    ) {
      const message =
        "Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively";
      logger.error(message);
      return res.status(400).send({
        error_code: "VALIDATION_ERROR",
        message,
      });
    }

    if (typeof riderName !== "string" || riderName.length < 1) {
      const message = "Rider name must be a non empty string";
      logger.error(message);
      return res.status(400).send({
        error_code: "VALIDATION_ERROR",
        message,
      });
    }

    if (typeof driverName !== "string" || driverName.length < 1) {
      const message = "Driver name must be a non empty string";
      logger.error(message);
      return res.status(400).send({
        error_code: "VALIDATION_ERROR",
        message,
      });
    }

    if (typeof driverVehicle !== "string" || driverVehicle.length < 1) {
      const message = "Driver Vehicle must be a non empty string";
      logger.error(message);
      return res.status(400).send({
        error_code: "VALIDATION_ERROR",
        message,
      });
    }

    const values = [
      req.body.start_lat,
      req.body.start_long,
      req.body.end_lat,
      req.body.end_long,
      req.body.rider_name,
      req.body.driver_name,
      req.body.driver_vehicle,
    ];

    try {
      db.run(
        "INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)",
        values
      );

      const rows = await dbAll(
        "SELECT * FROM Rides ORDER BY rideID DESC LIMIT 1"
      );

      return res.status(200).send(rows);
    } catch (err) {
      logger.error(err);
      return res.status(500).send({
        error_code: "SERVER_ERROR",
        message: "Unknown error",
      });
    }
  });

  app.get("/rides", async (req, res) => {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 5;
    const limitStart = (page - 1) * limit;
    const limitEnd = page * limit;

    try {
      const rows = await dbAll(`SELECT * FROM Rides LIMIT ?,?`, [
        limitStart,
        limitEnd,
      ]);
      if (rows.length === 0) {
        logger.error("Could not find any rides");
        return res.status(500).send({
          error_code: "RIDES_NOT_FOUND_ERROR",
          message: "Could not find any rides",
        });
      }

      const rides = await dbAll(
        "SELECT COUNT(rideID) AS countRides FROM Rides"
      );

      const nextPage = page * limit < rides[0].countRides;

      return res.status(200).send({
        rows,
        total_items: rides[0].countRides,
        next_page: nextPage,
        page,
      });
    } catch (err) {
      logger.error(err);
      return res.status(500).send({
        error_code: "SERVER_ERROR",
        message: "Unknown error",
      });
    }
  });

  app.get("/rides/:id", async (req, res) => {
    try {
      const { id } = req.params || null;

      if (!id) {
        const message = "Please provide a valide ID";
        logger.error(message);
        return res.status(500).send({
          error_code: "RIDES_NOT_FOUND_ERROR",
          message,
        });
      }

      const result = await dbAll(`SELECT * FROM Rides WHERE rideID=?`, [id]);

      if (result.length === 0) {
        logger.error("Could not find any rides");
        return res.status(404).send({
          error_code: "RIDES_NOT_FOUND_ERROR",
          message: "Could not find any rides",
        });
      }

      return res.status(200).send(result);
    } catch (err) {
      logger.error(err);
      return res.status(500).send({
        error_code: "SERVER_ERROR",
        message: "Unknown error",
      });
    }
  });

  return app;
};
