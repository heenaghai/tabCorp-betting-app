var Calculator= require('./calculator.js');
var config = require('../../config');
var util = require('lodash');

function ExactaCalculator() {
  this.prodName = 'Exacta';
}

ExactaCalculator.prototype= new Calculator(config.commissions.exactaBet);

/**
* This function filters the wiining bets for Exacta product.
* @param {betsArray} - input bets in array format
* @param {raceResult} - result object
*/
ExactaCalculator.prototype.calculateWinningBets = function(betsArray, raceResult) {
  var exactaWinningBets = {};
  exactaWinningBets[raceResult.first + ',' + raceResult.second] = 
    util.filter(betsArray, function(bet) {
      return bet.product.toUpperCase() === 'E' && (bet.selection.split(',')[0] == raceResult.first && bet.selection.split(',')[1] == raceResult.second);
    });
  return exactaWinningBets; 
}

module.exports = ExactaCalculator;
