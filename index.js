var config = require(__dirname + '/config/config.js');
var app    = require(__dirname + '/api/app.js');
var logger = require(__dirname + '/logger.js');

var port = config.get('PORT') || 5050;

app.listen(port, function() {
  logger.info('[%s] Listening on http://localhost:%d', config.get('NODE_ENV'), port);
});