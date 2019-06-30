const db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/login", function(req, res) {
    res.render("login");
  });

  // populate facilities reserved table
  app.get("/booking", function(req, res) {
    // using temporary data for now
    // page makes an api request to populate the table
    // pass list of facilities so user can choose
    console.log("Found route");
    db.Facility.findAll({
      attributes: ["name"]
    }).then(function(dbFacility) {
      console.log("queried database");
      res.render("booking");
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.status("404").render("404",{ badUrl: req.url });
  });
};
