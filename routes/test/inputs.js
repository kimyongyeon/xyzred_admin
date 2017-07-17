/*
 * GET home page.
 */
var express = require('express');
var Agent = require('../../models/agent');
var config = require('../../config');

module.exports = function (app, client) {

    console.log("agent................");

    app.get('/inputs', (req, res) => {
        // var session = req.session;
        // if(!session.name) res.redirect('/login');

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
            crashRates: crashRates,
            riskPer: riskPer,
            menu: 'inputs'
        };

        res.render('input', msg);
    });

    app.get('/inputs/page', (req, res) => {
        var session = req.session;
        if(!session.name) res.redirect('/login');
        var results = [];
        var perPage = 5;
        var page = Math.max(0, req.param('page') || 1);
        currentPage = (page - 1) * 5; // postres 특정상 0부터 조회 해야 첫번째부터 가져옴!
        const query = client.query(`select * from agents limit ${perPage} offset ${currentPage}`);
        query.on('row', (row) => { results.push(row) });
        query.on('end', () => {
            console.log(results);
        });
        
        Agent.find({}, function(err, agent) {
            
            Agent.count({}, function(err, totCnt){

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
                    tables: results,
                    crashRates: crashRates,
                    riskPer: riskPer,
                    page: page,
                    totCnt: totCnt,
                    perPage: perPage,
                    menu: 'inputs'
                };

                res.json(msg);
                
            });
            
        }).limit(perPage).skip(perPage * page);
    });

    // 에이전트 등록 
    app.put('/inputs/reg', (req, res) => {
        console.log(req.body);
        var _id = req.body._id;
        var agent = req.body.agent;
        var referer = req.body.referer;

        client.query('INSERT INTO agents(referer, agent_id, use_yn) values($1, $2, $3)', [referer, agent, 'Y']);
        const query = client.query('SELECT * FROM agents ORDER BY key desc');
        var results = [];
        query.on('row', (row) => { 
            console.log("agents query => ",row) ;
            results.push(row);
        });
        query.on('end', () => {
            return res.json(results);
        });
    });
    // 에이전트 수정 
    app.put('/inputs/edit', (req, res) => {
        console.log(req.body);
        var _id = req.body._id;
        var agent = req.body.agent;
        var referer = req.body.referer;

        res.json({msg:'edit=>success'});
    });
    // 에이전트 삭제 
    app.delete('/inputs/remove', (req, res) => {
        console.log(req.body);
        var _id = req.body._id;
        var agent = req.body.agent;
        var referer = req.body.referer;

        res.json({msg:'remove=>success'});
    });
    // 크래쉬 등록 및 수정 [redis]
    app.put('/inputs/serverSend', (req, res) => {
    });
    
};
