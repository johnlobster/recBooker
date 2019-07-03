require("dotenv").config(); // add variables in .env file to process.env
const chalk = require("chalk");
const executeSQLFile = require("./test/functions/executeSQLFile.js");
const moment = require("moment");

const express = require("express");
var exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");

var db = require("./models"); // reads index.js which reads all models in models directory

var app = express();

const PORT = process.env.PORT || 8080; // note app port, not mysql

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.locals.USE_SESSION_COOKIES = false; // using app local variables so can be passed into route files

// add cookie session to flow, flags to disable it until ready (enabled in production, not so sure about that)
// not enabled for test, will cause issues with some tests
if (
  process.env.DEV_ENABLE_SESSION_COOKIES &&
  process.env.NODE_ENV === "development"
) {
  // enable cookie sessions
  console.log(chalk.blue("\nEnabled session cookies\n"));
  app.locals.USE_SESSION_COOKIES = true; // variable used in routes
  app.set("trust proxy", 1); // trust first proxy
  // enable cookie-parser
  // secret needs to come from an environment variable
  var secret = "12345";
  app.use(cookieParser(secret));

  // make cookie expire after 1 hour
  const expiryDate = moment()
    .add(1, "hour")
    .toDate();
  console.log("Cookie expires at " + expiryDate + "\n");

  const session = cookieSession({
    name: "recBookerSession", // changing name improves security
    secret: secret,
    cookie: {
      secureProxy: true,
      httpOnly: true,
      expiryDate: expiryDate
    }
  });
  // install as middleware
  app.use(session);
  // testing
  app.use(function(req, res, next) {
    console.log("My custom middleware");
    console.log(req.session);
    console.log(req.cookies);
    console.log(req.signedCookies);
    console.log(req.secret + "\n");
    next();
  });
}
// static route needs to be the last middleware included
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes (order is important as last html route returns 404)
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
yellowLog = function(msg) {
  console.log(chalk.dim.yellowBright(msg));
};

if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development") {
  syncOptions.logging = yellowLog;
}

// testing variables before synching database
console.log("Running server.js\nsyncOptions");
console.log(syncOptions);
console.log("NODE_ENV " + process.env.NODE_ENV);
console.log("seedDB " + seedDB);
// Starting the server, syncing models, seed DB if necessary (promise chain)
db.sequelize
  .sync(syncOptions)
  .then(function() {
    // seed database with known values for testing
    return executeSQLFile(db, "./db/seed.mysql", seedDB);
  })
  .then(() => {
    return new Promise((resolve) => {
      // assign to variable server so that can be closed later
      server = app
        .listen(PORT, () => {
          resolve();
        })
        .on("error", (err) => {
          // pass on errors if listen fails
          reject(err);
        });
    });
  })
  .then(() => {
    console.log(
      "\nListening on port %s. Visit http://localhost:%s/ in your browser.\n",
      PORT,
      PORT
    );
  })
  .catch((err) => {
    console.log("\nError in start sequelize/app listen setup\n");
    console.log(err);
  });

module.exports = app;
