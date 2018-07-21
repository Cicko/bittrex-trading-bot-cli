const config = require('../../config');
const getPrivateMethod = require('./_getPrivateMethod');

class PrivateMethods {
  static getBalance() {
    return getPrivateMethod(config.api.BALANCES_ENDPOINT);
  }
  static getOpenOrders() {
    return getPrivateMethod(config.api.OPEN_ORDERS_ENDPOINT);
  }
}

module.exports = PrivateMethods;
