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
    var total = {
        users: {
           name: 2500, per: 4
        } ,
        time:  {
            name: 123.50, per: 3
        }
    }
    var msg = {
        title: config.header,
        userid: 'admin',
        tables: arrays,
        menu: 'home'
    };
    res.render('index', msg);
});

module.exports = router;
