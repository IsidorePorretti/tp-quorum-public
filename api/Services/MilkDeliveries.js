const ethers = require('ethers')
const Web3 = require('web3')
const credentials = require('../Helpers/Authentication')
const contract = require('@truffle/contract')
const MilkDeliveryJson = require('../../build/contracts/MilkDelivery.json')
const AddressBookJson = require('../../build/contracts/AddressBook.json')
const addressBookData = require('../../data/addressbook.json')

const FILTER_FROM_BLOCK = 161973

const setupWeb3 = async (participant) => {
  const participantNodeURL = credentials.getInurl(participant)
  // console.log(`Connecting to participant node at ${participantNodeURL}`)
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

const getMilkDeliveries = async (participant) => {
  try {
    // Laiterie
    let provider = new Web3.providers.HttpProvider(credentials.getInurl(participant))
    const web3 = new ethers.providers.Web3Provider(provider)

    const milkDeliveredABI = ['event MilkDelivered(address indexed milkDeliveryAddress, address indexed milkProducer, address dairyAddress, uint32 liters, uint32 price)']
    const milkDeliveredInterface = new ethers.utils.Interface(milkDeliveredABI)

    const filter = {fromBlock: FILTER_FROM_BLOCK, toBlock: 'latest'}
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
          'id': parsedLog.values.milkDeliveryAddress,
          'block': blockNumber,
          'from': milkProducer,
          'to': dairyName,
          'quantity': parsedLog.values.liters,
          'price': parsedLog.values.price
        }
      })
    // extract block date from block number
    result = await Promise.all(result.map(async r => {
      const block = await web3.getBlock(r.block)
      const blockDate = block.timestamp
      // console.log(`Block number: ${r.block}, Block date: ${blockDate}`)
      r.timestamp = blockDate
      return r
    }))
    // extract delivery approval status
    result = await Promise.all(result.map(async r => {
      let userAccountFrom = credentials.getPublicAddressFromName(participant)
      console.log(`Transactions will be sent from '${participant}' having address '${userAccountFrom}'`)
      let MilkDelivery = await setupMilkDelivery(participant, userAccountFrom)
      let milkDelivery = await MilkDelivery.at(r.id)
      const deliveryApproval = await milkDelivery.checkDeliveryApproval()
      console.log(`Milk delivery received by dairy? ${deliveryApproval}`)
      r.deliveryApproval = deliveryApproval
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
    // fetch Ethereum address of the participant
    const userAccountFrom = credentials.getPublicAddressFromName(participant)
    console.log(`Transactions will be sent from '${participant}' having address '${userAccountFrom}'`)

    // setup smart-contracts usage
    let addressBook = await getAddressBook(participant)
    let MilkDelivery = await setupMilkDelivery(participant, userAccountFrom)

    const dairyPublicAddress = credentials.getPublicAddressFromName(dairy)
    const dairyPrivateAddress = await addressBook.getQuorumAddress(dairy)
    const cooperativePrivateAddress = await addressBook.getQuorumAddress('Coopérative')
    console.log(`Resolved private Quorum address of '${dairy}' to '${dairyPrivateAddress}'`)

    console.log(`Deploying MilkDelivery smart-contract...`)
    let milkDelivery = await MilkDelivery.new(dairyPublicAddress, { privateFor: [dairyPrivateAddress, cooperativePrivateAddress] })
    console.log(`MilkDelivery contract deployed at ${milkDelivery.address}`)

    console.log(`Sending milk delivery transaction (quantity: ${quantity}, price: ${price})...`)
    const result = await milkDelivery.sendMilk(quantity, price, { privateFor: [dairyPrivateAddress, cooperativePrivateAddress] })

    console.log('Finished!')
    return {contract: milkDelivery.address, sendMilk: result}
  } catch (e) {
    console.log(e)
    return {error: e}
  }
}

const validateMilkDelivery = async (participant, milkDeliveryID) => {
  try {
    const userAccountFrom = credentials.getPublicAddressFromName(participant)
    let MilkDelivery = await setupMilkDelivery(participant, userAccountFrom)

    console.log(`Getting deployed version of MilkDelivery at address: '${milkDeliveryID}'...`)
    let milkDelivery = await MilkDelivery.at(milkDeliveryID)

    // fetch Quorum private address of the coopérative
    let addressBook = await getAddressBook(participant)
    const cooperativePrivateAddress = await addressBook.getQuorumAddress('Coopérative')

    // fetch Quorum private address of the milk producer
    let milkProducerPublicAddress = await milkDelivery.milkProducerAddress()
    console.log(`Milk producer public address: '${milkProducerPublicAddress}'`)
    const milkProducerPrivateAddress = await addressBook.getQuorumAddressFromName(milkProducerPublicAddress, {gas: 0xffffffff})
    console.log(`Milk producer private address: '${milkProducerPrivateAddress}'`)

    console.log('Validating milk delivery...')
    try {
      // milkProducerPrivateAddress
      await milkDelivery.validateDelivery({ privateFor: [milkProducerPrivateAddress, cooperativePrivateAddress] })
      console.log('Finished!')
      return {}
    } catch (e) {
      console.log(e)
      throw e
    }
  } catch (e) {
    console.log(e)
    return {error: e}
  }
}

module.exports = {
  getMilkDeliveries,
  createMilkDelivery,
  validateMilkDelivery
}
