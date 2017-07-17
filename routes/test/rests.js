/*
 * GET home page.
 */
var express = require('express');
var Rx = require('rxjs/Rx');
const uuidv1 = require('uuid/v1');
var Hashids = require('hashids');

module.exports = function (app, Agent) {
    app.post('/reg_agent', (req, res) => {

        const dataList = new Rx.Subject();
        // 데이터 string to json
        dataList
            .filter((f) => {
                return f[0].site_agent != '';
            })
            .subscribe((x) => {
                var agent = new Agent();
                var hashids = new Hashids();
                var idx = 1;
                for(var item in x) {
                    agent = new Agent();
                    var hashids = new Hashids();
                    agent.site_agent = hashids.encode(idx) + '_' 
                    +uuidv1();
                    idx++;
                    agent.referer = req.header('Referer');
                    agent.use_yn = item.use_yn;
                    agent.published_date = new Date();
                    
                    agent.save(function (err) {
                        if (err) {
                            console.error(err);
                            res.json({result: 'fail'});
                            return;
                        }
                        console.log("success");
                    });
                }
                res.json({result: 'success' });
            });

        dataList.next(JSON.parse(req.body.msg));

    });

    app.post('/edit_agent', (req, res) => {
        Agent.update({
            site_agent: req.query.site_agent
        }, {
            $set: req.body
        }, function (err, output) {
            if (err) res.status(500).json({
                error: 'database failure'
            });
            console.log(output);
            if (!output.n) return res.status(404).json({
                error: 'book not found'
            });
            res.json({
                message: 'book updated'
            });
        })
        /* [ ANOTHER WAY TO UPDATE THE BOOK ]
                Book.findById(req.params.book_id, function(err, book){
                if(err) return res.status(500).json({ error: 'database failure' });
                if(!book) return res.status(404).json({ error: 'book not found' });
                if(req.body.title) book.title = req.body.title;
                if(req.body.author) book.author = req.body.author;
                if(req.body.published_date) book.published_date = req.body.published_date;
                book.save(function(err){
                    if(err) res.status(500).json({error: 'failed to update'});
                    res.json({message: 'book updated'});
                });
            });
        */

    });

    app.post('/remove_agent', (req, res) => {
        Agent.remove({
            site_agent: req.query.site_agent
        }, function (err, output) {
            if (err) return res.status(500).json({
                error: "database failure"
            });

            /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
            if(!output.result.n) return res.status(404).json({ error: "book not found" });
            res.json({ message: "book deleted" });
            */

            res.status(204).end();
        })

    });
}
