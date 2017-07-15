const Profile = artifacts.require("../contracts/Profile.sol");

contract('Profile', function(accounts) {
  it("should put 10000 blahblah", function() {
    return Profile.deployed().then(function(instance) {
      // return instance.getBalance.call(accounts[0]);
    }).then(function(balance) {
      // assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
    });
  });
});
