let cheeses = []

const Cheese = (id, milk) => {
  let cheese =  {
    id: id,
    participants: ['0xef93234b974f3266eead6f70a8291e2f3434b3a9', '0x83a2f7f154233ff78cb595eebd0b8ef02d982dc4'],
    timestamp: 1570003504,
    mdIdList: milk
  }
  cheeses.push(cheese)
  return cheese
};

const getCheese = (id) => {
  return cheeses[id]
};

module.exports = {
  Cheese,
  getCheese
};
