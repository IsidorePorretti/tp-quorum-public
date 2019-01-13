pragma solidity ^0.4.22;

import "./MilkDelivery.sol";
import "./AddressBook.sol";

contract DairyProduction {
  uint32 public quantity;
  address[] public milkDeliveries;
  bytes32[] public milkDeliveriesIDs;
  bytes32 public deliveryID;
  address public dairy;
  address addressBookAddress;

  event CheeseProduced(address indexed maker, uint32 quantity, bytes32 deliveryID);

  constructor(address _addressBookAddress) public {
    require(_addressBookAddress != address(0));
    addressBookAddress = _addressBookAddress;
  }

  function makeCheese(uint32 _quantity, address[] _milkDeliveries) public returns (bytes32) {
    quantity = _quantity;
    milkDeliveries = _milkDeliveries;
    dairy = msg.sender;
    // call each MilkDelivery contract in order to mark it as "completed"
    for (uint i = 0; i < _milkDeliveries.length; i++) {
      MilkDelivery milkDelivery = MilkDelivery(_milkDeliveries[i]);
      milkDelivery.completed();
      milkDeliveriesIDs.push(milkDelivery.deliveryID());
    }
    deliveryID = keccak256(abi.encodePacked(msg.sender, milkDeliveriesIDs));
    emit CheeseProduced(msg.sender, quantity, deliveryID);
  }

  /// Checks if all parties in the smart-contract are geo compliant.
  /// @dev checks all milk producers and the dairy using the AddressBook
  /// @return true if all parties are geo compliant
  function checkGeoBoundaries() public view returns (bool) {
    AddressBook addressBook = AddressBook(addressBookAddress);
    for (uint i = 0; i < milkDeliveries.length; i++) {
      bool milkProducerGeoCompliant = addressBook.checkGeoBoundaries(milkDeliveries[i]);
      if (!milkProducerGeoCompliant)
        return false;
    }
    return dairy != address(0) && addressBook.checkGeoBoundaries(dairy);
  }

}
