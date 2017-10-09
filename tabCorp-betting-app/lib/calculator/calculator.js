var util = require('lodash');
var config = require('../../config');


function Calculator(comission) {
  this.comission=comission;
  this.prodName = 'Calculator';
}

/**
* This function calculates the pool total collected 
* for a specific product considering comission.
*
* @param {bets} - input bets in array format
* @param {comission} - product specific comissions
*/
Calculator.prototype.calculatePoolTotal= function(bets) {
  var poolTotal = 0.0;
  bets.forEach(function (bet) {
    poolTotal = poolTotal + bet.stake;
  });
  return poolTotal - (poolTotal * this.comission);  
};

/**
* This function calculates & returns the dividends for each product.
*
* @param {bets} - input bets in array format
* @param {comission} - product specific comissions
*/
Calculator.prototype.calculateDividends= function(winningBets, totalBets, productKey) {
  var poolTotal = this.calculatePoolTotal(totalBets);
  var dividends=[];

  util.forEach(winningBets, function (data, key) {
    var dividend={};
    var winingPoolTotal =0.0;
    data.forEach(function (winningBet) {
      winingPoolTotal = winingPoolTotal + winningBet.stake;
    })
    if(winingPoolTotal==0){
      return 0;
    }
    if(productKey=="Place"){
      dividend[key] = (poolTotal/(winingPoolTotal*3)).toFixed(2);
    }else{
      dividend[key] = (poolTotal/winingPoolTotal).toFixed(2);      
    }
    dividends.push(dividend);
  });
  return dividends;
};

module.exports = Calculator;
