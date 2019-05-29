const Sequelize = require('sequelize');
const sequelize = require('./index');

module.exports = sequelize.define('users',{
    user_id:{ type: Sequelize.INTEGER(11), allownull: false, autoIncrement: true, primaryKey: true},
    user_name:{ type: Sequelize.STRING(50), allownull: false, },
    user_email:{ type: Sequelize.STRING(50), allownull: false, },
    user_password:{ type: Sequelize.STRING(200), allownull: false, },    
})