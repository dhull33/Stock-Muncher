var express = require("express");
var router = express.Router();
var promise = require('bluebird');
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/stocks';
var db = pgp(connectionString);
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended :false}));
var fetch = require('node-fetch');
var request = require('request');

var options = {
    promiseLib : promise
}

router.post('/api_stocks',function(req,res){ // Creates an API so that out front end can access our database
  console.log(req.body);
  var queryString = req.body && req.body.userString?req.body.userString:null
   
  var symbol = req.body.stock_symbol
  db.any(`SELECT * FROM stocks WHERE stock_symbol LIKE '${queryString.toUpperCase()}%' or stock_symbol LIKE '% ${queryString.toUpperCase()}'`).then(function(stockData) {
    res.json({'stocks' : stockData});
    console.log(stockData[0]);
  })
})



module.exports = router;