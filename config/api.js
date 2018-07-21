const API_KEY = '11333e3d72f648ee8e2a0f8912c87a8d';
const API_SECRET = 'c12df78cf22044c6bb0a4ae324d14575';

const getTicksEndpoint = (market, interval) => `/pub/market/GetTicks?marketName=${market}&tickInterval=${interval}`;
const getTickerEndpoint = (market) => `public/getticker?market=${market}`

const getOpenOrdersEndpoint = (market) => {
  return market ?
    `market/getopenorders?apikey=${API_KEY}&market=${market}&nonce=nonce` :
    `market/getopenorders?apikey=${API_KEY}&nonce=nonce`;
}

const getBuyEndpoint = (market, quantity, rate) =>
 `market/buylimit?apikey=${API_KEY}&market=${market}&quantity=${quantity}&rate=${rate}&nonce=nonce`

const getSellEndpoint = (market, quantity, rate) =>
`market/selllimit?apikey=${API_KEY}&market=${market}&quantity=${quantity}&rate=${rate}&nonce=nonce`

module.exports = {
  API_KEY: API_KEY,
  API_SECRET: API_SECRET,
  BITTREX_API_V1_URL: 'https://bittrex.com/api/v1.1/',
  BITTREX_API_V2_URL: 'https://bittrex.com/api/v2.0/',

  // Public endpoints.
  MARKET_SUMMARIES_ENDPOINT: '/GetMarketSummaries',
  MARKETS_ENDPOINT: 'public/getmarkets',
  TICKS_ENDPOINT: getTicksEndpoint,
  TICKER_ENDPOINT: getTickerEndpoint,

  // -----  Private endpoints. -----
  BALANCES_ENDPOINT: `account/getbalances?apikey=${API_KEY}&nonce=nonce`,
  OPEN_ORDERS_ENDPOINT: getOpenOrdersEndpoint,
  ORDER_HISTORY: `account/getorderhistory?apikey=${API_KEY}&nonce=nonce`,

  // Operations
  BUY_ENDPOINT: getBuyEndpoint,
  SELL_ENDPOINT: getSellEndpoint,
}
