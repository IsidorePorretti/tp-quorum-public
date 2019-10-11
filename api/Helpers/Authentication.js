const AddressBook = require("../../data/addressbook")

const getInurl = (participant) => {
  return AddressBook.participants[participant].quorum_url
  /*
  switch (participant) {
    case 'Coopérative' :
      return credentials.Cooperative.inurl
    case milkhouse:
      return credentials.Milkhouse.inurl
    case farmerHauteluce :
      return credentials.FarmerHauteluce.inurl
    case farmerParly :
      return credentials.FarmerParly.inurl
    case farmeBastia :
      return credentials.FarmerBastia.inurl
  }
  */
}

const getNameFromPublicAddress = (addr) => {
  switch (addr) {
    case AddressBook.participants['Coopérative'].user_account:
      return 'Coopérative'
    case AddressBook.participants['Laiterie Beaufort'].user_account:
      return 'Laiterie Beaufort'
    case AddressBook.participants['Eleveur Hauteluce'].user_account:
      return 'Eleveur Hauteluce'
    case AddressBook.participants['Eleveur Parly'].user_account:
      return 'Eleveur Parly'
    case AddressBook.participants['Eleveur Bastia'].user_account:
      return 'Eleveur Bastia'
  }
}

const getPublicAddressFromName = (participant) => {
  return AddressBook.participants[participant].user_account
}

module.exports = {
  getInurl,
  getNameFromPublicAddress,
  getPublicAddressFromName
};
