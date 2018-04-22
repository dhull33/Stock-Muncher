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
var url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=";
var url2 = "&interval=1min&apikey=";
var apiKey = "3SW8F3VSYVSP0VAZ";



router.get('/stocks',function(req,res){
<<<<<<< HEAD
    var symbol = req.body.stockSymbolText;
    db.any('SELECT * FROM stocks').then(function(stockData) {
        res.render('stocks',{'stocks' : stockData});
    })
})

router.post('/stocks',function(req,res){
    (function() {
        console.log("Submitted")
        console.log(req.body.stock_symbol);
        var symbol = req.body.stock_symbol;
        var userId = "Testing";
        // Retreives individual stock prices
        console.log("Stock Buy Test")
        console.log(symbol);
        var currentdate = new Date();
        var datetime = currentdate.getFullYear() + "/"
            + (currentdate.getMonth()+1)  + "/"
            + currentdate.getDate() + " "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();
        console.log(datetime);
=======
  var symbol = req.body.stockSymbolText;
  db.any('SELECT * FROM stocks').then(function(stockData) {
    res.render('stocks',{'stocks' : stockData});
  })
})

router.post('/stocks',function(req,res){
  (function() {
      console.log("Submitted")
      console.log(req.body.stock_symbol);
      var symbol = req.body.stock_symbol; 
      var userId = "Testing";
      // Retreives individual stock prices
      console.log("Stock Buy Test")
      console.log(symbol);
      var currentdate = new Date(); 
      var datetime = currentdate.getFullYear() + "/"
                + (currentdate.getMonth()+1)  + "/"
                + currentdate.getDate() + " "
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
      console.log(datetime);
>>>>>>> db22f1f2fd2dbd7049d2134b48af290c386c9ea0

        fetch(url + symbol + url2 + apiKey)
            .then(res => res.json())
            .then(json => {
                // Assigns response to a variable so that we could access multiple data fields from JSON response
                var stockData = json;

                // I may changed time series from 15min to 1min which might be why its fucking up
                var timeSeries15 = stockData["Time Series (15min)"];
                var currentDateData = Object.keys(timeSeries15)[0];
                var stockPrice = timeSeries15[currentDateData]["4. close"];
                var timeZone = stockData["Meta Data"]["6. Time Zone"]
                var currentDate = currentDateData.substring(0, 10);
                console.log(currentDate);
                console.log(stockPrice);
                console.log(currentDateData + " " + timeZone)
                // .catch(err => console.error(err));

                // Insert data retrieved from API into database

                db.none('INSERT INTO stock_purchase(user_id, stock_symbol, purchase_price_each, purchase_date) values($1, $2, $3, $4)',[userId, symbol, stockPrice, datetime]).then(function(){
                    var parsedStock = {symbol: symbol, stockPrice: stockPrice}
                    res.render('stocks', {'stocks' : parsedStock});
                })


            })
    })();

});


module.exports = router;