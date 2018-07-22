
const SECOND = 1000;
const MINUTE = 60 * SECOND;

const ONE_DAY_BY_FIVE_MIN = 12 * 24;
const ONE_DAY_BY_ONE_MIN = 60 * 24;

const FIVE_MIN_IN_MS = 5 * 60 * 1000;

module.exports = {
  PRICES_CHECK_INTERVALIN_MS: MINUTE,
  TICKS_INTERVAL: 'fiveMin',
  TICKS_LENGTH: ONE_DAY_BY_FIVE_MIN * 1,
  PERCENTAGE_TO_BUY: 1,

  DEBUG_OPERATIONS: true,
  DEBUG_PRICES: false,

  COIN_TO_CHECK: 'BTC-BITS',
  CASH_BASE: 4.5,
  CASH_BASE_BTC: 0.0006,
  COINS_LIMIT: 13,
  ONLY_COIN: 'BTC',

  BEST_MARKETS: [
    'BTC-BITS',
    'BTC-DOGE',
    'BTC-ABY',
    'BTC-2GIVE',
    'BTC-GOLOS',
    'BTC-BRK',
    'BTC-TKS',
    'BTC-XMG',
    'BTC-CURE',
    'BTC-MUSIC',
  ],

  PRICES_FILE_PATH: '../data/prices.json', // related to the pricesfilemanager

  BOT_INTERVAL: FIVE_MIN_IN_MS,
}
