pragma solidity ^0.4.24;


contract MilkDelivery {
    uint32 public liters;
    uint32 public price;
    bool public dairyApproval;
    bool public consumed;
    address public dairyAddress;

    event MilkDelivered(address indexed milkDeliveryAddress, address indexed milkProducer, address dairyAddress, 
                        uint32 liters, uint32 price);

    constructor(address _dairyAddress) public {
        // tag::implementation[]
        require(_dairyAddress != address(0));
        dairyAddress = _dairyAddress;
        consumed = false;
        // end::implementation[]
    }

    /// Keeps track of a milk delivery
    /// @dev should only be called by the milk producers of this contract
    /// @param _liters the liters of milk delivered
    function sendMilk(uint32 _liters, uint32 _price) public onGoing() {
        liters = _liters;
        price = _price;
        emit MilkDelivered(address(this), msg.sender, dairyAddress, liters, price);
    }

    function validateDelivery() onGoing() public {
        // TODO: ensure that only the dairy can approve!
        // mark the delivery as accepted by the dairy
        dairyApproval = true;
    }

    function checkDeliveryApproval() public view returns (bool) {
        return dairyApproval;
    }

    modifier onGoing() {
        require(!consumed);
        _;
    }

    function consume() external {
        consumed = true;
    }

}
