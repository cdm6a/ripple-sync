var winston = require('winston');
var config  = require(__dirname + '/config/config.js');

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level: 'info',
      colorize: true,
      timestamp: true
    })
  ]
});

if (config.get('NODE_ENV') !== 'dev') {
  logger.add(winston.transports.DailyRotateFile, {
    filename: __dirname + '/logs/ripple_connect.log',
    level: 'warn',
    datePattern: '.yyyy-MM-dd',
    colorize: true,
    timestamp: true
  })
}

module.exports = logger;
