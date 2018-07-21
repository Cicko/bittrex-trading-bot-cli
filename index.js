const axios = require('axios');
const config = require('./config');
const sha512 = require('js-sha512');
const PrivateMethods = require('./src/api/PrivateMethods');
const PublicMethods = require('./src/api/PublicMethods');
const HistoryChecker = require('./src/bot/HistoryChecker');
const RealTrader = require('./src/bot/RealTrader');
const getCoinPriceInBTC = require('./src/api/getCoinPriceInBTC');
const getCoinPriceInUSD = require('./src/api/getCoinPriceInUSD');

const historyChecker = new HistoryChecker;
const trader = new RealTrader;

trader.init()
.then(() => {
  // trader.showBalance();
  trader.showBalanceInUSD();
  /*
  PublicMethods.getTicker('BTC-CURE').then(({result}) => {
      const price = result.Ask;
      console.log('boughtFor: ' + price);
      PrivateMethods.buyCoin('BTC-CURE', 0.00054 / price, price)
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        console.log(e);
      });

    // console.log(result.Bid);
  });
  */

});

// Algorithm
// 1. Check if we have the coin.
//  2.1 IF WE HAVE THE COIN
//    2.2 We check if the price is higher to sell.
//  3.1 IF WE DON'T HAVE THE COIN
//    3.2 We just buy it.
//
//
//

// showBestMarkets();

function showBestMarkets() {
  historyChecker.getBestMarkets();
}


/*
setInterval(() => {
  // config.generic.BEST_MARKETS
  ['BTC-CURE'].forEach((market) => {
    PublicMethods.getTicker(market).then((result) => {
        const price = result.Ask;
      // PrivateMethods.buyCoin(market)
      // console.log(result.Bid);
    });
  });
}, 30000);
*/
