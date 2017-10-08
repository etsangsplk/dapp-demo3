pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Profile.sol";

contract TestProfile {

  event LogAddress (
    address _userAddress);
  event LogBytes32 (
    bytes32 _bytes);

  function testInitialCountZero() {
    var profile = Profile(DeployedAddresses.Profile());

    Assert.equal(profile.getUserCount(), 0, "Initial state shouldn't have any user");
  }

  function testAddASingleUser() {
    var profile = Profile(DeployedAddresses.Profile());

    var ok = profile.setUser("john@smith.com", "John", 35);

    Assert.isTrue(ok, "Failed to set the user");
    Assert.equal(profile.getUserCount(), 1, "Initial state should has only one user");

    var (email, name, actualAge) = profile.getUser(address(this));

    Assert.equal(email, bytes32("john@smith.com"), "Email doesn't match");
    Assert.equal(name, bytes32("John"), "Name doesn't match");

    LogAddress(DeployedAddresses.Profile());

    Assert.equal(actualAge, uint256(35), "Age doesn't match");
  }
}
