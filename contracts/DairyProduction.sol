pragma solidity ^0.4.24;

import "./MilkDelivery.sol";
import "./AddressBook.sol";


contract DairyProduction {
    uint32 public quantity; // <1>
    address[] public milkDeliveries; // <2>
    address public dairy; // <3>
    address addressBookAddress; // <4>

    event CheeseProduced(address indexed dairyProductionAddress, address indexed dairy, uint32 quantity);

}
