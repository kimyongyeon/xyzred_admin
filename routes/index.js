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
            firstName: "firstName_" + index,
            lastName: "lastName_" + index,
            userName: "userName_" + index
        });
        index++;

    };
    var msg = {
        title: 'Pug 연습.',
        tables: arrays
    };
    res.render('index', msg);
});

module.exports = router;