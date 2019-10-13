const uuidv4 = require('uuid/v4')
const UUID_TRUNCATED_LENGTH = 6
const MilkDeliveryService = require("../Services/MilkDeliveries")

const MilkDelivery = (participant, quantity, price, dairy) => {
  let md = {
    id: uuidv4().substring(0, UUID_TRUNCATED_LENGTH),
    from: 'Eleveur Hauteluce',
    to: dairy,
    quantity: quantity,
    price: price,
    timestamp: Date.now(),
    consumed: false
  }
  // milkDeliveries.push(md)
  // return md
  return MilkDeliveryService.createMilkDelivery(participant, quantity, price, dairy)
}

/*
const getMilkDeliveries = () => {
  return milkDeliveries
}
*/
const getMilkDeliveries = (participant) => {
  return MilkDeliveryService.getMilkDeliveries(participant)
};

const validateMilkDelivery = (participant, milkDeliveryID) => {
  return MilkDeliveryService.validateMilkDelivery(participant, milkDeliveryID)
};

module.exports = {
  MilkDelivery,
  getMilkDeliveries,
  validateMilkDelivery
}
