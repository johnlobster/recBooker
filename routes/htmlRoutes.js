const db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/login", function(req, res) {
    res.render("login");
  });

  app.get("/booking", function(req, res) {
    // page makes an api request to populate the table
    // pass list of facilities so user can choose
    db.Facility.findAll({
      attributes: ["name", "id"]
    }).then(function(facilityNames) {
      res.render("booking", { facilityNames });
    });
  });

  app.get("/newbooking", function(req, res) {
    // page makes an api request to populate the table
    // pass list of facilities so user can choose
    db.Facility.findAll({
      attributes: ["name", "id"]
    }).then(function(facilityNames) {
      db.User.findAll({
        attributes: ["name", "id"]
      }).then(function(userNames) {
        res.render("newBooking", {
          facilityNames: facilityNames,
          userNames: userNames
        });
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    // console.log("Oh no 404 time again");
    res.status("404").render("404", { badUrl: req.url });
  });
};
