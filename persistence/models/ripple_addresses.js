const bookshelf = require(__dirname + '/../');

module.exports = bookshelf.Model.extend({
  tableName: 'ripple_addresses'
});
