const uuidv4 = require('uuid/v4')
const UUID_TRUNCATED_LENGTH = 6
const CheeseService = require("../Services/Cheeses");

let cheeses = [{
  'id': uuidv4().substring(0, UUID_TRUNCATED_LENGTH),
  'participants': [
    'Eleveur Hauteluce',
    'Eleveur Parly',
    'Laiterie Beaufort'
  ],
  'timestamp': Date.now(),
  'mdIdList': [
    0,
    1
  ]
}]

const Cheese = (deliveries) => {
  let cheese = {
    id: uuidv4().substring(0, UUID_TRUNCATED_LENGTH),
    participants: ['0xef93234b974f3266eead6f70a8291e2f3434b3a9', '0x83a2f7f154233ff78cb595eebd0b8ef02d982dc4'],
    timestamp: Date.now(),
    mdIdList: deliveries
  }
  cheeses.push(cheese)
  return cheese
}

const getCheese = (id) => {
  return cheeses[id]
}


const getCheeses = () => {
  return cheeses
}
/*
const getCheeses = (participant) => {
  return CheeseService.getCheeses(participant)
};
*/

module.exports = {
  Cheese,
  getCheese,
  getCheeses
}
