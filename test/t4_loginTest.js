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

describe("login, logout using cookie-session (password not checked)", () => {
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
        // no session should have been created
        expect(res).to.not.have.cookie("recBookerSession");
        expect(res).to.not.have.cookie("recBookerSession.sig");
        done();
      });
  });

  // user "John Smith" is part of seed data
  it("Login user 'John Smith', check session cookie set", (done) => {
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
      expect(res).to.have.cookie("recBookerSession");
      expect(res).to.have.cookie("recBookerSession.sig");
      // console.log(res.headers);
      // console.log("");
      done();
    });
  });
  it("Login user 'Marnie Thompson', then logout", (done) => {
    let agent = chai.request.agent(app);
    agent.post(`/api/login`)
      .type('form')
      .send({
        '_method': 'post',
        name: "Marnie Thompson",
        password: "1234"
      })
      .then( (res) => {
        //expect(err).to.be.null;
        expect(res.status).to.equal(200, "http response code");
        expect(res).to.be.json;
        expect(res.body.name).to.equal("Marnie Thompson");
        expect(res.body.id).to.equal(2);
        expect(res).to.have.cookie("recBookerSession");
        expect(res).to.have.cookie("recBookerSession.sig");
        return agent.post(`/api/logout`)
          .type('form')
          .send({
            '_method': 'post',
            userName: "Marnie Thompson",
            userId: 2
          })
          .then( (res2) => {
            // if (err) {
            //   console.log("Error in second call of login/logout");
            //   throw err;
            // }
            expect(res2.status).to.equal(200, "http response code");
            expect(res2).to.be.json;
            expect(res2.body.result).to.equal("Logout successful");
            expect(res2).to.not.have.cookie("recBookerSession");
            expect(res2).to.not.have.cookie("recBookerSession.sig");
            agent.close();
            done()
          });
        });
      });
  it("Logout user 'Marnie Thompson' again, should fail", (done) => {
    chai.request(app)
    .post(`/api/logout`)
    .type('form')
    .send({
      '_method': 'post',
      userName: "Marnie Thompson",
      userId: 2
    })
    .then((res) => {
      expect(res.status).to.equal(200, "http response code");
      expect(res).to.be.json;
      expect(res.body).to.be.empty;
      expect(res).to.not.have.cookie("recBookerSession");
      expect(res).to.not.have.cookie("recBookerSession.sig");
        
      done()
      });
  })
      
});
