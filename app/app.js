// import { TIMEOUT } from 'dns';

// ### Dependencies ###
var express = require('express');
var app = express();
var promise = require('bluebird');
var bodyParser = require('body-parser');

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

<<<<<<< HEAD
var cookieParser = require('cookie-parser');
=======
var cookieParser = require('cookie-Parser');
>>>>>>> 410811f5d9705aa18ede2cdae35cd7d7fa45de6e
var bodyParser = require('body-parser');
var session = require('express-session');
const bcrypt = require('bcryptjs');

//var connectionString = 'postgres://localhost:5432/stocks';

// var db = pgp(connectionString);

const config = {
  host: 'localhost',
  port: 5432,
  database: 'stocks',
  user: 'postgres'
};
// pg-promise initialization options:
const initOptions = {
  // Use a custom promise library, instead of the default ES6 Promise:
  promiseLib: promise,
};
// Load and initialize pg-promise:
const pgp = require('pg-promise')(initOptions);
// Create the database instance:
const db = pgp(config);




app.use(require("./routes/index"));
app.use(require("./routes/stocks"));
app.use(require("./routes/stocklist"));
<<<<<<< HEAD
//app.use(require("./routes/stock_list"));
=======
//app.use(require("./routes/stock_list"));
>>>>>>> 410811f5d9705aa18ede2cdae35cd7d7fa45de6e
app.use(require("./routes/api"))
app.use(require("./routes/login"))
app.use(require("./routes/signup"))
app.use(require("./routes/userPage"))
app.use(require('./routes/logout'))

app.set('view engine', 'ejs');
app.set('views', 'views');


//app.use(require("./routes/stocks"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('./public'));


app.use(passport.initialize());
app.use(passport.session());


var port = 3000;

var myStock = require('./util/updateStockPrices.js');

var server = app.listen(port, function(){
    console.log('Example app listening on port ' + port);
    setInterval(myStock.updateBatchStocks, 24000); // Loops through JSON file to fill all current stock prices from API. Accesses API every 24 seconds. Loops through all 3300 stocks in about 13 minutes.
});
