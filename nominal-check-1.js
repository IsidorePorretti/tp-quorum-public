var MilkDelivery = artifacts.require("MilkDelivery")
var AddressBook = artifacts.require("AddressBook")
var addressBookData = require("./data/addressbook.json")

module.exports = async (config) => {
  try {
    let mdHauteluce = await MilkDelivery.at('0xd7d18af1c3d4c4f4c5d8f1de0863454a9d0b8e3d')

    const mdApproval = await mdHauteluce.checkDeliveryApproval()
    console.log('Milk Delivery Approval: ', mdApproval)

    console.log("Finished!")
  } catch (e) {
    console.log(e)
  }
  process.exit()
}
