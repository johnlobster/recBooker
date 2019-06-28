// test that server can be started

const chaiHttp = require('chai-http');
const chai = require("chai");
const expect = require("chai").expect;
chai.use(chaiHttp);
var app = {};
app = require('../server');    // this calls the server (server.js)
// server should really have a call back, but using a delay instead

describe("mocha: server startup for all tests\nLook for logging of SQL commands and 'listening on port'\n\n", () => {
    it("Server should start without issues", (done) => {
        // wait for server to start before doing anything
        let timeout = setTimeout(() => {
            // app should have lots of data in it, just check that it isn't still a blank object
            expect(typeof(app.settings)).to.equal("object");
            done();
        }, 1500);
    });

    
    
});
