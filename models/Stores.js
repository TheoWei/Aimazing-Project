const Sequelize = require('sequelize');
const sequelize = require('./index');

module.exports= sequelize.define('stores', {
    store_id: { type: Sequelize.INTEGER(11), allownull: false, autoIncrement: true, primaryKey: true },
    store_name: { type: Sequelize.STRING(100), allownull: false, },
    store_phone: { type: Sequelize.INTEGER(11).UNSIGNED, allownull: false, },
    store_address: { type: Sequelize.STRING(200), allownull: false, },
})
