const jwt = require('jsonwebtoken');
const { verifyToken } = require('../controllers/tokens');

async function auth( req, res, next ){
    // console.log('Auth');
    try {
        const token = req.headers['authorization'].split(' ')[1];
        // console.log(token);
        const user = await verifyToken(token,'secret');
        req.body.email = user.email;
        if(user.kleId) req.body.kleId = user.kleId;
        // console.log(user);
        // req.body.email = 'amoghasdodawad@gmail.com'
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token invalid or expired' });
    }
}

module.exports = {
    auth
}