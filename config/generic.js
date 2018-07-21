
const SECOND = 1000;
const MINUTE = 60 * SECOND;

const ONE_DAY_BY_FIVE_MIN = 12 * 24;

module.exports = {
  PRICES_CHECK_INTERVALIN_MS: MINUTE,
  TICKS_INTERVAL: 'fiveMin',
  TICKS_LENGTH: ONE_DAY_BY_FIVE_MIN,
  DEBUG_OPERATIONS: false,
  COIN_TO_CHECK: 'BTC-DGB',
  CASH_BASE: 4,
  COINS_LIMIT: 11,
  ONLY_COIN: 'BTC',
}