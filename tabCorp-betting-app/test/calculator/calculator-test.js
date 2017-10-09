var chai = require("chai")
var assert = chai.assert;
var expect = chai.expect;
var util = require("lodash")
var calculator = require('../../lib/calculator/calculator');

var exactaBetsArray =[{ product: 'E', selection: '1,2', stake: 13 },
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
  { product: 'E', selection: '3,2', stake: 51 }];

var placeBetsArray = [{ product: 'P', selection: '1', stake: 31 },
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
  { product: 'P', selection: '4', stake: 105 }];

var winBetsArray = [{ product: 'W', selection: '1', stake: 3 },
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
  { product: 'W', selection: '4', stake: 15 }];

var exactaWinningBets=  { '2,3': [ { product: 'E', selection: '2,3', stake: 98 },
     { product: 'E', selection: '2,3', stake: 61 },
     { product: 'E', selection: '2,3', stake: 47 } ] };

var placeWinningBets= { '1':
   [ { product: 'P', selection: '1', stake: 31 },
     { product: 'P', selection: '1', stake: 40 },
     { product: 'P', selection: '1', stake: 18 } ],
  '2':
   [ { product: 'P', selection: '2', stake: 89 },
     { product: 'P', selection: '2', stake: 16 },
     { product: 'P', selection: '2', stake: 74 } ],
  '3':
   [ { product: 'P', selection: '3', stake: 28 },
     { product: 'P', selection: '3', stake: 82 },
     { product: 'P', selection: '3', stake: 39 } ] };

var winWinningBets= { '2':
   [ { product: 'W', selection: '2', stake: 4 },
     { product: 'W', selection: '2', stake: 8 },
     { product: 'W', selection: '2', stake: 98 } ] };

var raceResult = {}
raceResult.first = "2" ;
raceResult.second = "3" ;
raceResult.third = "1";

var winPoolTotal= 287.3;
var placePoolTotal= 568.48;
var exactaPoolTotal= 501.02;

var winDividend= [ { '2': '2.61' } ];
var placeDividend= [ { '1': '2.13' }, { '2': '1.06' }, { '3': '1.27' } ];
var exactaDividend= [ { '2,3': '2.43' } ];

describe("Calculate Pool total", function() {
  it("should return pool total for exacta bets", function(done) {
    var poolTotal = new calculator(.18).calculatePoolTotal(exactaBetsArray);
    assert.equal(exactaPoolTotal, poolTotal);
    done();
  });

  it("should return pool total for win bets", function(done) {
    var poolTotal=new calculator(.15).calculatePoolTotal(winBetsArray);
    assert.equal(winPoolTotal, poolTotal);
    done();
  });

  it("should return pool total for place bets", function(done) {
    var poolTotal=new calculator(.12).calculatePoolTotal(placeBetsArray);
    assert.equal(placePoolTotal, poolTotal);
    done();
  });
});

describe("Calculate Dividend", function() {
  it("should return dividend[selection] for exacta bets", function(done) {
    var dividend = new calculator(.18).calculateDividends(exactaWinningBets,exactaBetsArray,'Exacta');
    expect(dividend).to.deep.equal(exactaDividend);
    done();
  });

  it("should return dividend[selection] for win bets", function(done) {
    var dividend = new calculator(.15).calculateDividends(winWinningBets,winBetsArray,'Win');
    expect(dividend).to.deep.equal(winDividend);
    done();
  });

  it("should return dividend[selection] for Place bets", function(done) {
    var dividend = new calculator(.12).calculateDividends(placeWinningBets, placeBetsArray,'Place');
    expect(dividend).to.deep.equal(placeDividend);
    done();
  });
});