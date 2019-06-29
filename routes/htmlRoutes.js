// don't need to import because apiRoutes has already required everything

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  // populate facilities reserved table
  app.get("/booking", function(req, res) {
    // using temporary data for now
    res.render("booking", { userName: "fred", bookings: [{
      startTime: moment.utc().subtract(10, "days").format(), 
      endTime: moment.utc().subtract(10, "days").format(),
      UserName : 1, 
      FacilityId:2,
    }, {
      startTime: moment.utc().subtract(10, "days").format(),
      endTime: moment.utc().subtract(10, "days").format(),
      UserName: 1,
      FacilityId: 2,
    }
  ]
      );
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
