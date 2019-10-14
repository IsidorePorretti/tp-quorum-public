const extractBlockDate = async (web3, blockNumber) => {
  const block = await web3.getBlock(blockNumber)
  // console.log(`Block number: ${blockNumber}, Block date: ${block.timestamp}`)
  return block.timestamp
}

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

module.exports = {
  extractBlockDate,
  sleep
}
