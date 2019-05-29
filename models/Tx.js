const Sequelize = require('sequelize');
const sequelize = require('./index');
const Stores = require('./Stores');
const Products = require('./Products');
const Tx = sequelize.define('transactions',{
    transaction_id:{ type: Sequelize.INTEGER(11), allownull: false, autoIncrement: true, primaryKey: true},
    store_id:{ type: Sequelize.INTEGER(11), allownull: false, },
    product_id:{ type: Sequelize.INTEGER(11), allownull: false, },
    product_quantity:{ type: Sequelize.INTEGER(11).UNSIGNED, allownull: false, },
    total_amount:{ type: Sequelize.FLOAT(10,2).UNSIGNED, allownull: false, }    
})

Products.hasMany(Tx, {foreignKey: 'product_id'});
Stores.hasMany(Tx, { foreignKey: 'store_id' });

Tx.belongsTo(Stores, {foreignKey: 'store_id'});
Tx.belongsTo(Products, {foreignKey: 'product_id'});

module.exports = Tx;