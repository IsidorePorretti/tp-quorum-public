var MilkDelivery = artifacts.require("MilkDelivery")
var DairyProduction = artifacts.require("DairyProduction")
var AddressBook = artifacts.require("AddressBook")
var addressBookData = require("./data/addressbook.json")

module.exports = async (config) => {
  try {
    let addressBookAddress = addressBookData.address

    let dairyProduction  = await DairyProduction.new(addressBookAddress, { privateFor: []})
    console.log(`DairyProduction contract deployed at ${dairyProduction.address}`)

    console.log(`Getting deployed version of MDs ...`)
    let mdHauteluce = await MilkDelivery.at('0x44a0b7661f7c31c1627838914f94e99563d9f43b')
    let mdParly = await MilkDelivery.at('0x84d4e5d5c7c35b1c11df76da052ee45fca9b1d91')

    const mdIdHauteluce = await mdHauteluce.deliveryID()
    console.log('Milk delivery ID Hauteluce',mdIdHauteluce)
    const mdIdParly = await mdParly.deliveryID()
    console.log('Milk delivery ID Parly',mdIdParly)

    const resultMakecheese = await dairyProduction.makeCheese(10,[mdHauteluce.address, mdParly.address], { privateFor: []})
    console.log('Made cheese: ',resultMakecheese)

    const resultCheckGeoBoundaries = await dairyProduction.checkGeoBoundaries()
    console.log('Geo Boundaries Check: ',resultCheckGeoBoundaries)

    console.log("Finished!")
  } catch (e) {
    console.log(e)
  }
  process.exit()
}
