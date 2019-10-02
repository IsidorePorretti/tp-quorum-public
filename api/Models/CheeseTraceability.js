const Cheese = require("./Cheese");

const CheeseTraceability = () => {
  return {
    id: 0,
    cheese: Cheese.getCheese(0),
    mdIdList : [0, 1]
  }
};

module.exports = {
  CheeseTraceability
};
