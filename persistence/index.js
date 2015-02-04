var config     = require(__dirname + '/../config/config.js');

const client  = config.get('database:client');
const host     = config.get('database:host');
const user     = config.get('database:user');
const password = config.get('database:password');
const database   = config.get('database:database');

var knex = require('knex')({
  client: client,
  connection: {
    host     : host,
    user     : user,
    password : password,
    database : database
  }
});

var bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;