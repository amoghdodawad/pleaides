const router = require('express').Router();
const passport = require('passport');
const { loginSuccess, googleCallbackOne, googleCallbackTwo } = require('../controllers/authController');

router.get('/login/failed', ( req, res ) => {
    return res.status(401).json({ success: false, message: 'failure' });
});

router.get('/login/success', loginSuccess);

router.get('/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

router.get('/google/callback', 
    googleCallbackOne,
    passport.authenticate('google', { session: false }), 
    googleCallbackTwo
);

module.exports = router;