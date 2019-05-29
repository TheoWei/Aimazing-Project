const Products = require('../models/Products');
module.exports = {
    getAllProduct: (req, res, next) => {
        Products.sync()
            .then(() => {
                Products.findAll()
                    .then((result) => {                        
                        res.status(200).json(result);
                    })
                    .catch((err) => res.status(500).json({ error: err }));
            })
    },

    addProduct: (req, res, next) => {
        const { product_name, product_price } = req.body;
        Products.sync()
            .then(() => {
                Products.findAll({
                    where: {
                        product_name
                    }
                })
                    .then((result) => {
                        if (result.length >= 1) res.status(400).json({ error: 'Product is exist!' });
                        else {
                            Products.create({
                                product_name,                                
                                product_price,
                            })
                                .then(() => {
                                    console.log(`${product_name} created!`);
                                    res.redirect('/index');                                    
                                })
                                .catch((err) => res.status(500).json({ error: 'Product create fail!' }))
                        }
                    })
                    .catch((err) => res.status(500).json({ error: 'Product query fail!' }))

            })
    },

    updateProduct: (req, res, next) => {
        const { product_id, product_name, product_price } = req.body;
        Products.sync()
            .then(() => {
                let updated = {};
                if (product_name) updated['product_name'] = product_name;
                if (product_price) updated['product_price'] = product_price;                 
                Products.update(updated, { where: { product_id } })
                    .then((result) => {
                        console.log(` #${product_id} product updated!`);
                        res.status(200).json({status: true});
                    })
                    .catch((err) => res.status(500).json({ error: 'product update fail!' }));
                
            })
            .catch((err) => res.status(500).json({ error: 'query condition for update fail!' }));
    },

    deleteProduct: (req, res, next) => {
        const { product_id } = req.body;
        Products.sync()
            .then(() => {
                Products.destroy({
                    where: {
                        product_id
                    }
                })
                .then((result) => {
                    res.status(200).json({message: 'delete product success!'});
                })
                .catch((err) => res.status(500).json({ error: 'delete product fail!' }))
                
            })
            .catch((err) => res.status(500).json({ error: 'query condition for delete fail!' }))
    },

}