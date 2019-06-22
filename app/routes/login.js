var express = require("express");
var router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");
const bcrypt = require("bcryptjs");
var pgStore = require("connect-pg-simple");
const promise = require("bluebird");
const config = {
  host: "localhost",
  port: 5432,
  database: "stocks",
  user: "postgres"
};
const initOptions = {
  promiseLib: promise
};
// Load and initialize pg-promise:
const pgp = require("pg-promise")(initOptions);
// Create the database instance:
const db = pgp(config);

router.use(cookieParser());

router.use(
  session({
    secret: "mySecretSessionKey",
    resave: true,
    saveUninitialized: true,
    store: new (require("connect-pg-simple")(session))({ conObject: config }),
    cookie: { maxAge: 300000 }
  })
);
router.use(passport.initialize());
router.use(passport.session());

router.get("/login", function(req, res) {
  console.log(req.user);
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/userPage",
    failureRedirect: "/login",
    session: false,
    failureFlash: true
  })
);

passport.use(
  new LocalStrategy((username, password, done) => {
    db.any("SELECT * FROM users WHERE username=$1", [username]).then(
      results => {
        if (results != null) {
          const data = results[0];
          console.log(data)
          bcrypt.compare(password, data.password, function(err, res) {
            if (res) {
              console.log("Hello world");
              console.log(data);
              done(null, { id: data.id, username: data.username });
            } else {
              console.log("Returned nothing");
              done(null, false);
            }
          });
        } else {
          console.log("just out there");
          done(null, false);
        }

        //done(null, data[0])

        //console.log(username)
      } //end of callback
    ); //end of then promise
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.one("SELECT id, username FROM users WHERE id = $1", [
    parseInt(id, 10)
  ]).then(
    data => {
      done(null, data);
    } //end of callback
  ); //end of promise
});

module.exports = router;
