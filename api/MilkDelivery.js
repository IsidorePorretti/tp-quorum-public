let milkDeliveries = [
  {
    id: 0,
    from: '0xef93234b974f3266eead6f70a8291e2f3434b3a9',
    to: '0x83a2f7f154233ff78cb595eebd0b8ef02d982dc4',
    quantity: 1000,
    price: 2.25,
    timestamp: 1570003504
  }
];

const MilkDelivery = (id, quantity, price) => {

  let md = {
    id: id,
    from: '0xef93234b974f3266eead6f70a8291e2f3434b3a9',
    to: '0x83a2f7f154233ff78cb595eebd0b8ef02d982dc4',
    quantity: quantity,
    price: price,
    timestamp: 1570003504
  };
  milkDeliveries.push(md);
  return md
};

const getMilkDelivery = (id) => {
  return milkDeliveries[id]
};

module.exports = {
  MilkDelivery,
  getMilkDelivery
};
