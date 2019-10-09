const ethers = require('ethers')
const Web3 = require('web3');
const credentials = require('../Helpers/Authentication');

const getMilkDeliveries = async (participant) => {
//Laiterie
  let provider = new Web3.providers.HttpProvider(credentials.getInurl(participant));
  const web3 = new ethers.providers.Web3Provider(provider);

  const groupAddedABI = ['event MilkDelivered(address indexed milkProducer, uint32 liters, bytes32 deliveryID)']
  const groupAddedInterface = new ethers.utils.Interface(groupAddedABI)


  const filter = {fromBlock: 122000, toBlock: 'latest'}
  let logs = await web3.getLogs(filter)
  let parsedLogs = logs.map((log) => {
    let milkProducer = credentials.getNameFromPublicAddress(groupAddedInterface.parseLog(log).values.milkProducer)
    return {
      "id": groupAddedInterface.parseLog(log).values.deliveryID,
      "quantity": groupAddedInterface.parseLog(log).values.liters,
      "from": milkProducer,
      "rest": groupAddedInterface.parseLog(log)
    }
  });

  return parsedLogs
};

module.exports = {
  getMilkDeliveries
};
