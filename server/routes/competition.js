const router = require('express').Router();
const { findAll, findByEventId, registerToEvent, createCompetition } = require('../controllers/competitionController');

router.get('/', findAll);
router.get('/:eventId', findByEventId);
router.post('/register', registerToEvent);
router.post('/', createCompetition);

module.exports = router;