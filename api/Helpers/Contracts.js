const credentials = require('../Helpers/Authentication')
const Web3 = require('web3')
const contract = require('@truffle/contract')
const addressBookData = require('../../data/addressbook.json')
const AddressBookJson = require('../../build/contracts/AddressBook.json')
const MilkDeliveryJson = require('../../build/contracts/MilkDelivery.json')
const DairyProductionJson = require('../../build/contracts/DairyProduction.json')

const setupWeb3 = async (participant) => {
  const participantNodeURL = credentials.getInurl(participant)
   console.log(`Connecting to participant node at ${participantNodeURL}`)
  let provider = new Web3.providers.HttpProvider(participantNodeURL)
  return provider
}

const getAddressBook = async (participant) => {
  let AddressBook = contract(AddressBookJson)
  AddressBook.setProvider(await setupWeb3(participant))
  let addressBookAddress = addressBookData.address
  console.log(`Getting deployed version of AddressBook at address '${addressBookAddress}'...`)
  let addressBook = await AddressBook.at(addressBookAddress)
  return addressBook
}

const setupMilkDelivery = async (participant, userAccountFrom) => {
  let MilkDelivery = contract(MilkDeliveryJson)
  MilkDelivery.setProvider(await setupWeb3(participant))
  MilkDelivery.defaults({ from: userAccountFrom })
  return MilkDelivery
}

const setupDairyProduction = async (participant, userAccountFrom) => {
  let DairyProduction = contract(DairyProductionJson)
  DairyProduction.setProvider(await setupWeb3(participant))
  DairyProduction.defaults({ from: userAccountFrom })
  return DairyProduction
}

module.exports = {
  setupWeb3,
  getAddressBook,
  setupMilkDelivery,
  setupDairyProduction
}
