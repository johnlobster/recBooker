const chai = require("chai");
const chaiHttp = require('chai-http');
const expect = require("chai").expect;
chai.use(chaiHttp);

// const app = require("../server");

app = require('../server');

describe("t2_htmlRoutes: Reset server", () => {
    it("Server should start", (done) => {
        // wait for server to start before doing anything
        let timeout = setTimeout(() => {
            // app should have lots of data in it, just check that it isn't still a blank object
            expect(typeof (app.settings)).to.equal("object");
            done();
        }, 1500);
    });
});

//describe("Test html routes", function() {
