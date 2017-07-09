let ProfileBuilder = artifacts.require("./ProfileBuilder.sol");

module.exports = function(deployer) {
  deployer.deploy(ProfileBuilder);
};
