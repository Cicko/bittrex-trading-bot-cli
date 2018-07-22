const fs = require('fs');
const path = require('path');
const config = require('../config');


const readPrices = () => {
  let rawdata = fs.readFileSync(path.join(__dirname, config.generic.PRICES_FILE_PATH));
  let prices = JSON.parse(rawdata);
  return prices;
};

const readPrice = (coin) => {
  return readPrices()[coin];
}


const writePrice = (market, price, num_coins, op) => {
  let prices = readPrices();
  prices[market] = {
    op: op,
    price: price,
    num_coins: num_coins,
    value: price * num_coins,
    date: new Date(),
  };

  let data = JSON.stringify(prices, null, '\t');
  fs.writeFileSync(path.join(__dirname, config.generic.PRICES_FILE_PATH), data);
};


module.exports.readPrices = readPrices;
module.exports.readPrice = readPrice;
module.exports.writePrice = writePrice;
