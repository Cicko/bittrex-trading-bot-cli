const axios = require('axios');
const config = require('../../config');
const sha512 = require('js-sha512');

module.exports = (endpoint) => {
  const GET_FULL_URI = config.api.BITTREX_API_V1_URL + endpoint;
  const apisign = sha512.hmac(config.api.API_SECRET, GET_FULL_URI);
  return axios.create({
    baseURL: config.api.BITTREX_API_V1_URL,
    headers: { 'apisign': apisign },
  });
}
