/*
 * GET home page.
 */
var express = require('express');
const router = express.Router();
var Agent = require('../models/agent');

router.get('/', (req, res) => {
    sess = req.session;
    if(sess.userid){
        req.session.destroy(function(err){
            if(err){
                console.log(err);
            }else{
                res.redirect('/');
            }
        })
    }else{
        res.redirect('/');
    }
});

module.exports = router;
