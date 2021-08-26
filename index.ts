/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

// express md to handle markup files
import expressMd from "express-md";

// import and init the sqlite3
import * as sqlite3 from "sqlite3";

import path from "path";

// initial the app requirement
import application from "./src/app";

import buildSchemas from "./src/schemas";

// implement winston
import logger from "./utils/winston";

const port = 8010;

sqlite3.verbose();
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
