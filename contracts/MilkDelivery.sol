pragma solidity ^0.4.24;


contract MilkDelivery {
    uint32 public liters; // <1>
    uint32 public price; // <2>
    bool public dairyApproval; // <3>
    bool public consumed; // <4>
    address public milkProducerAddress; // <5>
    address public dairyAddress; // <6>

    event MilkDelivered(address indexed milkDeliveryAddress,
                        address indexed milkProducer,
                        address dairyAddress, 
                        uint32 liters, uint32 price);

    constructor(address _dairyAddress) public { // <7>
        // TODO: check that _dairyAddress address (laiterie) is not empty
        // tag::implementation[]
        require(_dairyAddress != address(0));
        // end::implementation[]
        // TODO: keep track of the milk producer (éleveur) in milkProducerAddress 
        // tag::implementation[]
        milkProducerAddress = msg.sender;
        // end::implementation[]
        // TODO: keep track of the dairy address (laiterie) in dairyAddress
        // tag::implementation[]
        dairyAddress = _dairyAddress;
        // end::implementation[]
        // TODO: initialize dairyApproval to a meaningful value
        // tag::implementation[]
        dairyApproval = false;
        // end::implementation[]
        // TODO: initialize consumed to a meaningful value
        // tag::implementation[]
        consumed = false;
        // end::implementation[]
    }

    /// Keeps track of a milk delivery
    /// @dev should only be called by the milk producers of this contract
    function sendMilk(uint32 _liters, uint32 _price) public onGoing() { // <7>
        // TODO: keep track of the number of liters sent and the price
        // tag::implementation[]
        liters = _liters;
        price = _price;
        // end::implementation[]
        // TODO: emit a MilkDeliveredEvent
        // tag::implementation[]
        emit MilkDelivered(address(this), msg.sender, dairyAddress, liters, price);
        // end::implementation[]
    }

    /// Mark the delivery as accepted by the dairy
    function validateDelivery() onGoing() dairyOnly() public {
        // TODO: implement this! <7>
        // tag::implementation[]
        dairyApproval = true;
        // end::implementation[]
    }

    /// Return true if the delivery was acknowledged by the dairy (laiterie)
    function checkDeliveryApproval() public view returns (bool) { // <7>
        // tag::implementation[]
        return dairyApproval;
        // end::implementation[]
    }

    /// Mark the delivery as consumed (used in order to make some cheese)
    function consume() external { // <7>
        // tag::implementation[]
        consumed = true;
        // end::implementation[]
    }

    /// Modifier based on the value of consumed.
    /// @dev if consumed, then the delivery is not onGoing
    modifier onGoing() { // <7>
        // tag::implementation[]
        require(!consumed);
        _;
        // end::implementation[]
    }

    /// Modifier ensuring that only the dairy of this milk delivery can make a call
    modifier dairyOnly() { // <7>
        // tag::implementation[]
        require(msg.sender == dairyAddress);
        _;
        // end::implementation[]
    }

}
