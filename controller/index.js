
module.exports = {
    index: (req, res, next) => { 
        const { token } = req.cookies;
        
        res.render('index', { title: 'Store List', token});
    },
    transaction: (req, res, next) => {
        const { token } = req.cookies;
        res.render('transactions', { title: 'Transaction List', token });
    },

    signIn: (req, res, next) => {
        
        res.render('signin', { title: 'Sign In' });
    },

    signUp: (req, res, next) => {
        res.render('signup', { title: 'Sign Up' });
    },

}