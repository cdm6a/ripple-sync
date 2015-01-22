var nconf          = require('nconf');
var databaseConfig = require(__dirname + '/../persistence/database.json');

//
// Setup nconf to use (in-order):
//   1. Command-line arguments
//   2. Environment variables
//   3. A file located at './config.json'
//
nconf.argv()
     .env()
     .file({ file: __dirname + '/config.json' });

//
// Setup NODE_ENV specific database variables
//
nconf.set('database:host', databaseConfig[nconf.get('NODE_ENV')].host);
nconf.set('database:port', databaseConfig[nconf.get('NODE_ENV')].port);
nconf.set('database:dialect', databaseConfig[nconf.get('NODE_ENV')].dialect);
nconf.set('database:username', databaseConfig[nconf.get('NODE_ENV')].username);
nconf.set('database:password', databaseConfig[nconf.get('NODE_ENV')].password);
nconf.set('database:database', databaseConfig[nconf.get('NODE_ENV')].database);

module.exports = nconf;