var MilkDelivery = artifacts.require("MilkDelivery")
var AddressBook = artifacts.require("AddressBook")
var addressBookData = require("./data/addressbook.json")

module.exports = async (config) => {
  try {
    let addressBookAddress = addressBookData.address
    let addressBook = await AddressBook.at(addressBookAddress)
    console.log(`Getting deployed version of MDs ...`)
    let mdHauteluce = await MilkDelivery.at('0xd63ff692c1ec9d9fa961d04c0b8295c3286afa47')
    let mdParly = await MilkDelivery.at('0x135fe2cfcaec7d4d659e84b15120f0740a7a21b9')

    const mdIdHauteluce = await mdHauteluce.deliveryID()
    console.log('Milk delivery ID Hauteluce',mdIdHauteluce)
    const mdIdParly = await mdParly.deliveryID()
    console.log('Milk delivery ID Parly',mdIdParly)

    const hauteluceQuorumAddress = await addressBook.getQuorumAddress('Eleveur Hauteluce')
    const parlyQuorumAddress = await addressBook.getQuorumAddress('Eleveur Parly')

    const resultHauteluce = await mdHauteluce.validateDelivery(mdIdHauteluce, { privateFor: [hauteluceQuorumAddress] })
    console.log('Validate MD Hauteluse',resultHauteluce)
    const resultParly = await mdParly.validateDelivery(mdIdParly, { privateFor: [parlyQuorumAddress] })
    console.log('Validate MD Parly',resultParly)

    console.log("Finished!")
  } catch (e) {
    console.log(e)
  }
  process.exit()
}
