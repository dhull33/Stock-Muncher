var express = require("express");
var router = express.Router();
var promise = require('bluebird');
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/stocks';
var db = pgp(connectionString);
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended :false}));

var options = {
    promiseLib : promise
}

router.get('/stocks',function(req,res){

    // fetch artists from the database
    db.any('SELECT * FROM stocks').then(function(data){
      // res.render(page to render, object to pass to the page)
      res.render('stocks',{'artists' : data});
    })
  })

router.post('/stocks',function(req,res){
    // Picked up by form name from add_to_database.ejs file
    let artistName = req.body.artist_name;
  
    db.none('INSERT INTO artists(artist_name) values($1)',[artistName]).then(function(){
  
      db.any('SELECT * FROM artists').then(function(data){
        // res.render(page to render, object to pass to the page)
        res.render('artists', {'artists' : data});
      })
  
    })// end of 'then' promise
  
  })

module.exports = router;