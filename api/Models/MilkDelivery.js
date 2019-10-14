const MilkDeliveryService = require('../Services/MilkDeliveries')

const MilkDelivery = (participant, quantity, price, dairy) => {
  return MilkDeliveryService.createMilkDelivery(participant, quantity, price, dairy)
}

const getMilkDeliveries = (participant) => {
  return MilkDeliveryService.getMilkDeliveries(participant)
}

const validateMilkDelivery = (participant, milkDeliveryID) => {
  return MilkDeliveryService.validateMilkDelivery(participant, milkDeliveryID)
}

module.exports = {
  MilkDelivery,
  getMilkDeliveries,
  validateMilkDelivery
}
