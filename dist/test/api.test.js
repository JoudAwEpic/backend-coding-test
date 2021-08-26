"use strict";
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var sqlite3_1 = __importDefault(require("sqlite3"));
var app_1 = __importDefault(require("../src/app"));
var schemas_1 = __importDefault(require("../src/schemas"));
// get testing data
var rides_1 = require("../data/rides");
sqlite3_1.default.verbose();
var db = new sqlite3_1.default.Database(":memory:");
app_1.default(db);
describe("API tests", function () {
    before(function (done) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        db.serialize(function (err) {
            if (err) {
                return err;
            }
            schemas_1.default(db);
            return done();
        });
    });
    describe("GET /rides", function () {
        it("throw an error when no value returned", function (done) {
            supertest_1.default(app_1.default).get("/rides").expect(500);
            return done();
        });
        it("should return all records", function (done) {
            supertest_1.default(app_1.default)
                .post("/rides")
                .send(rides_1.ride)
                .expect(200)
                .end(function (err) {
                if (!err)
                    supertest_1.default(app_1.default).get("/rides").expect(200);
            });
            return done();
        });
    });
    describe("POST /rides", function () {
        it("should return a created record", function (done) {
            supertest_1.default(app_1.default)
                .post("/rides")
                .send(rides_1.ride)
                .expect("Content-Type", "application/json; charset=utf-8")
                .expect(200);
            return done();
        });
        it("should throw an error when rider_name is missing", function (done) {
            supertest_1.default(app_1.default).post("/rides").send(rides_1.errorRiderName).expect(400);
            return done();
        });
        it("should throw an error when driver_name is missing", function (done) {
            supertest_1.default(app_1.default).post("/rides").send(rides_1.errorDriverName).expect(400);
            return done();
        });
        it("should throw an error when driver_vehicle is missing", function (done) {
            supertest_1.default(app_1.default).post("/rides").send(rides_1.errorDriverVehicle).expect(400);
            return done();
        });
        it("should throw an error when startLatitude is not in the right range", function (done) {
            supertest_1.default(app_1.default).post("/rides").send(rides_1.errorStartLat).expect(400);
            return done();
        });
        it("should throw an error when startLongitude is not in the right range", function (done) {
            supertest_1.default(app_1.default).post("/rides").send(rides_1.errorStartLong).expect(400);
            return done();
        });
        it("should throw an error when endLatitude is not in the right range", function (done) {
            supertest_1.default(app_1.default).post("/rides").send(rides_1.errorEndLatitude).expect(400);
            return done();
        });
    });
    describe("GET /rides/:id", function () {
        it("should return a record", function (done) {
            supertest_1.default(app_1.default)
                .post("/rides")
                .send(rides_1.ride)
                .expect(200)
                .end(function (err) {
                if (!err)
                    supertest_1.default(app_1.default).get("/rides/1").expect(200);
            });
            return done();
        });
        it("should throw an error when no record found", function (done) {
            supertest_1.default(app_1.default).get("/rides/1231141321").expect(404);
            return done();
        });
    });
    describe("GET /health", function () {
        it("should return health", function (done) {
            supertest_1.default(app_1.default).get("/health").expect("Content-Type", /text/).expect(200);
            return done();
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90ZXN0L2FwaS50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx5Q0FBeUM7QUFDekMsc0NBQXNDOzs7OztBQUV0Qyx3REFBZ0M7QUFFaEMsb0RBQThCO0FBRTlCLG1EQUE2QjtBQUU3QiwyREFBMEM7QUFFMUMsbUJBQW1CO0FBQ25CLHVDQVF1QjtBQUV2QixpQkFBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBRWxCLElBQU0sRUFBRSxHQUFHLElBQUksaUJBQU8sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7QUFFNUMsYUFBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBRVIsUUFBUSxDQUFDLFdBQVcsRUFBRTtJQUNwQixNQUFNLENBQUMsVUFBQyxJQUFJO1FBQ1YsNkRBQTZEO1FBQzdELGFBQWE7UUFDYixFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUMsR0FBRztZQUNmLElBQUksR0FBRyxFQUFFO2dCQUNQLE9BQU8sR0FBRyxDQUFDO2FBQ1o7WUFFRCxpQkFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2pCLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxZQUFZLEVBQUU7UUFDckIsRUFBRSxDQUFDLHVDQUF1QyxFQUFFLFVBQUMsSUFBSTtZQUMvQyxtQkFBTyxDQUFDLGFBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkMsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQywyQkFBMkIsRUFBRSxVQUFDLElBQUk7WUFDbkMsbUJBQU8sQ0FBQyxhQUFHLENBQUM7aUJBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQztpQkFDZCxJQUFJLENBQUMsWUFBSSxD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ZCxJQUFJLENBQUMsWUFBSSxDQUFDO2lCQUNWLE1BQU0sQ0FBQyxHQUFHLENBQUM7aUJBQ1gsR0FBRyxDQUFDLFVBQUMsR0FBRztnQkFDUCxJQUFJLENBQUMsR0FBRztvQkFBRSxtQkFBTyxDQUFDLGFBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckQsQ0FBQyxDQUFDLENBQUM7WUFDTCxPQUFPLElBQUksRUFBRSxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLDRDQUE0QyxFQUFFLFVBQUMsSUFBSTtZQUNwRCxtQkFBTyxDQUFDLGFBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsRCxPQUFPLElBQUksRUFBRSxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsYUFBYSxFQUFFO1FBQ3RCLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSxVQUFDLElBQUk7WUFDOUIsbUJBQU8sQ0FBQyxhQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkUsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tdW5yZXNvbHZlZCAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L2V4dGVuc2lvbnMgKi9cblxuaW1wb3J0IHJlcXVlc3QgZnJvbSBcInN1cGVydGVzdFwiO1xuXG5pbXBvcnQgc3FsaXRlMyBmcm9tIFwic3FsaXRlM1wiO1xuXG5pbXBvcnQgYXBwIGZyb20gXCIuLi9zcmMvYXBwXCI7XG5cbmltcG9ydCBidWlsZFNjaGVtYXMgZnJvbSBcIi4uL3NyYy9zY2hlbWFzXCI7XG5cbi8vIGdldCB0ZXN0aW5nIGRhdGFcbmltcG9ydCB7XG4gIHJpZGUsXG4gIGVycm9yUmlkZXJOYW1lLFxuICBlcnJvckRyaXZlck5hbWUsXG4gIGVycm9yRHJpdmVyVmVoaWNsZSxcbiAgZXJyb3JTdGFydExhdCxcbiAgZXJyb3JTdGFydExvbmcsXG4gIGVycm9yRW5kTGF0aXR1ZGUsXG59IGZyb20gXCIuLi9kYXRhL3JpZGVzXCI7XG5cbnNxbGl0ZTMudmVyYm9zZSgpO1xuXG5jb25zdCBkYiA9IG5ldyBzcWxpdGUzLkRhdGFiYXNlKFwiOm1lbW9yeTpcIik7XG5cbmFwcChkYik7XG5cbmRlc2NyaWJlKFwiQVBJIHRlc3RzXCIsICgpID0+IHtcbiAgYmVmb3JlKChkb25lKSA9PiB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBkYi5zZXJpYWxpemUoKGVycikgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICByZXR1cm4gZXJyO1xuICAgICAgfVxuXG4gICAgICBidWlsZFNjaGVtYXMoZGIpO1xuICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoXCJHRVQgL3JpZGVzXCIsICgpID0+IHtcbiAgICBpdChcInRocm93IGFuIGVycm9yIHdoZW4gbm8gdmFsdWUgcmV0dXJuZWRcIiwgKGRvbmUpID0+IHtcbiAgICAgIHJlcXVlc3QoYXBwKS5nZXQoXCIvcmlkZXNcIikuZXhwZWN0KDUwMCk7XG4gICAgICByZXR1cm4gZG9uZSgpO1xuICAgIH0pO1xuICAgIGl0KFwic2hvdWxkIHJldHVybiBhbGwgcmVjb3Jkc1wiLCAoZG9uZSkgPT4ge1xuICAgICAgcmVxdWVzdChhcHApXG4gICAgICAgIC5wb3N0KFwiL3JpZGVzXCIpXG4gICAgICAgIC5zZW5kKHJpZGUpXG4gICAgICAgIC5leHBlY3QoMjAwKVxuICAgICAgICAuZW5kKChlcnIpID0+IHtcbiAgICAgICAgICBpZiAoIWVycikgcmVxdWVzdChhcHApLmdldChcIi9yaWRlc1wiKS5leHBlY3QoMjAwKTtcbiAgICAgICAgfSk7XG4gICAgICByZXR1cm4gZG9uZSgpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZShcIlBPU1QgL3JpZGVzXCIsICgpID0+IHtcbiAgICBpdChcInNob3VsZCByZXR1cm4gYSBjcmVhdGVkIHJlY29yZFwiLCAoZG9uZSkgPT4ge1xuICAgICAgcmVxdWVzdChhcHApXG4gICAgICAgIC5wb3N0KFwiL3JpZGVzXCIpXG4gICAgICAgIC5zZW5kKHJpZGUpXG4gICAgICAgIC5leHBlY3QoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIpXG4gICAgICAgIC5leHBlY3QoMjAwKTtcbiAgICAgIHJldHVybiBkb25lKCk7XG4gICAgfSk7XG4gICAgaXQoXCJzaG91bGQgdGhyb3cgYW4gZXJyb3Igd2hlbiByaWRlcl9uYW1lIGlzIG1pc3NpbmdcIiwgKGRvbmUpID0+IHtcbiAgICAgIHJlcXVlc3QoYXBwKS5wb3N0KFwiL3JpZGVzXCIpLnNlbmQoZXJyb3JSaWRlck5hbWUpLmV4cGVjdCg0MDApO1xuICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICB9KTtcblxuICAgIGl0KFwic2hvdWxkIHRocm93IGFuIGVycm9yIHdoZW4gZHJpdmVyX25hbWUgaXMgbWlzc2luZ1wiLCAoZG9uZSkgPT4ge1xuICAgICAgcmVxdWVzdChhcHApLnBvc3QoXCIvcmlkZXNcIikuc2VuZChlcnJvckRyaXZlck5hbWUpLmV4cGVjdCg0MDApO1xuICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICB9KTtcblxuICAgIGl0KFwic2hvdWxkIHRocm93IGFuIGVycm9yIHdoZW4gZHJpdmVyX3ZlaGljbGUgaXMgbWlzc2luZ1wiLCAoZG9uZSkgPT4ge1xuICAgICAgcmVxdWVzdChhcHApLnBvc3QoXCIvcmlkZXNcIikuc2VuZChlcnJvckRyaXZlclZlaGljbGUpLmV4cGVjdCg0MDApO1xuICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICB9KTtcblxuICAgIGl0KFwic2hvdWxkIHRocm93IGFuIGVycm9yIHdoZW4gc3RhcnRMYXRpdHVkZSBpcyBub3QgaW4gdGhlIHJpZ2h0IHJhbmdlXCIsIChkb25lKSA9PiB7XG4gICAgICByZXF1ZXN0KGFwcCkucG9zdChcIi9yaWRlc1wiKS5zZW5kKGVycm9yU3RhcnRMYXQpLmV4cGVjdCg0MDApO1xuICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICB9KTtcblxuICAgIGl0KFwic2hvdWxkIHRocm93IGFuIGVycm9yIHdoZW4gc3RhcnRMb25naXR1ZGUgaXMgbm90IGluIHRoZSByaWdodCByYW5nZVwiLCAoZG9uZSkgPT4ge1xuICAgICAgcmVxdWVzdChhcHApLnBvc3QoXCIvcmlkZXNcIikuc2VuZChlcnJvclN0YXJ0TG9uZykuZXhwZWN0KDQwMCk7XG4gICAgICByZXR1cm4gZG9uZSgpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJzaG91bGQgdGhyb3cgYW4gZXJyb3Igd2hlbiBlbmRMYXRpdHVkZSBpcyBub3QgaW4gdGhlIHJpZ2h0IHJhbmdlXCIsIChkb25lKSA9PiB7XG4gICAgICByZXF1ZXN0KGFwcCkucG9zdChcIi9yaWRlc1wiKS5zZW5kKGVycm9yRW5kTGF0aXR1ZGUpLmV4cGVjdCg0MDApO1xuICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoXCJHRVQgL3JpZGVzLzppZFwiLCAoKSA9PiB7XG4gICAgaXQoXCJzaG91bGQgcmV0dXJuIGEgcmVjb3JkXCIsIChkb25lKSA9PiB7XG4gICAgICByZXF1ZXN0KGFwcClcbiAgICAgICAgLnBvc3QoXCIvcmlkZXNcIilcbiAgICAgICAgLnNlbmQocmlkZSlcbiAgICAgICAgLmV4cGVjdCgyMDApXG4gICAgICAgIC5lbmQoKGVycikgPT4ge1xuICAgICAgICAgIGlmICghZXJyKSByZXF1ZXN0KGFwcCkuZ2V0KGAvcmlkZXMvMWApLmV4cGVjdCgyMDApO1xuICAgICAgICB9KTtcbiAgICAgIHJldHVybiBkb25lKCk7XG4gICAgfSk7XG4gICAgaXQoXCJzaG91bGQgdGhyb3cgYW4gZXJyb3Igd2hlbiBubyByZWNvcmQgZm91bmRcIiwgKGRvbmUpID0+IHtcbiAgICAgIHJlcXVlc3QoYXBwKS5nZXQoXCIvcmlkZXMvMTIzMTE0MTMyMVwiKS5leHBlY3QoNDA0KTtcbiAgICAgIHJldHVybiBkb25lKCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKFwiR0VUIC9oZWFsdGhcIiwgKCkgPT4ge1xuICAgIGl0KFwic2hvdWxkIHJldHVybiBoZWFsdGhcIiwgKGRvbmUpID0+IHtcbiAgICAgIHJlcXVlc3QoYXBwKS5nZXQoXCIvaGVhbHRoXCIpLmV4cGVjdChcIkNvbnRlbnQtVHlwZVwiLCAvdGV4dC8pLmV4cGVjdCgyMDApO1xuICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdfQ==