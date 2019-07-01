"use strict";
// template generated file that reads all mnodels in models subdirectory
// and adds them to the db

require("dotenv").config(); // add variables in .env file to process.env
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(module.filename);
var env = process.env.NODE_ENV || "development";
const travisEnv = env;
// modify env to "travis" so that it picks up the travis setup from config.js
if (process.env.RUN_TRAVIS_CI) {
  env = "travis";
}
const config = require(__dirname + "./../config/config.js")[env];
if (process.env.RUN_TRAVIS_CI) {
  env = travisEnv;
}
// travis config is in config.js so now have sql set up right. It's ok for password etc. to
// be in config file because travis doesn't create anything permanent

var db = {};

// JAWSDB_URL must be set in heroku environment
if (process.env.JAWSDB_URL) {
  // production environment
  var sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // development or test environment
  // hold database locally with local user name and password
  var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}
console.log("config");
console.log(config);
console.log("NODE_ENV= " + process.env.NODE_ENV);

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(function(file) {
    // let model = sequelize.import(path.join(__dirname, file), () => {
    //   // console.log("Imported " + file);
    // });
    let model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

// create associations, defined in model files
Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
