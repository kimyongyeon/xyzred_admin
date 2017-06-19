/*
 * GET home page.
 */
var express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    var arrays = [];
    var index = 1;
    for (var i = 0; i < 5; i++) {
        arrays.push({
            index: index,
            site_agent: "에이전트_" + index,
            user_id: "아이디_" + index,
            rate: index*10,
            use_yn: "Y"
        });
        index++;

    };
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
        title: 'Kostabit 슈퍼 관리자',
        tables: arrays,
        crashRates: crashRates,
        riskPer: riskPer
    };

    res.render('input', msg);
});

module.exports = router;
