var validator= require('../helper/validator.js');
var exactaCalculator= require('../calculator/exacta-calculator.js');
var placeCalculator= require('../calculator/place-calculator.js');
var winCalculator= require('../calculator/win-calculator.js');
var calculator= require('../calculator/calculator.js');
var Promise = require('bluebird');
var util = require('lodash');
var utility = require('util');

function Bets() {
  this.prodName = 'Bets';
  this.betsArray=[];
  this.resultObj;
}


/**
* This function validates & converts the input data in required format for calculation
* @param {inputData} - input data
* @param {cb} - callback
*/
Bets.prototype.processBets= function(inputData, cb){
  var inputArray= inputData.bet.split('\r\n');
  var self= this;
  Promise.map(inputArray, function(betString){
    return Promise.promisify(validator)(betString).then(function(){
      if(betString.split(':')[0] && betString.split(':')[0].toUpperCase() === 'BET'){
        self.betsArray.push(parseInput(betString));
      }else{
        self.resultObj = parseResult(betString);        
      }
    });
  }).then(function(){
      return cb(null, self.getDividends());
  }).catch(function(err){
       return cb(err);
  });
}
 
/**
* This function calculates the product specific dividend.
* @param {betsArray} - input bets in array format
* @param {resultObj} - input result object
*/
Bets.prototype.getDividends= function() {
  var dividends = [];
  var finalResult = [];
  var globalJson = {
    'Win' : new winCalculator(),
    'Place' : new placeCalculator(),
    'Exacta' : new exactaCalculator()
  };
  var self= this;
  util.forEach(globalJson, function (betCalculator, availableProduct) {
    var winningBets = betCalculator.calculateWinningBets(self.betsArray, self.resultObj);
    var bets = util.filter(self.betsArray, function(bet) {
      return bet.product === availableProduct.charAt(0);
    });
    var resultDividend = formatResult(availableProduct, betCalculator.calculateDividends(winningBets,bets,availableProduct));
    finalResult= finalResult.concat(resultDividend);
  });
  return finalResult;
}

/**
* Formats the final result for each product in the desires format the input bet string in JSON format 
* @param {product} - product key
* @param {dividends} - product specific result
*/
function formatResult(product, dividends) {
  var resultDividend=[];
  dividends.forEach(function(dividend) {
    var winningSelection = Object.keys(dividend)[0];
    console.log(utility.format('%s:%s:$%d', product, winningSelection, dividend[winningSelection]));
    resultDividend.push(utility.format('%s:%s:$%d', product, winningSelection, dividend[winningSelection]));
  }); 
  return resultDividend;
};

/**
* Parses the input bet string in JSON format 
* @param {placedBet} - input bet line
* @param {cb} - callback 
*/
function parseInput(placedBet){
  var bet = placedBet.split(':');
  return { 'product': bet[1], 'selection': bet[2], 'stake': parseInt(bet[3], 10) };
}

/**
* Parses the input result string in JSON format 
* @param {placedBet} - input bet line
* @param {cb} - callback 
*/
function parseResult(placedResult){
  var result = placedResult.split(':');
  return { 'first': result[1], 'second': result[2], 'third': result[3]};
}

module.exports= Bets;