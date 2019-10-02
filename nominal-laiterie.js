var MilkDelivery = artifacts.require("MilkDelivery")
var AddressBook = artifacts.require("AddressBook")
var addressBookData = require("./data/addressbook.json")

module.exports = async (config) => {
  try {
    let addressBookAddress = addressBookData.address
    let addressBook = await AddressBook.at(addressBookAddress)
    console.log(`Getting deployed version of MDs ...`)
    let mdHauteluce = await MilkDelivery.at('0xd7d18af1c3d4c4f4c5d8f1de0863454a9d0b8e3d')
    let mdParly = await MilkDelivery.at('0xe6e5767fff4eb9b17b934b0c1e989e1128ef44b2')

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
