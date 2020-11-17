module.exports = {
  compilers: {
    solc: {
      version: '0.5.0'
    }
  },

  networks: {
    ganache: {
      network_id: "*",
      gasPrice: 0,
      port: 7545,
      host: "localhost"
    },
    tenderly: {
      network_id: "*",
      gasPrice: 0,
      port: 9545,
      host: "localhost"
    }
  }
};
