var Web3 = require('web3');

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
    },
    
    cooperative: {
      provider: () => {
      // replace with your own credentials!
      return new Web3.providers.HttpProvider(
      'https://e0a6uqn6vu:DaaQaatwsUviPZaFZWG77GrFmDbWKch8Luo7e7EhGYU@e0blh9lwnn-e0dzr7l227-rpc.de0-aws.kaleido.io/'); 
      },

      network_id: "*",
      gasPrice: 0,
      port: 4500000,
      type: "quorum"
    },

    eleveur_hauteluce_node: {
          provider: () => {

            // replace with your own credentials!
            return new Web3.providers.HttpProvider(
              'https://e0a6uqn6vu:DaaQaatwsUviPZaFZWG77GrFmDbWKch8Luo7e7EhGYU@e0blh9lwnn-e0t2n4mhl5-rpc.de0-aws.kaleido.io/');
       },
       network_id: "*", // Match any network id
       gasPrice: 0,
       gas: 4500000,
       type: "quorum"
     },
     eleveur_parly_node: {
       provider: () => {
         // replace with your own credentials!
         return new Web3.providers.HttpProvider(
   'https://e0a6uqn6vu:DaaQaatwsUviPZaFZWG77GrFmDbWKch8Luo7e7EhGYU@e0blh9lwnn-e0wf3iowgh-rpc.de0-aws.kaleido.io/');
       },
network_id: "*", // Match any network id
       gasPrice: 0,
       gas: 4500000,
       type: "quorum"
     },
     eleveur_bastia_node: {
       provider: () => {
         // replace with your own credentials!
         return new Web3.providers.HttpProvider(
   'https://e0a6uqn6vu:DaaQaatwsUviPZaFZWG77GrFmDbWKch8Luo7e7EhGYU@e0blh9lwnn-e0qgych2dq-rpc.de0-aws.kaleido.io/');
       },
       network_id: "*", // Match any network id
       gasPrice: 0,
       gas: 4500000,
       type: "quorum"
     },
     laiterie_beaufort_node: {
       provider: () => {
         // replace with your own credentials!
         return new Web3.providers.HttpProvider(
   'https://e0a6uqn6vu:DaaQaatwsUviPZaFZWG77GrFmDbWKch8Luo7e7EhGYU@e0blh9lwnn-e0n5dt4j3h-rpc.de0-aws.kaleido.io/');
       },
       network_id: "*", // Match any network id
       gasPrice: 0,
       gas: 4500000,
       type: "quorum"
}

  }
};