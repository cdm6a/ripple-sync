var express    = require('express');
var bodyParser = require('body-parser');
var router     = require(__dirname + '/router.js');

var app = express();
app.use(bodyParser.json());

app.use('/', router);

module.exports = app;