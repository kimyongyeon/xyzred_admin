/*
 * GET home page.
 */
var express = require('express');
const router = express.Router();
var Agent = require('../models/agent');

router.get('/', (req, res) => {
    var arrays = [];

    var perPage = 5;
    //var page = (Math.abs(req.param('page')) || 1) - 1;
    var page = Math.max(0, req.param('page'));
    
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
                title: 'xyzred.com 슈퍼 관리자',
                tables: agent,
                crashRates: crashRates,
                riskPer: riskPer,
                page: page,
                totCnt: totCnt,
                perPage: perPage
            };

            res.render('input', msg);
            
        });


        
    }).limit(perPage).skip(perPage * page);
   
});

module.exports = router;
