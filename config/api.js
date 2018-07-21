const API_KEY = '11333e3d72f648ee8e2a0f8912c87a8d';
const API_SECRET = 'c12df78cf22044c6bb0a4ae324d14575';

const getTicksEndpoint = (market, interval) => `/GetTicks?marketName=${market}&tickInterval=${interval}`;

module.exports = {
  API_KEY: API_KEY,
  API_SECRET: API_SECRET,
  BITTREX_API_V1_URL: 'https://bittrex.com/api/v1.1/',
  BITTREX_API_V2_URL: 'https://bittrex.com/api/v2.0/pub/markets/',

  // Public endpoints.
  MARKET_SUMMARIES_ENDPOINT: '/GetMarketSummaries',
  TICKS_ENDPOINT: getTicksEndpoint,

  // Private endpoints.
  BALANCES_ENDPOINT: `account/getbalances?apikey=${API_KEY}&nonce=nonce`,
  OPEN_ORDERS_ENDPOINT: `market/getopenorders?apikey=${API_KEY}&nonce=nonce`,
}
