pragma solidity ^0.5.0;


contract MilkDelivery {
    uint32 public liters;
    uint32 public price;
    bool public dairyApproval;
    bool public consumed;
    address public milkProducerAddress;
    address public dairyAddress;

    event MilkDelivered(address indexed milkDeliveryAddress,
                        address indexed milkProducer,
                        address dairyAddress, 
                        uint32 liters, uint32 price);

    constructor(address _dairyAddress) public {
        // TODO: check that _dairyAddress address (laiterie) is not empty
        // TODO: keep track of the milk producer (éleveur) in milkProducerAddress 
        // TODO: keep track of the dairy address (laiterie) in dairyAddress
        // TODO: initialize dairyApproval to a meaningful value
        // TODO: initialize consumed to a meaningful value
    }

    /// Keeps track of a milk delivery
    /// @dev should only be called by the milk producers of this contract
    function sendMilk(uint32 _liters, uint32 _price) public onGoing() {
        // TODO: keep track of the number of liters sent and the price
        // TODO: emit a MilkDeliveredEvent
    }

    /// Mark the delivery as accepted by the dairy
    function validateDelivery() onGoing() dairyOnly() public {
        // TODO: implement this!
    }

    /// Return true if the delivery was acknowledged by the dairy (laiterie)
    function checkDeliveryApproval() public view returns (bool) {
        // TODO: implement this!
    }

    /// Mark the delivery as consumed (used in order to make some cheese)
    function consume() external {
        // TODO: implement this!
    }

    /// Modifier based on the value of consumed.
    /// @dev if consumed, then the delivery is not onGoing
    modifier onGoing() {
        // TODO: implement this!
    }

    /// Modifier ensuring that only the dairy of this milk delivery can make a call
    modifier dairyOnly() {
        // TODO: implement this!
    }

}
