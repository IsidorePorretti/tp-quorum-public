pragma solidity ^0.4.24;

import "./MilkDelivery.sol";
import "./AddressBook.sol";


contract DairyProduction {
    uint32 public quantity; // <1>
    address[] public milkDeliveries; // <2>
    address public dairy; // <3>
    address addressBookAddress; // <4>

    event CheeseProduced(address indexed dairyProductionAddress, address indexed dairy, uint32 quantity);

    constructor(address _addressBookAddress) public {
        // TODO: check that _addressBookAddress address is not empty
        // tag::implementation[]
        require(_addressBookAddress != address(0));
        // end::implementation[]
        // TODO: keep track of the address of the addressbook smart-contract
        // tag::implementation[]
        addressBookAddress = _addressBookAddress;
        // end::implementation[]
    }

    function makeCheese(uint32 _quantity, address[] memory _milkDeliveries) public returns (address) {
        // TODO: keep track of variables quantity, milkDeliveries and dairy
        // tag::implementation[]
        quantity = _quantity;
        milkDeliveries = _milkDeliveries;
        dairy = msg.sender;
        // end::implementation[]
        // TODO: call each MilkDelivery contract in order to mark it as "consumed"
        // tag::implementation[]
        for (uint i = 0; i < _milkDeliveries.length; i++) {
            MilkDelivery milkDelivery = MilkDelivery(_milkDeliveries[i]);
            milkDelivery.consume();
        }
        // end::implementation[]
        // TODO: emit a CheeseProduced event <5>
        // tag::implementation[]
        emit CheeseProduced(address(this), msg.sender, quantity);
        // end::implementation[]
        // TODO: return the address of this smart-contract
        // tag::implementation[]
        return address(this);
        // end::implementation[]
    }

    /// Checks if all parties in the smart-contract are geo compliant.
    /// @dev checks all milk producers and the dairy using the AddressBook
    /// @return true if all parties are geo compliant
    function checkGeoBoundaries() public view returns (bool) { // <6>
        // tag::implementation[]
        AddressBook addressBook = AddressBook(addressBookAddress);
        for (uint i = 0; i < milkDeliveries.length; i++) {
            bool milkProducerGeoCompliant = addressBook.checkGeoBoundaries(MilkDelivery(milkDeliveries[i]).milkProducerAddress());
            if (!milkProducerGeoCompliant)
                return false;
        }
        return dairy != address(0) && addressBook.checkGeoBoundaries(dairy);
        // end::implementation[]
    }

    function getMilkDeliveriesCount() public constant returns(uint) {
        // TODO: return the number of milk deliveries
        // tag::implementation[]
        return milkDeliveries.length;
        // end::implementation[]
    }

}
