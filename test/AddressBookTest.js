var AddressBook = artifacts.require("AddressBook");

contract('AddressBook', function(accounts) {

  it("should detect geo boundaries properly", async () => {
    let addressBook = await AddressBook.deployed()

    await addressBook.addParticipantZipCode(accounts[1], 73620, {from: accounts[0]})
    await addressBook.addParticipantZipCode(accounts[2], 73210, {from: accounts[0]})
    await addressBook.addParticipantZipCode(accounts[3], 73270, {from: accounts[0]})
    await addressBook.addParticipantZipCode(accounts[4], 20200, {from: accounts[0]})

    assert.equal(await addressBook.checkGeoBoundaries(accounts[1]), true, "the first participants should be in the correct geo boundaries")
    assert.equal(await addressBook.checkGeoBoundaries(accounts[2]), true, "the first participants should be in the correct geo boundaries")
    assert.equal(await addressBook.checkGeoBoundaries(accounts[3]), true, "the first participants should be in the correct geo boundaries")
    assert.equal(await addressBook.checkGeoBoundaries(accounts[4]), false, "the fourth participant should NOT be in the correct geo boundaries")
  })

})
