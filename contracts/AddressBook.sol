pragma solidity ^0.4.22;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';

/// @title An address book for zip code of participants
contract AddressBook is Ownable {
  mapping(address => uint32) private participantsZipCode;

  event ParticipantAdded(address indexed participant, uint32 zipCode);

  /// Adds a participant zip zip code
  /// @dev should only be called by the owner of this contract
  /// @param participant the participant for which the zip code should be added
  /// @param zipCode the zip code of the participant
  function addParticipantZipCode(address participant, uint32 zipCode) onlyOwner external {
    // add the participants to the mapping
    // emit ParticipantAdded event
    emit ParticipantAdded(participant, zipCode);
  }

  /// Checks if the participant is in the geo boundaries for the AOP label
  /// @param participant the address of the participant to check
  /// @return true if the participant is in the geo boundaries of the AOP label
  function checkGeoBoundaries(address participant) public view returns (bool) {
    // check if the participant is in the allowed zip codes
  }

}
