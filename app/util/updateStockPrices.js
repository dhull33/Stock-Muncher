var express = require("express");
var router = express.Router();
var promise = require('bluebird');
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/stocks';
var db = pgp(connectionString);
var fetch = require('node-fetch');
var stockFile = require("../public/scripts/data/stock_symbols.json"); // brings in list of stock symbols and names from json file

var stockIndex = 0; // used to loop through all stocks in JSON file since API Batch Stock limit is 100 at a time
var stockFileCount = stockFile.length - 1;

var options = {
    promiseLib : promise
}

// console.log(stockFile[0]["Symbol"]);

exports.updateBatchStocks = (function() {
    console.log("Submitted");
    console.log(stockIndex);
    if (stockIndex + 100 >= stockFileCount) {
        stockIndex = 0;
    }
    else {
        stockIndex += 100;
    } // Loops through all stocks in JSON file 100 at a time and starts over when it reaches the end
    var url = "https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=";
    var symbol = stockFile[stockIndex]["Symbol"];
    for (var i = stockIndex + 1; i <= Math.min(stockIndex + 99, stockFileCount) ; i++) {
        symbol += ", " + stockFile[i]["Symbol"];
    }
    // console.log(symbol);

    var url2 = "&apikey=";
    var apiKey = "3SW8F3VSYVSP0VAZ";
    var userId = "Testing";
    // Retreives stock batch prices

    var currentdate = new Date(); 
    var datetime = currentdate.getFullYear() + "/"
            + (currentdate.getMonth()+1)  + "/"
            + currentdate.getDate() + " "
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();
    // console.log(datetime);  // Shows current date

    // runs api
    fetch(url + symbol + url2 + apiKey)
        .then(res => res.json())
        .then(json => {
        // Assigns response to a variable so that we could access multiple data fields from JSON response
        // if (stockIndex + 100 >= stockFileCount) {
        //     stockIndex = 0;
        // }
        // else {
        //     stockIndex += 100;
        // }

        var stockData = json;
        var stockDataLength = stockData["Stock Quotes"].length;
        for (var i = 0; i < stockDataLength; i++) {
            var stockName = stockFile[stockIndex + i]["Name"];
            var sectorName = stockFile[stockIndex + i]["Sector"];
            
            var stockSymbol = (stockData["Stock Quotes"][i]["1. symbol"]);
            var stockPrice = (stockData["Stock Quotes"][i]["2. price"]);
            var stockVolume = (stockData["Stock Quotes"][i]["3. volume"]);
            if (stockVolume === "--") {
                stockVolume = 0; // To prevent errors from stocks without a volume
            }
            var stockPriceDate = (stockData["Stock Quotes"][i]["4. timestamp"]); // date stock was last traded at price (Eastern time)

            // Inserts new stocks that do not exist into the database
            db.none('INSERT INTO stocks(stock_symbol, current_price, price_update_date, current_volume, stock_price_date, stock_name, sector) values($1, $2, $3, $4, $5, $6, $7)',[stockSymbol, stockPrice, datetime, stockVolume, stockPriceDate, stockName, sectorName]).catch(function(){
                
            });

            // Updates existing stocks into the database
            db.any('UPDATE stocks SET current_price = $1, price_update_date = $2, current_volume = $3, stock_price_date = $4 WHERE stock_symbol = $5', [stockPrice, datetime, stockVolume, stockPriceDate, stockSymbol]).catch(function(err){
                console.log(err);
            });
            
        }
        
        
    }) 
});
