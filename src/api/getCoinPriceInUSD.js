const PublicMethods = require('./PublicMethods');
const config = require('../../config');
const getCoinPriceInBTC = require('./getCoinPriceInBTC');

const getCoinPriceInUSD = (coin) => {
  return new Promise((resolve, reject) => {
    PublicMethods.getTicker('USD-BTC').then(res => {
      if (coin !== 'BTC') {
        getCoinPriceInBTC(coin).then(price => {
          if (config.generic.DEBUG_PRICES) {
            console.log(coin + ' price in USD: ');
            console.log(price * res.result.Ask);
          }
          resolve(price * res.result.Bid);
        });
      } else {
        resolve(res.result.Bid);
      }
    });
  });
};

module.exports = getCoinPriceInUSD;
