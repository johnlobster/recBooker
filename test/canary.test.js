// tests that test environment is working
const expect = require("chai").expect;

// A "canary" test is one we set up to always pass
// This can help us ensure our testing suite is set up correctly before writing real tests

describe("canary test", function() {
  
  it("The canary test should be clean", function(done) {
    expect(true).to.be.true;
    done();
  });
  
  
});
module.exports = function () {
  return new Promise((resolve, reject) => {
    resolve();
  });
}
