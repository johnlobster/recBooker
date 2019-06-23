// tests to see whether models will compile and db access is possible
// a subset of server.js

require("dotenv").config();

const express = require("express");
//var exphbs = require("express-handlebars");

// get  - note in test directory so need ../models Don't copy this somewhere else
var db = require("../models");

var app = express();
const PORT = process.env.PORT || 8080; // note app port, not mysql

// If running a test, set syncOptions.force to true
// clearing the `testdb`
var syncOptions = {};
if (process.env.NODE_ENV === "test" || process.env.DEV_MYSQL_FORCE_DB_RESET) {
  syncOptions.force = true;
} else {
  syncOptions.force = false;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
