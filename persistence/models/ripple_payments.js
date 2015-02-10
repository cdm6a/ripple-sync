var _    = require('lodash');
var bookshelf = require(__dirname + '/../');

module.exports = bookshelf.Model.extend({
  tableName: 'ripple_payments',
  format: function(attrs) {
    return _.reduce(attrs, function (memo, val, key) {
      if (key === 'paths' || key === 'source_balance_changes' || key === 'destination_balance_changes') {
        memo[key] = JSON.stringify(val);
      } else {
        memo[key] = val;
      }
      return memo;
    }, {});
  },
  parse: function(attrs) {
    return _.reduce(attrs, function (memo, val, key) {
      if (key === 'paths' || key === 'source_balance_changes' || key === 'destination_balance_changes') {
        memo[key] = JSON.parse(val);
      } else {
        memo[key] = val;
      }
      return memo;
    }, {});
  },
  hasTimestamps: true
});
