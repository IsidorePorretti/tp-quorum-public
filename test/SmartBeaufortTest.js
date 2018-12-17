var SmartBeaufort = artifacts.require("SmartBeaufort");
var AddressBook = artifacts.require("AddressBook");

contract('SmartBeaufort', function(accounts) {
  const [cheeseMaker, milkProducer1, milkProducer2, milkProducer3] = accounts;

  beforeEach(async () => {
    let addressBook = await AddressBook.deployed()

    await addressBook.addParticipantZipCode(cheeseMaker, 73620, {from: cheeseMaker})
    await addressBook.addParticipantZipCode(milkProducer1, 73210, {from: cheeseMaker})
    await addressBook.addParticipantZipCode(milkProducer2, 73270, {from: cheeseMaker})
    await addressBook.addParticipantZipCode(milkProducer3, 20200, {from: cheeseMaker})

    assert.equal(await addressBook.checkGeoBoundaries(cheeseMaker), true, "the first participants should be in the correct geo boundaries")
    assert.equal(await addressBook.checkGeoBoundaries(milkProducer1), true, "the first participants should be in the correct geo boundaries")
    assert.equal(await addressBook.checkGeoBoundaries(milkProducer2), true, "the first participants should be in the correct geo boundaries")
    assert.equal(await addressBook.checkGeoBoundaries(milkProducer3), false, "the fourth participant should NOT be in the correct geo boundaries")
  })

  it("should validate geo constraints with proper parties", async () => {
    let addressBook = await AddressBook.deployed()
    let smartBeaufort = await SmartBeaufort.new(addressBook.address, {from: accounts[0]})

    await smartBeaufort.sendMilk(100, {from: milkProducer1})
    await smartBeaufort.sendMilk(150, {from: milkProducer2})

    assert.equal(await smartBeaufort.checkGeoBoundaries(), false,
      "the contract should NOT match geo constraints as the cheese has not been produced yet")

    await smartBeaufort.makeCheese(50, {from: cheeseMaker})
    assert.equal(await smartBeaufort.checkGeoBoundaries(), true, "the contract should match geo constraints")
  })

  it("should NOT validate geo constraints with non proper parties", async () => {
    let addressBook = await AddressBook.deployed()
    let smartBeaufort = await SmartBeaufort.new(addressBook.address, {from: accounts[0]})

    await smartBeaufort.sendMilk(100, {from: milkProducer1})
    await smartBeaufort.sendMilk(150, {from: milkProducer3})

    assert.equal(await smartBeaufort.checkGeoBoundaries(), false, "the contract should match geo constraints")
  })

})
