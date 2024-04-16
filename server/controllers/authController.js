const passport = require('passport');
const { verifyToken, generateToken } = require("./tokens");

async function loginSuccess( req, res ){
    const { token } = req.query;
    try {
        const user = await verifyToken(token, 'secret');
        const options = {
            name: user.name,
            email: user.email,
            role: user.role || 'user'
        };
        const refreshToken = await generateToken(options, 'secret', '7d');
        return res.status(200).json({ user, token: refreshToken });
    } catch (error) {
        return res.status(403).json({ message: 'Token invalid' });
    }
};

function googleCallbackOne( req, res, next ){
    if(req.query.error) return res.redirect('http://localhost:3000/login-error');
    next();
};

async function googleCallbackTwo( req, res ) {
    const options = {
        name: req.user.displayName,
        email: req.user.emails[0].value,
        role: req.user.role || 'user'
    };
    const token = await generateToken(options, 'secret', '60s');
    return res.redirect('http://localhost:3000/login-success?token='+token);
};


module.exports = { loginSuccess, googleCallbackOne, googleCallbackTwo };