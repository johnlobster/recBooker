require("dotenv").config(); // add variables in .env file to process.env
const executeSQLFile = require("./test/functions/executeSQLFile.js");

const express = require("express");
var exphbs = require("express-handlebars");

var db = require("./models"); // reads index.js which reads all models in models directory

var app = express();
const PORT = process.env.PORT || 8080; // note app port, not mysql

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// setup sequelize .sync options
// .force will drop all tables. use for testing and, if in development and DEV_MYSQL_FORCE_DB_RESET is set
// .logging will log SQL requests to the console. Use in test and development
var syncOptions = { force: false, logging: false };
var seedDB = false; // don't seed database by default

if (
  process.env.NODE_ENV === "test" ||
  (process.env.NODE_ENV === "development" &&
    process.env.DEV_MYSQL_FORCE_DB_RESET)
) {
  syncOptions.force = true;
  seedDB = true;
}
if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development") {
  syncOptions.logging = console.log;
}

// console.log("syncOptions " + syncOptions);
// console.log("NODE_ENV " + process.env.NODE_ENV);
// Starting the server, syncing models, seed DB if necessary (promise chain)
db.sequelize
  .sync(syncOptions)
  .then(function() {
    // seed database with known values for testing
    return executeSQLFile(db, "./db/seed.mysql", seedDB);
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      app
        .listen(PORT, () => {
          resolve();
        })
        .on("error", err => {
          // pass on errors if listen fails
          reject(err);
        });
    });
  })
  .then(() => {
    console.log(
      "==> Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  })
  .catch(err => {
    console.log("\nError in start sequelize/app listen setup\n");
    console.log(err);
  });

module.exports = app;
