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
        return new Web3.providers.HttpProvider('https://e0idsvtc6f:CcA2Hin61WJQpE3DWpiIOVl2fHnjpGgCfHb7KkSCZLs@e0f40ksz2y-e0f1m9xfsp-rpc.eu-central-1.kaleido.io');
      },
      network_id: "*", // Match any network id
      gasPrice: 0,
      gas: 4500000
    },
    eleveur_parly_node: {
      provider: () => {
        // replace with your own credentials!
        return new Web3.providers.HttpProvider('https://e0ik262csr:uJC6DOaGqGq5fUU9KG6nXT5ikQ4Nz3_-3hH7-_DE-1o@e0f40ksz2y-e0gitxjnbp-rpc.eu-central-1.kaleido.io');
      },
      network_id: "*", // Match any network id
      gasPrice: 0,
      gas: 4500000
    },
    eleveur_bastia_node: {
      provider: () => {
        // replace with your own credentials!
        return new Web3.providers.HttpProvider('https://e0nkwx52oa:irTREi-6EBBlrLFLSUssQBnp2aG_6lHSYcMGmdBmYrw@e0f40ksz2y-e0o5w6xc0g-rpc.eu-central-1.kaleido.io');
      },
      network_id: "*", // Match any network id
      gasPrice: 0,
      gas: 4500000
    },
    laiterie_beaufort_node: {
      provider: () => {
        // replace with your own credentials!
        return new Web3.providers.HttpProvider('https://e0r0h66v0f:Y6FMdDRCe0_YhYJqM2zQX4GthFZiLy9tytJjoGmR9NQ@e0f40ksz2y-e0xwc2gb4a-rpc.eu-central-1.kaleido.io');
      },
      network_id: "*", // Match any network id
      gasPrice: 0,
      gas: 4500000
    }
    // end::quorum[]
  }
};
