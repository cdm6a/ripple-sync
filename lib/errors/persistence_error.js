function PersistenceError(message) {
  this.name = 'PersistenceError';
  this.message = message;
  this.stack = (new Error()).stack;
}
PersistenceError.prototype = new Error;

module.exports = PersistenceError;