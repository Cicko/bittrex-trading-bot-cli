const axios = require('axios');
const config = require('./config');
const sha512 = require('js-sha512');
const PrivateMethods = require('./src/api/PrivateMethods');
const PublicMethods = require('./src/api/PublicMethods');
const HistoryChecker = require('./src/bot/HistoryChecker');

const historyChecker = new HistoryChecker;

historyChecker.getBestMarkets()
.then(markets => {
  let profit = 0;
  markets = markets.slice(0, config.generic.COINS_LIMIT);
  markets.forEach(market => profit += market.profit);
  console.log(markets);
  console.log('PROFIT : ' + profit)
})
.catch(e => {
  console.log(e);
});

/*
PublicMethods.getTicks('BTC-DOGE', 'fiveMin').then((result) => {
  console.log(result);
}).catch(e => {
  console.log(e.message);
});
*/
