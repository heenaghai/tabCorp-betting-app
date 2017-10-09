var util = require('lodash');
var config = require('../../config');
var Calculator= require('./calculator.js');

function WinCalculator() {
  this.prodName = 'Win';
}

WinCalculator.prototype= new Calculator(config.commissions.winBet);

/**
* This function filters the wiining bets for Win product.
* @param {betsArray} - input bets in array format
* @param {raceResult} - result object
*/
WinCalculator.prototype.calculateWinningBets = function(betsArray, raceResult) {
  var winWinningBets = {};
  winWinningBets[raceResult.first] = util.filter(betsArray, function(bet) {
    return (bet.product.toUpperCase() === 'W' && bet.selection == raceResult.first);
  });
  return winWinningBets; 
}

module.exports = WinCalculator;