const express = require('express');
const router = express.Router();

const indexController = require('../controller/index');
const userController = require('../controller/user');
const storeController = require('../controller/store');
const productController = require('../controller/product');
const transactionController = require('../controller/transaction');


/* GET home page. */
router.get('/', indexController.index); 
router.get('/transaction', indexController.transaction);

router.route('/transactions')
    .get(transactionController.getAllTx)  
    .post(transactionController.addTx); 

router.route('/stores')
    .get(storeController.getAllStore) 
    .post(storeController.addStore) 
    .put(storeController.updateStore) 
    .delete(storeController.deleteStore); 

router.route('/products')
    .get(productController.getAllProduct) 
    .post(productController.addProduct) 
    .put(productController.updateProduct) 
    .delete(productController.deleteProduct); 

router.route('/signin')
    .get(indexController.signIn) 
    .post(userController.signIn); 

router.route('/signup')
    .get(indexController.signUp) 
    .post(userController.signUp); 

router.route('/signout').get(userController.signOut); 


module.exports = router;
