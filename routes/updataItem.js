var express = require('express');
var fs = require('fs');

var router = express.Router();

router.put('/items/:id', function (req, res) {
    fs.readFile('items.json', 'utf-8', function (err, data) {
        if (err) {
            res.status(500).send('');

            return;
        }
        if (isNull(data)) {
            res.status(404).json();

            return;
        }
        var products = updataProducts(req, res, data);

        fs.writeFile('items.json', JSON.stringify(products), function (err) {
        });

    });
});

function findItem(req, res, item){

    if (item.id === parseInt(req.params.id)) {
        item.barcode = req.body.barcode;
        item.name = req.body.name;
        item.unit = req.body.unit;
        item.price = req.body.price;

        res.status(200).json(item);
    }

    return item;
}

function updataProducts(req, res, data) {
    var products = JSON.parse(data);

    for (var i = 0; i < products.items.length; i++) {
       products.items[i] = findItem(req, res, products.items[i]);
    }
    if (i >= products.items.length) {
        res.status(404).json();
    }

    return products;
}

function isNull(products) {
    if (products === '') {
        return true;
    }
    return false;
}

module.exports = router;