// import { TIMEOUT } from 'dns';

// ### Dependencies ###
var express = require('express');
var app = express();
var promise = require('bluebird');
var bodyParser = require('body-parser');
var pgp = require('pg-promise')(options);

var connectionString = 'postgres://localhost:5432/stocks';
var db = pgp(connectionString);


var options = {
  promiseLib : promise
}

// Sets ejs to view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// ### Routes ###
app.use(require("./routes/index"));
app.use(require("./routes/stocks"));

//app.use(require("./routes/stocks"));
app.use(bodyParser.urlencoded({extended :false}));

//public folder
app.use(express.static('./public'));

var port = 3000;

var myStock = require('./util/updateStockPrices.js');

var server = app.listen(port, function(){
    console.log('Example app listening on port ' + port);
    setInterval(myStock.updateBatchStocks, 24000); // Loops through JSON file to fill all current stock prices from API. Accesses API every 24 seconds. Loops through all 3300 stocks in about 13 minutes.
});
