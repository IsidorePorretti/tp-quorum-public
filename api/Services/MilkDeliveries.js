const ethers = require('ethers')
const Web3 = require('web3');
const credentials = require('../Helpers/Authentication');
const contract = require("truffle-contract");
const MilkDeliveryJson = require('../../build/contracts/MilkDelivery.json')
const AddressBookJson = require('../../build/contracts/AddressBook.json')
const addressBookData = require("../../data/addressbook.json")

const getMilkDeliveries = async (participant) => {
  try {
    //Laiterie
    let provider = new Web3.providers.HttpProvider(credentials.getInurl(participant));
    const web3 = new ethers.providers.Web3Provider(provider);

    const milkDeliveredABI = ['event MilkDelivered(address indexed milkProducer, address addressMilkhouse, uint32 liters, uint32 price, bytes32 deliveryID)']
    const milkDeliveredInterface = new ethers.utils.Interface(milkDeliveredABI)

    const filter = {fromBlock: 126090, toBlock: 'latest'}
    let logs = await web3.getLogs(filter)


    let result = await logs.map((log) => {
      let parsedLog = milkDeliveredInterface.parseLog(log)
      console.log(parsedLog)
      let milkProducer = credentials.getNameFromPublicAddress(parsedLog.values.milkProducer);
      console.log(milkProducer)
      return {
        "id": parsedLog.values.deliveryID,
        "quantity": parsedLog.values.liters,
        "from": milkProducer,
        "rest": parsedLog
      }
    });
    return result
  } catch (e) {
    console.log(e)
    return {error: e};
  }
};

const createMilkDelivery = async (participant, quantity, price, dairy) => {
  try {
    let provider = new Web3.providers.HttpProvider(credentials.getInurl(participant));

    let addressBookAddress = addressBookData.address;
    let user_account_from = credentials.getPublicAddressFromName(participant);
    let AddressBook = contract(AddressBookJson);
    let MilkDelivery = contract(MilkDeliveryJson);

    MilkDelivery.setProvider(provider);
    AddressBook.setProvider(provider);

    console.log(`Getting deployed version of AddressBook at address '${addressBookAddress}'...`);
    let addressBook = await AddressBook.at(addressBookAddress);

    console.log(addressBookAddress)
    console.log(dairy)
    const laiterieQuorumAddress = await addressBook.getQuorumAddress(dairy);
    console.log('laiterieQuorumAddress:', laiterieQuorumAddress)

    let milkDelivery = await MilkDelivery.new("0xa52C48c00629F0530931353e3Aad7395c8A05422", {
      privateFor: [laiterieQuorumAddress],
      from: user_account_from
    });
    console.log(`MilkDelivery contract deployed at ${milkDelivery.address}`);

    const result = await milkDelivery.sendMilk(quantity, price, {privateFor: [laiterieQuorumAddress],from: user_account_from});

    console.log("Finished!")
    return {contract: milkDelivery.address,sendMilk:result}
  } catch (e) {
    console.log(e)
    return {error: e}
  }
};

const validateMilkDelivery = async (participant) => {
  try {
    let provider = new Web3.providers.HttpProvider(credentials.getInurl(participant));

    let AddressBook = contract(AddressBookJson);
    let MilkDelivery = contract(MilkDeliveryJson);
    MilkDelivery.setProvider(provider);
    AddressBook.setProvider(provider);

    let addressBookAddress = addressBookData.address
    let addressBook = await AddressBook.at(addressBookAddress)
    console.log(`Getting deployed version of MDs ...`)

    let mdHauteluce = await MilkDelivery.at('0x53fc2580c8c4038bfc4056bf099de75cab0e8796')
    let mdParly = await MilkDelivery.at('0xc9d4151cfb60f34e3bd6334b07cb74e89e7a5091')

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
    console.log(e);
    return {error: e}
  }
};

module.exports = {
  getMilkDeliveries,
  createMilkDelivery,
  validateMilkDelivery
};
