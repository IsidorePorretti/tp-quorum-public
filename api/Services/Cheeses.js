const ethers = require('ethers')
const Web3 = require('web3');
const credentials = require('../Helpers/Authentication');

const getCheeses = async (participant) => {
//Laiterie
  let provider = new Web3.providers.HttpProvider(credentials.getInurl(participant));
  const web3 = new ethers.providers.Web3Provider(provider);

  const groupAddedABI = ['event CheeseProduced(address indexed maker, uint32 quantity, bytes32 deliveryID)']
  const groupAddedInterface = new ethers.utils.Interface(groupAddedABI)

  const filter = {fromBlock: 7242, toBlock: 'latest'}
  let logs = await web3.getLogs(filter)
  return logs.map((log) => groupAddedInterface.parseLog(log))
};

module.exports = {
  getCheeses
};
