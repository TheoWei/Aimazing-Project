const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config').development;
const User = require('../models/Users');
module.exports = {
    signIn: (req, res, next) => {
        const { user_email, user_password } = req.body;
        User.sync()
            .then(() => {
                User.findAll({
                    where: {
                        user_email
                    }
                })
                    .then((result) => {
                        if (result.length < 1) res.status(500).json({ message: 'user isn\'t exist', error: err });
                        bcrypt.compare(user_password, result[0].user_password)
                            .then(() => {
                                const token = jwt.sign({ user_email: result[0].user_email, user_name: result[0].user_name }, config.secret, { expiresIn: '30 days' });                                
                                res.cookie('token', token, { path: '/'});
                                res.cookie('token', token, { path: '/transaction'});
                                return res.redirect('/');
                            })
                            .catch(err => res.status(500).json({ message: 'wrong password!', error: err }));
                    })
                    .catch(err => res.status(500).json({ message: 'user isn\'t exist!', error: err }));
            });
    },

    signOut: (req, res, next) => {             
        res.clearCookie('token', {path: '/'});
        res.clearCookie('token', {path: '/transaction'});
        res.redirect('/');
    },

    signUp: (req, res, next) => {
        const { user_email, user_password, user_name, user_confirm } = req.body;
        if (user_password !== user_confirm) res.status(500).json({ message: 'password not match!' });
        else {

            User.sync()
                .then(() => {
                    User.findAll({
                        where: {
                            user_email
                        }
                    })
                        .then((result) => {
                            if (result.length >= 1) res.status(400).json({ error: 'email is exist!' });
                            else {
                                bcrypt.hash(user_password, 10)
                                    .then((hash) => {
                                        User.create({
                                            user_email,
                                            user_password: hash,
                                            user_name
                                        }).then(() => {
                                            console.log(`user ${user_email} been created!`);
                                            res.redirect('/signin');
                                        })
                                    })
                            }
                        });
                })

        }

    },
}