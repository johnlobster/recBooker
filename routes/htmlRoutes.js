// don't need to import because apiRoutes has already required everything

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  // populate facilities reserved table
  app.get("/booking", function(req, res) {
    // using temporary data for now
    res.render("booking", {userName: "Fred"});
      
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.status("404").render("404");
  });
};
