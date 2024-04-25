const { event, keynote } = require('../controllers/videoController');

const router = require('express').Router();

router.get('/event',event);
router.get('/keynote',keynote);

module.exports = router;