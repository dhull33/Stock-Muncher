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

  var queryString = req.body && req.body.userString?req.body.userString:null
  queryString = queryString.toUpperCase();
   
  var symbol = req.body.stock_symbol
  db.any(`SELECT * FROM stocks WHERE stock_symbol LIKE '${queryString}%' or stock_symbol LIKE '% ${queryString}'`).then(function(stockData) {
    res.json({'stocks' : stockData});
  })
})

router.post('/api_purchases',function(req,res){ // Creates an API so that out front end can access our database
  var userID = "Testing";   // Should be linked to the current user that is logged in

  var symbol = req.body.stock_symbol
  db.any(`SELECT * FROM stock_purchase WHERE user_id = '${userID}'`).then(function(purchaseData) {
    res.json({'purchases' : purchaseData});
  })
})



module.exports = router;