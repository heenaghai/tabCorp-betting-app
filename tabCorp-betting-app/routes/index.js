var express = require('express');
var bets = require('../lib/bet');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});

router.post('/submitBet', function(req, res, next) {
  new bets().processBets(req.body, function(err, result) {
    if(err) {
      return res.render('index', {error: err});
    }
    return res.render('resultDividend',{result:result});
    
  });
});

module.exports = router;
