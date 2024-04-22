const passport = require('passport');
const { verifyToken, generateToken } = require("./tokens");

const FRONTEND_URL = process.env.FRONTEND_URL || ''

async function loginSuccess( req, res ){
    const { token } = req.query;
    try {
        // console.log('Login-success');
        const user = await verifyToken(token, 'secret');
        const options = {
            name: user.name,
            email: user.email,
            role: user.role || 'user'
        };
        
        const refreshToken = await generateToken(options, 'secret', '7d');
        // console.log('Here');
        return res.status(200).json({ user, token: refreshToken });
    } catch (error) {
        // console.log('Login-error');
        return res.status(403).json({ message: 'Token invalid' });
    }
};

function googleCallbackOne( req, res, next ){
    if(req.query.error) return res.redirect(FRONTEND_URL+'/login-error');
    next();
};

async function googleCallbackTwo( req, res ) {
    if(req.user.isInvalidUser) return res.redirect(FRONTEND_URL+'/login-error?error=Invalid_Kle_Account;Please_use_accounts_between_2020_&_2023');
    
    try {
        const options = {
            name: req.user.displayName,
            email: req.user.emails[0].value,
            role: req.user.role || 'user'
        };
        const token = await generateToken(options, 'secret', '60s');
        return res.redirect(FRONTEND_URL+'/login-success?token='+token);
    } catch (error) {
        return res.redirect(FRONTEND_URL+'/login-error?error='+error);
    }
    
};


module.exports = { loginSuccess, googleCallbackOne, googleCallbackTwo };