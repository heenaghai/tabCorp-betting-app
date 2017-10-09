var exactaCalculator = require('../../lib/calculator/exacta-calculator');
var chai = require("chai")
var expect = chai.expect;

var betsArray = [ { product: 'W', selection: '1', stake: 3 },
  { product: 'W', selection: '2', stake: 4 },
  { product: 'W', selection: '3', stake: 5 },
  { product: 'W', selection: '4', stake: 5 },
  { product: 'W', selection: '1', stake: 16 },
  { product: 'W', selection: '2', stake: 8 },
  { product: 'W', selection: '3', stake: 22 },
  { product: 'W', selection: '4', stake: 57 },
  { product: 'W', selection: '1', stake: 42 },
  { product: 'W', selection: '2', stake: 98 },
  { product: 'W', selection: '3', stake: 63 },
  { product: 'W', selection: '4', stake: 15 },
  { product: 'P', selection: '1', stake: 31 },
  { product: 'P', selection: '2', stake: 89 },
  { product: 'P', selection: '3', stake: 28 },
  { product: 'P', selection: '4', stake: 72 },
  { product: 'P', selection: '1', stake: 40 },
  { product: 'P', selection: '2', stake: 16 },
  { product: 'P', selection: '3', stake: 82 },
  { product: 'P', selection: '4', stake: 52 },
  { product: 'P', selection: '1', stake: 18 },
  { product: 'P', selection: '2', stake: 74 },
  { product: 'P', selection: '3', stake: 39 },
  { product: 'P', selection: '4', stake: 105 },
  { product: 'E', selection: '1,2', stake: 13 },
  { product: 'E', selection: '2,3', stake: 98 },
  { product: 'E', selection: '1,3', stake: 82 },
  { product: 'E', selection: '3,2', stake: 27 },
  { product: 'E', selection: '1,2', stake: 5 },
  { product: 'E', selection: '2,3', stake: 61 },
  { product: 'E', selection: '1,3', stake: 28 },
  { product: 'E', selection: '3,2', stake: 25 },
  { product: 'E', selection: '1,2', stake: 81 },
  { product: 'E', selection: '2,3', stake: 47 },
  { product: 'E', selection: '1,3', stake: 93 },
  { product: 'E', selection: '3,2', stake: 51 } ]

var raceResult = {}
raceResult.first = "2" ;
raceResult.second = "3" ;
raceResult.third = "1";

var exactaWinningBets=  { '2,3': [ { product: 'E', selection: '2,3', stake: 98 },
     { product: 'E', selection: '2,3', stake: 61 },
     { product: 'E', selection: '2,3', stake: 47 } ] };

describe("Exacta Win Bets", function() {
    it("should return winning bets out of all exacta bets", function(done) {
      var output =new exactaCalculator().calculateWinningBets(betsArray, raceResult);
      expect(exactaWinningBets).to.be.ok;
      expect(output).to.have.property('2,3');
      expect(output).to.deep.equal(exactaWinningBets);
      done();
    });
});