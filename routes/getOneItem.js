var express = require('express');
var fs = require('fs');

var router = express.Router();

router.get('/items/:id', function (req, res) {
    fs.readFile('items.json', 'utf-8', function (err, data) {
        if (err) {
            res.status(500).send('');

            return;
        }
        var item = returnItem(data, req, res);

        res.status(200).json(item);

    });
});

function returnItem(data, req, res) {
    var products = JSON.parse(data);

    for (var i = 0; i < products.items.length; i++) {

        if (products.items[i].id.toString() === req.params.id) {

            return products.items[i];
        }
    }
    res.status(404).send('');
}

module.exports = router;