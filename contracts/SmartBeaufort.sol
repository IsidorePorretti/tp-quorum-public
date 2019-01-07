pragma solidity ^0.4.22;

import "./AddressBook.sol"; // <1>

/// @title A smart-contract tracking deliveries of milk and cheese
contract SmartBeaufort {
  MilkDelivery[] public deliveries;
  address public cheeseMadeFrom;
  address addressBookAddress;

  struct MilkDelivery {
    address milkProducer;
    uint32 liters;
  }

  event MilkDelivered(address indexed milkProducer, uint32 liters);
  event CheeseProduced(address indexed maker, uint32 quantity);

  constructor(address _addressBookAddress) public { // <2>
    // tag::implementation[]
    require(_addressBookAddress != address(0));
    addressBookAddress = _addressBookAddress;
    // end::implementation[]
  }

  /// Keeps track of a milk delivery
  /// @dev should only be called by the milk producers of this contract
  /// @param liters the liters of milk delivered
  function sendMilk(uint32 liters) public {
    // add a milk delivery to the deliveries array <3>
    // tag::implementation[]
    deliveries.push(MilkDelivery(msg.sender, liters));
    // end::implementation[]
    // emit MilkDelivered event
    // tag::implementation[]
    emit MilkDelivered(msg.sender, liters);
    // end::implementation[]
  }

  function makeCheese(uint32 quantity) public {
    // store the address of the sender <4>
    // tag::implementation[]
    cheeseMadeFrom = msg.sender;
    // end::implementation[]
    // emit CheeseProduced event
    emit CheeseProduced(cheeseMadeFrom, quantity);
  }

  function requestCertificate() public view { // <5>
    require(checkGeoBoundaries());
  }

  /// Checks if all parties in the smart-contract are geo compliant.
  /// @dev checks all milk producers and the cheese maker using the AddressBook
  /// @return true if all parties are geo compliant
  function checkGeoBoundaries() public view returns (bool) { // <6>
    // tag::implementation[]
    AddressBook addressBook = AddressBook(addressBookAddress);
    for (uint i = 0; i < deliveries.length; i++) {
      MilkDelivery memory delivery = deliveries[i];
      address milkProducer = delivery.milkProducer;
      bool milkProducerGeoCompliant = addressBook.checkGeoBoundaries(milkProducer);
      if (!milkProducerGeoCompliant)
        return false;
    }
    return cheeseMadeFrom != address(0) && addressBook.checkGeoBoundaries(cheeseMadeFrom);
    // end::implementation[]
  }

}
