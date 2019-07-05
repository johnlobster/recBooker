const db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Facility.findAll({
      attributes: ["name", "id"]
    }).then(function(facilityNames) {
      res.render("index", { facilityNames: facilityNames });
    });
  });

  app.get("/login", function(req, res) {
    res.render("login");
  });

  app.get("/register", function(req, res) {
    res.render("register");
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

  app.get("/userBookings", function(req, res) {
    // page makes an api request to populate the table
    // reads all user names - should really get the name from session
    db.User.findAll({
      attributes: ["name", "id"] // don't return the password ...
    }).then(function(userNames) {
      res.render("userBookings", { userNames: userNames });
    });
  });

  app.get("/newBooking", function(req, res) {
    // page makes an api request to populate the table
    // pass list of facilities so user can choose
    db.Facility.findAll({
      attributes: ["name", "id"]
    }).then(function(facilityNames) {
      // if the user is already logged in (session exists), then don't send the list of all users
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
