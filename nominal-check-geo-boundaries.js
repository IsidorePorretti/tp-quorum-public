var MilkDelivery = artifacts.require("MilkDelivery")
var DairyProduction = artifacts.require("DairyProduction")
var AddressBook = artifacts.require("AddressBook")
var addressBookData = require("./data/addressbook.json")

module.exports = async (config) => {
  try {
    let dairyProduction  = await DairyProduction.at('0x73205861bf3c0eb7b022cbdf886ef4f95088b0b0')
    console.log(`Getting DairyProduction contract deployed at ${dairyProduction.address}`)

    const resultCheckGeoBoundaries = await dairyProduction.checkGeoBoundaries()
    console.log('Geo Boundaries Check: ',resultCheckGeoBoundaries)

    console.log("Finished!")
  } catch (e) {
    console.log(e)
  }
  process.exit()
}
