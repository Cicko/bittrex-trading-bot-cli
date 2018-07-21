const axios = require('axios');
const config = require('./config');
const sha512 = require('js-sha512');
const PrivateMethods = require('./src/api/PrivateMethods');
const getBalance = require('./src/api/getBalance');
const getOpenOrders = require('./src/api/getOpenOrders');

PrivateMethods.getBalance().then((result) => {
  console.log(result);
}).catch(e => {
  console.log(e.message);
});
