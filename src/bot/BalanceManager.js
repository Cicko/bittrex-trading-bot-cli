const _ = require('lodash');
const chalk = require('chalk');
const config = require('../../config');
const PrivateMethods = require('../api/PrivateMethods');
const getCoinPriceInUSD = require('../api/getCoinPriceInUSD');

class BalanceManager {
  init() {
    return this.checkBalance();
  }

  checkBalance() {
    return new Promise((resolve, reject) => {
      PrivateMethods.getBalance()
        .then((res) => {
          this.balance = res.result.filter(coin => coin.Balance > 0);
          resolve();
        })
        .catch(reject);
    });
  }

  showBalance() {
    if (this.balance) {
      console.log(this.balance);
    }
    else {
      console.log('No balance is loaded');
    }
  }

  getCoinAmount(coin) {
    if (this.balance) {
      return _.find(this.balance, (x) => coin == x.Currency).Balance;
    } else {
      console.log('No balance is loaded');
    }
  }

  getAllCoins() {
    return this.balance.map(x => x.Currency);
  }

  showBalanceInUSD() {
    let total = 0;
    const coins = this.getAllCoins();
    const allPrices = [];
    coins.forEach((coin, inx) => {
      allPrices.push(new Promise((resolve, reject) => {
        if (coin !== 'USDT') {
          getCoinPriceInUSD(coin).then(price => {
            const coinAmounts = this.getCoinAmount(coin);
            console.log('Coin: ' + chalk.yellow(coin + ':  ') + chalk.red(Number(price * coinAmounts).toFixed(2) + ' $'));
            total += price * coinAmounts;
            resolve();
          });
        } else {
          resolve();
        }
      }));
    });
    Promise.all(allPrices).then(() => {
      console.log(chalk.green('------------------------------- TOTAL '));
      console.log(chalk.green(total) + '$');
    });
  }
}

module.exports = BalanceManager;
