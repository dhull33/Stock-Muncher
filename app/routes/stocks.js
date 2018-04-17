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

router.get('/stocks',function(req,res){

    db.any('SELECT * FROM stocks').then(function(data){
      // res.render(page to render, object to pass to the page)
      res.render('stocks',{'stocks' : data});
    })
  });

router.post('/stocks',function(req,res){
    function update_stock_price() {
      (function() {
          console.log("Submitted")
          var url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="
          var symbol = req.body.stock_symbol;
          var url2 = "&interval=1min&apikey="
          var apiKey = "3SW8F3VSYVSP0VAZ";
          // Retreives individual stock prices
          var stockPrice;
          console.log(symbol);

          fetch(url + symbol + url2 + apiKey)
            .then(res => res.json())
            .then(json => {
              // Assigns response to a variable so that we could access multiple data fields from JSON response
              var stockData = json;
              var timeSeries15 = stockData["Time Series (1min)"];
              var currentDateData = Object.keys(timeSeries15)[0];
              stockPrice = timeSeries15[currentDateData]["4. close"];
              var timeZone = stockData["Meta Data"]["6. Time Zone"]
              console.log(stockPrice);
              console.log(currentDateData + " " + timeZone)
          
            })
            console.log(stockPrice)
        // currentPrice = 4;
      
        /*db.none('INSERT INTO stock_purchase(stock_symbol, purchase_price_each) values($1, $2)',[symbol, stockPrice]).then(function(){
      
          db.any('SELECT * FROM stocks').then(function(data){
            // res.render(page to render, object to pass to the page)
            res.render('stocks', {'stocks' : data});
          })
            
        })*/
      })();

    }
    update_stock_price()
  })


module.exports = router;