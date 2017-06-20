/*
 * GET home page.
 */
var express = require('express');
const router = express.Router();
var Agent = require('../models/agent');
var config = require('../config');

router.get('/', (req, res) => {
    var session = req.session;
    if(!session.name) res.redirect('/login');

    var arrays = [];

    var perPage = 5;
    //var page = (Math.abs(req.param('page')) || 1) - 1;
    var page = Math.max(0, req.param('page') || 1);
    
    Agent.find({}, function(err, agent) {
        
        Agent.count({}, function(err, totCnt){

            console.log(totCnt);

            var crashRates = {
                site_agent: 'xyz1',
                userid: 'kyy1',
                rate: '30'
            };
            var riskPer = {
                site_agent: 'xyz1',
                userid: 'kyy2',
                rate: '15'
            }

            var msg = {
                title: config.header,
                tables: agent,
                crashRates: crashRates,
                riskPer: riskPer,
                page: page,
                totCnt: totCnt,
                perPage: perPage,
                menu: 'inputs'
            };

            res.render('input', msg);
            
        });


        
    }).limit(perPage).skip(perPage * page);
   
});

module.exports = router;
