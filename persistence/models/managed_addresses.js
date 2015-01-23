
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('managed_addresses', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    address: {
      type: DataTypes.STRING
    },
    last_transaction_hash: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'managed_addresses',
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
};
