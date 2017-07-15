pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Profile.sol";

contract TestProfile {

  function testInitialCountZero() {
    var profile = Profile(DeployedAddresses.Profile());

    Assert.equal(profile.getUserCount(), 0, "Initial state shouldn't have any user");
  }
}
