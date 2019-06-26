var db = require("../models");

// using facility, user, and booking for our db
module.exports = function(app) {
  dateIncrement = function(date, days) {
    return moment(date).add(days, "days");
  };

  // Returns all facilities
  app.get("/api/facilities", function(req, res) {
    db.facility.findAll({}).then(function(dbFacility) {
      res.json(dbFacility);
    });
  });

  // Returns all users
  app.get("/api/users", function(req, res) {
    db.users.findAll({}).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  // Returns all bookings
  app.get("/api/facility_bookings/:facility/:startDate/:endDate", function(
    req,
    res
  ) {
    db.bookings.findAll({}).then(function(dbBookings) {
      res.json(dbBookings);
    });
  });

  // Returns all bookings between a start and end date for a specific facility ID
  app.get("/api/facility_bookings/:facility/:startDate/:endDate", function(
    req,
    res
  ) {
    let firstDate = dateIncrement(req.params.startDate, -1);
    let secondDate = dateIncrement(req.params.endDate, 1);
    db.bookings
      .findAll({
        where: {
          facilty: req.params.id,
          startDate: { $between: [firstDate, secondDate] },
          endDate: { $between: [firstDate, secondDate] }
        }
      })
      .then(function(dbBookDate) {
        res.json(dbBookDate);
      });
  });

  // Returns all bookings between a start and end date for a specific user (renter)
  app.get("/api/facility_bookings/:user/:startDate/:endDate", function(
    req,
    res
  ) {
    db.bookings
      .findAll({
        where: {
          user: req.params.user,
          startDate: { $between: [firstDate, secondDate] },
          endDate: { $between: [firstDate, secondDate] }
        }
      })
      .then(function(dbBookDate) {
        res.json(dbBookDate);
      });
  });

  // POST route for saving a new user
  app.post("/api/newUser", function(req, res) {
    db.Post.create(req.body).then(function(dbNewUser) {
      res.json(dbNewUser);
    });
  });

  // POST route for saving a new user
  app.post("/api/newFacility", function(req, res) {
    db.Post.create(req.body).then(function(dbNewFacility) {
      res.json(dbNewFacility);
    });
  });
};
// this is a comment for eslint
