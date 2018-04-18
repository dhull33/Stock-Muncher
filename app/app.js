
// ### Dependencies ###
var express = require('express');
var app = express();
var promise = require('bluebird');
var bodyParser = require('body-parser');
var pgp = require('pg-promise')(options);

//var connectionString = 'postgres://david:dhull33@localhost:5432/beatthemarket';
//var db = pgp(connectionString);

// ### Set Up and Test Sequelize ###
// var  Sequelize= require('sequelize');
/*var sequelize = new Sequelize('postgres://david:dhull33@localhost:5432/beatthemarket');

sequelize.authenticate()  .then(() => {
    console.log('Connection has been established successfully.');
})
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    }); */

var options = {
  promiseLib : promise
}

// Sets ejs to view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// ### Routes ###
app.use(require("./routes/index"));

//app.use(require("./routes/stocks"));
app.use(bodyParser.urlencoded({extended :false}));

//public folder
app.use(express.static('./public'));

var port = 3000;

var server = app.listen(port, function(){
    console.log('Example app listening on port ' + port);
});