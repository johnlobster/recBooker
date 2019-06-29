// test CRUD routes for bookings
// creates a new item, then deletes it
const fs=require("fs");
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

describe("t1_bookingCRUD: restart server\n", () => {
    it("Server should start", (done) => {
        // wait for server to start before doing anything
        setTimeout(() => {
            // app should have lots of data in it, just check that it isn't still a blank object
            expect(typeof (app.settings)).to.equal("object");
            done();
        }, 1500);
    });
});
describe("CRUD on bookings table using api routes", () => {
    it("Create new booking" + notWritten, (done) => {
        // expect(0).to.equal(0,"Test not written");
        done();
    });
    it("Read all facility bookings facilityId=1", (done) => {
        const startDate = moment.utc().subtract(10, "days").format();
        const endDate = moment.utc().add(10, "days").format();
        chai.request(app)
        .get(`/api/facility_bookings/1/${startDate}/${endDate}`)
        .end((err, res) => {
            if (err) throw err;
            // fs.writeFileSync("temp3", JSON.stringify(res));
            const body = JSON.parse(res.text);
            expect(res.status).to.equal(200,"http response code");
            expect(body.length).to.equal(1);
            done();
        });
    });
    it("Read all facility bookings facilityId=2", (done) => {
        const startDate = moment.utc().subtract(10, "days").format();
        const endDate = moment.utc().add(10, "days").format();
        chai.request(app)
            .get(`/api/facility_bookings/2/${startDate}/${endDate}`)
            .end((err, res) => {
                if (err) throw err;
                const body = JSON.parse(res.text);
                expect(res.status).to.equal(200);
                expect(body.length).to.equal(3);
                done();
            });
    });
    it("Read all facility bookings date restriction", (done) => {
        const startDate = moment.utc().subtract(10, "minutes").format();
        const endDate = moment.utc().add(10, "minutes").format();
        chai.request(app)
            .get(`/api/facility_bookings/2/${startDate}/${endDate}`)
            .end((err, res) => {
                if (err) throw err;
                const body = JSON.parse(res.text);
                expect(res.status).to.equal(200);
                expect(body.length).to.equal(0);
                done();
            });
    });
    it("Update a booking" + notWritten, (done) => {
        done();
    });
    it("Delete a booking" + notWritten, (done) => {
        done();
    });
});
