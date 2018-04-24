var express = require("express");
var router = express.Router();
var promise = require('bluebird');
var bcrypt = require('bcryptjs')

var options = {
    promiseLib : promise
}
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/stocks';
//might need to change database name in order to merge
var db = pgp(connectionString);
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended :false}));
var albumData;





router.get('/signup', function (req, res){
    db.any('SELECT * FROM users').then(function(data){
    res.render('signup');})
})

router.post('/signup', function(req, res){
    let username = req.body.username
    let password = bcrypt.hashSync(req.body.password,8);
    let email = req.body.email
    

    db.none('INSERT INTO users(username, password, email) values($1, $2, $3)', [username, password, email]).then(function(result){
        res.redirect('/login');

        // db.any('SELECT * FROM users').then(function(data){
        //     // res.render(page to render, object to pass to the page)
        //     res.render('signup', {'signup' : data})
            
            
    })
    
})

// })

module.exports = router;