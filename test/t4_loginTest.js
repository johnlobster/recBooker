// test sessions with login, get and logout
const fs = require("fs");
const chalk = require("chalk");
const moment = require("moment");

const chai = require("chai");
const chaiHttp = require('chai-http');
const expect = require("chai").expect;
chai.use(chaiHttp);

const notWritten = chalk.red(" NOT WRITTEN");
// var mocha = require("mocha");
// mocha.Runner.prototype.uncaught = function (err) {
//     console.log(chalk.red("\nUNCAUGHT ERROR\n"), err);
// };

var app = require("../server");

describe("t4_loginTest: restart server\n", () => {
  it("Server should start", (done) => {
    // wait for server to start before doing anything
    setTimeout(() => {
      // app should have lots of data in it, just check that it isn't still a blank object
      expect(typeof (app.settings)).to.equal("object");
      done();
    }, 1500);
  });
});

describe("login, get, logout using cookie-session (password not checked)", () => {
  // user "Joe Smith" is not part of seed data
  it("Login user non-existent user 'Joe Smith' - expect failure", (done) => {
    chai.request(app)
      .post(`/api/login`)
      .type('form')
      .send({
        '_method': 'post',
        name: "Joe Smith",
        password: "1234"
      })
      .end((err, res) => {
        expect(err).to.be.null;
        // replies 200, just with empty body
        expect(res.status).to.equal(200, "http response code");
        expect(res).to.be.json;
        expect(res.body).to.be.null;
        done();
      });
  });

  // user "John Smith" is part of seed data
  it("Login user 'John Smith'", (done) => {
    chai.request(app)
    .post(`/api/login`)
    .type('form')
    .send({
      '_method': 'post',
      name: "John Smith",
      password: "1234"
    })
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.status).to.equal(200, "http response code");
      expect(res).to.be.json;
      expect(res.body.name).to.equal("John Smith");
      expect(res.body.id).to.equal(1);
      console.log(res.cookie);
      done();
    });
  });
});
