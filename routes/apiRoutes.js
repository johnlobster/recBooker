const db = require("../models");
const moment = require("moment");
const Sequelize = require("sequelize");
const Op = Sequelize.Op; // allows sequelize operations to be used in queries

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
  app.get("/api/bookings", function(req, res) {
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
    let firstDate = moment.utc(req.params.startDate).format();
    let secondDate = moment.utc(req.params.endDate).format();

    db.Booking.findAll({
      where: {
        facilityId: req.params.facility,
        startTime: { [Op.between]: [firstDate, secondDate] },
        endTime: { [Op.between]: [firstDate, secondDate] }
      },
      include: [
        {
          model: db.User,
          attributes: ["name", "id", "drivingLicence"]
        }
      ],
      order: [["startTime", "ASC"]]
    })
      .then(function(dbBookDate) {
        res.json(dbBookDate);
      })
      .catch((err) => {
        throw err;
      });
  });

  // Returns all bookings between a start and end date for a specific user (renter)
  app.get("/api/user_bookings/:user/:startDate/:endDate", function(req, res) {
    db.Booking.findAll({
      where: {
        user: req.params.user,
        startTime: { [Op.between]: [firstDate, secondDate] },
        endTime: { [Op.between]: [firstDate, secondDate] }
      }
    })
      .then(function(dbBookDate) {
        res.json(dbBookDate);
      })
      .catch((err) => {
        throw err;
      });
  });

  // POST route for saving a new user
  app.post("/api/newUser", function(req, res) {
    console.log("New user");
    console.log(req.body);
    db.User.findOne({
      where: {
        name: req.body.name
      }
    }).then(function(result) {
      if (result === null) {
        db.User.create(req.body).then(function(dbNewUser) {
          console.log("dbNewUser: " + dbNewUser);
          if (app.locals.USE_SESSION_COOKIES) {
            // will create a new session even if there was one previously
            // (someone else logged in from that browser for instance)
            req.session.userName = req.body.name;
            req.session.userId = dbNewUser.id;
          }
          // don't want to send complete record as that includes password
          res.json({ id: dbNewUser.id, name: dbNewUser.name });
          console.log(`Creating User: ${JSON.stringify(dbNewUser)}`);
        });
      } else {
        console.log("that name already exists in the DB");
        res.json(result);
      }
    });
  });

  // POST route for saving a new Facility
  app.post("/api/newFacility", function(req, res) {
    console.log(req.body);
    db.Facility.findOne({
      where: {
        name: req.body.name
      }
    }).then(function(result) {
      if (result === null) {
        db.Facility.create(req.body).then(function(dbNewFacility) {
          console.log("dbNewFacility: " + dbNewFacility);
          res.json(dbNewFacility);
          console.log(`Creating Facility: ${JSON.stringify(dbNewFacility)}`);
        });
      } else {
        console.log("That facility already exists in the DB");
        res.json(result);
      }
    });
  });

  // POST route to create a new booking
  app.post("/api/newBooking", function(req, res) {
    console.log(req.body);
    // add check for existing booking between start and end dates
    // add check for logged in user before creating new booking
    db.Booking.findOne({
      where: {
        userId: req.body.userId
      }
    }).then(function() {
      db.User.create(req.body).then(function(dbNewUser) {
        console.log("dbNewUser: " + dbNewUser);
        if (app.locals.USE_SESSION_COOKIES) {
          // will create a new session even if there was one previously
          // (someone else logged in from that browser for instance)
          req.session.userName = req.body.name;
          req.session.userId = dbNewUser.id;
        }
        // don't want to send complete record as that includes password
        res.json({ id: dbNewUser.id, name: dbNewUser.name });
        console.log(`Creating User: ${JSON.stringify(dbNewUser)}`);
      });
    });
  });

  // POST route for the login screen. Checks to see if the user exists and if not heads to the registration page
  app.post("/api/login", function(req, res) {
    console.log(req.body);
    db.User.findOne({
      where: {
        name: req.body.name
      }
    }).then(function(result) {
      if (result === null) {
        console.log(`Login Name: ${JSON.stringify(result)}`);
        res.json(result);
      } else {
        console.log(
          `Login Name: ${JSON.stringify(result)} already exists in the DB`
        );
        res.json(result);
      }
    });
  });

  // POST route to logout - deletes session
  app.post("/api/logout", (req, res) => {
    if (app.locals.USE_SESSION_COOKIES) {
      if (req.session) {
        // user id is sent in body, don't log out unless matches user id in session
        if (parseInt(req.session.userId) === parseInt(req.body.userId)) {
          req.session = null;
          res.json({ result: "Logout successful" });
          console.log("Logged out successfully");
        } else {
          console.log(
            "Logout unsuccessful (user id did not match session user id)"
          );
          res.json();
        }
      } else {
        console.log("Logout unsuccessful (no session");
        res.json();
      }
    } else {
      res.json({ result: "Logout successful" });
      console.log("Logged out successfully");
    }
  });
};
