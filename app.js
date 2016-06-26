var express = require('express');
var bodyParser = require('body-parser');

var createItems = require('./routes/createItems');
var allItems = require('./routes/getAllItems');
var oneItem = require('./routes/getOneItem');
var deleteItem = require('./routes/deleteItem');
var insertItem = require('./routes/insertItem');
var updataItem = require('./routes/updataItem');

var app = express();

app.use(bodyParser.json());

app.use('/', allItems);
app.use('/', oneItem);
app.use('/', deleteItem);
app.use('/', insertItem);
app.use('/', updataItem);

app.listen(3000,function(){
  console.log("server start");
});

module.exports = app;
