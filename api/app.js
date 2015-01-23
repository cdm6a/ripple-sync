var express        = require('express');
var bodyParser     = require('body-parser');
var resourceRouter = require(__dirname + '/routers/resources_router.js');

var app = express();
app.use(bodyParser.json());

app.use('/', resourceRouter);

module.exports = app;