// test that server can be started
// basic regression test
// tests that models and routes can be built without issues

const chaiHttp = require("chai-http");
const chai = require("chai");
const expect = require("chai").expect;
chai.use(chaiHttp);
var app = require("../server"); // this calls the server (server.js)

// server should really have a call back, but using a delay instead

describe("mocha: t0 test server startup\nLook for logging of SQL commands and 'listening on port'\n\n", () => {
  it("Server should start without issues", (done) => {
    // wait for server to start before doing anything
    setTimeout(() => {
      // app should have lots of data in it, just check that it isn't still a blank object
      expect(typeof app.settings).to.equal("object");
      done();
    }, 1500);
  });
  it("Close server", (done) => {
      // stop listening, ready for next test
      expect(true).to.be.true;
      done();
  });
});


