
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ripple_payments', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    hash: {
      type: DataTypes.STRING
    },
    source_account: {
      type: DataTypes.STRING
    },
    source_tag: {
      type: DataTypes.STRING
    },
    source_amount_value: {
      type: DataTypes.STRING
    },
    source_amount_currency: {
      type: DataTypes.STRING
    },
    source_amount_issuer: {
      type: DataTypes.STRING
    },
    source_slippage: {
      type: DataTypes.STRING
    },
    destination_amount_value: {
      type: DataTypes.STRING
    },
    destination_amount_currency: {
      type: DataTypes.STRING
    },
    destination_amount_issuer: {
      type: DataTypes.STRING
    },
    destination_tag: {
      type: DataTypes.STRING
    },
    // JSON
    destination_amount: {
      type: DataTypes.TEXT
    },
    invoice_id: {
      type: DataTypes.STRING
    },
    // JSON
    paths: {
      type: DataTypes.TEXT
    },
    no_direct_ripple: {
      type: DataTypes.BOOLEAN
    },
    partial_payment: {
      type: DataTypes.BOOLEAN
    },
    direction: {
      type: DataTypes.STRING
    },
    result: {
      type: DataTypes.STRING
    },
    timestamp: {
      type: DataTypes.DATE
    },
    fee: {
      type: DataTypes.STRING
    },
    // JSON
    source_balances_changes: {
      type: DataTypes.TEXT
    },
    // JSON
    destination_balance_changes: {
      type: DataTypes.TEXT
    },
    // JSON
    destination_amount_submitted: {
      type: DataTypes.TEXT
    },
    // JSON
    source_amount_submitted: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'ripple_payments',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    getterMethods: {
      paths: function () {
        try {
          return JSON.parse(this.getDataValue('paths'));
        } catch(e) {
          return this.getDataValue('paths');
        }
      },
      source_balances_changes: function () {
        try {
          return JSON.parse(this.getDataValue('source_balances_changes'));
        } catch(e) {
          return this.getDataValue('source_balances_changes');
        }
      },
      destination_balance_changes: function () {
        try {
          return JSON.parse(this.getDataValue('destination_balance_changes'));
        } catch(e) {
          return this.getDataValue('destination_balance_changes');
        }
      },
      destination_amount_submitted: function () {
        try {
          return JSON.parse(this.getDataValue('destination_amount_submitted'));
        } catch(e) {
          return this.getDataValue('destination_amount_submitted');
        }
      },
      source_amount_submitted: function () {
        try {
          return JSON.parse(this.getDataValue('source_amount_submitted'));
        } catch(e) {
          return this.getDataValue('source_amount_submitted');
        }
      }
    },
    setterMethods: {
      paths: function (value) {
        this.setDataValue('paths', JSON.stringify(value));
      },
      source_balances_changes: function (value) {
        this.setDataValue('source_balances_changes', JSON.stringify(value));
      },
      destination_balance_changes: function (value) {
        this.setDataValue('destination_balance_changes', JSON.stringify(value));
      },
      destination_amount_submitted: function (value) {
        this.setDataValue('destination_amount_submitted', JSON.stringify(value));
      },
      source_amount_submitted: function (value) {
        this.setDataValue('source_amount_submitted', JSON.stringify(value));
      }
    }
  });
};
