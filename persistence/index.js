var Sequelize  = require('sequelize');
var requireAll = require('require-all-to-camel');
var models     = requireAll(__dirname + '/models');
var config     = require(__dirname + '/../config/config.js');

const database = config.get('database:database');
const username = config.get('database:username');
const password = config.get('database:password');
const dialect  = config.get('database:dialect');
const host     = config.get('database:host');
const port     = config.get('database:port');

var sequelize = new Sequelize(database, username, password, {
  dialect: dialect,
  host: host,
  port: port
});

// Add Model declarations here
sequelize.models.ripplePayments = sequelize.import(__dirname + '/models/ripple_payments');
sequelize.models.rippleAddresses = sequelize.import(__dirname + '/models/ripple_addresses');

module.exports = sequelize;