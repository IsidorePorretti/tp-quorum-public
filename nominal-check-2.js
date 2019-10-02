var MilkDelivery = artifacts.require("MilkDelivery")
var AddressBook = artifacts.require("AddressBook")
var addressBookData = require("./data/addressbook.json")

module.exports = async (config) => {
  try {
    let mdParly = await MilkDelivery.at('0xe6e5767fff4eb9b17b934b0c1e989e1128ef44b2')

    const mdApproval = await mdParly.checkDeliveryApproval()
    console.log('Milk Delivery Approval: ', mdApproval)

    console.log("Finished!")
  } catch (e) {
    console.log(e)
  }
  process.exit()
}
