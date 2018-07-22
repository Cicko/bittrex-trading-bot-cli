const _ = require('lodash');
const axios = require('axios');
const chalk = require('chalk');
const config = require('./config');
const sha512 = require('js-sha512');
const PrivateMethods = require('./src/api/PrivateMethods');
const PublicMethods = require('./src/api/PublicMethods');
const HistoryChecker = require('./src/bot/HistoryChecker');
const BalanceManager = require('./src/bot/BalanceManager');
const writePrice = require('./src/PricesFileManager').writePrice;
const readPrices = require('./src/PricesFileManager').readPrices;
const readPrice = require('./src/PricesFileManager').readPrice;
const getCoinPriceInBTC = require('./src/api/getCoinPriceInBTC');
const getCoinPriceInUSD = require('./src/api/getCoinPriceInUSD');

const historyChecker = new HistoryChecker;
const balance = new BalanceManager;

const log = console.log;

balance.init()
.then(() => {
  // balance.showBalance();
  // balance.showBalanceInUSD();
  // const boughtCoins = balance.getAllCoins();
  tradingAlgorithm();
  setInterval(tradingAlgorithm, config.generic.BOT_INTERVAL);
});

function tradingAlgorithm() {
  log(chalk.black.bgWhite('--------------- ' + new Date() + '---------------'));
  balance.showBalanceInUSD();
  config.generic.BEST_MARKETS.forEach((market, inx) => {
    setTimeout(() => {
      PublicMethods.getTicker(market).then((ticker) => {
        log('');
        log(chalk.black.bgWhite.bold(market));
        log(chalk.green(JSON.stringify(ticker, null, '\t')));

        const coinPast = readPrice(market);
        const coinToCheck = market.split('BTC-')[1];

        if (coinPast && coinPast.op === 'BUY') { // We have to SELL the coin
          log(chalk.bgGreen('Have to SELL ' + coinToCheck));
          checkToSellCoin(market, ticker, coinPast);
        } else {
          log(chalk.bgGreen('Have to BUY ' + coinToCheck));
          checkToBuyCoin(market, ticker, coinPast);
        }
      });
    }, 1000 * inx);
  });
}

function checkToBuyCoin (market, tickerResult, coinPast) {
  const priceToBuy = tickerResult.result.Ask;

  log(chalk.bgBlue('Price to BUY available: ' + priceToBuy));

  if (coinPast) {
    const soldFor = coinPast.price;
    const soldCoins = coinPast.num_coins;
    const earntMoney = coinPast.value;

    log(chalk.bgBlue('Sold ' + soldCoins + ' coins for ' + soldFor + '. VALUE: ' + soldFor * soldCoins + ' BTC'));

    if (priceToBuy < soldFor) {
      log(chalk.white.bgGreen('Price is lower so we can buy it'));
      PrivateMethods.buyCoin(market, earntMoney / priceToBuy, priceToBuy).then((buyResponse) => {
        log(chalk.white.bgGreen.bold(JSON.stringify(buyResponse, null, '\t')));
        if (buyResponse.success) {
          writePrice(market, priceToSell, boughtCoins, 'BUY');
        }
      });
    } else {
      log(chalk.white.bgRed('Price is higher than sold so we can not buy'));
    }
  } else {
    log(chalk.bgBlue('BUY FOR FIRST TIME ' + market));
    const coinsToBuy = config.generic.CASH_BASE_BTC / priceToBuy;
    PrivateMethods.buyCoin(market, coinsToBuy, priceToBuy).then((buyResponse) => {
      log(chalk.white.bgGreen.bold(JSON.stringify(buyResponse, null, '\t')));
      if (buyResponse.success) {
        writePrice(market, priceToBuy, coinsToBuy, 'BUY');
      }
    });

  }
}

function checkToSellCoin (market, tickerResult, coinPast) {
  const priceToSell = tickerResult.result.Bid;
  const boughtFor = coinPast.price;
  const boughtCoins = coinPast.num_coins;

  log(chalk.bgBlue('Bought ' + boughtCoins + ' coins for ' + boughtFor + '. VALUE: ' + boughtFor * boughtCoins + ' BTC'));
  log(chalk.bgBlue('Price to SELL available: ' + priceToSell));

  if (priceToSell > boughtFor) {
    log(chalk.white.bgGreen('Price is higher so we can sell it'));
    PrivateMethods.sellCoin(market, boughtCoins, priceToSell).then((sellResponse) => {
      log(chalk.white.bgGreen.bold(JSON.stringify(sellResponse, null, '\t')));
      log(chalk.white.bgGreen('PROFIT ON ' + market + ' : ' + (boughtCoins * priceToSell - boughtFor * boughtCoins)));
      if (sellResponse.success) {
        writePrice(market, priceToSell, boughtCoins, 'SELL');
      }
    });
  } else {
    log(chalk.white.bgRed('Price is lower so we can not sell it'));
  }
}


// historyChecker.getBestMarkets();
