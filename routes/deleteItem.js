var express = require('express');
var fs = require('fs');

var router = express.Router();

router.delete('/items/:id', function (req, res) {
    fs.readFile('items.json', 'utf-8', function (err, data) {
        if (err) {
            res.status(500).send('');

            return;
        }
        var products = JSON.parse(data);
        var items = returnItems(products, req);

        if(IsRight(products, items)){
            res.status(204).send('');

            return;
        }

        res.status(404).send('');
    });
});

function returnItems(products, req){
    var items = [];

    for (var i = 0; i < products.items.length; i++) {

        if (products.items[i].id != parseInt(req.params.id)) {

            items.push(products.items[i]);
        }
    }

    return items;
}

function IsRight(products, items){
    if (items.length < products.items.length) {
        fs.writeFile('items.json', JSON.stringify({"nextIndex": products.nextIndex, "items": items}), function (err) {
        });

        return true;
    }

    return false;
}

module.exports = router;
