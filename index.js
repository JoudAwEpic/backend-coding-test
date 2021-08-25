"use strict";

const express = require("express");
// express md to handle markup files
const expressMd = require("express-md");
const app = express();
const port = 8010;

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

const buildSchemas = require("./src/schemas");

db.serialize(() => {
  buildSchemas(db);

  const app = require("./src/app")(db);

  // create an instance of express-md with custom options
  var mdRouter = expressMd({
    // serve markdown files from `docs` directory
    dir: __dirname + "/documentation",

    // serve requests from root of the site
    url: "/",
  });

  // add as express middleware
  app.use(mdRouter);

  app.listen(port, () =>
    console.log(`App started and listening on port ${port}`)
  );
});
