var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var wiki = mongoose.model('Wiki');
var interface = require('../model/dbLayer');

function isDbRunning() {
    if (typeof global.mongo_error !== "undefined") {
        res.status(500);
        res.end("Error: " + global.mongo_error + " To see any data here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
        return false;
    }
    return true;
}

router.get('/wiki', function (req, res) {
    if (!isDbRunning()) {
        return;
    }
    interface.getWiki(function (err, wikis) {
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(wikis));
    });
});

router.get('/findWiki/:searchString', function (req, res) {
    if (!isDbRunning()) {
        return;
    }
    var searchStr = req.params.searchString;
    interface.findWiki(searchStr.toLowerCase(), function (err,search) {
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(search));
    });
});

router.get('/getCategories', function (req, res) {
    if (!isDbRunning()) {
        return;
    }
    interface.getCategories(function (err, data) {
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(data));
    });
});

router.get('/getWikiCategories/:category', function (req, res) {
    if(!isDbRunning()){
        return;
    }
    var category = req.params.category;
    interface.getWikisWithCategory(category, function(err, wikis){
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(wikis))
    });
});

module.exports = router;
