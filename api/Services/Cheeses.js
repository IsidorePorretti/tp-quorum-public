const credentials = require('../Helpers/Authentication')
const contracts = require('../Helpers/Contracts')
const Blockchain = require('../Helpers/BlockchainHelpers')
const ethers = require('ethers')

const FILTER_FROM_BLOCK = 179014 // <1>

const getCheeses = async (participant) => {
  // tag::implementation[]
  console.log(`Searching for cheeses for '${participant}'`)
  const web3 = new ethers.providers.Web3Provider(await contracts.setupWeb3(participant))

  const cheeseProducedABI = ['event CheeseProduced(address indexed dairyProductionAddress, address indexed dairy, uint32 quantity)']
  const cheeseProducedInterface = new ethers.utils.Interface(cheeseProducedABI)

  const filter = {
    fromBlock: FILTER_FROM_BLOCK,
    toBlock: 'latest',
    topics: [ethers.utils.id('CheeseProduced(address,address,uint32)')]
  }
  let logs = await web3.getLogs(filter)

  let results = logs
    .map(log => {
      const blockNumber = log.blockNumber
      // parse log data
      let parsedLog = cheeseProducedInterface.parseLog(log)
      // return temporary result
      return {
        'id': parsedLog.values.dairyProductionAddress,
        'block': blockNumber
      }
    })

  // fetch Ethereum address of the participant
  const userAccountFrom = credentials.getPublicAddressFromName(participant)
  console.log(`Transactions will be sent from '${participant}' having address '${userAccountFrom}'`)
  // setup smart-contracts usage
  let DairyProduction = await contracts.setupDairyProduction(participant, userAccountFrom)

  for (let index = 0; index < results.length; index++) {
    const r = results[index]
    // retreive timestamp
    r.timestamp = await Blockchain.extractBlockDate(web3, r.block)
    // fetch smart-contract instance
    let cheese = await DairyProduction.at(r.id)
    // fetch certification status
    r.certified = await cheese.checkGeoBoundaries()
    console.log(`Cheese '${r.id}' certified? ${r.certified}`)
    await Blockchain.sleep(500)

    // fetch milk deliveries of the cheese
    try {
      // fetch the dairy address
      const numberOfMilkDeliveries = await cheese.getMilkDeliveriesCount()
      // console.log(`Number of milk deliveries: ${numberOfMilkDeliveries}`)

      let milkDeliveriesAddresses = []
      for (let i = 0; i < numberOfMilkDeliveries; i++) {
        milkDeliveriesAddresses[i] = await cheese.milkDeliveries(i)
      }
      console.log(milkDeliveriesAddresses)
      r.deliveries = milkDeliveriesAddresses
    } catch (e) {
      console.error(e)
    }
  }
  console.log(results)
  return results
  // end::implementation[]
}

const makeCheese = async (participant, quantity, milkDeliveries) => {
  // tag::implementation[]
  try {
    // fetch Ethereum address of the participant
    const userAccountFrom = credentials.getPublicAddressFromName(participant)
    console.log(`Transactions will be sent from '${participant}' having address '${userAccountFrom}'`)

    // setup smart-contracts usage
    let addressBook = await contracts.getAddressBook(participant)
    let DairyProduction = await contracts.setupDairyProduction(participant, userAccountFrom)

    // fetch private TX address of 'Coopérative'
    const cooperativePrivateAddress = await addressBook.getQuorumAddress('Coopérative')

    console.log(`Deploying DairyProduction smart-contract...`)
    let cheese = await DairyProduction.new(addressBook.address, { privateFor: [cooperativePrivateAddress] })
    console.log(`DairyProduction contract deployed at ${cheese.address}`)

    console.log(`Sending makeCheese() transaction (quantity: ${quantity}, milk deliveries: ${milkDeliveries})...`)
    const result = await cheese.makeCheese(quantity, milkDeliveries, { privateFor: [cooperativePrivateAddress] })

    console.log('Finished!')
    return {contract: cheese.address, makeCheese: result}
  } catch (e) {
    console.log(e)
    return {error: e}
  }
  // end::implementation[]
}

module.exports = {
  getCheeses,
  makeCheese
}
