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
        require(_dairyAddress!=address(0)); 
        // TODO: keep track of the milk producer (éleveur) in milkProducerAddress 
        milkProducerAddress = msg.sender;
        // TODO: keep track of the dairy address (laiterie) in dairyAddress
        dairyAddress = _dairyAddress;
        // TODO: initialize dairyApproval to a meaningful value
        dairyApproval = false;
        // TODO: initialize consumed to a meaningful value
        consumed = false;
    }

    /// Keeps track of a milk delivery
    /// @dev should only be called by the milk producers of this contract
    function sendMilk(uint32 _liters, uint32 _price) public onGoing() {
        price=_price;
        liters=_liters;

        // TODO: keep track of the number of liters sent and the price
        // TODO: emit a MilkDeliveredEvent
        emit MilkDelivered(address(this), msg.sender, dairyAddress, liters, price);
    }

    /// Mark the delivery as accepted by the dairy
    function validateDelivery() onGoing() dairyOnly() public {
        dairyApproval = true;
        // TODO: implement this!
    }

    /// Return true if the delivery was acknowledged by the dairy (laiterie)
    function checkDeliveryApproval() public view returns (bool) {
        return dairyApproval;
        // TODO: implement this!
    }

    /// Mark the delivery as consumed (used in order to make some cheese)
    function consume() external {
        consumed=true;
        // TODO: implement this!
    }

    /// Modifier based on the value of consumed.
    /// @dev if consumed, then the delivery is not onGoing
    modifier onGoing() {
         require(!consumed);
        _;
        // TODO: implement this!
    }

    /// Modifier ensuring that only the dairy of this milk delivery can make a call
    modifier dairyOnly() {
        require(msg.sender==dairyAddress);
        _;
        // TODO: implement this!
    }

}