const config = require('../../config');

module.exports = (result) => {
    let money = config.generic.CASH_BASE;
    let coins = 0;
    let toBuy = true;
    let boughtFor = 0;
    let soldFor = 0;

    const STEPS = 1;
    const commision = 0.9975;

    result.forEach((x, i, arr) => {
      if (i >= STEPS) {
        if (boughtFor === 0 && toBuy || x.H < soldFor && toBuy) {
          boughtFor = x.H;
          coins = (money / x.H) * commision;
          if (config.generic.DEBUG_OPERATIONS && result[0].MarketName === config.generic.COIN_TO_CHECK) {
            console.log('BUY FOR ', Number(x.H));
            console.log('COINS: ', coins);
          }
          money = 0;
          toBuy = false;
        }
        if (x.L > boughtFor * config.generic.PERCENTAGE_TO_BUY && !toBuy) {  //
          soldFor = x.L;

          money = coins * x.L * commision;
          if (config.generic.DEBUG_OPERATIONS && result[0].MarketName === config.generic.COIN_TO_CHECK) {
            console.log('SELL FOR ', Number(x.L));
            console.log('MONEY: ', coins * x.L);
          }
          coins = 0;
          toBuy = true;
        }

        if (config.generic.DEBUG_OPERATIONS && result[0].MarketName === config.generic.COIN_TO_CHECK) {
          console.log('TIME CHECK ', x.T);
          console.log(i);
        }
      }
    });

    if (money !== 0) {
      return money;
    } else {
      return Number(coins * result[result.length - 1].C);
    }
}
