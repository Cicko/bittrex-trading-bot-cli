const config = require('../../config');
const getPrivateMethod = require('./_getPrivateMethod');

class PrivateMethods {
  static getBalance() {
    return getPrivateMethod(config.api.BALANCES_ENDPOINT);
  }
  static getOpenOrders(market) {
    return getPrivateMethod(config.api.OPEN_ORDERS_ENDPOINT(market));
  }
  static getOrderHistory() {
    return getPrivateMethod(config.api.ORDER_HISTORY);
  }
  static buyCoin(market, quantity, rate) {
    return getPrivateMethod(config.api.BUY_ENDPOINT(market, quantity, rate));
  }
  static sellCoin(market, quantity, rate) {
    return getPrivateMethod(config.api.SELL_ENDPOINT(market, quantity, rate));
  }
}

module.exports = PrivateMethods;
