var express = require("express");
var router = express.Router();
var promise = require('bluebird');
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/stocks';
var db = pgp(connectionString);
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended :false}));
var $ = require("jquery");
var fetch = require('node-fetch');

// const cheerio = require('cheerio');
// const $ = cheerio;

var options = {
    promiseLib : promise
}

router.get('/stocks',function(req,res){

    // fetch artists from the database
    db.any('SELECT * FROM stocks').then(function(data){
      // res.render(page to render, object to pass to the page)
      res.render('stocks',{'stocks' : data});
    })
  })

router.post('/stocks',function(req,res){
    // Picked up by form name from add_to_database.ejs file
    function update_stock_price() {
      (function() {
          console.log("Submitted")
          var url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="
          var symbol = req.body.stock_symbol;
          var url2 = "&interval=15min&apikey="
          var apiKey = "3SW8F3VSYVSP0VAZ";
          // Retreives individual stock prices
          console.log(symbol);
          
          fetch(url + symbol + url2 + apiKey)
            .then(res => {
              var response = res.json();
              console.log(response["Time Series (15min)"]["2018-04-16 14:30:00"])
            }) 
            // .then(json => console.log(json["Time Series (15min)"]["2018-04-16 14:30:00"]))
            //.then(json => console.log(json["Meta Data"]["6. Time Zone"]))
            // .then(body => console.log(body["Time Series (15min)"]["2018-04-16 14:30:00"]));

            // var timeSeries15 = response["Time Series (15min)"];
            // console.log(timeSeries15);
            // var currentDateData = Object.keys(timeSeries15)[0];
            // console.log(currentDateData);
            // var timeZone = response["Meta Data"]["6. Time Zone"]
            // console.log(timeSeries15[currentDateData]);
            // console.log(currentDateData)
            // var stockPrice = timeSeries15[currentDateData]["4. close"];
            // $("#price").html(stockPrice);
            // $("#currentDate").html(currentDateData + " " + timeZone);
            
          // catch(err) {
          //   console.log("Error");
            
          // }
          
        
        // json
          // $.get(url + symbol + url2 + apiKey).done(function(response) {
          //     console.log("Success");
          //     alert("Success")
          //     updateUISuccess(response);
          // }).fail(function(error) {
          //     console.log("Failed");
          //     alert("Failed");
          //     updateUIError();
          // })
  
          // // handle success
          // function updateUISuccess(response) {
          //     console.log(response);
          //     var timeSeries15 = response["Time Series (15min)"];
          //     var currentDateData = Object.keys(timeSeries15)[0];
          //     var timeZone = response["Meta Data"]["6. Time Zone"]
          //     console.log(timeSeries15[currentDateData]);
          //     console.log(currentDateData)
          //     var stockPrice = timeSeries15[currentDateData]["4. close"];
          //     $("#price").html(stockPrice);
          //     $("#currentDate").html(currentDateData + " " + timeZone);
          // }
  
          // // handle error
          // function updateUIError() {
          //     console.log("Fail");
          // }
  
      })();

      // let stockName = symbol;
      // let currentPrice = stockPrice;
      // // currentPrice = 4;
    
      // db.none('INSERT INTO stocks(stock_symbol, current_price) values($1, $2)',[stockName, currentPrice]).then(function(){
    
        // db.any('SELECT * FROM stocks').then(function(data){
        //   // res.render(page to render, object to pass to the page)
        //   res.render('stocks', {'stocks' : data});
        // })
    
      // })// end of 'then' promise
    }
    update_stock_price()
  })


module.exports = router;