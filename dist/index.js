"use strict";
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// express md to handle markup files
var express_md_1 = __importDefault(require("express-md"));
// import and init the sqlite3
var sqlite3 = __importStar(require("sqlite3"));
var path_1 = __importDefault(require("path"));
// initial the app requirement
var app_1 = __importDefault(require("./src/app"));
var schemas_1 = __importDefault(require("./src/schemas"));
// implement winston
var winston_1 = __importDefault(require("./utils/winston"));
var port = 8010;
sqlite3.verbose();
var db = new sqlite3.Database(":memory:");
db.serialize(function () {
    schemas_1.default(db);
    var app = app_1.default(db);
    // create an instance of express-md with custom options
    var mdRouter = express_md_1.default({
        // serve markdown files from `docs` directory
        dir: path_1.default.join(__dirname, "/documentation"),
        // serve requests from root of the site
        url: "/",
    });
    // add as express middleware
    app.use(mdRouter);
    app.listen(port, function () {
        return winston_1.default.info("App started and listening on port " + port);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEseUNBQXlDO0FBQ3pDLHNDQUFzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRXRDLG9DQUFvQztBQUNwQywwREFBbUM7QUFFbkMsOEJBQThCO0FBQzlCLCtDQUFtQztBQUVuQyw4Q0FBd0I7QUFFeEIsOEJBQThCO0FBQzlCLGtEQUFvQztBQUVwQywwREFBeUM7QUFFekMsb0JBQW9CO0FBQ3BCLDREQUFxQztBQUVyQyxJQUFNLElBQUksR0FBRyxJQUFJLENBQUM7QUFFbEIsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ2xCLElBQU0sRUFBRSxHQUFHLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUU1QyxFQUFFLENBQUMsU0FBUyxDQUFDO0lBQ1gsaUJBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUVqQixJQUFNLEdBQUcsR0FBRyxhQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFNUIsdURBQXVEO0lBQ3ZELElBQU0sUUFBUSxHQUFHLG9CQUFTLENBQUM7UUFDekIsNkNBQTZDO1FBQzdDLEdBQUcsRUFBRSxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxnQkFBZ0IsQ0FBQztRQUUzQyx1Q0FBdUM7UUFDdkMsR0FBRyxFQUFFLEdBQUc7S0FDVCxDQUFDLENBQUM7SUFFSCw0QkFBNEI7SUFDNUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUVsQixHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtRQUNmLE9BQUEsaUJBQU0sQ0FBQyxJQUFJLENBQUMsdUNBQXFDLElBQU0sQ0FBQztJQUF4RCxDQUF3RCxDQUN6RCxDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tdW5yZXNvbHZlZCAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L2V4dGVuc2lvbnMgKi9cblxuLy8gZXhwcmVzcyBtZCB0byBoYW5kbGUgbWFya3VwIGZpbGVzXG5pbXBvcnQgZXhwcmVzc01kIGZyb20gXCJleHByZXNzLW1kXCI7XG5cbi8vIGltcG9ydCBhbmQgaW5pdCB0aGUgc3FsaXRlM1xuaW1wb3J0ICogYXMgc3FsaXRlMyBmcm9tIFwic3FsaXRlM1wiO1xuXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG4vLyBpbml0aWFsIHRoZSBhcHAgcmVxdWlyZW1lbnRcbmltcG9ydCBhcHBsaWNhdGlvbiBmcm9tIFwiLi9zcmMvYXBwXCI7XG5cbmltcG9ydCBidWlsZFNjaGVtYXMgZnJvbSBcIi4vc3JjL3NjaGVtYXNcIjtcblxuLy8gaW1wbGVtZW50IHdpbnN0b25cbmltcG9ydCBsb2dnZXIgZnJvbSBcIi4vdXRpbHMvd2luc3RvblwiO1xuXG5jb25zdCBwb3J0ID0gODAxMDtcblxuc3FsaXRlMy52ZXJib3NlKCk7XG5jb25zdCBkYiA9IG5ldyBzcWxpdGUzLkRhdGFiYXNlKFwiOm1lbW9yeTpcIik7XG5cbmRiLnNlcmlhbGl6ZSgoKSA9PiB7XG4gIGJ1aWxkU2NoZW1hcyhkYik7XG5cbiAgY29uc3QgYXBwID0gYXBwbGljYXRpb24oZGIpO1xuXG4gIC8vIGNyZWF0ZSBhbiBpbnN0YW5jZSBvZiBleHByZXNzLW1kIHdpdGggY3VzdG9tIG9wdGlvbnNcbiAgY29uc3QgbWRSb3V0ZXIgPSBleHByZXNzTWQoe1xuICAgIC8vIHNlcnZlIG1hcmtkb3duIGZpbGVzIGZyb20gYGRvY3NgIGRpcmVjdG9yeVxuICAgIGRpcjogcGF0aC5qb2luKF9fZGlybmFtZSwgXCIvZG9jdW1lbnRhdGlvblwiKSxcblxuICAgIC8vIHNlcnZlIHJlcXVlc3RzIGZyb20gcm9vdCBvZiB0aGUgc2l0ZVxuICAgIHVybDogXCIvXCIsXG4gIH0pO1xuXG4gIC8vIGFkZCBhcyBleHByZXNzIG1pZGRsZXdhcmVcbiAgYXBwLnVzZShtZFJvdXRlcik7XG5cbiAgYXBwLmxpc3Rlbihwb3J0LCAoKSA9PlxuICAgIGxvZ2dlci5pbmZvKGBBcHAgc3RhcnRlZCBhbmQgbGlzdGVuaW5nIG9uIHBvcnQgJHtwb3J0fWApXG4gICk7XG59KTtcbiJdfQ==