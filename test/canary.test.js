// tests that test environment is working
const expect = require("chai").expect;

describe("canary test", function() {
  // A "canary" test is one we set up to always pass
  // This can help us ensure our testing suite is set up correctly before writing real tests
  it("The canary test should be clean", function() {
    expect(true).to.be.true;
  });
});
