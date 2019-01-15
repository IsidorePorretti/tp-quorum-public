pragma solidity ^0.4.22;

contract MilkDelivery {
  uint32 public liters;
  bytes32 public deliveryID;
  bool dairyApproval;
  bool public completed;

  event MilkDelivered(address indexed milkProducer, uint32 liters, bytes32 deliveryID);

  /// Keeps track of a milk delivery
  /// @dev should only be called by the milk producers of this contract
  /// @param _liters the liters of milk delivered
  /// @return the delivery ID
  function sendMilk(uint32 _liters) public onGoing() returns (bytes32) {
    liters = _liters;
    deliveryID = keccak256(abi.encodePacked(msg.sender, liters));
    emit MilkDelivered(msg.sender, liters, deliveryID);
    return deliveryID;
  }

  function validateDelivery(bytes32 _deliveryID) onGoing() public {
    // check if the deliveryID is the expected one
    require(deliveryID == _deliveryID);
    // mark the delivery as accepted by the dairy
    dairyApproval = true;
  }

  function checkDeliveryApproval() public view returns (bool) {
    return dairyApproval;
  }

  modifier onGoing() {
    require(!completed);
    _;
  }

  function completed() public {
    completed = true;
  }

}
