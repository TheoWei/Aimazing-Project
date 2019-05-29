const sequelize = require('../models');
const Tx = require('../models/Tx');
const Products = require('../models/Products');
module.exports = {
    getAllTx: (req, res, next) => {
        sequelize.query("SELECT TRANSACTIONS.transaction_id, STORES.store_name, PRODUCTS.product_name, TRANSACTIONS.product_quantity, PRODUCTS.product_price, TRANSACTIONS.total_amount, TRANSACTIONS.createdAt FROM STORES INNER JOIN (PRODUCTS INNER JOIN TRANSACTIONS ON PRODUCTS.product_id = TRANSACTIONS.product_id) ON STORES.store_id = TRANSACTIONS.store_id ORDER BY TRANSACTIONS.createdAt DESC ;", { type: sequelize.QueryTypes.SELECT})
            .then((results) => {
                res.status(200).json(results);
            })
            .catch((err) => res.status(500).json({ error: err }));
    },

    addTx: (req, res, next) => {
        const { store_id, product_id, product_quantity } = req.body;
        console.log(req.body);
        Tx.sync()
            .then(() => {
                Products.findOne({ where: { product_id } })
                    .then((result) => {
                        Tx.create({
                            store_id,
                            product_id,
                            product_quantity,
                            total_amount: result.product_price * product_quantity
                        })
                            .then(() => {
                                res.redirect('/index');
                            })
                            .catch((err) => res.status(500).json({ error: 'transaction create fail!' }))
                    });

            })
            .catch((err) => res.status(500).json({ error: 'transaction query fail!' }))

    },

}