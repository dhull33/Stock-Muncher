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

var stockPrice = 0;
var url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="
var url2 = "&interval=1min&apikey="
var apiKey = "3SW8F3VSYVSP0VAZ";



router.get('/stockmanage',function(req,res){
  var symbol = req.body.stock_symbol
  db.any('SELECT * FROM stock_purchase').then(function(data){
    // res.render(page to render, object to pass to the page)
    db.any('SELECT * FROM users').then(function(userData) {
      res.render('stockmanage',{'stocks' : data, 'users' : userData});
    })
  })
})

router.post('/stockmanage',function(req,res){
 
  db.any('SELECT * FROM stock_purchase').then(function(data){
    // res.render(page to render, object to pass to the page)
    db.any('SELECT * FROM users').then(function(userData) {
      res.render('stockmanage',{'stocks' : data, 'users' : userData});
    })
      
  })
  
})


module.exports = router;
