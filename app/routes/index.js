var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {

    res.render("index", {
        pageTitle: 'Stock Muncher',
        pageID: "main"
    });
});

module.exports = router;