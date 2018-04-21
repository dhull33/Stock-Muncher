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

router.get('/stock_list',function(req,res){
  var symbol = req.body.stock_symbol
  db.any('SELECT * FROM stocks WHERE stock_price_date > (CURRENT_DATE - 30) ORDER BY stock_symbol').then(function(data){
    // res.render(page to render, object to pass to the page)
    res.render('stock_list',{'stocks' : data});
  })
})

router.post('/stock_list',function(req,res){
  // Shows only stocks that have recent prices
  db.any('SELECT * FROM stocks WHERE stock_price_date > (CURRENT_DATE - 30) ORDER BY stock_symbol').then(function(data){
    // res.render(page to render, object to pass to the page)
    res.render('stock_list',{'stocks' : data});
      
  })
  
})


module.exports = router;
