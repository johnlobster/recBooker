const db = require("../models");
const moment = require("moment");

// using facility, user, and booking for our db
module.exports = function(app) {
  dateIncrement = function(date, days) {
    return moment(date).add(days, "days");
  };

  // Returns all facilities
  app.get("/api/facilities", function(req, res) {
    db.Facility.findAll({}).then(function(dbFacility) {
      res.json(dbFacility);
    });
  });

  // Returns all users
  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  // Returns all bookings
  app.get("/api/facility_bookings/:facility/:startDate/:endDate", function(
    req,
    res
  ) {
    db.Booking.findAll({}).then(function(dbBookings) {
      res.json(dbBookings);
    });
  });

  // Returns all bookings between a start and end date for a specific facility ID
  app.get("/api/facility_bookings/:facility/:startDate/:endDate", function(
    req,
    res
  ) {
    // these two variables are there in case we need to add or subtrack dates to be inclusive on our date range picking
    // let firstDate = dateIncrement(req.params.startDate, -1);
    // let secondDate = dateIncrement(req.params.endDate, 1);
    db.bookings
      .findAll({
        where: {
          faciltyId: req.params.facility,
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
    db.Booking.findAll({
      where: {
        user: req.params.user,
        startDate: { $between: [firstDate, secondDate] },
        endDate: { $between: [firstDate, secondDate] }
      }
    }).then(function(dbBookDate) {
      res.json(dbBookDate);
    });
  });

  // POST route for saving a new user
  app.post("/api/newUser", function(req, res) {
    console.log(req.body);
    db.User.findOne({
      where: {
        name: req.body.name
      }
    }).then(function(result) {
      if (result === null) {
        db.User.create(req.body).then(function(dbNewUser) {
          console.log("dbNewUser: " + dbNewUser);
          res.json(dbNewUser);
          console.log(`Creating User: ${JSON.stringify(dbNewUser)}`);
        });
      } else {
        console.log("that name already exists in the DB");
        res.json(result);
      }
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
