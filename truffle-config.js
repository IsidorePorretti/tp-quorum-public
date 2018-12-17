// tag::quorum[]
var Web3 = require('web3');
// end::quorum[]

module.exports = {
  networks: {
    // tag::ganache[]
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
    },
    // end::ganache[]
    // tag::cooperative[]
    cooperative: {
      provider: () => {
        // replace with your own credentials!
        return new Web3.providers.HttpProvider('https://e0w4v3oui7:bbc002hvzMiybVrA5Js0ZZJeygEwQWlRvmGAseXEdj4@e0f40ksz2y-e0uonjt4nr-rpc.eu-central-1.kaleido.io'); //<1>
      },
      network_id: "*", // Match any network id
      gasPrice: 0,
      gas: 4500000
    },
    // end::cooperative[]
    // tag::quorum[]
    eleveur_hauteluce_node: {
      provider: () => {
        // replace with your own credentials!
        return new Web3.providers.HttpProvider('');
      },
      network_id: "*", // Match any network id
      gasPrice: 0,
      gas: 4500000
    },
    eleveur_parly_node: {
      provider: () => {
        // replace with your own credentials!
        return new Web3.providers.HttpProvider('');
      },
      network_id: "*", // Match any network id
      gasPrice: 0,
      gas: 4500000
    },
    eleveur_bastia_node: {
      provider: () => {
        // replace with your own credentials!
        return new Web3.providers.HttpProvider('');
      },
      network_id: "*", // Match any network id
      gasPrice: 0,
      gas: 4500000
    },
    laiterie_beaufort_node: {
      provider: () => {
        // replace with your own credentials!
        return new Web3.providers.HttpProvider('');
      },
      network_id: "*", // Match any network id
      gasPrice: 0,
      gas: 4500000
    }
    // end::quorum[]
  }
};
