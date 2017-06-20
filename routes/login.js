/*
 * GET home page.
 */
var express = require('express');
const router = express.Router();
var Agent = require('../models/agent');

router.get('/', (req, res) => {
    var msg = {
        userid: 'admin',
        password: '1234',
        menu: 'login'
    }
    res.render('login', msg);
});

var users = {
    "admin": {
        "password": "1234",
        "name": "adminstrator"
    }
}

router.post('/', (req, res) => {
    var sess = req.session;
    var userid = req.body.userid;
    var password = req.body.password;

    var result = {};
    if(!users[userid]){
        // USERNAME NOT FOUND
        result["success"] = 0;
        result["error"] = "not found";
        // res.json(result);
        res.redirect('/');
        return;
    }     

    if(users[userid]["password"] == password){
        result["success"] = 1;
        sess.userid = userid;
        sess.name = users[userid]["name"];
        res.redirect('/');

    }else{
        result["success"] = 0;
        result["error"] = "incorrect";
        res.redirect('/login');
    }

});

module.exports = router;
