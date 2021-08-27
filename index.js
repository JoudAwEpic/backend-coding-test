// express md to handle markup files
const expressMd = require("express-md");

// import and init the sqlite3
const sqlite3 = require("sqlite3").verbose();

const path = require("path");

// initial the app requirement
const application = require("./src/app");

const buildSchemas = require("./src/schemas");

// implement winston
const logger = require("./utils/winston");

const port = 8010;

const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  buildSchemas(db);

  const app = application(db);

  // create an instance of express-md with custom options
  const mdRouter = expressMd({
    // serve markdown files from `docs` directory
    dir: path.join(__dirname, "/documentation"),

    // serve requests from root of the site
    url: "/",
  });

  // add as express middleware
  app.use(mdRouter);

  app.listen(port, () =>
    logger.info(`App started and listening on port ${port}`)
  );
});
