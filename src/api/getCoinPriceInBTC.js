const PublicMethods = require('./PublicMethods');
const config = require('../../config');

const getCoinPriceInBTC = (coin) => {
  return new Promise((resolve, reject) => {
    PublicMethods.getTicker(`BTC-${coin}`).then((res) => {
      if (config.generic.DEBUG_PRICES) {
        console.log(coin + ' coin price in bitcoin');
        console.log(res.result.Ask);
      }
      resolve(res.result.Ask);
    });
  });
}

module.exports = getCoinPriceInBTC;
