const config = require('../../config');
const PublicMethods = require('../api/PublicMethods');

const getMarkets = PublicMethods.getMarkets;
const getTickers = PublicMethods.getTicks;

const getSimulatedProfit = require('./getSimulatedProfit');

class HistoryChecker {
  getBestMarkets(num_markets) {
    return new Promise ((resolve, reject) => {
      getMarkets()
      .then(this.getTickersForMarkets)
      .then(this.reformatResult.bind(this))
      .then(resolve)
      .catch(reject);
    });
  }

  reformatResult(markets){
    return new Promise ((resolve, reject) => {
      const sortedMarkets = this.sortByGaining(markets);
      const formatedResult = sortedMarkets.map((market) => {
        const marketName = market[market.length - 1].MarketName;
        if (market[market.length - 1]) {
          return {
            market: marketName,
            profit: getSimulatedProfit(market) - config.generic.CASH_BASE,
          };
        } else {
          return market;
        }
      });
      this.showResult(formatedResult);
      resolve(formatedResult);
    });
  }

  showResult(markets) {
    let profit = 0;
    markets = markets.slice(0, config.generic.COINS_LIMIT);
    markets.forEach(market => profit += market.profit);
    console.log('BEST MARKETS ARE: ');
    console.log(markets);
    console.log('WITH A PROFIT : ' + profit);
  }

  getTickersForMarkets(markets) {
    const allTickers = [];
    return new Promise((resolve, reject) => {
      markets.result.forEach(({ MarketName }, inx) => {
        getTickers(MarketName, config.generic.TICKS_INTERVAL)
        .then((res) => {
          if (!config.generic.ONLY_COIN || MarketName.includes(config.generic.ONLY_COIN)) {
            let marketHistory = res.result.splice(-config.generic.TICKS_LENGTH);
            marketHistory[marketHistory.length - 1].MarketName = MarketName;
            allTickers.push(marketHistory);
          }
          if (inx === markets.result.length - 1) {
            resolve(allTickers);
          }
        })
        .catch(reject);
      });
    });
  }

  sortByGaining(markets) {
    markets.sort((a, b) => {
      return getSimulatedProfit(a) > getSimulatedProfit(b) ? -1 : 1;
    });
    return markets;
  }
}

module.exports = HistoryChecker;
