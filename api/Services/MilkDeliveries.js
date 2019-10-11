const ethers = require('ethers')
const Web3 = require('web3')
const credentials = require('../Helpers/Authentication')
const contract = require('@truffle/contract')
const MilkDeliveryJson = require('../../build/contracts/MilkDelivery.json')
const AddressBookJson = require('../../build/contracts/AddressBook.json')
const addressBookData = require('../../data/addressbook.json')

const getMilkDeliveries = async (participant) => {
  try {
    // Laiterie
    let provider = new Web3.providers.HttpProvider(credentials.getInurl(participant))
    const web3 = new ethers.providers.Web3Provider(provider)

    const milkDeliveredABI = ['event MilkDelivered(address indexed milkDeliveryAddress, address indexed milkProducer, address dairyAddress, uint32 liters, uint32 price)']
    const milkDeliveredInterface = new ethers.utils.Interface(milkDeliveredABI)

    const filter = {fromBlock: 152496, toBlock: 'latest'}
    let logs = await web3.getLogs(filter)

    let result = logs
      .map(log => {
        const blockNumber = log.blockNumber
        // parse log data
        let parsedLog = milkDeliveredInterface.parseLog(log)
        // console.log(log)
        // console.log(parsedLog)
        let milkProducer = credentials.getNameFromPublicAddress(parsedLog.values.milkProducer)
        let dairyName = credentials.getNameFromPublicAddress(parsedLog.values.dairyAddress)
        // console.log(milkProducer)
        return {
          "id": parsedLog.values.milkDeliveryAddress,
          "block": blockNumber,
          "from": milkProducer,
          "to": dairyName,
          "quantity": parsedLog.values.liters,
          "price": parsedLog.values.price
        }
      })
    // extract block date from block number
    return await Promise.all(result.map(async r => {
      const block = await web3.getBlock(r.block)
      const blockDate = block.timestamp
      // console.log(`Block number: ${r.block}, Block date: ${blockDate}`)
      r.timestamp = blockDate
      return r
    }))
    return result
  } catch (e) {
    console.log(e)
    return {error: e}
  }
}

const createMilkDelivery = async (participant, quantity, price, dairy) => {
  try {
    const participantNodeURL = credentials.getInurl(participant)
    console.log(`Connecting to participant node at ${participantNodeURL}`)
    let provider = new Web3.providers.HttpProvider(participantNodeURL)

    // fetch Ethereum address of the participant
    let addressBookAddress = addressBookData.address
    let userAccountFrom = credentials.getPublicAddressFromName(participant)
    console.log(`Transactions will be sent from '${participant}' having address '${userAccountFrom}'`)

    // setup smart-contracts usage
    let AddressBook = contract(AddressBookJson)
    let MilkDelivery = contract(MilkDeliveryJson)
    MilkDelivery.setProvider(provider)
    MilkDelivery.defaults({ from: userAccountFrom })
    AddressBook.setProvider(provider)

    console.log(`Getting deployed version of AddressBook at address '${addressBookAddress}'...`)
    let addressBook = await AddressBook.at(addressBookAddress)

    const dairyPublicAddress = credentials.getPublicAddressFromName(dairy)
    const dairyPrivateAddress = await addressBook.getQuorumAddress(dairy)
    console.log(`Resolved private Quorum address of '${dairy}' to '${dairyPrivateAddress}'`)

    console.log(`Deploying MilkDelivery smart-contract...`)
    let milkDelivery = await MilkDelivery.new(dairyPublicAddress, { privateFor: [dairyPrivateAddress] })
    console.log(`MilkDelivery contract deployed at ${milkDelivery.address}`)

    console.log(`Sending milk delivery transaction (quantity: ${quantity}, price: ${price})...`)
    const result = await milkDelivery.sendMilk(quantity, price, { privateFor: [dairyPrivateAddress] })

    console.log('Finished!')
    return {contract: milkDelivery.address, sendMilk: result}
  } catch (e) {
    console.log(e)
    return {error: e}
  }
}

const validateMilkDelivery = async (participant) => {
  try {
    let provider = new Web3.providers.HttpProvider(credentials.getInurl(participant));

    const user_account_from = credentials.getPublicAddressFromName(participant);

    let AddressBook = contract(AddressBookJson);
    let MilkDelivery = contract(MilkDeliveryJson);
    MilkDelivery.setProvider(provider);
    AddressBook.setProvider(provider);

    let addressBookAddress = addressBookData.address
    let addressBook = await AddressBook.at(addressBookAddress)
    console.log(`Getting deployed version of MDs ...`)

    let mdHauteluce = await MilkDelivery.at('0x455a06A1eb0de74a3E007d1FD287B44f4Ee3180d')
    let mdParly = await MilkDelivery.at('0xA0B7022c549F55f32B33F359b73Eb2C4429b31CA')

    const mdIdHauteluce = await mdHauteluce.deliveryID({from: user_account_from})
    console.log('Milk delivery ID Hauteluce', mdIdHauteluce)
    const mdIdParly = await mdParly.deliveryID({from: user_account_from})
    console.log('Milk delivery ID Parly', mdIdParly)

    const hauteluceQuorumAddress = await addressBook.getQuorumAddress('Eleveur Hauteluce')
    const parlyQuorumAddress = await addressBook.getQuorumAddress('Eleveur Parly')

    const resultHauteluce = await mdHauteluce.validateDelivery(mdIdHauteluce, {
      privateFor: [hauteluceQuorumAddress],
      from: user_account_from
    })
    console.log('Validate MD Hauteluce', resultHauteluce)
    const resultParly = await mdParly.validateDelivery(mdIdParly, {
      privateFor: [parlyQuorumAddress],
      from: user_account_from
    })
    console.log('Validate MD Parly', resultParly)

    console.log("Finished!")
  } catch (e) {
    console.log(e);
    return {error: e}
  }
}

module.exports = {
  getMilkDeliveries,
  createMilkDelivery,
  validateMilkDelivery
}
