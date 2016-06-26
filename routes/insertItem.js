var express = require('express');
var fs = require('fs');

var router = express.Router();

router.post('/item', function (req, res) {
    fs.readFile('items.json', 'utf-8', function (err, data) {
        if (err) {
            res.status(500).send('');

            return;
        }

        if (isNull(data)) {
            res.status(201).json();

            return;
        }
        var products = JSON.parse(data);

        if (isExist(req.body)) {
            var product = returnProducts(products, req.body);

            writeFile(res, product);

            return;
        }

        res.status(400).json();
    });
});

function returnProducts(products, item) {
    products.items.push({
        id: products.nextIndex,
        barcode: item.barcode,
        name: item.name,
        unit: item.unit,
        price: item.price
    });
    products.nextIndex++;

    return products;
}

function isExist(item) {
    if (typeof(item.barcode) === 'string' && typeof (item.name) === 'string' && typeof(item.unit) === 'string' && typeof(item.price) === 'number'){
        return true;
    }
    return false;
}

function writeFile(res, products) {
    fs.writeFile('items.json', JSON.stringify(products), function (err) {
    });

    res.status(201).json(products.items[products.items.length - 1]);
}

function isNull(products) {
    if (products === '') {
        fs.writeFile('items.json', JSON.stringify({"nextIndex": 1, "items": []}), function (err) {
        });
        return true;
    }

    return false;
}

module.exports = router;