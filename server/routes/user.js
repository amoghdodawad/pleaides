const router = require('express').Router();
const { getUser, updateUser } = require('../controllers/userController');
const { auth } = require('../middlewares/auth');

router.get('/:email', auth, getUser);
router.post('/update', auth, updateUser);

module.exports = router;