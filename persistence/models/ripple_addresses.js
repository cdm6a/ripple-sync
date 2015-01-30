
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ripple_addresses', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    address: {
      type: DataTypes.STRING
    },
    secret: {
      type: DataTypes.STRING
    },
    last_transaction_hash: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'ripple_addresses',
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
};
