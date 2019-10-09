var MilkDelivery = artifacts.require("MilkDelivery")
var AddressBook = artifacts.require("AddressBook")
var addressBookData = require("./data/addressbook.json")

module.exports = async (config) => {
  try {
    let mdHauteluce = await MilkDelivery.at('0x455a06A1eb0de74a3E007d1FD287B44f4Ee3180d')

    const mdApproval = await mdHauteluce.checkDeliveryApproval()
    console.log('Milk Delivery Approval: ', mdApproval)

    console.log("Finished!")
  } catch (e) {
    console.log(e)
  }
  process.exit()
}
