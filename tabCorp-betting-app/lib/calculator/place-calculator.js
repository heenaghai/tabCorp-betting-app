var util = require('lodash');
var config = require('../../config');
var Calculator= require('./calculator.js');

function PlaceCalculator() {
  this.prodName = 'Place';
}

PlaceCalculator.prototype= new Calculator(config.commissions.placeBet);

/**
* This function filters the wiining bets for Place product.
* @param {betsArray} - input bets in array format
* @param {raceResult} - result object
*/
PlaceCalculator.prototype.calculateWinningBets = function(betsArray, raceResult) {
  var placeWinningBets = util.filter(betsArray, function(bet) {
    return bet.product.toUpperCase() === 'P' && (bet.selection == raceResult.first || bet.selection == raceResult.second || bet.selection == raceResult.third);
  });
  return util.groupBy(placeWinningBets, function(bet) { return bet.selection; }); 
}

module.exports = PlaceCalculator;
