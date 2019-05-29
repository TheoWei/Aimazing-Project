const Stores = require('../models/Stores');
module.exports = {
    getAllStore: (req, res, next) => {        
        Stores.sync()
            .then(() => {
                Stores.findAll()
                    .then((result) => {
                        res.status(200).json( result );
                    })
                    .catch((err) => res.status(500).json({ error: err }));
            })
    },

    addStore: (req, res, next) => {
        const { store_name, store_phone, store_address } = req.body;
        Stores.sync()
            .then(() => {
                Stores.findAll({
                    where: {
                        store_name
                    }
                })
                    .then((result) => {
                        if (result.length >= 1) res.status(400).json({ error: 'store is exist!' });
                        else {
                            Stores.create({
                                store_name,
                                store_phone,
                                store_address,
                            })
                                .then(() => {
                                    console.log(`${store_name} created!`);
                                    res.redirect('/index');
                                })
                                .catch((err) => res.status(500).json({ error: 'store create fail!' }))
                        }
                    })
                    .catch((err) => res.status(500).json({ error: 'store query fail!' }))

            })
    },

    updateStore: (req, res, next) => {        
        const { store_id, store_name, store_phone, store_address } = req.body;         
        Stores.sync()
            .then(() => {
                let updated = {};
                if (store_name) updated['store_name'] = store_name;
                if (store_phone) updated['store_phone'] = store_phone;
                if (store_address) updated['store_address'] = store_address;  
                console.log(updated);
                Stores.update(updated, { where: { store_id } })
                    .then((result) => {                                                
                        console.log(` #${store_id} store updated!`);
                        res.status(200).json({status: true});
                    })
                    .catch((err) => res.status(500).json({ error: 'store update fail!' }));
            })
            .catch((err) => res.status(500).json({ error: 'query condition for update fail!' }));
    },

    deleteStore: (req, res, next) => {
        const { store_id } = req.body;
        Stores.sync()
            .then(() => {
                Stores.destroy({
                    where: {
                        store_id
                    }
                })
                    .then((result) => {
                        res.status(200).json({ message: 'delete store success!' });
                    })
                    .catch((err) => res.status(500).json({ error: 'delete store fail!' }))

            })
            .catch((err) => res.status(500).json({ error: 'query condition for delete fail!' }))
    },

}