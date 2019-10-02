var MilkDelivery = artifacts.require("MilkDelivery")
var AddressBook = artifacts.require("AddressBook")
var addressBookData = require("./data/addressbook.json")

module.exports = async (config) => {
  try {
    let addressBookAddress = addressBookData.address
    let participants = addressBookData.participants
    console.log(`Getting deployed version of AddressBook at address '${addressBookAddress}'...`)
    let addressBook = await AddressBook.at(addressBookAddress)
    const laiterieQuorumAddress = await addressBook.getQuorumAddress('Laiterie Beaufort')

    let milkDelivery = await MilkDelivery.new({ privateFor: [laiterieQuorumAddress] })
    console.log(`MilkDelivery contract deployed at ${milkDelivery.address}`)

    const result = await milkDelivery.sendMilk(867, { privateFor: [laiterieQuorumAddress] })
    console.log(result)

    console.log("Finished!")
  } catch (e) {
    console.log(e)
  }
  process.exit()
}
