const chai = require("chai");
const chaiHttp = require('chai-http');
const expect = require("chai").expect;
chai.use(chaiHttp);

const htmlTests = require("./functions/htmlTests");

var app = require('../server');

// code to test htmlTests (could be in htmlTest file ...)
// var { fail, msg } = htmlTests("<!DOCTYPE html> <html>XX\nYY</html>");

// console.log("fail " + fail);
// console.log(msg);
// process.exit();


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

describe("Test html routes", function() {
    it("render index template from root", function(done) {
        chai.request(app)
            .get("/")
            .end((err, res) => {
                if(err) throw err;
                expect(res.status).to.equal(200, "http response code");
                let htmlCheck = htmlTests(res.text);
                if( htmlCheck.fail) {
                    console.log(htmlCheck.msg);
                    expect(1).to.equal(0, "forces test failure due to html issue above"); 
                }
                done();
            });

    });
    it("render 404 template from unserved route", function (done) {
        chai.request(app)
            .get("/fred")
            .end((err, res) => {
                if (err) throw err;
                expect(res.status).to.equal(404, "http response code");
                let htmlCheck = htmlTests(res.text);
                if (htmlCheck.fail) {
                    console.log(htmlCheck.msg);
                    expect(1).to.equal(0, "forces test failure due to html issue above");
                }
                done();
            });

    });

});
