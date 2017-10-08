const Profile = artifacts.require('../contracts/Profile.sol');

contract('Profile', function (accounts) {
  describe('collection without any profiles added', function () {
    it('should be empty', function () {
      return Profile.deployed().then(function (instance) {
        return instance.getUserCount.call();
      }).then(function (count) {
        assert.equal(count.valueOf(), 0, 'should be empty');
      });
    });
  });
});
