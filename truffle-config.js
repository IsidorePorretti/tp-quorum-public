// tag::quorum[]
var Web3 = require('web3');

// end::quorum[]

module.exports = {
  networks: {
    ganache: {
      network_id: 5777,
      gasPrice: 0,
      port: 7545,
      host: "localhost"
    }
    // tag::quorum[]
    ,
    cooperative: {
      provider: () => {
        return new Web3.providers.HttpProvider('https://e0oob0305m:mMJbBuFSKQ7-59GSjJ3tqTRGrEVMi5Gdxg83nBiUm5Y@e0k63l8rn7-e0og8vsh3a-rpc.eu-central-1.kaleido.io');
      },
      network_id: "*", // Match any network id
      gasPrice: 0,
      gas: 4500000
    },
    laiterie_node: {
      provider: () => {
        return new Web3.providers.HttpProvider('https://e0y4waohbj:sL2ByiEfwEAourze3ioeDdAZNbW4cVsgBcsG85eWYj0@e0k63l8rn7-e0ue8q2kfy-rpc.eu-central-1.kaleido.io');
      },
      network_id: "*", // Match any network id
      gasPrice: 0,
      gas: 4500000
    }
    // end::quorum[]
  }
};
