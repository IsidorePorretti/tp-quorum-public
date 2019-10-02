const AddressBook = require("../../Data/addressbook");

const credentials = {
  Cooperative: {
    inurl: "https://e0ak3iwzb9:j5TQxx5S7x6ydHE_mnBEQjEG4co03Hqerfru0hPyJmU@e0w8vemqcl-e0c7n7h8wc-rpc.de0-aws.kaleido.io"
  },
  Milkhouse: {
    inurl: "https://e0btt09xv7:Cwhn-hFg6ouoReZIxY2w-d8O6X9FvvnQd8qe0yQQpJc@e0w8vemqcl-e0xo0cgdmf-rpc.de0-aws.kaleido.io"
  },
  FarmerHauteluce: {
    inurl: "https://e0ntae7woo:EZLW-XxO44RNi_t4Odu93igjCVZYbuo_RjuwdI0RkO4@e0w8vemqcl-e0jea6js1l-rpc.de0-aws.kaleido.io"
  },
  FarmerParly: {
    inurl: "https://e0g33qalkr:P8jpK4uq5HO1ZgwZSNU-ZzNHGYjsacztlwzLh39rtgk@e0w8vemqcl-e0d5b8yfae-rpc.de0-aws.kaleido.io"
  },
  FarmerBastia: {
    inurl: "https://e0ubbkazvx:yK8Syj0bGEP_uRPjSN2wHVsfcpsQsDe45rcSP6qRmq8@e0w8vemqcl-e0q4pk93ox-rpc.de0-aws.kaleido.io"
  }
};

const getInurl = (participant) => {
  switch (participant) {
    case 'cooperative' :
      return credentials.Cooperative.inurl
    case 'milkhouse':
      return credentials.Milkhouse.inurl
    case 'farmerHauteluce' :
      return credentials.FarmerHauteluce.inurl
    case 'farmerParly' :
      return credentials.FarmerParly.inurl
    case 'farmeBastia' :
      return credentials.FarmerBastia.inurl
  }
};

const getNameFromPublicAddress = (addr) => {
  switch (addr){
    case AddressBook.participants["Coopérative"].user_account:
      return "Coopérative";
    case AddressBook.participants["Laiterie Beaufort"].user_account:
      return "Laiterie Beaufort";
    case AddressBook.participants["Eleveur Hauteluce"].user_account:
      return "Eleveur Hauteluce";
    case AddressBook.participants["Eleveur Parly"].user_account:
      return "Eleveur Parly";
    case AddressBook.participants["Eleveur Bastia"].user_account:
      return "Eleveur Bastia";
  }
};

module.exports = {
  credentials,
  getInurl,
  getNameFromPublicAddress
};
