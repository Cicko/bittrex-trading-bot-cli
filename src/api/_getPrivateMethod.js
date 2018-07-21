const config = require('../../config');
const getAxiosBase = require('./_getAxiosBase');

const getPrivateMethod = (ENDPOINT) => {
  const AXIOS_BASE = getAxiosBase(ENDPOINT);
  return new Promise ((resolve, reject) => {
    AXIOS_BASE.get(ENDPOINT)
    .then((res) => {
      resolve(res.data);
    })
    .catch((e) => {
      reject(e);
    });
  });
}
module.exports = getPrivateMethod;
