/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

import express, { Application, Request, Response } from "express";

import bodyParser from "body-parser";

// import type of the database
import { Database } from "sqlite3";
// import winston logger
import logger from "../utils/winston";

const app = express();

const jsonParser = bodyParser.json();

const application = (db: Database): Application => {
  app.get("/health", (_req: Request, res: Response) => res.send("Healthy"));

  app.post("/rides", jsonParser, (req: Request, res: Response) => {
    const startLatitude = Number(req.body.start_lat);
    const startLongitude = Number(req.body.start_long);
    const endLatitude = Number(req.body.end_lat);
    const endLongitude = Number(req.body.end_long);
    const riderName = req.body.rider_name;
    const driverName = req.body.driver_name;
    const driverVehicle = req.body.driver_vehicle;

    if (
      startLatitude < -90 ||
      startLatitude > 90 ||
      startLongitude < -180 ||
      startLongitude > 180
    ) {
      logger.error(
        "Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively"
      );
      return res.status(400).send({
        error_code: "VALIDATION_ERROR",
        message:
          "Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively",
      });
    }

    if (
      endLatitude < -90 ||
      endLatitude > 90 ||
      endLongitude < -180 ||
      endLongitude > 180
    ) {
      logger.error(
        "Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively"
      );
      return res.status(400).send({
        error_code: "VALIDATION_ERROR",
        message:
          "End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively",
      });
    }

    if (typeof riderName !== "string" || riderName.length < 1) {
      logger.error(
        "Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively"
      );
      return res.status(400).send({
        error_code: "VALIDATION_ERROR",
        message: "Rider name must be a non empty string",
      });
    }

    if (typeof driverName !== "string" || driverName.length < 1) {
      logger.error(
        "Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively"
      );
      return res.status(400).send({
        error_code: "VALIDATION_ERROR",
        message: "Rider name must be a non empty string",
      });
    }

    if (typeof driverVehicle !== "string" || driverVehicle.length < 1) {
      logger.error(
        "Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively"
      );
      return res.status(400).send({
        error_code: "VALIDATION_ERROR",
        message: "Rider name must be a non empty string",
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

    return db.run(
      "INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)",
      values,
      (err) => {
        if (err) {
          logger.error("Unknown error");
          return res.status(500).send({
            error_code: "SERVER_ERROR",
            message: "Unknown error",
          });
        }

        // define and fix the undefined with this

        return db.all(
          "SELECT * FROM Rides WHERE rideID = ?",
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          this.lastId ?? 1,
          (innerErr, rows) => {
            if (innerErr) {
              logger.error("Unknown error");
              return res.status(500).send({
                error_code: "SERVER_ERROR",
                message: "Unknown error",
              });
            }

            return res.status(200).send(rows);
          }
        );
      }
    );
  });

  app.get("/rides", (req: Request, res: Response) => {
    db.all("SELECT * FROM Rides", (err, rows) => {
      if (err) {
        logger.error("Unknown error");
        return res.status(500).send({
          error_code: "SERVER_ERROR",
          message: "Unknown error",
        });
      }

      if (rows.length === 0) {
        logger.error("Could not find any rides");
        return res.status(500).send({
          error_code: "RIDES_NOT_FOUND_ERROR",
          message: "Could not find any rides",
        });
      }

      return res.send(rows);
    });
  });

  app.get("/rides/:id", (req: Request, res: Response) => {
    db.all(
      `SELECT * FROM Rides WHERE rideID='${req.params.id}'`,
      (err, rows) => {
        if (err) {
          logger.error("Unknown error");
          return res.status(500).send({
            error_code: "SERVER_ERROR",
            message: "Unknown error",
          });
        }

        if (rows.length === 0) {
          logger.error("Could not find any rides");
          return res.status(404).send({
            error_code: "RIDES_NOT_FOUND_ERROR",
            message: "Could not find any rides",
          });
        }

        return res.send(rows);
      }
    );
  });

  return app;
};

export default application;
