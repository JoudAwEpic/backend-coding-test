"use strict";
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
// import winston logger
var winston_1 = __importDefault(require("../utils/winston"));
var app = express_1.default();
var jsonParser = body_parser_1.default.json();
var application = function (db) {
    app.get("/health", function (_req, res) { return res.send("Healthy"); });
    app.post("/rides", jsonParser, function (req, res) {
        var startLatitude = Number(req.body.start_lat);
        var startLongitude = Number(req.body.start_long);
        var endLatitude = Number(req.body.end_lat);
        var endLongitude = Number(req.body.end_long);
        var riderName = req.body.rider_name;
        var driverName = req.body.driver_name;
        var driverVehicle = req.body.driver_vehicle;
        if (startLatitude < -90 ||
            startLatitude > 90 ||
            startLongitude < -180 ||
            startLongitude > 180) {
            winston_1.default.error("Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively");
            return res.status(400).send({
                error_code: "VALIDATION_ERROR",
                message: "Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively",
            });
        }
        if (endLatitude < -90 ||
            endLatitude > 90 ||
            endLongitude < -180 ||
            endLongitude > 180) {
            winston_1.default.error("Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively");
            return res.status(400).send({
                error_code: "VALIDATION_ERROR",
                message: "End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively",
            });
        }
        if (typeof riderName !== "string" || riderName.length < 1) {
            winston_1.default.error("Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively");
            return res.status(400).send({
                error_code: "VALIDATION_ERROR",
                message: "Rider name must be a non empty string",
            });
        }
        if (typeof driverName !== "string" || driverName.length < 1) {
            winston_1.default.error("Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively");
            return res.status(400).send({
                error_code: "VALIDATION_ERROR",
                message: "Rider name must be a non empty string",
            });
        }
        if (typeof driverVehicle !== "string" || driverVehicle.length < 1) {
            winston_1.default.error("Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively");
            return res.status(400).send({
                error_code: "VALIDATION_ERROR",
                message: "Rider name must be a non empty string",
            });
        }
        var values = [
            req.body.start_lat,
            req.body.start_long,
            req.body.end_lat,
            req.body.end_long,
            req.body.rider_name,
            req.body.driver_name,
            req.body.driver_vehicle,
        ];
        return db.run("INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)", values, function (err) {
            var _a;
            if (err) {
                winston_1.default.error("Unknown error");
                return res.status(500).send({
                    error_code: "SERVER_ERROR",
                    message: "Unknown error",
                });
            }
            // define and fix the undefined with this
            return db.all("SELECT * FROM Rides WHERE rideID = ?", 
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            (_a = _this.lastId) !== null && _a !== void 0 ? _a : 1, function (innerErr, rows) {
                if (innerErr) {
                    winston_1.default.error("Unknown error");
                    return res.status(500).send({
                        error_code: "SERVER_ERROR",
                        message: "Unknown error",
                    });
                }
                return res.status(200).send(rows);
            });
        });
    });
    app.get("/rides", function (req, res) {
        db.all("SELECT * FROM Rides", function (err, rows) {
            if (err) {
                winston_1.default.error("Unknown error");
                return res.status(500).send({
                    error_code: "SERVER_ERROR",
                    message: "Unknown error",
                });
            }
            if (rows.length === 0) {
                winston_1.default.error("Could not find any rides");
                return res.status(500).send({
                    error_code: "RIDES_NOT_FOUND_ERROR",
                    message: "Could not find any rides",
                });
            }
            return res.send(rows);
        });
    });
    app.get("/rides/:id", function (req, res) {
        db.all("SELECT * FROM Rides WHERE rideID='" + req.params.id + "'", function (err, rows) {
            if (err) {
                winston_1.default.error("Unknown error");
                return res.status(500).send({
                    error_code: "SERVER_ERROR",
                    message: "Unknown error",
                });
            }
            if (rows.length === 0) {
                winston_1.default.error("Could not find any rides");
                return res.status(404).send({
                    error_code: "RIDES_NOT_FOUND_ERROR",
                    message: "Could not find any rides",
                });
            }
            return res.send(rows);
        });
    });
    return app;
};
exports.default = application;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEseUNBQXlDO0FBQ3pDLHNDQUFzQzs7OztBQUV0QyxpQkF1TEE7O0FBdkxBLG9EQUFrRTtBQUVsRSw0REFBcUM7QUFJckMsd0JBQXdCO0FBQ3hCLDZEQUFzQztBQUV0QyxJQUFNLEdBQUcsR0FBRyxpQkFBTyxFQUFFLENBQUM7QUFFdEIsSUFBTSxVQUFVLEdBQUcscUJBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUVyQyxJQUFNLFdBQVcsR0FBRyxVQUFDLEVBQVk7SUFDL0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsVUFBQyxJQUFhLEVBQUUsR0FBYSxJQUFLLE9BQUEsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDO0lBRTFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxVQUFDLEdBQVksRUFBRSxHQUFhO1FBQ3pELElBQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pELElBQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ25ELElBQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdDLElBQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9DLElBQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3RDLElBQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3hDLElBQU0sYUFBYSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMs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Q3BDLENBQUMsQ0FBQzthQUNKO1lBRUQsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxHQUFHLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxVQUFDLEdBQVksRUFBRSxHQUFhO1FBQ2hELEVBQUUsQ0FBQyxHQUFHLENBQ0osdUNBQXFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFHLEVBQ3JELFVBQUMsR0FBRyxFQUFFLElBQUk7WUFDUixJQUFJLEdBQUcsRUFBRTtnQkFDUCxpQkFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDOUIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDMUIsVUFBVSxFQUFFLGNBQWM7b0JBQzFCLE9BQU8sRUFBRSxlQUFlO2lCQUN6QixDQUFDLENBQUM7YUFDSjtZQUVELElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ3JCLGlCQUFNLENBQUMsS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUM7Z0JBQ3pDLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQzFCLFVBQVUsRUFBRSx1QkFBdUI7b0JBQ25DLE9BQU8sRUFBRSwwQkFBMEI7aUJBQ3BDLENBQUMsQ0FBQzthQUNKO1lBRUQsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUMsQ0FBQztBQUVGLGtCQUFlLFdBQVcsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby11bnJlc29sdmVkICovXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvZXh0ZW5zaW9ucyAqL1xuXG5pbXBvcnQgZXhwcmVzcywgeyBBcHBsaWNhdGlvbiwgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tIFwiZXhwcmVzc1wiO1xuXG5pbXBvcnQgYm9keVBhcnNlciBmcm9tIFwiYm9keS1wYXJzZXJcIjtcblxuLy8gaW1wb3J0IHR5cGUgb2YgdGhlIGRhdGFiYXNlXG5pbXBvcnQgeyBEYXRhYmFzZSB9IGZyb20gXCJzcWxpdGUzXCI7XG4vLyBpbXBvcnQgd2luc3RvbiBsb2dnZXJcbmltcG9ydCBsb2dnZXIgZnJvbSBcIi4uL3V0aWxzL3dpbnN0b25cIjtcblxuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuXG5jb25zdCBqc29uUGFyc2VyID0gYm9keVBhcnNlci5qc29uKCk7XG5cbmNvbnN0IGFwcGxpY2F0aW9uID0gKGRiOiBEYXRhYmFzZSk6IEFwcGxpY2F0aW9uID0+IHtcbiAgYXBwLmdldChcIi9oZWFsdGhcIiwgKF9yZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHJlcy5zZW5kKFwiSGVhbHRoeVwiKSk7XG5cbiAgYXBwLnBvc3QoXCIvcmlkZXNcIiwganNvblBhcnNlciwgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgIGNvbnN0IHN0YXJ0TGF0aXR1ZGUgPSBOdW1iZXIocmVxLmJvZHkuc3RhcnRfbGF0KTtcbiAgICBjb25zdCBzdGFydExvbmdpdHVkZSA9IE51bWJlcihyZXEuYm9keS5zdGFydF9sb25nKTtcbiAgICBjb25zdCBlbmRMYXRpdHVkZSA9IE51bWJlcihyZXEuYm9keS5lbmRfbGF0KTtcbiAgICBjb25zdCBlbmRMb25naXR1ZGUgPSBOdW1iZXIocmVxLmJvZHkuZW5kX2xvbmcpO1xuICAgIGNvbnN0IHJpZGVyTmFtZSA9IHJlcS5ib2R5LnJpZGVyX25hbWU7XG4gICAgY29uc3QgZHJpdmVyTmFtZSA9IHJlcS5ib2R5LmRyaXZlcl9uYW1lO1xuICAgIGNvbnN0IGRyaXZlclZlaGljbGUgPSByZXEuYm9keS5kcml2ZXJfdmVoaWNsZTtcblxuICAgIGlmIChcbiAgICAgIHN0YXJ0TGF0aXR1ZGUgPCAtOTAgfHxcbiAgICAgIHN0YXJ0TGF0aXR1ZGUgPiA5MCB8fFxuICAgICAgc3RhcnRMb25naXR1ZGUgPCAtMTgwIHx8XG4gICAgICBzdGFydExvbmdpdHVkZSA+IDE4MFxuICAgICkge1xuICAgICAgbG9nZ2VyLmVycm9yKFxuICAgICAgICBcIlN0YXJ0IGxhdGl0dWRlIGFuZCBsb25naXR1ZGUgbXVzdCBiZSBiZXR3ZWVuIC05MCAtIDkwIGFuZCAtMTgwIHRvIDE4MCBkZWdyZWVzIHJlc3BlY3RpdmVseVwiXG4gICAgICApO1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcbiAgICAgICAgZXJyb3JfY29kZTogXCJWQUxJREFUSU9OX0VSUk9SXCIsXG4gICAgICAgIG1lc3NhZ2U6XG4gICAgICAgICAgXCJTdGFydCBsYXRpdHVkZSBhbmQgbG9uZ2l0dWRlIG11c3QgYmUgYmV0d2VlbiAtOTAgLSA5MCBhbmQgLTE4MCB0byAxODAgZGVncmVlcyByZXNwZWN0aXZlbHlcIixcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIGVuZExhdGl0dWRlIDwgLTkwIHx8XG4gICAgICBlbmRMYXRpdHVkZSA+IDkwIHx8XG4gICAgICBlbmRMb25naXR1ZGUgPCAtMTgwIHx8XG4gICAgICBlbmRMb25naXR1ZGUgPiAxODBcbiAgICApIHtcbiAgICAgIGxvZ2dlci5lcnJvcihcbiAgICAgICAgXCJTdGFydCBsYXRpdHVkZSBhbmQgbG9uZ2l0dWRlIG11c3QgYmUgYmV0d2VlbiAtOTAgLSA5MCBhbmQgLTE4MCB0byAxODAgZGVncmVlcyByZXNwZWN0aXZlbHlcIlxuICAgICAgKTtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIGVycm9yX2NvZGU6IFwiVkFMSURBVElPTl9FUlJPUlwiLFxuICAgICAgICBtZXNzYWdlOlxuICAgICAgICAgIFwiRW5kIGxhdGl0dWRlIGFuZCBsb25naXR1ZGUgbXVzdCBiZSBiZXR3ZWVuIC05MCAtIDkwIGFuZCAtMTgwIHRvIDE4MCBkZWdyZWVzIHJlc3BlY3RpdmVseVwiLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiByaWRlck5hbWUgIT09IFwic3RyaW5nXCIgfHwgcmlkZXJOYW1lLmxlbmd0aCA8IDEpIHtcbiAgICAgIGxvZ2dlci5lcnJvcihcbiAgICAgICAgXCJTdGFydCBsYXRpdHVkZSBhbmQgbG9uZ2l0dWRlIG11c3QgYmUgYmV0d2VlbiAtOTAgLSA5MCBhbmQgLTE4MCB0byAxODAgZGVncmVlcyByZXNwZWN0aXZlbHlcIlxuICAgICAgKTtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIGVycm9yX2NvZGU6IFwiVkFMSURBVElPTl9FUlJPUlwiLFxuICAgICAgICBtZXNzYWdlOiBcIlJpZGVyIG5hbWUgbXVzdCBiZSBhIG5vbiBlbXB0eSBzdHJpbmdcIixcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZHJpdmVyTmFtZSAhPT0gXCJzdHJpbmdcIiB8fCBkcml2ZXJOYW1lLmxlbmd0aCA8IDEpIHtcbiAgICAgIGxvZ2dlci5lcnJvcihcbiAgICAgICAgXCJTdGFydCBsYXRpdHVkZSBhbmQgbG9uZ2l0dWRlIG11c3QgYmUgYmV0d2VlbiAtOTAgLSA5MCBhbmQgLTE4MCB0byAxODAgZGVncmVlcyByZXNwZWN0aXZlbHlcIlxuICAgICAgKTtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIGVycm9yX2NvZGU6IFwiVkFMSURBVElPTl9FUlJPUlwiLFxuICAgICAgICBtZXNzYWdlOiBcIlJpZGVyIG5hbWUgbXVzdCBiZSBhIG5vbiBlbXB0eSBzdHJpbmdcIixcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZHJpdmVyVmVoaWNsZSAhPT0gXCJzdHJpbmdcIiB8fCBkcml2ZXJWZWhpY2xlLmxlbmd0aCA8IDEpIHtcbiAgICAgIGxvZ2dlci5lcnJvcihcbiAgICAgICAgXCJTdGFydCBsYXRpdHVkZSBhbmQgbG9uZ2l0dWRlIG11c3QgYmUgYmV0d2VlbiAtOTAgLSA5MCBhbmQgLTE4MCB0byAxODAgZGVncmVlcyByZXNwZWN0aXZlbHlcIlxuICAgICAgKTtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7XG4gICAgICAgIGVycm9yX2NvZGU6IFwiVkFMSURBVElPTl9FUlJPUlwiLFxuICAgICAgICBtZXNzYWdlOiBcIlJpZGVyIG5hbWUgbXVzdCBiZSBhIG5vbiBlbXB0eSBzdHJpbmdcIixcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHZhbHVlcyA9IFtcbiAgICAgIHJlcS5ib2R5LnN0YXJ0X2xhdCxcbiAgICAgIHJlcS5ib2R5LnN0YXJ0X2xvbmcsXG4gICAgICByZXEuYm9keS5lbmRfbGF0LFxuICAgICAgcmVxLmJvZHkuZW5kX2xvbmcsXG4gICAgICByZXEuYm9keS5yaWRlcl9uYW1lLFxuICAgICAgcmVxLmJvZHkuZHJpdmVyX25hbWUsXG4gICAgICByZXEuYm9keS5kcml2ZXJfdmVoaWNsZSxcbiAgICBdO1xuXG4gICAgcmV0dXJuIGRiLnJ1bihcbiAgICAgIFwiSU5TRVJUIElOVE8gUmlkZXMoc3RhcnRMYXQsIHN0YXJ0TG9uZywgZW5kTGF0LCBlbmRMb25nLCByaWRlck5hbWUsIGRyaXZlck5hbWUsIGRyaXZlclZlaGljbGUpIFZBTFVFUyAoPywgPywgPywgPywgPywgPywgPylcIixcbiAgICAgIHZhbHVlcyxcbiAgICAgIChlcnIpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcihcIlVua25vd24gZXJyb3JcIik7XG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5zZW5kKHtcbiAgICAgICAgICAgIGVycm9yX2NvZGU6IFwiU0VSVkVSX0VSUk9SXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIlVua25vd24gZXJyb3JcIixcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRlZmluZSBhbmQgZml4IHRoZSB1bmRlZmluZWQgd2l0aCB0aGlzXG5cbiAgICAgICAgcmV0dXJuIGRiLmFsbChcbiAgICAgICAgICBcIlNFTEVDVCAqIEZST00gUmlkZXMgV0hFUkUgcmlkZUlEID0gP1wiLFxuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXRzLWNvbW1lbnRcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgdGhpcy5sYXN0SWQgPz8gMSxcbiAgICAgICAgICAoaW5uZXJFcnIsIHJvd3MpID0+IHtcbiAgICAgICAgICAgIGlmIChpbm5lckVycikge1xuICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoXCJVbmtub3duIGVycm9yXCIpO1xuICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLnNlbmQoe1xuICAgICAgICAgICAgICAgIGVycm9yX2NvZGU6IFwiU0VSVkVSX0VSUk9SXCIsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJVbmtub3duIGVycm9yXCIsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLnNlbmQocm93cyk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfVxuICAgICk7XG4gIH0pO1xuXG4gIGFwcC5nZXQoXCIvcmlkZXNcIiwgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgIGRiLmFsbChcIlNFTEVDVCAqIEZST00gUmlkZXNcIiwgKGVyciwgcm93cykgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBsb2dnZXIuZXJyb3IoXCJVbmtub3duIGVycm9yXCIpO1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLnNlbmQoe1xuICAgICAgICAgIGVycm9yX2NvZGU6IFwiU0VSVkVSX0VSUk9SXCIsXG4gICAgICAgICAgbWVzc2FnZTogXCJVbmtub3duIGVycm9yXCIsXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAocm93cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgbG9nZ2VyLmVycm9yKFwiQ291bGQgbm90IGZpbmQgYW55IHJpZGVzXCIpO1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLnNlbmQoe1xuICAgICAgICAgIGVycm9yX2NvZGU6IFwiUklERVNfTk9UX0ZPVU5EX0VSUk9SXCIsXG4gICAgICAgICAgbWVzc2FnZTogXCJDb3VsZCBub3QgZmluZCBhbnkgcmlkZXNcIixcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXMuc2VuZChyb3dzKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgYXBwLmdldChcIi9yaWRlcy86aWRcIiwgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgIGRiLmFsbChcbiAgICAgIGBTRUxFQ1QgKiBGUk9NIFJpZGVzIFdIRVJFIHJpZGVJRD0nJHtyZXEucGFyYW1zLmlkfSdgLFxuICAgICAgKGVyciwgcm93cykgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgbG9nZ2VyLmVycm9yKFwiVW5rbm93biBlcnJvclwiKTtcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLnNlbmQoe1xuICAgICAgICAgICAgZXJyb3JfY29kZTogXCJTRVJWRVJfRVJST1JcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiVW5rbm93biBlcnJvclwiLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJvd3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgbG9nZ2VyLmVycm9yKFwiQ291bGQgbm90IGZpbmQgYW55IHJpZGVzXCIpO1xuICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuc2VuZCh7XG4gICAgICAgICAgICBlcnJvcl9jb2RlOiBcIlJJREVTX05PVF9GT1VORF9FUlJPUlwiLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJDb3VsZCBub3QgZmluZCBhbnkgcmlkZXNcIixcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXMuc2VuZChyb3dzKTtcbiAgICAgIH1cbiAgICApO1xuICB9KTtcblxuICByZXR1cm4gYXBwO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgYXBwbGljYXRpb247XG4iXX0=