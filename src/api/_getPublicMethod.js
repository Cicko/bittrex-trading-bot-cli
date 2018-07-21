const config = require('../../config');
const axios = require('axios');

const getPublicMethod = (ENDPOINT, v2) => {
  return new Promise ((resolve, reject) => {
    const BASE_URL = v2 ? config.api.BITTREX_API_V2_URL : config.api.BITTREX_API_V1_URL;
    axios.get(BASE_URL + ENDPOINT)
    .then((res) => {
      resolve(res.data);
    })
    .catch((e) => {
      reject(e);
    });
  });
}
module.exports = getPublicMethod;
