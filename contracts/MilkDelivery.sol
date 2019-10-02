pragma solidity ^0.4.22;

contract MilkDelivery {
  uint32 public liters;
  uint32 public price;
  bytes32 public deliveryID;
  bool dairyApproval;
  bool public completed;
  address public addressMilkhouse;

  event MilkDelivered(address indexed milkProducer, address addressMilkhouse,  uint32 liters, uint32 price, bytes32 deliveryID);

  constructor(address _addressMilkhouse) public {
    // tag::implementation[]
    require(_addressMilkhouse != address(0));
    addressMilkhouse = _addressMilkhouse;
    // end::implementation[]
  }
  /// Keeps track of a milk delivery
  /// @dev should only be called by the milk producers of this contract
  /// @param _liters the liters of milk delivered
  /// @return the delivery ID
  function sendMilk(uint32 _liters, uint32 _price) public onGoing() returns (bytes32) {
    liters = _liters;
    price = _price;
    deliveryID = keccak256(abi.encodePacked(msg.sender, liters));
    emit MilkDelivered(msg.sender, addressMilkhouse, liters, price, deliveryID);
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
