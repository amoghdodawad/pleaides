const router = require('express').Router();
const { register } = require('../controllers/orders');
const { auth } = require('../middlewares/auth');

router.post('/register', auth, register)

module.exports = router;