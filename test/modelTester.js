// tests to see whether models will compile and db access is possible
// a subset of server.js, with a mocha wrapper

const executeSQLFile = require("./functions/executeSQLFile.js");

const expect = require("chai").expect;

require("dotenv").config();
const express = require("express");
//var exphbs = require("express-handlebars");

// get  - note in test directory so need ../models Don't copy this somewhere else
var db = require("../models");

var app = express();
const PORT = process.env.PORT || 8080; // note app port, not mysql

// If running a test, set syncOptions.force to true
// clearing the `testdb`
var syncOptions = { force: false, logging: false };
if (process.env.NODE_ENV === "test" || process.env.DEV_MYSQL_FORCE_DB_RESET) {
  syncOptions.force = true;
}
if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development") {
    syncOptions.logging = console.log;
}

describe(
  "Basic model test, expect to see mysql queries (no results testing) and app listening on PORT",
  function() {
    it("table initialization for all models, check listening on PORT", function (done) {
    // Starting the server, syncing our models ------------------------------------/
    db.sequelize.sync(syncOptions)
      .then(function() {
          // seed database with known values for testing
          //   return db.sequelize.query("SELECT 1");
          return executeSQLFile(db,"./db/seed.mysql");
      })
      .then( () => {
        console.log("Finished seeding database");
        // wrap promise around listen
        return new Promise ((resolve,reject) => {
            console.log("Here");
            app.listen(PORT, ()=> {
                resolve("Listening");
            });
        })
      })
      .then( (text) => {
          console.log(text);
          console.log(
            "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
            PORT,
            PORT
          );
          done(); // done doesn't quit node, sends information to mocha
          // this is just a test program so quit node, this will close the port
          process.exit();
        })
      .catch(err => {
        console.log("\nError in start sequelize/app listen setup\n");
        console.log(err);
      });
    })
});
