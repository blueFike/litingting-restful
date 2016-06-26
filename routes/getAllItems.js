var express = require('express');
var fs = require('fs');

var router = express.Router();

router.get('/items', function (req, res) {
    fs.readFile('items.json', 'utf-8', function (err, data) {
        if (err) {

            res.status(500).send('');

            return;
        }
        if(data === ''){
            res.status(200).json([]);

            return;
        }
        var products = JSON.parse(data);

        res.status(200).json(products.items);

    });
});


module.exports = router;
