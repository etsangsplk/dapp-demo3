pragma solidity ^0.4.11;

contract Profile {
  struct User {
    bytes32 email;
    bytes32 name;
    uint8 age;
    uint index;
  }

  address[] private userIndex;
  mapping(address => User) private users;

  event LogNewUser (
    address indexed userAddress,
    uint index,
    bytes32 userEmail,
    uint userAge);

  event LogUpdateUser (
    address indexed userAddress,
    uint index,
    bytes32 userEmail,
    uint userAge);

  // Used both for create and update
  function setUser(bytes32 email, bytes32 name, uint8 age) returns (bool success) {
    if (!isUser(msg.sender)) {
        bool shouldPush = true;
    }

    users[msg.sender].email = email;
    users[msg.sender].name = name;
    users[msg.sender].age = age;

    if (shouldPush == true) {
        users[msg.sender].index = userIndex.length;
        userIndex.push(msg.sender);
    }

    return true;
  }

  function getUser(address userAddress) public constant returns (
    bytes32 email, bytes32 name, uint8 age) {

    return (
      users[userAddress].email,
      users[userAddress].name,
      users[userAddress].age);
  }

  function isUser(address userAddress) public constant returns (bool exists) {
    if (userIndex.length == 0) return false;
    return (userIndex[users[userAddress].index] == userAddress);
  }

  function getUserCount() public constant returns (uint count) {
    return userIndex.length;
  }

  function getUserAtIndex(uint index) public constant returns(address userAddress) {
      return userIndex[index];
  }
}
