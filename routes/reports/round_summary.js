/*
 * GET home page.
 */
var express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    var session = req.session;
    if(!session.name) res.redirect('/login');

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
        title: '에이전트 회차 결과/수익/손실',
        crashRates: crashRates,
        riskPer: riskPer,
        menu: 'round_summary'
    };

    res.render('reports/round_summary', msg);
});

module.exports = router;
