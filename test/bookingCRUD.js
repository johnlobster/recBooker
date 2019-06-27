// test CRUD routes for bookings
// creates a new item, then deletes it

const moment = require("moment");

const chai = require("chai");
const chaiHttp = require('chai-http');
const expect = chai.expect();
chai.use(chaiHttp);

console.log(process.env.NODE_ENV);

const server = require('../server'); // starts server

describe("CRUD on bookings table using api routes", () => {
    it("Create new booking", () => {

    });
    it("Read all bookings", (done) => {
        const startDate = moment().subtract(10, "days");
        const endDate = moment().add(10, "days");
        chai.request(server)
            .get(`/api/facility_bookings/1/${startDate}/${endDate}`)
            .end((err, res) => {
                if (err) throw err;
                res.should.have.status(200);
                res.body.should.be.a('array');
                // res.body.length.should.be.eql(0);
                console.log("GET request processed");
                console.log(res.body);
                done();
            });
    });
    it("Update a booking", () => {

    });
    it("Delete a booking", () => {

    });
    // stop server
    // process.exit();

    }
);