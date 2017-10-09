var Regex = require('regex');


function validateBet(betLine, cb){
  if(betLine.split(':')[1] && betLine.split(':')[1].toUpperCase() === 'E'){
    if(new Regex('Bet:(E):[1-9],[1-9]:[1-9]\d*').test(betLine)){
      return cb(new Error("Incorrect Exacta bet format."));    
    }
  }else if(betLine.split(':')[1] && (betLine.split(':')[1].toUpperCase() === 'W')){
    if(new Regex('Bet:(W):[1-9]:[1-9]\d*').test(betLine)){
      return cb(new Error("Incorrect Win bet format."));    
    }
  }else if(betLine.split(':')[1] && (betLine.split(':')[1].toUpperCase() === 'P')){
    if(new Regex('Bet:(P):[1-9]:[1-9]\d*').test(betLine)){
      return cb(new Error("Incorrect Place bet format."));    
    }
  }else if(betLine.split(':')[0] && betLine.split(':')[0].toUpperCase() === 'RESULT'){
    if(new Regex('Result:[1-9]:[1-9]:[1-9]').test(betLine)){
      return cb(new Error("Incorrect Result format."));    
    }
  }else{
      return cb(new Error("Incorrect input format."));
  }
  return cb(null);
}

module.exports=validateBet;