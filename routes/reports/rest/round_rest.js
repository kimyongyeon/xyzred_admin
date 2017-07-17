/*
 * GET home page.
 */
var express = require('express');
module.exports = function (app, client) {

    app.get('/round_rest/searchList', (req, res) => {
        // var session = req.session;
        // if(!session.name) res.redirect('/login');

        var date = req.param('searchName').split(",");
        var startDate = date[0];
        var endDate = date[1];
        var results = [];
        var q = "select game_id, sum(bet)/100 as bet,  sum(cash_out)/100 as cash_out,";
        q += "sum(bonus)/100 as bonus, count(*) as cnt from plays where  created > ";
        q += "'" + startDate + " 00:00:00' and ";
        q += "created <= '" + endDate + " 23:59:59' group by game_id order by game_id desc";
        const query = client.query(q);
        console.log(query);
        query.on('row', (row) => { results.push(row) });
        query.on('end', () => {
            res.json(results);
        });
    });

};
