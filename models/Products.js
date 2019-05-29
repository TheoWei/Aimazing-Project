const Sequelize = require('sequelize');
const sequelize = require('./index');

const Product = sequelize.define('products',{
    product_id:{ type: Sequelize.INTEGER(11), allownull: false, autoIncrement: true, primaryKey: true},
    product_name:{ type: Sequelize.STRING(100), allownull: false, },
    product_price:{ type: Sequelize.FLOAT(10,2).UNSIGNED, allownull: false, }    
})



module.exports = Product;