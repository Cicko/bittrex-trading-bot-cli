const config = require('../../config');
const getPublicMethod = require('./_getPublicMethod');

class PublicMethods {
  static getMarkets() {
    return getPublicMethod(config.api.MARKETS_ENDPOINT);
  }
  static getMarketsSummaries() {
    return getPublicMethod(config.api.MARKET_SUMMARIES_ENDPOINT);
  }
  static getTicks(market, interval) {
    return getPublicMethod(config.api.TICKS_ENDPOINT(market, interval), true); // version 2
  }
  static getTicker(market) {
    return getPublicMethod(config.api.TICKER_ENDPOINT(market));
  }
}

module.exports = PublicMethods;
