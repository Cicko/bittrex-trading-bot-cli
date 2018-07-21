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
      .then((markets) => {
        const sortedMarkets = this.sortByGaining(markets);
        const formatedResult = sortedMarkets.map((market) => {
          if (market[market.length - 1]) {
            return {
              market: market[market.length - 1].MarketName,
              profit: getSimulatedProfit(market) - config.generic.CASH_BASE,
            };
          } else {
            return market;
          }
        });
        resolve(formatedResult);
      })
      .catch(reject);
    });
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
