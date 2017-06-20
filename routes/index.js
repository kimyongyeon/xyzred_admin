/*
 * GET home page.
 */
var express = require('express');
const router = express.Router();
var config = require('../config');

router.get('/', (req, res) => {
    var session = req.session;
    if(!session.name) res.redirect('/login');

    var arrays = [];
    var index = 1;
    for (var i = 0; i < 5; i++) {
        arrays.push({
            index: index,
            firstName: "firstName_" + index,
            lastName: "lastName_" + index,
            userName: "userName_" + index
        });
        index++;

    };
    var msg = {
        title: config.header,
        tables: arrays,
        menu: 'home'
    };
    res.render('index', msg);
});

module.exports = router;
