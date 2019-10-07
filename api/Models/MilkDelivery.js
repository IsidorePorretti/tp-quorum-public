const uuidv4 = require('uuid/v4')
const UUID_TRUNCATED_LENGTH = 6

let milkDeliveries = [
  {
    id: uuidv4().substring(0, UUID_TRUNCATED_LENGTH),
    from: 'Eleveur Hauteluce',
    to: 'Laiterie Beaufort',
    quantity: 1000,
    price: 2.25,
    timestamp: Date.now(),
    consumed: true
  }
]

const MilkDelivery = (quantity, price, dairy) => {
  let md = {
    id: uuidv4().substring(0, UUID_TRUNCATED_LENGTH),
    from: 'Eleveur Hauteluce',
    to: dairy,
    quantity: quantity,
    price: price,
    timestamp: Date.now(),
    consumed: false
  }
  milkDeliveries.push(md)
  return md
}

const getMilkDelivery = (id) => {
  return milkDeliveries[id]
}

const getMilkDeliveries = () => {
  return milkDeliveries
}

module.exports = {
  MilkDelivery,
  getMilkDelivery,
  getMilkDeliveries
}
